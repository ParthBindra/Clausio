import asyncio
import json
import numpy as np
import os
import site
import traceback
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from faster_whisper import WhisperModel
import torch

try:
    from paddleocr import PaddleOCR
    import pypdfium2 as pdfium
except ImportError:
    PaddleOCR = None
    pdfium = None

# Workaround for Python 3.13 Windows DLL loading (WinError 126)
user_site = site.getusersitepackages()
torch_lib_path = os.path.join(user_site, "torch", "lib")
if os.path.exists(torch_lib_path):
    os.environ["PATH"] = torch_lib_path + os.pathsep + os.environ.get("PATH", "")
    try:
        os.add_dll_directory(torch_lib_path)
    except AttributeError:
        pass

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration
MODEL_SIZE = "large-v3-turbo"
SAMPLE_RATE = 16000

# Device configuration
device = "cuda" if torch.cuda.is_available() else "cpu"
print(f"Using device: {device}")

# Lazy loading models
whisper_model = None
paddle_ocr = None

def load_models():
    global whisper_model, paddle_ocr
    try:
        if whisper_model is None:
            print(f"Loading faster-whisper model ({MODEL_SIZE})...")
            # compute_type="float16" optimizes memory and speed on GPU
            compute_type = "float16" if device == "cuda" else "int8"
            whisper_model = WhisperModel(MODEL_SIZE, device=device, compute_type=compute_type)
            print("faster-whisper loaded successfully.")
    except Exception as e:
        print(f"Error loading whisper model: {e}")
        
    try:
        if paddle_ocr is None and PaddleOCR is not None:
            print("Loading PaddleOCR model...")
            paddle_ocr = PaddleOCR(use_gpu=(device == "cuda"), lang='en', show_log=False)
            print("PaddleOCR loaded successfully.")
    except Exception as e:
        print(f"Error loading PaddleOCR model: {e}")

@app.on_event("startup")
async def startup_event():
    loop = asyncio.get_event_loop()
    await loop.run_in_executor(None, load_models)

@app.post("/api/ocr")
async def process_ocr(file: UploadFile = File(...)):
    # Save the file temporarily
    temp_dir = "temp_uploads"
    os.makedirs(temp_dir, exist_ok=True)
    temp_path = os.path.join(temp_dir, file.filename)
    
    with open(temp_path, "wb") as f:
        f.write(await file.read())
        
    try:
        # Fallback if PaddleOCR failed to load (e.g. on Python 3.13)
        if paddle_ocr is None:
            print(f"Fallback mode: Mocking OCR for {file.filename} because PaddleOCR is missing.")
            await asyncio.sleep(2) # Simulate processing time
            return {
                "text": f"--- MOCK OCR RESULT ---\n\nExtracted text from {file.filename}.\n\n(Note: PaddleOCR is not installed due to Python version compatibility, so this is simulated text.)", 
                "filename": file.filename
            }
            
        if file.filename.lower().endswith(".pdf"):
            # Process PDF
            pdf_results = paddle_ocr.ocr(temp_path, pdf_num_pages=150)
            full_text = []
            for page_idx, page_result in enumerate(pdf_results):
                if page_result:
                    for line in page_result:
                        full_text.append(line[1][0])
            extracted_text = "\n".join(full_text)
        else:
            # Process Image
            result = paddle_ocr.ocr(temp_path, cls=True)
            full_text = []
            if result and result[0]:
                for line in result[0]:
                    full_text.append(line[1][0])
            extracted_text = "\n".join(full_text)
            
        return {"text": extracted_text, "filename": file.filename}
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        # Cleanup
        if os.path.exists(temp_path):
            os.remove(temp_path)

@app.websocket("/ws/transcribe")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    
    language = "auto" # default to auto-detect
    audio_buffer = []
    
    # Common hallucinations Whisper outputs when it hears silence or noise
    hallucinations = ["you", "you.", "thank you.", "thank you", "bye.", "嗨", "what's your name?", "what's your name", "wait, wait, wait."]
    
    try:
        while True:
            message = await websocket.receive()
            
            if "text" in message:
                try:
                    data = json.loads(message["text"])
                    if "language" in data:
                        language = data["language"]
                        print(f"Language preference received: {language}")
                except json.JSONDecodeError:
                    pass
            elif "bytes" in message:
                pcm_data = np.frombuffer(message["bytes"], dtype=np.float32)
                audio_buffer.extend(pcm_data.tolist())
                
                # Using a rolling buffer: transcribe when we have at least 3.0 seconds of audio
                if len(audio_buffer) >= SAMPLE_RATE * 3.0:
                    audio_array = np.array(audio_buffer, dtype=np.float32)
                    
                    try:
                        if whisper_model:
                            # Run faster-whisper inference with Silero VAD, Beam Search, and Temperature Fallback
                            segments, info = whisper_model.transcribe(
                                audio_array, 
                                beam_size=5,
                                language=None if language == "auto" else language,
                                vad_filter=True, # Enable Silero VAD
                                vad_parameters=dict(min_silence_duration_ms=500),
                                condition_on_previous_text=False,
                                temperature=[0.0, 0.2, 0.4, 0.6, 0.8, 1.0]
                            )
                            
                            text = "".join([segment.text for segment in segments])
                            
                            text_lower = text.strip().lower()
                            
                            # Filter out common silence hallucinations
                            if text_lower and text_lower not in hallucinations and "zajed" not in text_lower and "продолжение следует" not in text_lower:
                                await websocket.send_text(json.dumps({
                                    "text": text.strip(),
                                    # Since we are chunking, mark as final to append on frontend
                                    "isFinal": True 
                                }))
                                
                                # Clear buffer after successful transcription segment
                                audio_buffer = []
                                
                    except Exception as e:
                        print(f"Transcription error: {e}")
                        traceback.print_exc()
                        # Clear buffer on error to prevent cascading failures
                        audio_buffer = []

    except WebSocketDisconnect:
        print("Client disconnected")
    except RuntimeError as e:
        if "disconnect message has been received" in str(e):
            print("Client disconnected (RuntimeError)")
        else:
            print(f"RuntimeError: {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)

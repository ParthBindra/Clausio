'use client'
import { useState, useEffect, useRef } from 'react'

// AI Insights — right panel with recommendations and ask AI
const URGENT = [
  { dot: '#ef4444', text: 'Income proof missing — weakens maintenance claim', btn: 'Fix now',  bBg: '#fef2f2', bClr: '#991b1b' },
  { dot: '#f59e0b', text: 'Limitation expires in 14 days',                   btn: 'Draft',    bBg: '#fef3c7', bClr: '#92400e' },
]
const RECS = [
  { dot: '#10b981', text: 'Similar SC judgment supports cruelty ground',    btn: 'View',     bBg: '#f0fdf4', bClr: '#15803d' },
  { dot: '#3b82f6', text: 'Generate written statement — respondent overdue', btn: 'Generate', bBg: '#eff6ff', bClr: '#1e40af' },
]
const STRATEGY = ['Push for ex-parte maintenance at next hearing', 'Secure Dr. Mehta witness before 20 Jun']

export default function AIInsights() {
  const [isRecording, setIsRecording] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [interimTranscript, setInterimTranscript] = useState('')
  
  // OCR Attachment State
  const [isUploading, setIsUploading] = useState(false)
  const [attachedContext, setAttachedContext] = useState<string | null>(null)
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  
  const socketRef = useRef<WebSocket | null>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const mediaStreamRef = useRef<MediaStream | null>(null)
  const processorRef = useRef<ScriptProcessorNode | null>(null)

  // Initialize WebSocket connection to Sandra AI backend
  useEffect(() => {
    let ws: WebSocket | null = null;
    let isComponentMounted = true;

    const initWebSocket = () => {
      if (!isComponentMounted) return;
      ws = new WebSocket('ws://localhost:8000/ws/transcribe')
      socketRef.current = ws
      
      ws.onopen = () => {
        console.log('Sandra AI Voice connected')
        ws?.send(JSON.stringify({ language: 'auto' }))
      }
      
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data)
        if (data.text) {
          if (data.isFinal) {
            setTranscript(prev => (prev + ' ' + data.text).trim())
            setInterimTranscript('')
          } else {
            setInterimTranscript(data.text)
          }
        }
      }

      ws.onclose = () => {
        console.log('Sandra AI disconnected, reconnecting...')
        if (isComponentMounted) {
          setTimeout(initWebSocket, 3000)
        }
      }
    }

    initWebSocket()

    return () => {
      isComponentMounted = false;
      if (ws) ws.close()
    }
  }, [])

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('http://localhost:8000/api/ocr', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('OCR Failed')
      }

      const data = await response.json()
      setAttachedContext(`[Attached Document: ${file.name}]\n\n${data.text}`)
      setTranscript(prev => (prev + ` [Attached: ${file.name}]`).trim())
    } catch (err) {
      console.error(err)
      alert("Failed to process document. Is the PaddleOCR backend running?")
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: { noiseSuppression: true, echoCancellation: true, autoGainControl: true } 
      })
      mediaStreamRef.current = stream
      
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext
      audioContextRef.current = new AudioContext({ sampleRate: 16000 })
      
      const source = audioContextRef.current.createMediaStreamSource(stream)
      const processor = audioContextRef.current.createScriptProcessor(4096, 1, 1)
      processorRef.current = processor
      
      processor.onaudioprocess = (e) => {
        const inputData = e.inputBuffer.getChannelData(0)
        
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
          socketRef.current.send(inputData.buffer)
        }
      }

      source.connect(processor)
      processor.connect(audioContextRef.current.destination)
      setIsRecording(true)
      
    } catch (err) {
      console.error('Error accessing microphone:', err)
      alert('Could not access microphone. Please ensure permissions are granted.')
    }
  }

  const stopRecording = () => {
    setIsRecording(false)
    if (processorRef.current) processorRef.current.disconnect()
    if (mediaStreamRef.current) mediaStreamRef.current.getTracks().forEach(t => t.stop())
    if (audioContextRef.current) audioContextRef.current.close()
  }

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording()
    } else {
      startRecording()
    }
  }

  // Update input text with transcript
  const displayedText = transcript + (interimTranscript ? ' ' + interimTranscript : '')

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: 'transparent' }}>
      {/* Header */}
      <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0, background: 'rgba(255,255,255,0.4)' }}>
        <i className="ti ti-brain" style={{ fontSize: 16, color: '#7c3aed' }} />
        <span style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', flex: 1 }}>AI insights</span>
        <span className="glass-pill" style={{ fontSize: 10, background: 'rgba(255,255,255,0.8)', color: '#7c3aed', padding: '4px 8px', fontWeight: 700, border: '1px solid rgba(124, 58, 237, 0.2)' }}>5 new</span>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)' }}>
        {/* Success probability */}
        <div style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.9)', borderRadius: 16, padding: '12px 16px', marginBottom: 16, boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: 11, color: '#7c3aed', fontWeight: 600, marginBottom: 4 }}>Case success probability</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.5px' }}>78%</div>
          <div style={{ height: 6, background: 'rgba(0,0,0,0.05)', borderRadius: 4, marginTop: 8, overflow: 'hidden', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)' }}>
            <div style={{ width: '78%', height: 6, background: '#10b981', borderRadius: 4 }} />
          </div>
          <div style={{ fontSize: 11, color: '#64748b', marginTop: 8, fontWeight: 500 }}>Strong evidence · 3 SC precedents found</div>
        </div>

        <p style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8, fontWeight: 700 }}>Urgent</p>
        {URGENT.map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 0', borderBottom: i < URGENT.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: r.dot, flexShrink: 0, marginTop: 4, boxShadow: `0 0 8px ${r.dot}40` }} />
            <div>
              <p style={{ fontSize: 12, color: '#0f172a', lineHeight: 1.5, fontWeight: 500 }}>{r.text}</p>
              <button className="glass-button" style={{ marginTop: 6, fontSize: 11, padding: '4px 10px', border: 'none', background: r.bBg, color: r.bClr, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>{r.btn}</button>
            </div>
          </div>
        ))}

        <p style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8, fontWeight: 700, marginTop: 16 }}>Recommended</p>
        {RECS.map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 0', borderBottom: i < RECS.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: r.dot, flexShrink: 0, marginTop: 4, boxShadow: `0 0 8px ${r.dot}40` }} />
            <div>
              <p style={{ fontSize: 12, color: '#0f172a', lineHeight: 1.5, fontWeight: 500 }}>{r.text}</p>
              <button className="glass-button" style={{ marginTop: 6, fontSize: 11, padding: '4px 10px', border: 'none', background: r.bBg, color: r.bClr, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600 }}>{r.btn}</button>
            </div>
          </div>
        ))}

        <p style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8, fontWeight: 700, marginTop: 16 }}>Strategy</p>
        {STRATEGY.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '8px 0', borderBottom: i < STRATEGY.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#7c3aed', flexShrink: 0, marginTop: 4, boxShadow: '0 0 8px rgba(124, 58, 237, 0.4)' }} />
            <p style={{ fontSize: 12, color: '#0f172a', lineHeight: 1.5, fontWeight: 500 }}>{s}</p>
          </div>
        ))}
      </div>

      {/* Ask AI */}
      <div style={{ padding: '16px', borderTop: '1px solid rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.3)' }}>
        <div className="ai-wave-input-container" style={{ position: 'relative' }}>
          {showAttachmentMenu && (
            <div style={{ position: 'absolute', right: 44, bottom: '100%', marginBottom: 12, background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(16px)', borderRadius: 12, padding: 6, boxShadow: '0 10px 25px rgba(0,0,0,0.1)', border: '1px solid rgba(255,255,255,1)', zIndex: 20, display: 'flex', flexDirection: 'column', gap: 4, width: 150 }}>
              <button 
                onClick={() => { setShowAttachmentMenu(false); if(fileInputRef.current) { fileInputRef.current.accept = '.pdf'; fileInputRef.current.click() } }} 
                className="glass-button" 
                style={{ padding: '8px 12px', fontSize: 13, textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8, border: 'none', background: 'transparent', width: '100%' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <i className="ti ti-file-text" style={{ fontSize: 16, color: '#ef4444' }} /> PDF Document
              </button>
              <button 
                onClick={() => { setShowAttachmentMenu(false); if(fileInputRef.current) { fileInputRef.current.accept = 'image/*'; fileInputRef.current.click() } }} 
                className="glass-button" 
                style={{ padding: '8px 12px', fontSize: 13, textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8, border: 'none', background: 'transparent', width: '100%' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <i className="ti ti-photo" style={{ fontSize: 16, color: '#3b82f6' }} /> Image / Photo
              </button>
            </div>
          )}

          <textarea 
            className="ai-wave-input"
            rows={3}
            placeholder={isRecording ? "Listening..." : isUploading ? "Processing Document..." : "Ask Clausio AI about this case..."}
            value={displayedText}
            onChange={(e) => setTranscript(e.target.value)}
            disabled={isUploading}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                if (displayedText.trim()) {
                  console.log("Submitting to AI:", displayedText)
                  if (attachedContext) {
                    console.log("With Context:", attachedContext)
                  }
                  alert(`Query submitted: "${displayedText}"\n(AI response integration coming soon)`)
                  setTranscript('')
                  setInterimTranscript('')
                  setAttachedContext(null)
                }
              }
            }}
            style={{ paddingRight: 80, resize: 'none' }}
          />
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            style={{ display: 'none' }} 
          />
          
          <button 
            onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
            disabled={isUploading}
            style={{ 
              position: 'absolute', right: 44, top: '50%', transform: 'translateY(-50%)', 
              background: showAttachmentMenu ? 'rgba(100, 116, 139, 0.1)' : 'transparent', 
              border: 'none', 
              color: isUploading ? '#94a3b8' : '#64748b', 
              cursor: isUploading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', 
              width: 28, height: 28, borderRadius: '50%', zIndex: 10, transition: 'all 0.2s',
            }} 
            onMouseEnter={e => { if(!isUploading && !showAttachmentMenu) e.currentTarget.style.background = 'rgba(100, 116, 139, 0.1)' }} 
            onMouseLeave={e => { if(!isUploading && !showAttachmentMenu) e.currentTarget.style.background = 'transparent' }}
          >
            {isUploading ? (
              <i className="ti ti-loader" style={{ fontSize: 16, animation: 'spin 1s linear infinite' }} />
            ) : (
              <i className="ti ti-paperclip" style={{ fontSize: 16 }} />
            )}
          </button>

          <button 
            onClick={toggleRecording}
            disabled={isUploading}
            style={{ 
              position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', 
              background: isRecording ? 'rgba(239, 68, 68, 0.1)' : 'transparent', 
              border: 'none', 
              color: isRecording ? '#ef4444' : '#3b82f6', 
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', 
              width: 28, height: 28, borderRadius: '50%', zIndex: 10, transition: 'all 0.2s',
              boxShadow: isRecording ? '0 0 10px rgba(239, 68, 68, 0.4)' : 'none'
            }} 
            onMouseEnter={e => { if(!isRecording) e.currentTarget.style.background = 'rgba(59, 130, 246, 0.1)' }} 
            onMouseLeave={e => { if(!isRecording) e.currentTarget.style.background = 'transparent' }}
          >
            <i className="ti ti-microphone" style={{ fontSize: 16 }} />
          </button>
        </div>
      </div>
    </div>
  )
}
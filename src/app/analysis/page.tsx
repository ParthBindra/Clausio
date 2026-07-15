'use client'

import { useState, useEffect, useRef } from 'react'
import { MOCK_ANALYSIS_DATA, ChronologyEvent, EvidenceItem } from '@/lib/mockAnalysisData'

type AnalysisStatus = 'idle' | 'uploading' | 'completed'

export default function AnalysisPage() {
  // Page states
  const [selectedCategory, setSelectedCategory] = useState<string>('Family & Matrimonial')
  const [uploadedFiles, setUploadedFiles] = useState<{ name: string; size: string }[]>([])
  const [pastedText, setPastedText] = useState<string>('')
  const [status, setStatus] = useState<AnalysisStatus>('idle')
  const [loadingStep, setLoadingStep] = useState<number>(0)
  const [activeTab, setActiveTab] = useState<'chronology' | 'summary' | 'evidence'>('chronology')
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCategoryDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Simulated AI pipeline steps
  const LOADING_STEPS = [
    'Scanning document structure and formatting...',
    'Extracting key entities, dates, and party details...',
    'Running cross-document chronology parsing & index compilation...',
    'Evaluating evidence strengths & cross-checking contradictions...'
  ]

  // Start analysis processing
  const handleRunAnalysis = () => {
    if (uploadedFiles.length === 0 && !pastedText.trim()) {
      // If nothing uploaded, auto-load sample case for easy testing
      handleLoadSample()
    }
    
    setStatus('uploading')
    setLoadingStep(0)
  }

  // Simulate loading steps progression
  useEffect(() => {
    if (status !== 'uploading') return

    const interval = setInterval(() => {
      setLoadingStep((prev) => {
        if (prev >= LOADING_STEPS.length - 1) {
          clearInterval(interval)
          setTimeout(() => {
            setStatus('completed')
            setActiveTab('chronology')
          }, 400)
          return prev
        }
        return prev + 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [status])

  const handleLoadSample = () => {
    setSelectedCategory('Family & Matrimonial')
    setUploadedFiles([{ name: 'priya_v_rohit_petition_copy.pdf', size: '412 KB' }])
    setPastedText('PETITION FOR DIVORCE UNDER SECTION 13(1)(ia) OF THE HINDU MARRIAGE ACT, 1955...')
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArr = Array.from(e.target.files).map(f => ({
        name: f.name,
        size: f.size > 1024 * 1024 
          ? `${(f.size / (1024 * 1024)).toFixed(1)} MB` 
          : `${(f.size / 1024).toFixed(0)} KB`
      }))
      setUploadedFiles(filesArr)
    }
  }

  const triggerBrowse = () => {
    fileInputRef.current?.click()
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const filesArr = Array.from(e.dataTransfer.files).map(f => ({
        name: f.name,
        size: f.size > 1024 * 1024 
          ? `${(f.size / (1024 * 1024)).toFixed(1)} MB` 
          : `${(f.size / 1024).toFixed(0)} KB`
      }))
      setUploadedFiles(filesArr)
    }
  }

  const handleRemoveFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleReset = () => {
    setStatus('idle')
    setUploadedFiles([])
    setPastedText('')
    setLoadingStep(0)
  }

  // Active dataset based on selected category
  const activeData = MOCK_ANALYSIS_DATA[selectedCategory] || MOCK_ANALYSIS_DATA['Family & Matrimonial']

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#f8fafc' }}>
      
      {/* ── BREADCRUMB ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 14px', background: '#fff', borderBottom: '1px solid #e2e8f0', fontSize: 10, color: '#94a3b8', flexShrink: 0 }}>
        <span style={{ cursor: 'pointer' }}>Dashboard</span>
        <span style={{ color: '#cbd5e1' }}>›</span>
        <span style={{ color: '#0f172a', fontWeight: 500 }}>Analysis Workspace</span>
      </div>

      {/* ── TOOLBAR ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: '#fff', borderBottom: '1px solid #e2e8f0', flexShrink: 0, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>Analysis</span>

        {/* Practice Area Category Selector Dropdown */}
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          <button 
            onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
            style={{
              fontSize: 10, padding: '4px 10px', borderRadius: 20, cursor: 'pointer',
              border: '1px solid #bfdbfe', background: '#eff6ff', color: '#1e40af',
              fontFamily: 'inherit', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4
            }}
          >
            {selectedCategory}
            <i className="ti ti-chevron-down" style={{ fontSize: 9 }} />
          </button>
          
          {categoryDropdownOpen && (
            <div style={{
              position: 'absolute', top: '100%', left: 0, marginTop: 4, zIndex: 100,
              background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8,
              boxShadow: '0 4px 12px rgba(0,0,0,0.08)', width: 220, padding: '4px 0'
            }}>
              {Object.keys(MOCK_ANALYSIS_DATA).map(catName => (
                <button
                  key={catName}
                  onClick={() => {
                    setSelectedCategory(catName)
                    setCategoryDropdownOpen(false)
                  }}
                  style={{
                    width: '100%', padding: '6px 12px', fontSize: 11, textAlign: 'left',
                    background: selectedCategory === catName ? '#f1f5f9' : 'transparent',
                    border: 'none', color: '#334155', cursor: 'pointer', fontFamily: 'inherit',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                  }}
                >
                  {catName}
                  {selectedCategory === catName && <i className="ti ti-check" style={{ color: '#3b82f6', fontSize: 11 }} />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Hidden File Input */}
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          style={{ display: 'none' }} 
          multiple
          accept=".pdf,.doc,.docx,.txt"
        />

        {/* Top actions */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 5 }}>
          {status === 'completed' && (
            <button
              onClick={handleReset}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: '5px 10px', borderRadius: 7, fontSize: 11,
                fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
                border: '1px solid #e2e8f0', background: '#f8fafc', color: '#64748b'
              }}
            >
              <i className="ti ti-refresh" style={{ fontSize: 12 }} />
              Reset analysis
            </button>
          )}

          {status === 'idle' && (
            <button
              onClick={triggerBrowse}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: '5px 10px', borderRadius: 7, fontSize: 11,
                fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
                border: '1px solid #e2e8f0', background: '#f8fafc', color: '#64748b'
              }}
            >
              <i className="ti ti-upload" style={{ fontSize: 12 }} />
              Upload document
            </button>
          )}

          {status === 'idle' && (
            <button
              onClick={handleRunAnalysis}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: '5px 10px', borderRadius: 7, fontSize: 11,
                fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
                border: '1px solid #1e3a8a', background: '#1e3a8a', color: '#fff'
              }}
            >
              <i className="ti ti-brain" style={{ fontSize: 12 }} />
              Run analysis
            </button>
          )}
        </div>
      </div>

      {/* ── CORE VIEWS ── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 14px' }}>
        
        {/* ── STATE 1: IDLE / UPLOAD AREA ── */}
        {status === 'idle' && (
          <div style={{ maxWidth: 760, margin: '10px auto 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
            
            {/* Drag & Drop Container */}
            <div 
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={triggerBrowse}
              style={{
                background: '#fff', border: '2px dashed #cbd5e1', borderRadius: 10,
                padding: '36px 20px', textAlign: 'center', cursor: 'pointer',
                transition: 'border-color 0.15s, background-color 0.15s',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#94a3b8'
                e.currentTarget.style.backgroundColor = '#f8fafc'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#cbd5e1'
                e.currentTarget.style.backgroundColor = '#fff'
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: '50%', background: '#f1f5f9',
                display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12
              }}>
                <i className="ti ti-file-upload" style={{ fontSize: 20, color: '#64748b' }} />
              </div>
              <p style={{ fontSize: 12, fontWeight: 600, color: '#334155', marginBottom: 3 }}>
                Drag and drop your case document or <span style={{ color: '#2563eb', textDecoration: 'underline' }}>click to browse</span>
              </p>
              <p style={{ fontSize: 10, color: '#94a3b8' }}>
                Supports PDF, DOC, DOCX, TXT · Max size 20MB
              </p>
            </div>

            {/* Selected Files List */}
            {uploadedFiles.length > 0 && (
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: 8 }}>
                <p style={{ fontSize: 9, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6, paddingLeft: 4 }}>Uploaded files ({uploadedFiles.length})</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {uploadedFiles.map((file, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '5px 8px', background: '#f8fafc', borderRadius: 6, border: '1px solid #f1f5f9' }}>
                      <i className="ti ti-file-type-pdf" style={{ fontSize: 14, color: '#ef4444' }} />
                      <span style={{ fontSize: 11, color: '#334155', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{file.name}</span>
                      <span style={{ fontSize: 9, color: '#94a3b8' }}>{file.size}</span>
                      <button 
                        onClick={(e) => { e.stopPropagation(); handleRemoveFile(idx); }}
                        style={{ border: 'none', background: 'transparent', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 2 }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Paste Text Area */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: 12 }}>
              <label style={{ fontSize: 10, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 6 }}>
                Or paste case petition / text facts below
              </label>
              <textarea
                value={pastedText}
                onChange={(e) => setPastedText(e.target.value)}
                placeholder="Paste raw statements, court orders, case histories, or contract clauses here to analyze them..."
                style={{
                  width: '100%', minHeight: 120, border: '1px solid #e2e8f0', borderRadius: 6,
                  padding: 10, fontSize: 11, fontFamily: 'inherit', outline: 'none', resize: 'vertical',
                  background: '#f8fafc'
                }}
              />
            </div>

            {/* Demo Helper Action */}
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
              <button 
                onClick={handleLoadSample}
                style={{
                  fontSize: 10, background: 'transparent', border: 'none', color: '#3b82f6',
                  cursor: 'pointer', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'underline'
                }}
              >
                <i className="ti ti-copy" />
                Load sample petition file for {selectedCategory} demo
              </button>
            </div>

          </div>
        )}

        {/* ── STATE 2: LOADING / AI RUNNING PIPELINE ── */}
        {status === 'uploading' && (
          <div style={{ maxWidth: 460, margin: '40px auto 0', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 10, padding: 20, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05)' }}>
            
            {/* Spinning/progress visual */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <i className="ti ti-loader animate-spin" style={{ fontSize: 16, color: '#1e3a8a' }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 11, fontWeight: 600, color: '#0f172a' }}>Clausio Legal AI Core is analyzing...</p>
                <p style={{ fontSize: 9, color: '#64748b', marginTop: 1 }}>Generating chronology, summary, and extracting evidence data.</p>
              </div>
            </div>

            {/* Progress bar */}
            <div style={{ height: 6, background: '#f1f5f9', borderRadius: 3, overflow: 'hidden', marginBottom: 20 }}>
              <div 
                style={{ 
                  height: '100%', 
                  background: 'linear-gradient(90deg, #3b82f6, #1d4ed8)', 
                  width: `${((loadingStep + 1) / LOADING_STEPS.length) * 100}%`,
                  transition: 'width 0.8s ease'
                }} 
              />
            </div>

            {/* Log stepper */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {LOADING_STEPS.map((stepDesc, idx) => {
                const isPassed = idx < loadingStep
                const isActive = idx === loadingStep
                return (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: isPassed || isActive ? 1 : 0.35 }}>
                    {isPassed ? (
                      <i className="ti ti-circle-check" style={{ fontSize: 13, color: '#10b981' }} />
                    ) : isActive ? (
                      <i className="ti ti-rotate-clockwise animate-spin" style={{ fontSize: 13, color: '#3b82f6' }} />
                    ) : (
                      <div style={{ width: 12, height: 12, borderRadius: '50%', border: '2px solid #cbd5e1' }} />
                    )}
                    <span style={{ fontSize: 10, color: isActive ? '#0f172a' : '#475569', fontWeight: isActive ? 500 : 400 }}>
                      {stepDesc}
                    </span>
                  </div>
                )
              })}
            </div>

          </div>
        )}

        {/* ── STATE 3: COMPLETED RESULTS VIEW ── */}
        {status === 'completed' && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: 10 }}>
            
            {/* Inner Route Tabs */}
            <div style={{ display: 'flex', background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: '2px 4px', flexShrink: 0 }}>
              {[
                { id: 'chronology', icon: 'ti-calendar-event', label: 'Chronology' },
                { id: 'summary',    icon: 'ti-notes',          label: 'Case Summary' },
                { id: 'evidence',   icon: 'ti-shield-check',   label: 'Evidence Intelligence' }
              ].map(t => {
                const isActive = activeTab === t.id
                return (
                  <button
                    key={t.id}
                    onClick={() => setActiveTab(t.id as any)}
                    style={{
                      flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                      padding: '8px 12px', fontSize: 11, cursor: 'pointer', background: isActive ? '#eff6ff' : 'transparent',
                      border: 'none', borderRadius: 6, color: isActive ? '#1e40af' : '#64748b',
                      fontWeight: isActive ? 600 : 400, fontFamily: 'inherit', transition: 'all 0.15s'
                    }}
                  >
                    <i className={`ti ${t.icon}`} style={{ fontSize: 13, color: isActive ? '#1d4ed8' : '#94a3b8' }} />
                    {t.label}
                  </button>
                )
              })}
            </div>

            {/* Active Tab Panel Content */}
            <div style={{ flex: 1, background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              
              {/* TAB 1: CHRONOLOGY TABLE */}
              {activeTab === 'chronology' && (
                <div style={{ flex: 1, overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 600 }}>
                    <thead>
                      <tr style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                        <th style={{ padding: '8px 12px', fontSize: 10, fontWeight: 600, color: '#475569', width: 110 }}>Date</th>
                        <th style={{ padding: '8px 12px', fontSize: 10, fontWeight: 600, color: '#475569' }}>Event Description</th>
                        <th style={{ padding: '8px 12px', fontSize: 10, fontWeight: 600, color: '#475569', width: 120 }}>Category</th>
                        <th style={{ padding: '8px 12px', fontSize: 10, fontWeight: 600, color: '#475569', width: 220 }}>Evidence Source</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeData.chronology.map((ev, i) => (
                        <tr key={i} style={{ borderBottom: i < activeData.chronology.length - 1 ? '1px solid #f1f5f9' : 'none', hover: { background: '#f8fafc' } } as any}>
                          <td style={{ padding: '10px 12px', fontSize: 11, fontWeight: 500, color: '#475569', whiteSpace: 'nowrap' }}>
                            {ev.date}
                          </td>
                          <td style={{ padding: '10px 12px', fontSize: 11, color: '#0f172a', lineHeight: 1.4 }}>
                            {ev.event}
                          </td>
                          <td style={{ padding: '10px 12px' }}>
                            <span style={{
                              fontSize: 9, fontWeight: 600, padding: '2px 7px', borderRadius: 12, display: 'inline-block',
                              background: ev.category === 'Strong' ? '#dcfce7' : ev.category === 'Contradiction' ? '#fee2e2' : '#f1f5f9',
                              color: ev.category === 'Strong' ? '#15803d' : ev.category === 'Contradiction' ? '#b91c1c' : '#475569'
                            }}>
                              {ev.category}
                            </span>
                          </td>
                          <td style={{ padding: '10px 12px', fontSize: 10, color: '#64748b', fontWeight: 500 }}>
                            <i className="ti ti-file" style={{ fontSize: 10, marginRight: 4, color: '#cbd5e1' }} />
                            {ev.source}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* TAB 2: CASE SUMMARY VIEW */}
              {activeTab === 'summary' && (
                <div style={{ padding: 14, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
                  
                  {/* Title & Readiness Profile */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 10, background: '#f8fafc', padding: 12, borderRadius: 8, border: '1px solid #e2e8f0' }}>
                    <div>
                      <h3 style={{ fontSize: 12, fontWeight: 600, color: '#0f172a', marginBottom: 2 }}>{activeData.summary.profile.parties}</h3>
                      <p style={{ fontSize: 9, color: '#64748b' }}>{activeData.summary.profile.court} · {activeData.summary.profile.caseNumber}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderLeft: '1px solid #cbd5e1', paddingLeft: 12 } as any}>
                      <div>
                        <p style={{ fontSize: 9, color: '#64748b' }}>Next hearing date</p>
                        <p style={{ fontSize: 11, fontWeight: 600, color: '#0f172a' }}>{activeData.summary.profile.nextHearing}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: 9, color: '#64748b', display: 'block', marginBottom: 2 }}>Analysis Readiness</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <div style={{ width: 60, height: 5, background: '#e2e8f0', borderRadius: 3, overflow: 'hidden' }}>
                            <div style={{ width: activeData.summary.profile.readiness, height: 5, background: '#10b981', borderRadius: 3 }} />
                          </div>
                          <span style={{ fontSize: 9, fontWeight: 600, color: '#10b981' }}>{activeData.summary.profile.readiness}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2 Column Details */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, contentVisibility: 'auto' } as any}>
                    
                    {/* Left Column: Background Narrative & Legal Issues */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {/* Background */}
                      <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: 12 }}>
                        <h4 style={{ fontSize: 10, fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>Background Summary</h4>
                        <p style={{ fontSize: 11, color: '#334155', lineHeight: 1.5 }}>{activeData.summary.background}</p>
                      </div>

                      {/* Legal Issues */}
                      <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: 12 }}>
                        <h4 style={{ fontSize: 10, fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>Key Legal Issues</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                          {activeData.summary.legalIssues.map((issue, idx) => (
                            <div key={idx} style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
                              <span style={{ width: 14, height: 14, borderRadius: '50%', background: '#eff6ff', color: '#1d4ed8', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 600, flexShrink: 0, marginTop: 1 }}>{idx + 1}</span>
                              <p style={{ fontSize: 10.5, color: '#334155', lineHeight: 1.4 }}>{issue}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Allegations vs Defenses & Next Steps */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                      {/* Allegations & Defense */}
                      <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: 12 }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                          
                          {/* Allegations */}
                          <div>
                            <h4 style={{ fontSize: 10, fontWeight: 600, color: '#b91c1c', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 3 }}>
                              <i className="ti ti-circle-minus" /> Key Allegations
                            </h4>
                            <ul style={{ paddingLeft: 12, margin: 0, fontSize: 10, color: '#475569', display: 'flex', flexDirection: 'column', gap: 4 }}>
                              {activeData.summary.allegations.map((allg, idx) => (
                                <li key={idx} style={{ lineHeight: 1.3 }}>{allg}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Defenses */}
                          <div style={{ borderLeft: '1px solid #f1f5f9', paddingLeft: 10 }}>
                            <h4 style={{ fontSize: 10, fontWeight: 600, color: '#1e3a8a', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 3 }}>
                              <i className="ti ti-shield" /> Defense Pleadings
                            </h4>
                            <ul style={{ paddingLeft: 12, margin: 0, fontSize: 10, color: '#475569', display: 'flex', flexDirection: 'column', gap: 4 }}>
                              {activeData.summary.defense.map((df, idx) => (
                                <li key={idx} style={{ lineHeight: 1.3 }}>{df}</li>
                              ))}
                            </ul>
                          </div>

                        </div>
                      </div>

                      {/* Next Steps */}
                      <div style={{ border: '1px solid #e2e8f0', borderRadius: 8, padding: 12, background: '#fbfbfe' }}>
                        <h4 style={{ fontSize: 10, fontWeight: 600, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                          <i className="ti ti-list-check" style={{ fontSize: 12 }} /> Recommended Next Steps
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                          {activeData.summary.nextSteps.map((step, idx) => (
                            <div key={idx} style={{ display: 'flex', gap: 6, alignItems: 'center', background: '#fff', border: '1px solid #f1f5f9', borderRadius: 6, padding: '5px 8px' }}>
                              <i className="ti ti-arrow-right" style={{ fontSize: 10, color: '#7c3aed' }} />
                              <span style={{ fontSize: 10, color: '#334155', fontWeight: 500 }}>{step}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              )}

              {/* TAB 3: EVIDENCE INTELLIGENCE VIEW */}
              {activeTab === 'evidence' && (
                <div style={{ padding: 12, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                    <p style={{ fontSize: 11, color: '#64748b' }}>AI extracted and cross-checked <strong style={{ color: '#0f172a' }}>{activeData.evidence.length} evidence exhibits</strong> for strength, admissibility and alignment.</p>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {activeData.evidence.map((item, idx) => (
                      <div key={item.id} style={{ display: 'flex', flexDirection: 'column', border: '1px solid #e2e8f0', borderRadius: 8, overflow: 'hidden' }}>
                        
                        {/* Exhibit Header */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                          <i className="ti ti-file-text" style={{ fontSize: 12, color: '#94a3b8' }} />
                          <span style={{ fontSize: 11, fontWeight: 600, color: '#0f172a' }}>{item.source}</span>
                          <span style={{ fontSize: 9, padding: '1px 5px', borderRadius: 4, background: '#f1f5f9', color: '#64748b', marginLeft: 4 }}>{item.id.toUpperCase()}</span>
                          
                          {/* Strength Pill */}
                          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 4 }}>
                            <span style={{ fontSize: 9, color: '#64748b' }}>Strength:</span>
                            <span style={{
                              fontSize: 9, fontWeight: 600, padding: '1px 6px', borderRadius: 4,
                              background: item.strength === 'Strong' ? '#dcfce7' : item.strength === 'Contradiction' ? '#fee2e2' : '#eff6ff',
                              color: item.strength === 'Strong' ? '#15803d' : item.strength === 'Contradiction' ? '#b91c1c' : '#1e40af'
                            }}>
                              {item.strength}
                            </span>
                          </div>
                        </div>

                        {/* Exhibit Details */}
                        <div style={{ padding: '8px 10px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                          {/* Description & Admissibility */}
                          <div>
                            <p style={{ fontSize: 9, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.3px', marginBottom: 2 }}>Details</p>
                            <p style={{ fontSize: 10.5, color: '#334155', marginBottom: 6 }}>{item.description}</p>
                            
                            <p style={{ fontSize: 9, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.3px', marginBottom: 2 }}>Admissibility Status</p>
                            <p style={{ fontSize: 10, color: '#475569', fontWeight: 500 }}>
                              <i className="ti ti-shield" style={{ color: '#10b981', marginRight: 4, fontSize: 10 }} />
                              {item.admissibility}
                            </p>
                          </div>

                          {/* AI Insight */}
                          <div style={{ background: '#fbfbfe', border: '1px solid #f1f5f9', borderRadius: 6, padding: '6px 8px' }}>
                            <p style={{ fontSize: 9, color: '#7c3aed', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 3, marginBottom: 2 }}>
                              <i className="ti ti-brain" /> AI Critical Insight
                            </p>
                            <p style={{ fontSize: 10, color: '#475569', lineHeight: 1.4 }}>{item.aiInsight}</p>
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>

                </div>
              )}

            </div>
          </div>
        )}

      </div>
    </div>
  )
}

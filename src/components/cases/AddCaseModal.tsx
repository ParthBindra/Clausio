'use client'
// ─────────────────────────────────────────────────
//  src/components/cases/AddCaseModal.tsx
//
//  Add New Case — 6-step wizard modal
//
//  Steps:
//  1. Case Type (pick practice area)
//  2. Basic Details (title, status, priority, dates)
//  3. Client & Opponent (party details)
//  4. Court & Hearing (court, stage, dates)
//  5. Documents + AI (upload files)
//  6. Review & Submit
// ─────────────────────────────────────────────────

import { useState } from 'react'
import Modal from '@/components/ui/Modal'

// All practice areas
const CASE_TYPES = [
  { icon: '⚖️', label: 'Family & Matrimonial',  law: 'HMA 1955 · Sec 125 CrPC · DV Act' },
  { icon: '🔏', label: 'Criminal Law',           law: 'BNS 2023 · BNSS · NI Act 138'     },
  { icon: '💰', label: 'GST & Indirect Tax',     law: 'CGST 2017 · IGST · Customs Act'   },
  { icon: '📊', label: 'Income Tax',             law: 'IT Act 1961 · CBDT · ITAT'        },
  { icon: '🏛️', label: 'Civil & Commercial',    law: 'CPC 1908 · SRA 1963 · Limitation'  },
  { icon: '🏭', label: 'Labour & Employment',    law: 'IDA 1947 · PF · ESI · POSH'       },
]

const STEPS = ['Case type', 'Basic details', 'Client & Opp.', 'Court & Hearing', 'Documents + AI', 'Review']

const FAMILY_DOCS = ['Marriage Certificate', 'Income Tax Returns', 'Bank Statements', 'Medical Records', 'WhatsApp Screenshots', 'Property Documents', "Children's Birth Certificates", 'FIR Copy (if any)']

interface Props { onClose: () => void }

export default function AddCaseModal({ onClose }: Props) {
  const [step,         setStep]         = useState(1)
  const [caseType,     setCaseType]     = useState('Family & Matrimonial')
  const [priority,     setPriority]     = useState('Medium')

  const next = () => setStep(s => Math.min(s + 1, 6))
  const prev = () => setStep(s => Math.max(s - 1, 1))

  return (
    <Modal isOpen onClose={onClose} title="New case — Step-by-step wizard" size="lg">

      {/* Wizard step indicator */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16, paddingBottom: 14, borderBottom: '1px solid #e2e8f0', overflowX: 'auto', gap: 0 }}>
        {STEPS.map((label, i) => {
          const num     = i + 1
          const isDone  = num < step
          const isActive = num === step
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
              {/* Circle */}
              <div style={{
                width: 24, height: 24, borderRadius: '50%', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 700, border: '2px solid',
                borderColor: isDone ? '#10b981' : isActive ? '#1e3a8a' : '#e2e8f0',
                background:  isDone ? '#10b981' : isActive ? '#1e3a8a' : '#fff',
                color:       isDone || isActive ? '#fff' : '#94a3b8',
              }}>
                {isDone ? '✓' : num}
              </div>
              {/* Label */}
              <span style={{
                fontSize: 10, marginLeft: 5, whiteSpace: 'nowrap',
                color: isDone ? '#10b981' : isActive ? '#1e3a8a' : '#94a3b8',
                fontWeight: isActive ? 600 : 400,
              }}>
                {label}
              </span>
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div style={{ width: 20, height: 2, background: isDone ? '#10b981' : '#e2e8f0', margin: '0 4px' }} />
              )}
            </div>
          )
        })}
      </div>

      {/* ── STEP 1: Case Type ── */}
      {step === 1 && (
        <div>
          <p style={{ fontSize: 13, fontWeight: 500, color: '#0f172a', marginBottom: 4 }}>What type of case is this?</p>
          <p style={{ fontSize: 11, color: '#64748b', marginBottom: 12 }}>Select practice area — the form will adapt to show only relevant fields.</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {CASE_TYPES.map(ct => (
              <div
                key={ct.label}
                onClick={() => setCaseType(ct.label)}
                style={{
                  border: `${caseType === ct.label ? '2px solid #1e3a8a' : '1px solid #e2e8f0'}`,
                  borderRadius: 8, padding: '10px 12px', cursor: 'pointer',
                  background: caseType === ct.label ? '#eff6ff' : '#f8fafc',
                  transition: 'all 0.15s',
                }}
              >
                <div style={{ fontSize: 16, marginBottom: 4 }}>{ct.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 500, color: '#0f172a' }}>{ct.label}</div>
                <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2, lineHeight: 1.4 }}>{ct.law}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── STEP 2: Basic Details ── */}
      {step === 2 && (
        <div>
          {/* Selected type reminder */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '7px 10px', background: '#eff6ff', borderRadius: 7, marginBottom: 14, fontSize: 12 }}>
            <span style={{ fontWeight: 600, color: '#1e40af' }}>{caseType} ✓</span>
            <button onClick={() => setStep(1)} style={{ marginLeft: 'auto', fontSize: 11, background: 'none', border: 'none', cursor: 'pointer', color: '#1e40af', textDecoration: 'underline', fontFamily: 'inherit' }}>Change type</button>
          </div>
          <Field label="Case title" required placeholder="e.g. Priya Sharma v. Rohit Sharma" />
          <Field label="Case number" placeholder="FC/2847/2023 (leave blank if not yet filed)" hint="Leave blank for new cases not yet filed" />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>
            <SelectField label="Sub type" required options={['Divorce Petition','Mutual Consent Divorce','Maintenance (Sec 125)','Child Custody','Domestic Violence']} />
            <SelectField label="Status" required options={['Draft','Active','Pending Filing','Awaiting Client']} />
            <Field label="Filing date" type="date" />
            <Field label="Limitation date" type="date" hint="Date after which filing becomes time-barred" />
          </div>
          <div style={{ marginTop: 9 }}>
            <label style={{ fontSize: 11, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 4 }}>
              Priority <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <div style={{ display: 'flex', gap: 5 }}>
              {[['Low','#f0fdf4','#86efac','#15803d'],['Medium','#fef3c7','#fcd34d','#d97706'],['High','#fff7ed','#fdba74','#c2410c'],['Urgent','#fef2f2','#fca5a5','#dc2626']].map(([label, bg, border, clr]) => (
                <button key={label} onClick={() => setPriority(label)} style={{ padding: '4px 12px', borderRadius: 20, fontSize: 10, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', background: priority === label ? bg : '#f8fafc', border: `1px solid ${priority === label ? border : '#e2e8f0'}`, color: priority === label ? clr : '#64748b' }}>
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div style={{ marginTop: 9 }}>
            <label style={{ fontSize: 11, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 4 }}>Description</label>
            <textarea placeholder="Brief description — key facts, background, context..." style={{ width: '100%', padding: '6px 9px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 12, fontFamily: 'inherit', outline: 'none', resize: 'none', height: 64 }} />
          </div>
        </div>
      )}

      {/* ── STEP 3: Client & Opponent ── */}
      {step === 3 && (
        <div>
          <SectionLabel>Client details</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>
            <Field label="Client name" required placeholder="Full legal name" />
            <Field label="Mobile" required placeholder="+91 XXXXX XXXXX" />
            <Field label="Email" placeholder="client@email.com" />
            <Field label="Aadhar number" placeholder="XXXX XXXX XXXX" />
            <Field label="PAN" placeholder="ABCDE1234F" />
            <Field label="Occupation" placeholder="e.g. Teacher, Engineer" />
          </div>
          <Field label="Residential address" required placeholder="Full address including city, state, PIN" />

          <SectionLabel>Opposite party</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>
            <Field label="Opposite party name" required placeholder="Full legal name" />
            <Field label="Their advocate" placeholder="Advocate name (if known)" />
            <Field label="Mobile" placeholder="+91 XXXXX XXXXX (if known)" />
            <Field label="Address" placeholder="Last known address" />
          </div>
        </div>
      )}

      {/* ── STEP 4: Court & Hearing ── */}
      {step === 4 && (
        <div>
          <SectionLabel>Court details</SectionLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>
            <SelectField label="Court" required options={['Family Court','District Court','Sessions Court','High Court','Supreme Court','Consumer Forum','Labour Court','GST Tribunal']} />
            <Field label="Court location" required placeholder="e.g. Bandra, Mumbai" />
            <Field label="Judge name" placeholder="Presiding judge (optional)" />
            <Field label="Court hall / room" placeholder="e.g. Hall No. 3" />
            <Field label="Next hearing date" type="date" />
            <SelectField label="Case stage" options={['Filing','Admission','Service of Summons','Written Statement','Replication','Issues Framed','Evidence','Arguments','Judgment']} />
            <Field label="Opposing advocate" placeholder="Their lawyer's name" />
            <Field label="Case number (court)" placeholder="As registered in court" />
          </div>
        </div>
      )}

      {/* ── STEP 5: Documents + AI ── */}
      {step === 5 && (
        <div>
          {/* Upload zone */}
          <div
            style={{
              border: '2px dashed #d1d5db', borderRadius: 9, padding: 20,
              textAlign: 'center', cursor: 'pointer', marginBottom: 14,
            }}
          >
            <i className="ti ti-cloud-upload" style={{ fontSize: 24, color: '#94a3b8', display: 'block', marginBottom: 6 }} />
            <div style={{ fontSize: 13, color: '#64748b' }}>Drag and drop files or click to upload</div>
            <div style={{ fontSize: 11, color: '#94a3b8', marginTop: 4 }}>PDF, DOCX, Images, Audio · AI will extract case details automatically</div>
          </div>

          {/* Recommended docs for Family case */}
          <div style={{ fontSize: 11, color: '#64748b', marginBottom: 7, fontWeight: 500 }}>
            Recommended for Family case:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}>
            {FAMILY_DOCS.map(doc => (
              <label key={doc} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#374151', padding: '4px 7px', border: '1px solid #e2e8f0', borderRadius: 6, cursor: 'pointer' }}>
                <input type="checkbox" style={{ accentColor: '#1e3a8a' }} />
                {doc}
              </label>
            ))}
          </div>

          <div style={{ marginTop: 14, padding: '10px 12px', background: '#f5f3ff', borderRadius: 8, border: '1px solid #ddd6fe', fontSize: 11, color: '#7c3aed', display: 'flex', gap: 8 }}>
            <i className="ti ti-brain" style={{ fontSize: 13, flexShrink: 0 }} />
            Upload your documents and Clausio AI will automatically extract case facts, timeline, key dates, party names, and flag missing evidence.
          </div>
        </div>
      )}

      {/* ── STEP 6: Review ── */}
      {step === 6 && (
        <div>
          <div style={{ padding: '12px 14px', background: '#f0fdf4', border: '1px solid #86efac', borderRadius: 8, marginBottom: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#15803d', marginBottom: 4 }}>✓ Ready to create case</div>
            <div style={{ fontSize: 11, color: '#15803d' }}>All required fields are filled. Review the summary below before submitting.</div>
          </div>

          {[
            ['Case type',   caseType                    ],
            ['Priority',    priority                    ],
            ['Status',      'Draft'                     ],
            ['Filing date', 'Not specified'             ],
            ['Court',       'Family Court, Bandra'      ],
            ['AI auto-fill','Will run after submission' ],
          ].map(([label, value]) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid #f1f5f9', fontSize: 12 }}>
              <span style={{ color: '#64748b' }}>{label}</span>
              <span style={{ color: '#0f172a', fontWeight: 500 }}>{value}</span>
            </div>
          ))}
        </div>
      )}

      {/* ── FOOTER BUTTONS ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 20, paddingTop: 14, borderTop: '1px solid #e2e8f0' }}>
        <FooterBtn onClick={onClose}>Cancel</FooterBtn>
        <FooterBtn icon="ti-device-floppy">Save draft</FooterBtn>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6 }}>
          {step > 1 && <FooterBtn icon="ti-chevron-left" onClick={prev}>Previous</FooterBtn>}
          {step < 6
            ? <FooterBtn primary icon="ti-chevron-right" iconRight onClick={next}>Next</FooterBtn>
            : <FooterBtn primary icon="ti-check" onClick={onClose}>Create case</FooterBtn>
          }
        </div>
      </div>
    </Modal>
  )
}

// ── Small helper components ──────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 10, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', margin: '14px 0 8px', paddingTop: 14, borderTop: '1px solid #f1f5f9' }}>
      {children}
    </p>
  )
}

function Field({ label, required, placeholder, hint, type = 'text' }: {
  label: string; required?: boolean; placeholder?: string; hint?: string; type?: string
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginBottom: 9 }}>
      <label style={{ fontSize: 11, fontWeight: 500, color: '#374151' }}>
        {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        style={{ padding: '6px 9px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 12, fontFamily: 'inherit', outline: 'none', color: '#0f172a', background: '#fff' }}
      />
      {hint && <span style={{ fontSize: 10, color: '#94a3b8' }}>{hint}</span>}
    </div>
  )
}

function SelectField({ label, required, options }: {
  label: string; required?: boolean; options: string[]
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginBottom: 9 }}>
      <label style={{ fontSize: 11, fontWeight: 500, color: '#374151' }}>
        {label} {required && <span style={{ color: '#ef4444' }}>*</span>}
      </label>
      <select style={{ padding: '6px 9px', border: '1px solid #d1d5db', borderRadius: 6, fontSize: 12, fontFamily: 'inherit', outline: 'none', color: '#0f172a', background: '#fff' }}>
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  )
}

function FooterBtn({
  children, icon, iconRight, primary, onClick,
}: {
  children: React.ReactNode; icon?: string; iconRight?: boolean; primary?: boolean; onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        padding: '7px 14px', borderRadius: 7, fontSize: 12, fontWeight: 500,
        cursor: 'pointer', fontFamily: 'inherit',
        border: primary ? '1px solid #1e3a8a' : '1px solid #e2e8f0',
        background: primary ? '#1e3a8a' : '#f8fafc',
        color: primary ? '#fff' : '#374151',
      }}
    >
      {icon && !iconRight && <i className={`ti ${icon}`} style={{ fontSize: 12 }} />}
      {children}
      {icon && iconRight && <i className={`ti ${icon}`} style={{ fontSize: 12 }} />}
    </button>
  )
}

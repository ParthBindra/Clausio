'use client'
// ─────────────────────────────────────────────────
//  src/components/hearings/AddHearingModal.tsx
//
//  Modal for adding a new hearing entry.
//
//  More detailed than the inline form — includes:
//  • Judge name + court hall
//  • Opposing counsel admission field
//  • Next hearing date
//  • Full orders list with responsible party + deadline
//
//  USED IN: src/app/hearings/page.tsx
// ─────────────────────────────────────────────────

import { useState } from 'react'

interface Order {
  id:          number
  description: string
  responsible: 'Respondent' | 'Petitioner' | 'Lawyer' | 'Court'
  deadline:    string
}

interface Props { onClose: () => void }

export default function AddHearingModal({ onClose }: Props) {
  const [orders,    setOrders]    = useState<Order[]>([
    { id: 1, description: 'Respondent: File reply to interim application', responsible: 'Respondent', deadline: '2024-06-24' },
  ])
  const [newOrder,  setNewOrder]  = useState('')
  const [newResp,   setNewResp]   = useState<Order['responsible']>('Respondent')

  function addOrder() {
    if (!newOrder.trim()) return
    setOrders(prev => [...prev, { id: Date.now(), description: newOrder, responsible: newResp, deadline: '' }])
    setNewOrder('')
  }

  function removeOrder(id: number) {
    setOrders(prev => prev.filter(o => o.id !== id))
  }

  return (
    // Dark overlay — click outside closes
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        background: 'rgba(0,0,0,0.45)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%', maxWidth: 560, maxHeight: '90vh',
          background: '#fff', borderRadius: 12,
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '14px 18px', borderBottom: '1px solid #e2e8f0', flexShrink: 0 }}>
          <i className="ti ti-plus" style={{ fontSize: 15, color: '#1e3a8a' }} />
          <span style={{ fontSize: 14, fontWeight: 600, color: '#0f172a', flex: 1 }}>Add new hearing entry</span>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{ width: 26, height: 26, borderRadius: 6, background: '#f1f5f9', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: '#64748b' }}
          >✕</button>
        </div>

        {/* Body */}
        <div style={{ overflowY: 'auto', padding: '18px', flex: 1 }}>

          {/* Case info banner */}
          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 8, padding: '8px 11px', marginBottom: 14, fontSize: 11, color: '#1e40af', display: 'flex', gap: 8, alignItems: 'center' }}>
            <i className="ti ti-folder" style={{ fontSize: 13 }} />
            Priya v. Rohit Sharma · FC/2847/2023 · Family Court Bandra
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>
            <F label="Hearing date" required><input type="date" defaultValue="2024-06-13" /></F>
            <F label="Stage" required>
              <select>
                {['Filing','Admission','Service of Summons','Interim Application','Written Statement','Evidence','Arguments','Judgment'].map(s => (
                  <option key={s} selected={s === 'Interim Application'}>{s}</option>
                ))}
              </select>
            </F>
            <F label="Judge name"><input type="text" defaultValue="Hon. Justice R. Sharma" /></F>
            <F label="Court hall"><input type="text" defaultValue="Hall No. 7" /></F>
          </div>

          <F label="What happened" required>
            <textarea
              placeholder="Describe exactly what happened — judge's comments, what was argued, outcome..."
              style={{ height: 80 }}
            />
          </F>
          <F label="Judge's exact observation">
            <input type="text" placeholder="Any specific observation or warning from the judge..." />
          </F>
          <F label="Opposing counsel's admission">
            <input type="text" placeholder="Any admission made by opposite side's advocate (important for record)..." />
          </F>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 9 }}>
            <F label="Next hearing objective"><input type="text" placeholder="What to achieve next time?" /></F>
            <F label="Next hearing date"><input type="date" /></F>
          </div>

          {/* Orders */}
          <div style={{ marginTop: 4 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: '#374151', marginBottom: 6 }}>
              Orders / tasks set at this hearing
            </p>

            {orders.map(o => (
              <div
                key={o.id}
                style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  padding: '6px 8px', background: '#f8fafc',
                  border: '1px solid #e2e8f0', borderRadius: 6, marginBottom: 4, fontSize: 11,
                }}
              >
                <i className="ti ti-circle" style={{ fontSize: 11, color: '#64748b', flexShrink: 0 }} />
                <span style={{ flex: 1, color: '#374151' }}>{o.description}</span>
                <span style={{ fontSize: 10, color: '#64748b', whiteSpace: 'nowrap' }}>{o.responsible}</span>
                <button
                  onClick={() => removeOrder(o.id)}
                  aria-label="Remove order"
                  style={{ width: 18, height: 18, borderRadius: 4, background: '#fef2f2', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#dc2626', flexShrink: 0 }}
                >
                  ×
                </button>
              </div>
            ))}

            {/* Add new order */}
            <div style={{ display: 'flex', gap: 5, marginTop: 5 }}>
              <input
                type="text"
                value={newOrder}
                onChange={e => setNewOrder(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') addOrder() }}
                placeholder="Add order / task from this hearing..."
                style={{ flex: 1, padding: '5px 8px', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 11, fontFamily: 'inherit', outline: 'none' }}
              />
              <select
                value={newResp}
                onChange={e => setNewResp(e.target.value as Order['responsible'])}
                style={{ padding: '5px 7px', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 11, fontFamily: 'inherit', outline: 'none' }}
              >
                <option>Respondent</option>
                <option>Petitioner</option>
                <option>Lawyer</option>
                <option>Court</option>
              </select>
              <button
                onClick={addOrder}
                style={{ padding: '5px 10px', borderRadius: 6, background: '#eff6ff', border: '1px solid #bfdbfe', color: '#1e40af', fontSize: 11, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}
              >
                + Add
              </button>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div style={{ padding: '12px 18px', borderTop: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0 }}>
          <Btn onClick={onClose}>Cancel</Btn>
          <Btn icon="ti-device-floppy">Save draft</Btn>
          <Btn icon="ti-circle-check" primary onClick={onClose}>Save hearing record</Btn>
        </div>
      </div>
    </div>
  )
}

// ── Helpers ───────────────────────────────────────

function F({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginBottom: 9 }}>
      <label style={{ fontSize: 11, fontWeight: 500, color: '#374151' }}>
        {label}{required && <span style={{ color: '#ef4444', marginLeft: 2 }}>*</span>}
      </label>
      {children}
    </div>
  )
}

function Btn({ icon, primary, onClick, children }: { icon?: string; primary?: boolean; onClick?: () => void; children: React.ReactNode }) {
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
        marginLeft: primary ? 'auto' : undefined,
      }}
    >
      {icon && <i className={`ti ${icon}`} style={{ fontSize: 12 }} />}
      {children}
    </button>
  )
}

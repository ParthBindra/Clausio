'use client'
// ─────────────────────────────────────────────────
//  src/components/hearings/HearingForm.tsx
//
//  LEFT PANEL — Record today's hearing.
//
//  Fields:
//  • Date + Stage (side by side)
//  • What happened (textarea)
//  • Judge's observation
//  • Opposing counsel admission
//  • Next hearing objective
//  • Orders made today (add/remove items)
//  • Save button
//
//  USED IN: src/app/hearings/page.tsx
// ─────────────────────────────────────────────────

import { useState } from 'react'

interface Order {
  id:          number
  description: string
  responsible: string
  deadline:    string
  status:      'Pending' | 'Done'
}

export default function HearingForm() {
  const [orders, setOrders] = useState<Order[]>([
    {
      id:          1,
      description: 'Respondent: File reply to interim application',
      responsible: 'Respondent',
      deadline:    '2024-06-24',
      status:      'Pending',
    },
  ])
  const [newOrder, setNewOrder] = useState('')

  function addOrder() {
    if (!newOrder.trim()) return
    setOrders(prev => [
      ...prev,
      { id: Date.now(), description: newOrder, responsible: 'Respondent', deadline: '', status: 'Pending' },
    ])
    setNewOrder('')
  }

  function removeOrder(id: number) {
    setOrders(prev => prev.filter(o => o.id !== id))
  }

  return (
    <div
      style={{
        background: '#fff', border: '1px solid #e2e8f0',
        borderRadius: 10, padding: '11px 13px',
      }}
    >
      {/* Card header */}
      <div style={{ fontSize: 12, fontWeight: 600, color: '#0f172a', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 5 }}>
        <i className="ti ti-pencil" style={{ fontSize: 13, color: '#94a3b8' }} />
        Record today's hearing
      </div>

      {/* Date + Stage side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        <Field label="Date" required>
          <input type="date" defaultValue="2024-06-13" />
        </Field>
        <Field label="Stage" required>
          <select>
            <option>Filing</option>
            <option>Admission</option>
            <option selected>Interim Application</option>
            <option>Written Statement</option>
            <option>Evidence</option>
            <option>Arguments</option>
            <option>Judgment</option>
          </select>
        </Field>
      </div>

      {/* What happened */}
      <Field label="What happened" required>
        <textarea
          defaultValue="Judge expressed displeasure at respondent's non-compliance. Respondent counsel sought one more week for reply to interim maintenance application. Granted but with final warning."
        />
      </Field>

      {/* Judge's observation */}
      <Field label="Judge's exact observation">
        <input type="text" defaultValue="This is the last opportunity. File by 24 June or I proceed ex-parte." />
      </Field>

      {/* Opposing counsel admission */}
      <Field label="Opposing counsel admission">
        <input type="text" placeholder="Any admission made by opposite side's advocate..." />
      </Field>

      {/* Next objective */}
      <Field label="Next hearing objective">
        <input type="text" defaultValue="Push for ex-parte maintenance order if respondent fails to file by 24 Jun" />
      </Field>

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
              padding: '5px 8px', background: '#f8fafc',
              border: '1px solid #e2e8f0', borderRadius: 6, marginBottom: 4,
              fontSize: 11,
            }}
          >
            <i className="ti ti-circle-check" style={{ fontSize: 11, color: '#f59e0b', flexShrink: 0 }} />
            <span style={{ flex: 1, color: '#374151' }}>{o.description}</span>
            {/* Deadline badge */}
            {o.deadline && (
              <span
                style={{
                  fontSize: 9, padding: '1px 5px', borderRadius: 5,
                  background: '#fef3c7', color: '#92400e', fontWeight: 600, whiteSpace: 'nowrap',
                }}
              >
                Due {o.deadline}
              </span>
            )}
            {/* Remove */}
            <button
              onClick={() => removeOrder(o.id)}
              aria-label="Remove order"
              style={{
                width: 18, height: 18, borderRadius: 4,
                background: '#fef2f2', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, color: '#dc2626', flexShrink: 0,
              }}
            >
              ×
            </button>
          </div>
        ))}

        {/* Add order input */}
        <div style={{ display: 'flex', gap: 5, marginTop: 4 }}>
          <input
            type="text"
            value={newOrder}
            onChange={e => setNewOrder(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') addOrder() }}
            placeholder="Add an order from this hearing..."
            style={{
              flex: 1, padding: '5px 8px', border: '1px solid #e2e8f0',
              borderRadius: 6, fontSize: 11, fontFamily: 'inherit', outline: 'none',
            }}
          />
          <button
            onClick={addOrder}
            style={{
              padding: '5px 10px', borderRadius: 6,
              background: '#eff6ff', border: '1px solid #bfdbfe',
              color: '#1e40af', fontSize: 11, cursor: 'pointer',
              fontFamily: 'inherit', whiteSpace: 'nowrap',
            }}
          >
            + Add
          </button>
        </div>
      </div>

      {/* Save button */}
      <button
        style={{
          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 5, padding: '8px', marginTop: 10,
          background: '#1e3a8a', color: '#fff', border: 'none',
          borderRadius: 7, fontSize: 12, fontWeight: 500,
          cursor: 'pointer', fontFamily: 'inherit',
        }}
        onClick={() => alert('Hearing saved! (connect to API later)')}
      >
        <i className="ti ti-device-floppy" />
        Save hearing record
      </button>
    </div>
  )
}

// ── Field wrapper ─────────────────────────────────
function Field({
  label, required, children,
}: {
  label: string; required?: boolean; children: React.ReactNode
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginBottom: 8 }}>
      <label style={{ fontSize: 11, fontWeight: 500, color: '#374151' }}>
        {label}
        {required && <span style={{ color: '#ef4444', marginLeft: 2 }}>*</span>}
      </label>
      {/* Apply input styles via inline style on child — relies on CSS reset */}
      <div
        style={{
          // Styles will be applied to the child input/select/textarea
        }}
        className="hearing-field-wrap"
      >
        {children}
      </div>
    </div>
  )
}

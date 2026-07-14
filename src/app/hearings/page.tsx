'use client'
// ─────────────────────────────────────────────────
//  src/app/hearings/page.tsx
//
//  SCREEN 3 — Hearing Diary
//  URL: /hearings
//
//  What this page has:
//  • Header toolbar with case badge + 4 action buttons
//  • Red overdue alert bar (when deadlines are missed)
//  • Two-column layout:
//    LEFT  → HearingForm   (record today's hearing)
//    RIGHT → HearingHistory (vertical timeline of past hearings)
//  • Add Hearing modal (detailed form with orders)
//
//  Components used:
//  • HearingForm    → src/components/hearings/HearingForm.tsx
//  • HearingHistory → src/components/hearings/HearingHistory.tsx
//  • AddHearingModal → src/components/hearings/AddHearingModal.tsx
// ─────────────────────────────────────────────────

import { useState }       from 'react'
import HearingForm        from '@/components/hearings/HearingForm'
import HearingHistory     from '@/components/hearings/HearingHistory'
import AddHearingModal    from '@/components/hearings/AddHearingModal'

export default function HearingsPage() {
  const [showAddModal, setShowAddModal] = useState(false)

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* ── BREADCRUMB ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 14px', background: '#fff', borderBottom: '1px solid #e2e8f0', fontSize: 10, color: '#94a3b8', flexShrink: 0 }}>
        <span style={{ cursor: 'pointer' }}>Cases</span>
        <span style={{ color: '#cbd5e1' }}>›</span>
        <span style={{ cursor: 'pointer' }}>Priya v. Rohit Sharma</span>
        <span style={{ color: '#cbd5e1' }}>›</span>
        <span style={{ color: '#0f172a', fontWeight: 500 }}>Hearing diary</span>
      </div>

      {/* ── TOOLBAR ── */}
      <div
        style={{
          display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap',
          padding: '9px 14px', background: '#fff',
          borderBottom: '1px solid #e2e8f0', flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>Hearing diary</span>

        {/* Case badge */}
        <span style={{ fontSize: 10, color: '#1e40af', background: '#eff6ff', padding: '3px 8px', borderRadius: 20 }}>
          Priya v. Rohit Sharma · FC/2847/2023
        </span>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 5 }}>
          <ToolBtn icon="ti-alert-triangle" label="2 overdue" danger />
          <ToolBtn icon="ti-download"       label="Download diary" />
          <ToolBtn icon="ti-message"        label="Client update" />
          <ToolBtn icon="ti-plus"           label="Add hearing" primary onClick={() => setShowAddModal(true)} />
        </div>
      </div>

      {/* ── OVERDUE ALERT BAR ── */}
      {/* Shows when there are overdue deadlines — catches lawyer's attention immediately */}
      <OverdueAlert />

      {/* ── TWO COLUMN CONTENT ── */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <div style={{ height: '100%', overflowY: 'auto', padding: '12px 14px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, minHeight: '100%' }}>

            {/* LEFT — Record today's hearing */}
            <HearingForm />

            {/* RIGHT — Past hearing timeline */}
            <HearingHistory />

          </div>
        </div>
      </div>

      {/* ── ADD HEARING MODAL ── */}
      {showAddModal && (
        <AddHearingModal onClose={() => setShowAddModal(false)} />
      )}

    </div>
  )
}

// ── HELPER COMPONENTS ─────────────────────────────

function ToolBtn({
  icon, label, primary, danger, onClick,
}: {
  icon: string; label: string; primary?: boolean; danger?: boolean; onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        padding: '5px 10px', borderRadius: 7, fontSize: 11,
        fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
        border:  primary ? '1px solid #1e3a8a' : danger ? '1px solid #fca5a5' : '1px solid #e2e8f0',
        background: primary ? '#1e3a8a' : danger ? '#fef2f2' : '#f8fafc',
        color:   primary ? '#fff' : danger ? '#dc2626' : '#64748b',
        whiteSpace: 'nowrap',
      }}
    >
      <i className={`ti ${icon}`} style={{ fontSize: 12 }} />
      {label}
    </button>
  )
}

function OverdueAlert() {
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        background: '#fef2f2', borderBottom: '1px solid #fca5a5',
        borderLeft: '3px solid #dc2626',
        padding: '7px 14px', fontSize: 11, color: '#7f1d1d', flexShrink: 0,
      }}
    >
      <i className="ti ti-alert-triangle" style={{ color: '#dc2626', fontSize: 14, flexShrink: 0 }} />
      <span style={{ fontWeight: 500 }}>2 overdue deadlines —</span>
      <span style={{ color: '#475569' }}>
        respondent reply (due 27 May) and petitioner affidavit (due 1 Jun) are both past due. Judge warned of ex-parte proceedings.
      </span>
      <button
        style={{
          marginLeft: 'auto', padding: '3px 8px', borderRadius: 5,
          border: '1px solid #fca5a5', background: '#fff',
          color: '#dc2626', fontSize: 10, cursor: 'pointer',
          fontWeight: 600, fontFamily: 'inherit', whiteSpace: 'nowrap',
        }}
      >
        Resolve →
      </button>
    </div>
  )
}

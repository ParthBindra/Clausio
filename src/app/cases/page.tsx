'use client'
// ─────────────────────────────────────────────────
//  src/app/cases/page.tsx
//
//  SCREEN 2 — Case Management (CRUD)
//  URL: /cases
//
//  What this page has:
//  • Case list table with 10 columns
//  • Filter tabs: All / Active / Today / High risk / Closed
//  • Search bar
//  • Export + Archive + New Case buttons
//  • Hover-reveal Edit and Delete buttons on each row
//  • AI Suggestions sidebar on the right
//  • Add Case Modal (6-step wizard)
//  • Edit Case Modal (pre-filled form)
//  • Delete Case Modal (with type-to-confirm)
//
//  This page uses these components:
//  • AddCaseModal   → src/components/cases/AddCaseModal.tsx
//  • EditCaseModal  → src/components/cases/EditCaseModal.tsx
//  • DeleteModal    → src/components/cases/DeleteModal.tsx
//  • CaseTable      → src/components/cases/CaseTable.tsx
//  • AISuggestions  → src/components/cases/AISuggestions.tsx
// ─────────────────────────────────────────────────

import { useState }     from 'react'
import AddCaseModal     from '@/components/cases/AddCaseModal'
import EditCaseModal    from '@/components/cases/EditCaseModal'
import DeleteModal      from '@/components/cases/DeleteCaseModal'
import CaseTable        from '@/components/cases/CaseTable'
import AISuggestions    from '@/components/cases/CaseAISidebar'

// Filter tab labels
const FILTERS = ['All (154)', 'Active (98)', 'Today (8)', 'High risk (12)', 'Closed (44)']

export default function CasesPage() {
  // Which modal is open?
  const [modal, setModal] = useState<'add' | 'edit' | 'delete' | null>(null)

  // Which case is selected for edit or delete?
  const [selectedCase, setSelectedCase] = useState<string | null>(null)

  // Which filter tab is active?
  const [activeFilter, setActiveFilter] = useState('All (154)')

  function openEdit(caseId: string) {
    setSelectedCase(caseId)
    setModal('edit')
  }

  function openDelete(caseId: string) {
    setSelectedCase(caseId)
    setModal('delete')
  }

  function closeModal() {
    setModal(null)
    setSelectedCase(null)
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* ── BREADCRUMB ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 14px', background: '#fff', borderBottom: '1px solid #e2e8f0', fontSize: 10, color: '#94a3b8', flexShrink: 0 }}>
        <span style={{ cursor: 'pointer' }}>Dashboard</span>
        <span style={{ color: '#cbd5e1' }}>›</span>
        <span style={{ color: '#0f172a', fontWeight: 500 }}>Cases</span>
      </div>

      {/* ── TOOLBAR ── */}
      <div
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '10px 14px', background: '#fff',
          borderBottom: '1px solid #e2e8f0', flexShrink: 0, flexWrap: 'wrap',
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>Cases</span>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by case name, client, court..."
          style={{
            flex: 1, maxWidth: 260, padding: '6px 10px',
            border: '1px solid #e2e8f0', borderRadius: 7,
            fontSize: 12, background: '#f8fafc', fontFamily: 'inherit', outline: 'none',
          }}
        />

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                fontSize: 10, padding: '3px 8px', borderRadius: 20, cursor: 'pointer',
                border: `1px solid ${activeFilter === f ? '#bfdbfe' : '#e2e8f0'}`,
                background: activeFilter === f ? '#eff6ff' : '#f8fafc',
                color: activeFilter === f ? '#1e40af' : '#64748b',
                fontFamily: 'inherit', whiteSpace: 'nowrap',
              }}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Action buttons */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 5 }}>
          <ActionBtn icon="ti-archive" label="Archive" />
          <ActionBtn icon="ti-download" label="Export" />
          <ActionBtn
            icon="ti-plus" label="New case"
            primary
            onClick={() => setModal('add')}
          />
        </div>
      </div>

      {/* ── TABLE + AI PANEL ── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* Case table */}
        <CaseTable
          onEdit={openEdit}
          onDelete={openDelete}
        />

        {/* AI suggestions sidebar */}
        <AISuggestions />
      </div>

      {/* ── MODALS ── */}
      {modal === 'add'    && <AddCaseModal  onClose={closeModal} />}
      {modal === 'edit'   && <EditCaseModal onClose={closeModal} caseId={selectedCase} />}
      {modal === 'delete' && <DeleteModal   onClose={closeModal} caseId={selectedCase} />}

    </div>
  )
}

// Small reusable button for toolbar
function ActionBtn({
  icon, label, primary, onClick,
}: {
  icon: string; label: string; primary?: boolean; onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 5,
        padding: '5px 10px', borderRadius: 7, fontSize: 12,
        fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
        border: primary ? '1px solid #1e3a8a' : '1px solid #e2e8f0',
        background: primary ? '#1e3a8a' : '#f8fafc',
        color: primary ? '#fff' : '#64748b',
        whiteSpace: 'nowrap',
      }}
    >
      <i className={`ti ${icon}`} style={{ fontSize: 12 }} />
      {label}
    </button>
  )
}

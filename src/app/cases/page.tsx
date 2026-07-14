'use client'
// ─────────────────────────────────────────────
//  src/app/cases/page.tsx
//  URL: /cases
//  Screen 2 — Case Management (Add / Edit / Delete)
// ─────────────────────────────────────────────

import { useState }       from 'react'
import CaseTable          from '@/components/cases/CaseTable'
import AddCaseModal       from '@/components/cases/AddCaseModal'
import EditCaseModal      from '@/components/cases/EditCaseModal'
import DeleteCaseModal    from '@/components/cases/DeleteCaseModal'
import CaseAISidebar      from '@/components/cases/CaseAISidebar'

export type ModalType = 'add' | 'edit' | 'delete' | null

// Sample case data — replace with API call later
export const SAMPLE_CASES = [
  { id: '1', name: 'Priya v. Rohit Sharma',  num: 'FC/2847/2023',  client: 'Priya Sharma',  court: 'Family Court',     location: 'Bandra, Mumbai', type: 'Family',    stage: 'Evidence',         status: 'Hearing today',  statusBg: '#fef2f2', statusClr: '#dc2626', priority: 'High',   prioBg: '#fef2f2', prioClr: '#dc2626', typeBg: '#eff6ff', typeClr: '#1e40af', nextHearing: '17 Jun 2024', hearingClr: '#dc2626' },
  { id: '2', name: 'Mehta v. Mehta',         num: 'FC/1203/2024',  client: 'Ravi Mehta',    court: 'Family Court',     location: 'Vadodara',       type: 'Family',    stage: 'Written Statement',status: 'Active',         statusBg: '#f0fdf4', statusClr: '#15803d', priority: 'Medium', prioBg: '#fef3c7', prioClr: '#d97706', typeBg: '#eff6ff', typeClr: '#1e40af', nextHearing: '3 Jul 2024',  hearingClr: '#374151' },
  { id: '3', name: 'State v. Ramesh Patel',  num: 'CR/445/2024',   client: 'Ramesh Patel',  court: 'Sessions Court',   location: 'Ahmedabad',      type: 'Criminal',  stage: 'Bail hearing',     status: 'Pending filing', statusBg: '#fef3c7', statusClr: '#d97706', priority: 'Urgent', prioBg: '#fef2f2', prioClr: '#dc2626', typeBg: '#fef2f2', typeClr: '#dc2626', nextHearing: '22 Jun 2024', hearingClr: '#dc2626' },
  { id: '4', name: 'Gupta Property Dispute', num: 'CIV/2090/2023', client: 'Vijay Gupta',   court: 'Civil Court',      location: 'Nagpur',         type: 'Civil',     stage: 'Evidence stage',   status: 'Awaiting client',statusBg: '#eff6ff', statusClr: '#1e40af', priority: 'Medium', prioBg: '#fef3c7', prioClr: '#d97706', typeBg: '#fff7ed', typeClr: '#c2410c', nextHearing: '25 Jul 2024', hearingClr: '#374151' },
  { id: '5', name: 'Khan Cheque Bounce',     num: 'NI/338/2024',   client: 'Arif Khan',     court: 'Magistrate Court', location: 'Mumbai',         type: 'NI Act',    stage: 'Filing',           status: 'Active',         statusBg: '#f0fdf4', statusClr: '#15803d', priority: 'Low',    prioBg: '#f0fdf4', prioClr: '#15803d', typeBg: '#f0fdf4', typeClr: '#15803d', nextHearing: '10 Jul 2024', hearingClr: '#374151' },
  { id: '6', name: 'Sharma GST Appeal',      num: 'GST/112/2024',  client: 'Dinesh Sharma', court: 'GST Tribunal',     location: 'Delhi',          type: 'GST',       stage: 'Arguments',        status: 'Active',         statusBg: '#f0fdf4', statusClr: '#15803d', priority: 'Medium', prioBg: '#fef3c7', prioClr: '#d97706', typeBg: '#f5f3ff', typeClr: '#7c3aed', nextHearing: '18 Jul 2024', hearingClr: '#374151' },
]

export default function CasesPage() {
  const [modal,       setModal]       = useState<ModalType>(null)
  const [selectedId,  setSelectedId]  = useState<string | null>(null)
  const [activeFilter, setActiveFilter] = useState('All (154)')

  const selectedCase = SAMPLE_CASES.find(c => c.id === selectedId) ?? null

  function openEdit(id: string) {
    setSelectedId(id)
    setModal('edit')
  }

  function openDelete(id: string) {
    setSelectedId(id)
    setModal('delete')
  }

  return (
    // Full height, no scroll on outer container
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 12px', background: '#fff', borderBottom: '1px solid #e2e8f0', fontSize: 10, color: '#94a3b8', flexShrink: 0 }}>
        <span style={{ cursor: 'pointer' }}>Dashboard</span>
        <span style={{ color: '#cbd5e1' }}>›</span>
        <span style={{ color: '#0f172a', fontWeight: 500 }}>Case Management</span>
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', background: '#fff', borderBottom: '1px solid #e2e8f0', flexShrink: 0, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#0f172a' }}>Cases</span>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by case name, client, court..."
          style={{ flex: 1, maxWidth: 240, padding: '5px 9px', border: '1px solid #e2e8f0', borderRadius: 6, fontSize: 11, background: '#f8fafc', fontFamily: 'inherit', outline: 'none' }}
        />

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: 4 }}>
          {['All (154)', 'Active (98)', 'Today (8)', 'High risk (12)', 'Closed (44)'].map(f => (
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

        {/* Actions */}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 5 }}>
          <button
            style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '5px 10px', borderRadius: 6, fontSize: 11, fontWeight: 500, cursor: 'pointer', background: '#fff', color: '#374151', border: '1px solid #e2e8f0', fontFamily: 'inherit' }}
          >
            <i className="ti ti-download" /> Export
          </button>
          <button
            onClick={() => setModal('add')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '5px 10px', borderRadius: 6, fontSize: 11, fontWeight: 500, cursor: 'pointer', background: '#1e3a8a', color: '#fff', border: 'none', fontFamily: 'inherit' }}
          >
            <i className="ti ti-plus" /> New case
          </button>
        </div>
      </div>

      {/* Content area */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* Case table */}
        <CaseTable
          cases={SAMPLE_CASES}
          onEdit={openEdit}
          onDelete={openDelete}
        />

        {/* AI sidebar */}
        <CaseAISidebar />
      </div>

      {/* Modals */}
      {modal === 'add'    && <AddCaseModal    onClose={() => setModal(null)} />}
      {modal === 'edit'   && <EditCaseModal   onClose={() => setModal(null)} caseData={selectedCase} />}
      {modal === 'delete' && <DeleteCaseModal onClose={() => setModal(null)} caseData={selectedCase} />}

    </div>
  )
}
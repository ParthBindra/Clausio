// ─────────────────────────────────────────────
//  src/components/cases/CaseTable.tsx
//  Case list table with hover Edit/Delete buttons
// ─────────────────────────────────────────────

interface CaseRow {
  id: string; name: string; num: string; client: string
  court: string; location: string; type: string; stage: string
  status: string; statusBg: string; statusClr: string
  priority: string; prioBg: string; prioClr: string
  typeBg: string; typeClr: string
  nextHearing: string; hearingClr: string
}

interface Props {
  cases:    CaseRow[]
  onEdit:   (id: string) => void
  onDelete: (id: string) => void
}

export default function CaseTable({ cases, onEdit, onDelete }: Props) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
        <thead>
          <tr>
            {['', 'Case', 'Client', 'Court', 'Type', 'Stage', 'Status', 'Next hearing', 'Priority', 'Actions'].map(h => (
              <th key={h} style={{ padding: '7px 12px', textAlign: 'left', fontSize: 10, fontWeight: 600, color: '#64748b', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', whiteSpace: 'nowrap', position: 'sticky', top: 0, zIndex: 1 }}>
                {h === '' ? <input type="checkbox" style={{ accentColor: '#1e3a8a' }} /> : h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cases.map(c => (
            <tr
              key={c.id}
              onClick={() => onEdit(c.id)}
              style={{ cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget.style.background = '#f8fafc')}
              onMouseLeave={e => (e.currentTarget.style.background = '')}
            >
              <td style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9' }}>
                <input type="checkbox" style={{ accentColor: '#1e3a8a' }} onClick={e => e.stopPropagation()} />
              </td>
              <td style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#0f172a' }}>{c.name}</div>
                <div style={{ fontSize: 9, color: '#94a3b8', marginTop: 1 }}>{c.num}</div>
              </td>
              <td style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9', fontSize: 11, color: '#374151' }}>{c.client}</td>
              <td style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: 11, color: '#374151' }}>{c.court}</div>
                <div style={{ fontSize: 9, color: '#94a3b8', marginTop: 1 }}>{c.location}</div>
              </td>
              <td style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 20, fontWeight: 600, background: c.typeBg, color: c.typeClr }}>{c.type}</span>
              </td>
              <td style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9', fontSize: 11, color: '#374151' }}>{c.stage}</td>
              <td style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 20, fontWeight: 600, background: c.statusBg, color: c.statusClr }}>● {c.status}</span>
              </td>
              <td style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9', fontSize: 11, fontWeight: 600, color: c.hearingClr }}>{c.nextHearing}</td>
              <td style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 20, fontWeight: 600, background: c.prioBg, color: c.prioClr }}>{c.priority}</span>
              </td>

              {/* Action buttons — appear on hover via CSS in globals */}
              <td style={{ padding: '8px 12px', borderBottom: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', gap: 3 }}>
                  <button
                    onClick={e => { e.stopPropagation(); onEdit(c.id) }}
                    style={{ padding: '3px 7px', borderRadius: 4, fontSize: 10, cursor: 'pointer', border: 'none', background: '#eff6ff', color: '#1e40af', fontFamily: 'inherit', fontWeight: 500 }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={e => { e.stopPropagation(); onDelete(c.id) }}
                    style={{ padding: '3px 7px', borderRadius: 4, fontSize: 10, cursor: 'pointer', border: 'none', background: '#fef2f2', color: '#dc2626', fontFamily: 'inherit', fontWeight: 500 }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
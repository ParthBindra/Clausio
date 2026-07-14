// Hearing diary card — shows judge orders with OVERDUE badges
const ITEMS = [
  { text: 'Respondent reply to interim application', sub: 'Due 27 May · Respondent', dot: '#dc2626', overdue: true  },
  { text: 'File affidavit of assets',               sub: 'Due 1 Jun · Petitioner',  dot: '#dc2626', overdue: true  },
  { text: 'Cross-exam prep — Savitribai',           sub: 'Due 14 Jun · Lawyer',     dot: '#3b82f6', overdue: false },
  { text: 'Collect ITR copies from client',         sub: 'Due 15 Jun · Client',     dot: '#3b82f6', overdue: false },
]

export default function HearingDiary() {
  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 9, padding: '9px 11px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 600, color: '#0f172a', marginBottom: 6 }}>
        <i className="ti ti-notebook" style={{ fontSize: 12, color: '#94a3b8' }} />
        Hearing diary
        <span style={{ marginLeft: 'auto', fontSize: 9, color: '#3b82f6', cursor: 'pointer', fontWeight: 500 }}>+ Add order</span>
      </div>
      {ITEMS.map((item, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, padding: '4px 0', borderBottom: i < ITEMS.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: item.dot, flexShrink: 0, marginTop: 3 }} />
          <div>
            <div style={{ fontSize: 10, color: '#0f172a', lineHeight: 1.4 }}>
              {item.text}
              {item.overdue && <span style={{ fontSize: 8, padding: '1px 4px', borderRadius: 4, marginLeft: 3, fontWeight: 600, background: '#fef2f2', color: '#991b1b' }}>OVERDUE</span>}
            </div>
            <div style={{ fontSize: 9, color: '#94a3b8', marginTop: 1 }}>{item.sub}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

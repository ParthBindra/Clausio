'use client'
// 6 quick action buttons — Emergency is visually distinct
const ACTIONS = [
  { icon: 'ti-alert-triangle', label: 'Emergency response', danger: true  },
  { icon: 'ti-clipboard-list', label: 'Hearing brief',      danger: false },
  { icon: 'ti-message',        label: 'Client update',      danger: false },
  { icon: 'ti-brain',          label: 'AI summary',         danger: false },
  { icon: 'ti-pencil',         label: 'Draft petition',     danger: false },
  { icon: 'ti-chart-bar',      label: 'Risk assessment',    danger: false },
]

export default function QuickActions() {
  return (
    <div style={{ marginBottom: 8 }}>
      <p style={{ fontSize: 9, fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 5 }}>Quick actions</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4 }}>
        {ACTIONS.map((a, i) => (
          <button key={i} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 8px', background: a.danger ? '#fff5f5' : '#f8fafc', border: a.danger ? '1.5px solid #fca5a5' : '1px solid #e2e8f0', borderRadius: 7, fontSize: 10, color: a.danger ? '#991b1b' : '#64748b', cursor: 'pointer', fontFamily: 'inherit', fontWeight: a.danger ? 500 : 400, textAlign: 'left' }}>
            <i className={`ti ${a.icon}`} style={{ fontSize: a.danger ? 14 : 12, flexShrink: 0, color: a.danger ? '#dc2626' : 'inherit' }} />
            {a.label}
          </button>
        ))}
      </div>
    </div>
  )
}

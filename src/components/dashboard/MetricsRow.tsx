// 4 metric cards at the top of the dashboard
const METRICS = [
  { value: '14',  label: 'Hearing entries', trend: 'Next in 6 days', tClr: '#10b981', top: '#10b981' },
  { value: '8',   label: 'Evidence items',  trend: '3 docs missing',  tClr: '#f59e0b', top: '#3b82f6' },
  { value: '72%', label: 'Case readiness',  trend: '+8% this week',   tClr: '#10b981', top: '#f59e0b' },
  { value: '2',   label: 'Overdue items',   trend: 'Act now',         tClr: '#ef4444', top: '#ef4444' },
]

export default function MetricsRow() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginBottom: 8 }}>
      {METRICS.map((m, i) => (
        <div key={i} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 8, padding: '8px 10px', borderTop: `3px solid ${m.top}` }}>
          <div style={{ fontSize: 22, fontWeight: 600, color: '#0f172a', lineHeight: 1 }}>{m.value}</div>
          <div style={{ fontSize: 9, color: '#64748b', marginTop: 2 }}>{m.label}</div>
          <div style={{ fontSize: 9, fontWeight: 600, color: m.tClr, marginTop: 5 }}>{m.trend}</div>
        </div>
      ))}
    </div>
  )
}

// AI Insights — right panel with recommendations and ask AI
const URGENT = [
  { dot: '#ef4444', text: 'Income proof missing — weakens maintenance claim', btn: 'Fix now',  bBg: '#fef2f2', bClr: '#991b1b' },
  { dot: '#f59e0b', text: 'Limitation expires in 14 days',                   btn: 'Draft',    bBg: '#fef3c7', bClr: '#92400e' },
]
const RECS = [
  { dot: '#10b981', text: 'Similar SC judgment supports cruelty ground',    btn: 'View',     bBg: '#f0fdf4', bClr: '#15803d' },
  { dot: '#3b82f6', text: 'Generate written statement — respondent overdue', btn: 'Generate', bBg: '#eff6ff', bClr: '#1e40af' },
]
const STRATEGY = ['Push for ex-parte maintenance at next hearing', 'Secure Dr. Mehta witness before 20 Jun']

export default function AIInsights() {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
      {/* Header */}
      <div style={{ padding: '8px 10px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: 5, flexShrink: 0 }}>
        <i className="ti ti-brain" style={{ fontSize: 13, color: '#7c3aed' }} />
        <span style={{ fontSize: 11, fontWeight: 600, color: '#0f172a', flex: 1 }}>AI insights</span>
        <span style={{ fontSize: 8, background: '#eff6ff', color: '#1e40af', padding: '1px 5px', borderRadius: 8, fontWeight: 600 }}>5 new</span>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 10px' }}>
        {/* Success probability */}
        <div style={{ background: '#f5f3ff', borderRadius: 7, padding: '7px 9px', marginBottom: 8 }}>
          <div style={{ fontSize: 9, color: '#7c3aed', fontWeight: 600, marginBottom: 2 }}>Case success probability</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#0f172a' }}>78%</div>
          <div style={{ height: 4, background: '#e2e8f0', borderRadius: 2, marginTop: 5, overflow: 'hidden' }}>
            <div style={{ width: '78%', height: 4, background: '#10b981', borderRadius: 2 }} />
          </div>
          <div style={{ fontSize: 9, color: '#64748b', marginTop: 4 }}>Strong evidence · 3 SC precedents found</div>
        </div>

        <p style={{ fontSize: 8, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 4, fontWeight: 600 }}>Urgent</p>
        {URGENT.map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 5, padding: '5px 0', borderBottom: i < URGENT.length - 1 ? '1px solid #f8fafc' : 'none' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: r.dot, flexShrink: 0, marginTop: 3 }} />
            <div>
              <p style={{ fontSize: 10, color: '#374151', lineHeight: 1.5 }}>{r.text}</p>
              <button style={{ marginTop: 3, fontSize: 9, padding: '2px 5px', borderRadius: 4, border: 'none', background: r.bBg, color: r.bClr, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500 }}>{r.btn}</button>
            </div>
          </div>
        ))}

        <p style={{ fontSize: 8, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 4, fontWeight: 600, marginTop: 8 }}>Recommended</p>
        {RECS.map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 5, padding: '5px 0', borderBottom: i < RECS.length - 1 ? '1px solid #f8fafc' : 'none' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: r.dot, flexShrink: 0, marginTop: 3 }} />
            <div>
              <p style={{ fontSize: 10, color: '#374151', lineHeight: 1.5 }}>{r.text}</p>
              <button style={{ marginTop: 3, fontSize: 9, padding: '2px 5px', borderRadius: 4, border: 'none', background: r.bBg, color: r.bClr, cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500 }}>{r.btn}</button>
            </div>
          </div>
        ))}

        <p style={{ fontSize: 8, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 4, fontWeight: 600, marginTop: 8 }}>Strategy</p>
        {STRATEGY.map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 5, padding: '5px 0', borderBottom: i < STRATEGY.length - 1 ? '1px solid #f8fafc' : 'none' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#7c3aed', flexShrink: 0, marginTop: 3 }} />
            <p style={{ fontSize: 10, color: '#374151', lineHeight: 1.5 }}>{s}</p>
          </div>
        ))}
      </div>

      {/* Ask AI */}
      <input type="text" placeholder="Ask Clausio AI about this case..." style={{ width: '100%', padding: '7px 10px', borderTop: '1px solid #e2e8f0', border: 'none', borderTop: '1px solid #e2e8f0' as any, background: 'transparent', fontSize: 11, fontFamily: 'inherit', outline: 'none', flexShrink: 0 }} />
    </div>
  )
}

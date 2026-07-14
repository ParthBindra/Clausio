'use client'
import { useState } from 'react'

const CASES = [
  { name: 'Priya v. Rohit Sharma', num: 'FC/2847/2023', type: 'Family',    dot: '#ef4444', status: 'Hearing today',  sBg: '#fef2f2', sClr: '#dc2626' },
  { name: 'Mehta v. Mehta',        num: 'FC/1203/2024', type: 'Family',    dot: '#10b981', status: 'Active',         sBg: '#f0fdf4', sClr: '#15803d' },
  { name: 'State v. Ramesh Patel', num: 'CR/445/2024',  type: 'Criminal',  dot: '#f59e0b', status: 'Pending filing', sBg: '#fef3c7', sClr: '#d97706' },
  { name: 'Gupta Property',        num: 'CIV/2090/2023',type: 'Civil',     dot: '#3b82f6', status: 'Evidence',       sBg: '#eff6ff', sClr: '#1e40af' },
  { name: 'Khan Cheque Bounce',    num: 'NI/338/2024',  type: 'NI Act 138',dot: '#10b981', status: 'Active',         sBg: '#f0fdf4', sClr: '#15803d' },
  { name: 'Sharma GST Appeal',     num: 'GST/112/2024', type: 'Tax',       dot: '#7c3aed', status: 'Arguments',      sBg: '#f5f3ff', sClr: '#7c3aed' },
  { name: 'Patel Income Tax',      num: 'IT/220/2024',  type: 'Income Tax',dot: '#94a3b8', status: 'Closed',         sBg: '#f1f5f9', sClr: '#64748b' },
]
const FILTERS = ['All (154)', 'Active', 'Today', 'At risk']

export default function CaseList() {
  const [filter, setFilter] = useState('All (154)')
  const [sel, setSel] = useState(0)

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
      <div style={{ padding: '7px 9px', borderBottom: '1px solid #e2e8f0', flexShrink: 0 }}>
        <input type="text" placeholder="Search cases..." style={{ width: '100%', padding: '5px 8px', border: '1px solid #e8ecf0', borderRadius: 5, fontSize: 11, fontFamily: 'inherit', outline: 'none' }} />
        <div style={{ display: 'flex', gap: 2, marginTop: 5, flexWrap: 'wrap' }}>
          {FILTERS.map(f => (
            <button key={f} onClick={() => setFilter(f)} style={{ fontSize: 9, padding: '2px 6px', borderRadius: 20, cursor: 'pointer', border: `1px solid ${filter === f ? '#bfdbfe' : '#e2e8f0'}`, background: filter === f ? '#eff6ff' : '#f8fafc', color: filter === f ? '#1e40af' : '#64748b', fontFamily: 'inherit' }}>{f}</button>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {CASES.map((c, i) => (
          <div key={i} onClick={() => setSel(i)} style={{ padding: '7px 9px', borderBottom: '1px solid #f1f5f9', cursor: 'pointer', background: sel === i ? '#eff6ff' : '#fff', borderRight: sel === i ? '2px solid #3b82f6' : '2px solid transparent' }}>
            <div style={{ display: 'flex', gap: 6, alignItems: 'flex-start' }}>
              <div style={{ width: 7, height: 7, borderRadius: '50%', background: c.dot, flexShrink: 0, marginTop: 3 }} />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 500, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 152 }}>{c.name}</div>
                <div style={{ fontSize: 9, color: '#94a3b8', marginTop: 1 }}>{c.num} · {c.type}</div>
                <span style={{ display: 'inline-block', fontSize: 8, fontWeight: 600, padding: '1px 5px', borderRadius: 5, marginTop: 2, background: c.sBg, color: c.sClr }}>{c.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

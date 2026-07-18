import React from 'react'

const DRAFT_TYPES = [
  'Divorce Petition',
  'Maintenance Petition',
  'Bail Application',
  'Written Statement',
  'Affidavit',
  'Legal Notice'
]

export default function DraftTypeSelector() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 11, fontWeight: 500, color: '#475569' }}>Type of draft</label>
      <select style={{
        width: '100%', padding: '10px 12px',
        border: '1px solid #cbd5e1', borderRadius: 6,
        fontSize: 13, background: '#fff', fontFamily: 'inherit', outline: 'none',
        color: '#0f172a', appearance: 'auto', fontWeight: 500
      }}>
        {DRAFT_TYPES.map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
    </div>
  )
}

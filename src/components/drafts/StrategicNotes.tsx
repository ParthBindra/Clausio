import React from 'react'

export default function StrategicNotes() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <label style={{ fontSize: 11, fontWeight: 500, color: '#475569' }}>Strategic notes</label>
      <textarea
        placeholder="Focus on financial contradictions. Push maintenance above Rs 50,000..."
        style={{
          width: '100%', minHeight: 120, padding: '10px 12px',
          border: '1px solid #cbd5e1', borderRadius: 6,
          fontSize: 13, background: '#fff', fontFamily: 'inherit', outline: 'none',
          resize: 'vertical', color: '#0f172a'
        }}
      />
      <button style={{
        marginTop: 10, width: '100%', padding: '10px 12px', borderRadius: 6,
        fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
        background: '#f8fafc', color: '#0f172a', border: '1px solid #cbd5e1', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6
      }}>
        Generate legal draft
      </button>
    </div>
  )
}

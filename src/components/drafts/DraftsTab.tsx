import React from 'react'
import DraftEditor from './DraftEditor'
import DraftPreview from './DraftPreview'

export default function DraftsTab() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 600 }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '12px 16px', borderBottom: '1px solid #e2e8f0', background: '#fff' }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: '#0f172a' }}>Drafting</span>
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 10, padding: '4px 10px', borderRadius: 20, fontWeight: 600, background: '#eff6ff', color: '#1d4ed8' }}>
            Family and Matrimonial
          </span>
          <button style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #cbd5e1', background: '#fff', fontSize: 12, fontWeight: 500, color: '#0f172a', cursor: 'pointer' }}>
            Select draft type
          </button>
          <button style={{ padding: '6px 12px', borderRadius: 6, border: '1px solid #cbd5e1', background: '#fff', fontSize: 12, fontWeight: 500, color: '#0f172a', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
            <i className="ti ti-file-text" style={{ fontSize: 14 }} /> Generate
          </button>
        </div>
      </div>
      {/* Main Content */}
      <div style={{ display: 'grid', gridTemplateColumns: '35% 1fr', gap: 16, padding: '16px', background: '#f8fafc', flex: 1 }}>
        <DraftEditor />
        <DraftPreview />
      </div>
    </div>
  )
}

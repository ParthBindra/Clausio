import React from 'react'
import DraftTypeSelector from './DraftTypeSelector'
import StrategicNotes from './StrategicNotes'

export default function DraftEditor() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: 'fit-content' }}>
      <DraftTypeSelector />
      <StrategicNotes />
    </div>
  )
}

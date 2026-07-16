'use client'

import { useState } from 'react'
import AddCaseModal from './AddCaseModal'

export default function CasesHeader() {
  const [showAddModal, setShowAddModal] = useState(false)

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 24,
          marginBottom: 10,
        }}
      >
        {/* Left */}

        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 42,
              fontWeight: 700,
              color: '#0f172a',
            }}
          >
            Cases
          </h1>

          <p
            style={{
              marginTop: 10,
              color: '#64748b',
              fontSize: 18,
              lineHeight: 1.6,
            }}
          >
            Manage all your active matters across
            practice areas.
          </p>
        </div>

        {/* Right */}

        <div
          style={{
            display: 'flex',
            gap: 16,
            alignItems: 'center',
          }}
        >
          <button style={secondaryButton}>
            📤 Export
          </button>

          <button style={secondaryButton}>
            🔍 Filter
          </button>

          <button
            style={primaryButton}
            onClick={() => setShowAddModal(true)}
          >
            ➕ New Case
          </button>
        </div>
      </div>

      {/* Add Case Modal */}

      <AddCaseModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </>
  )
}

/* ---------------- BUTTONS ---------------- */

const primaryButton: React.CSSProperties = {
  height: 52,
  padding: '0 22px',
  border: 'none',
  borderRadius: 14,
  background: '#2563eb',
  color: '#fff',
  fontSize: 15,
  fontWeight: 600,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  boxShadow: '0 8px 20px rgba(37,99,235,.20)',
}

const secondaryButton: React.CSSProperties = {
  height: 52,
  padding: '0 22px',
  border: '1px solid #dbe3ef',
  borderRadius: 14,
  background: '#fff',
  color: '#0f172a',
  fontSize: 15,
  fontWeight: 600,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: 8,
}
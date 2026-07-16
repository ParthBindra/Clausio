'use client'

import { useState } from 'react'

export default function CasesSearch() {
  const [search, setSearch] = useState('')
  const [court, setCourt] = useState('All Courts')
  const [status, setStatus] = useState('All Status')
  const [practice, setPractice] = useState('All Practice Areas')

  const clearFilters = () => {
    setSearch('')
    setCourt('All Courts')
    setStatus('All Status')
    setPractice('All Practice Areas')
  }

  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: 20,
        padding: 24,
        boxShadow: '0 8px 24px rgba(15,23,42,.05)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr 1fr 1fr auto',
          gap: 18,
          alignItems: 'center',
        }}
      >
        {/* Search */}

        <div
          style={{
            position: 'relative',
          }}
        >
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search cases by client name, case number, advocate..."
            style={inputStyle}
          />

          <span
            style={{
              position: 'absolute',
              right: 18,
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#94a3b8',
            }}
          >
            🔍
          </span>
        </div>

        {/* Court */}

        <select
          value={court}
          onChange={(e) => setCourt(e.target.value)}
          style={selectStyle}
        >
          <option>All Courts</option>
          <option>Supreme Court</option>
          <option>High Court</option>
          <option>District Court</option>
          <option>Family Court</option>
          <option>Commercial Court</option>
        </select>

        {/* Status */}

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={selectStyle}
        >
          <option>All Status</option>
          <option>Active</option>
          <option>Pending</option>
          <option>Closed</option>
          <option>Archived</option>
        </select>

        {/* Practice */}

        <select
          value={practice}
          onChange={(e) => setPractice(e.target.value)}
          style={selectStyle}
        >
          <option>All Practice Areas</option>
          <option>Family Law</option>
          <option>Civil</option>
          <option>Criminal</option>
          <option>Corporate</option>
          <option>GST</option>
          <option>Income Tax</option>
          <option>NI Act</option>
        </select>

        {/* Clear */}

        <button
          onClick={clearFilters}
          style={clearButton}
        >
          Clear
        </button>
      </div>

      {/* Bottom Row */}

      <div
        style={{
          marginTop: 18,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          <Tag label="Family" />

          <Tag label="Civil" />

          <Tag label="Criminal" />

          <Tag label="Tax" />

          <Tag label="Corporate" />
        </div>

        <div
          style={{
            color: '#64748b',
            fontSize: 14,
          }}
        >
          🤖 AI Search Ready
        </div>
      </div>
    </div>
  )
}

/* ---------------- COMPONENTS ---------------- */

function Tag({
  label,
}: {
  label: string
}) {
  return (
    <div
      style={{
        padding: '7px 14px',
        borderRadius: 999,
        background: '#eff6ff',
        color: '#2563eb',
        fontWeight: 600,
        fontSize: 13,
      }}
    >
      {label}
    </div>
  )
}

/* ---------------- STYLES ---------------- */

const inputStyle: React.CSSProperties = {
  width: '100%',
  height: 54,
  border: '1px solid #dbe3ef',
  borderRadius: 14,
  padding: '0 50px 0 18px',
  fontSize: 15,
  outline: 'none',
  boxSizing: 'border-box',
}

const selectStyle: React.CSSProperties = {
  width: '100%',
  height: 54,
  border: '1px solid #dbe3ef',
  borderRadius: 14,
  padding: '0 14px',
  fontSize: 15,
  background: '#fff',
  outline: 'none',
  cursor: 'pointer',
}

const clearButton: React.CSSProperties = {
  height: 54,
  padding: '0 22px',
  border: 'none',
  borderRadius: 14,
  background: '#ef4444',
  color: '#fff',
  fontWeight: 600,
  cursor: 'pointer',
}
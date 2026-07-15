'use client'

import { useState } from 'react'

export default function EmergencyResponse() {
  const [query, setQuery] = useState(
    'Opposing counsel filed urgent application for interim custody of child...'
  )

  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #fecaca',
        borderRadius: 16,
        overflow: 'hidden',
        boxShadow: '0 2px 8px rgba(15,23,42,.04)',
      }}
    >
      {/* Header */}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '16px 20px',
          background: '#fef2f2',
          borderBottom: '1px solid #fecaca',
        }}
      >
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            background: '#dc2626',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <i className="ti ti-alert-triangle" />
        </div>

        <div>
          <div
            style={{
              fontWeight: 700,
              color: '#991b1b',
              fontSize: 17,
            }}
          >
            Emergency Response
          </div>

          <div
            style={{
              color: '#7f1d1d',
              fontSize: 13,
              marginTop: 3,
            }}
          >
            Generate an immediate legal response for urgent situations.
          </div>
        </div>
      </div>

      {/* Body */}

      <div
        style={{
          padding: 20,
        }}
      >
        <textarea
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Describe the emergency situation..."
          rows={4}
          style={{
            width: '100%',
            resize: 'vertical',
            padding: 14,
            borderRadius: 10,
            border: '1px solid #d1d5db',
            outline: 'none',
            fontSize: 14,
            fontFamily: 'inherit',
            boxSizing: 'border-box',
          }}
        />

        {/* Quick Suggestions */}

        <div
          style={{
            marginTop: 16,
          }}
        >
          <div
            style={{
              fontWeight: 600,
              color: '#334155',
              marginBottom: 10,
            }}
          >
            Quick Templates
          </div>

          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 10,
            }}
          >
            {[
              'Urgent Custody',
              'Stay Order',
              'Interim Maintenance',
              'Passport Issue',
              'Domestic Violence',
              'Evidence Objection',
            ].map((item) => (
              <button
                key={item}
                style={{
                  padding: '8px 14px',
                  borderRadius: 999,
                  border: '1px solid #e2e8f0',
                  background: '#f8fafc',
                  cursor: 'pointer',
                  fontSize: 13,
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* AI Notice */}

        <div
          style={{
            marginTop: 18,
            padding: 14,
            background: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: 10,
            color: '#1d4ed8',
            fontSize: 13,
            lineHeight: 1.6,
          }}
        >
          <strong>AI Notice:</strong> Clausio will prepare an emergency
          response, identify relevant provisions, suggest supporting
          judgments and generate a ready-to-file draft within seconds.
        </div>

        {/* Buttons */}

        <div
          style={{
            display: 'flex',
            gap: 12,
            marginTop: 22,
          }}
        >
          <button
            style={{
              flex: 1,
              padding: '13px',
              borderRadius: 10,
              border: '1px solid #cbd5e1',
              background: '#fff',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Clear
          </button>

          <button
            style={{
              flex: 2,
              padding: '13px',
              borderRadius: 10,
              border: 'none',
              background: '#dc2626',
              color: '#fff',
              cursor: 'pointer',
              fontWeight: 700,
              fontSize: 15,
            }}
          >
            <i
              className="ti ti-bolt"
              style={{ marginRight: 8 }}
            />
            Generate Emergency Response
          </button>
        </div>
      </div>
    </div>
  )
}
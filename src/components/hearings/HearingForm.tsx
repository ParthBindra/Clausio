'use client'

import { useState } from 'react'

const stages = [
  'First Appearance',
  'Interim Application',
  'Written Statement',
  'Evidence',
  'Cross Examination',
  'Arguments',
  'Judgment',
]

export default function HearingForm() {
  const [hearingDate, setHearingDate] = useState('2024-06-17')
  const [stage, setStage] = useState('Interim Application')
  const [whatHappened, setWhatHappened] = useState(
    'Judge expressed strong displeasure regarding repeated delays by the respondent. Respondent sought one final opportunity to file a reply.'
  )

  const [judgeObservation, setJudgeObservation] = useState(
    'Last opportunity granted. Reply must be filed before next hearing.'
  )

  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: 16,
        border: '1px solid #e2e8f0',
        padding: 24,
        boxShadow: '0 2px 8px rgba(15,23,42,.04)',
      }}
    >
      {/* Header */}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 24,
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: 22,
              fontWeight: 700,
              color: '#0f172a',
            }}
          >
            Record Hearing
          </h2>

          <p
            style={{
              marginTop: 6,
              color: '#64748b',
              fontSize: 14,
            }}
          >
            Record today's proceedings
          </p>
        </div>
      </div>

      {/* Date + Stage */}

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 18,
          marginBottom: 22,
        }}
      >
        <Field label="Hearing Date" required>
          <input
            type="date"
            value={hearingDate}
            onChange={(e) => setHearingDate(e.target.value)}
            style={inputStyle}
          />
        </Field>

        <Field label="Stage" required>
          <select
            value={stage}
            onChange={(e) => setStage(e.target.value)}
            style={inputStyle}
          >
            {stages.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </Field>
      </div>

      {/* What happened */}

      <Field label="What happened today?" required>
        <textarea
          rows={7}
          value={whatHappened}
          onChange={(e) => setWhatHappened(e.target.value)}
          placeholder="Describe the hearing..."
          style={{
            ...inputStyle,
            resize: 'vertical',
            minHeight: 180,
          }}
        />
      </Field>

      {/* Judge */}

      <Field label="Judge's Observation">
        <textarea
          rows={5}
          value={judgeObservation}
          onChange={(e) => setJudgeObservation(e.target.value)}
          placeholder="Judge's remarks..."
          style={{
            ...inputStyle,
            resize: 'vertical',
            minHeight: 130,
          }}
        />
      </Field>
            {/* Next Hearing Date */}

      <Field label="Next Hearing Date">
        <input
          type="date"
          style={inputStyle}
        />
      </Field>

      {/* Save Button */}

      <button
        onClick={() => {
          alert('Hearing saved successfully!')
        }}
        style={{
          width: '100%',
          marginTop: 28,
          background: '#2563eb',
          color: '#ffffff',
          border: 'none',
          borderRadius: 12,
          padding: '14px',
          fontSize: 15,
          fontWeight: 600,
          cursor: 'pointer',
          boxShadow: '0 8px 20px rgba(37,99,235,.25)',
        }}
      >
        Save Hearing Record
      </button>
    </div>
  )
}

/* ------------------------------------------------ */
/* Field Component */
/* ------------------------------------------------ */

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        marginBottom: 22,
      }}
    >
      <label
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: '#334155',
        }}
      >
        {label}

        {required && (
          <span
            style={{
              color: '#dc2626',
              marginLeft: 4,
            }}
          >
            *
          </span>
        )}
      </label>

      {children}
    </div>
  )
}

/* ------------------------------------------------ */
/* Shared Input Style */
/* ------------------------------------------------ */

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 14px',
  borderRadius: 10,
  border: '1px solid #d1d5db',
  background: '#ffffff',
  fontSize: 14,
  color: '#0f172a',
  fontFamily: 'inherit',
  outline: 'none',
  boxSizing: 'border-box',
}
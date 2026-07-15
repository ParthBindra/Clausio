'use client'

interface Hearing {
  id: number
  date: string
  stage: string
  description: string
  latest?: boolean
}

const hearings: Hearing[] = [
  {
    id: 1,
    date: '17 Jun 2024',
    stage: 'Interim Application',
    latest: true,
    description:
      'Judge expressed strong displeasure over repeated delays. Final opportunity granted to Respondent.',
  },
  {
    id: 2,
    date: '6 May 2024',
    stage: 'Interim Application',
    description:
      'Respondent requested additional time for filing reply. Matter adjourned.',
  },
  {
    id: 3,
    date: '4 Mar 2024',
    stage: 'Written Statement',
    description:
      'Written Statement filed. Replication directed within 30 days.',
  },
  {
    id: 4,
    date: '16 Jan 2024',
    stage: 'First Appearance',
    description:
      'Both parties appeared before the Court. Notice confirmed.',
  },
]

export default function HearingHistory() {
  return (
    <div
      style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: 16,
        padding: 24,
        boxShadow: '0 2px 8px rgba(15,23,42,.04)',
      }}
    >
      {/* Header */}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
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
            Hearing History
          </h2>

          <p
            style={{
              marginTop: 6,
              color: '#64748b',
              fontSize: 14,
            }}
          >
            Previous hearing records
          </p>
        </div>
      </div>

      <div
        style={{
          position: 'relative',
        }}
      >
        {hearings.map((hearing, index) => (
          <div
            key={hearing.id}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              marginBottom: 28,
            }}
          >
            {/* Timeline */}

            <div
              style={{
                width: 40,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: hearing.latest
                    ? '#2563eb'
                    : '#cbd5e1',
                  border: '3px solid #ffffff',
                  boxShadow: '0 0 0 2px #2563eb',
                  zIndex: 2,
                }}
              />

              {index !== hearings.length - 1 && (
                <div
                  style={{
                    width: 2,
                    flex: 1,
                    minHeight: 95,
                    background: '#e2e8f0',
                    marginTop: 6,
                  }}
                />
              )}
            </div>

            {/* Card */}

            <div
              style={{
                flex: 1,
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: 12,
                padding: 18,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 10,
                }}
              >
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: 16,
                      color: '#0f172a',
                    }}
                  >
                    {hearing.date}
                  </div>

                  <div
                    style={{
                      marginTop: 4,
                      color: '#2563eb',
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    {hearing.stage}
                  </div>
                </div>

                {hearing.latest && (
                  <span
                    style={{
                      background: '#dbeafe',
                      color: '#1d4ed8',
                      padding: '6px 12px',
                      borderRadius: 20,
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    LATEST
                  </span>
                )}
              </div>

              <p
                style={{
                  margin: 0,
                  lineHeight: 1.7,
                  color: '#475569',
                  fontSize: 14,
                }}
              >
                {hearing.description}
              </p>
                          </div>
          </div>
        ))}
      </div>

      {/* Bottom Summary */}

      <div
        style={{
          marginTop: 10,
          paddingTop: 20,
          borderTop: '1px solid #e2e8f0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: '#0f172a',
            }}
          >
            Total Hearings
          </div>

          <div
            style={{
              marginTop: 4,
              fontSize: 28,
              fontWeight: 700,
              color: '#2563eb',
            }}
          >
            {hearings.length}
          </div>
        </div>

        <button
          style={{
            padding: '12px 22px',
            borderRadius: 10,
            border: 'none',
            background: '#2563eb',
            color: '#ffffff',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: 14,
            boxShadow: '0 8px 20px rgba(37,99,235,.25)',
          }}
        >
          View Complete Diary
        </button>
      </div>
    </div>
  )
}
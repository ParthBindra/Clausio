'use client'

interface Gap {
  title: string
  severity: 'High' | 'Medium' | 'Low'
  description: string
  effort: string
}

const gaps: Gap[] = [
  {
    title: 'Witness Confirmation Pending',
    severity: 'High',
    description:
      'Primary witness attendance has not been confirmed before the next hearing.',
    effort: '15 mins',
  },
  {
    title: 'Financial Disclosure Missing',
    severity: 'High',
    description:
      'Income affidavit and supporting bank statements are incomplete.',
    effort: '30 mins',
  },
  {
    title: 'Medical Evidence Incomplete',
    severity: 'Medium',
    description:
      'Latest hospital records have not yet been filed with the court.',
    effort: '20 mins',
  },
]

export default function GapAnalysis() {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: 16,
        padding: 22,
        boxShadow: '0 2px 8px rgba(15,23,42,.04)',
      }}
    >
      {/* Header */}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: 20,
              fontWeight: 700,
              color: '#0f172a',
            }}
          >
            Top Gaps
          </h2>

          <p
            style={{
              marginTop: 6,
              color: '#64748b',
              fontSize: 13,
            }}
          >
            Issues requiring attention before the next hearing.
          </p>
        </div>

        <div
          style={{
            background: '#fef2f2',
            color: '#dc2626',
            padding: '7px 14px',
            borderRadius: 999,
            fontWeight: 700,
            fontSize: 12,
          }}
        >
          3 Critical
        </div>
      </div>

      {gaps.map((gap, index) => (
        <GapCard
          key={index}
          gap={gap}
        />
      ))}

      {/* AI Insight */}

      <div
        style={{
          marginTop: 18,
          background: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: 12,
          padding: 16,
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 8,
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <i
            className="ti ti-sparkles"
            style={{
              color: '#2563eb',
            }}
          />

          <strong
            style={{
              color: '#2563eb',
            }}
          >
            AI Insight
          </strong>
        </div>

        <div
          style={{
            fontSize: 14,
            color: '#334155',
            lineHeight: 1.7,
          }}
        >
          Resolving these three issues is estimated to improve your
          readiness score from <strong>72%</strong> to approximately
          <strong> 89%</strong>.
        </div>
      </div>
    </div>
  )
}

/* ================================================= */

function GapCard({
  gap,
}: {
  gap: Gap
}) {
  const badge =
    gap.severity === 'High'
      ? {
          bg: '#fef2f2',
          color: '#dc2626',
        }
      : gap.severity === 'Medium'
      ? {
          bg: '#fff7ed',
          color: '#d97706',
        }
      : {
          bg: '#f0fdf4',
          color: '#16a34a',
        }

  return (
    <div
      style={{
        border: '1px solid #e2e8f0',
        borderRadius: 12,
        padding: 16,
        marginBottom: 14,
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
        <div
          style={{
            fontWeight: 700,
            color: '#0f172a',
            fontSize: 15,
          }}
        >
          {gap.title}
        </div>

        <span
          style={{
            background: badge.bg,
            color: badge.color,
            padding: '5px 10px',
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          {gap.severity}
        </span>
      </div>

      <div
        style={{
          color: '#64748b',
          fontSize: 13,
          lineHeight: 1.7,
        }}
      >
        {gap.description}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 16,
        }}
      >
        <span
          style={{
            fontSize: 12,
            color: '#475569',
          }}
        >
          Estimated effort: <strong>{gap.effort}</strong>
        </span>

        <button
          style={{
            padding: '8px 14px',
            borderRadius: 8,
            border: 'none',
            background: '#2563eb',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: 12,
          }}
        >
          Resolve
        </button>
      </div>
    </div>
  )
}
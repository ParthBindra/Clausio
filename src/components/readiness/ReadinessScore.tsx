'use client'

const metrics = [
  {
    label: 'Evidence Strength',
    value: 82,
    color: '#16a34a',
  },
  {
    label: 'Document Completeness',
    value: 56,
    color: '#f59e0b',
  },
  {
    label: 'Narrative Consistency',
    value: 78,
    color: '#16a34a',
  },
  {
    label: 'Financial Clarity',
    value: 65,
    color: '#f59e0b',
  },
]

export default function ReadinessScore() {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: 16,
        padding: 24,
        boxShadow: '0 2px 8px rgba(15,23,42,.04)',
      }}
    >
      {/* ================= HEADER ================= */}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 22,
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
            Hearing Readiness
          </h2>

          <p
            style={{
              marginTop: 6,
              fontSize: 14,
              color: '#64748b',
            }}
          >
            Overall preparation score.
          </p>
        </div>

        <div
          style={{
            background: '#dcfce7',
            color: '#15803d',
            padding: '8px 14px',
            borderRadius: 20,
            fontWeight: 700,
            fontSize: 13,
          }}
        >
          Good Shape
        </div>
      </div>

      {/* ================= SCORE ================= */}

      <div
        style={{
          textAlign: 'center',
          marginBottom: 28,
        }}
      >
        <div
          style={{
            fontSize: 74,
            fontWeight: 700,
            color: '#16a34a',
            lineHeight: 1,
          }}
        >
          72
        </div>

        <div
          style={{
            marginTop: 10,
            fontSize: 16,
            fontWeight: 600,
            color: '#334155',
          }}
        >
          Ready for Hearing
        </div>

        <div
          style={{
            marginTop: 6,
            fontSize: 13,
            color: '#94a3b8',
          }}
        >
          Last Updated • 17 July 2024
        </div>
      </div>

      {/* ================= METRICS ================= */}

      {metrics.map((item) => (
        <MetricBar
          key={item.label}
          {...item}
        />
      ))}

      {/* ================= AI CARD ================= */}

      <div
        style={{
          marginTop: 24,
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
            marginBottom: 10,
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
            AI Recommendation
          </strong>
        </div>

        <div
          style={{
            lineHeight: 1.8,
            color: '#334155',
            fontSize: 14,
          }}
        >
          Overall case preparation is strong.
          Improve document completeness before the
          next hearing by filing the pending financial
          disclosure and confirming witness attendance.
        </div>
      </div>
    </div>
  )
}

/* ================================================= */

function MetricBar({
  label,
  value,
  color,
}: {
  label: string
  value: number
  color: string
}) {
  return (
    <div
      style={{
        marginBottom: 18,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 8,
        }}
      >
        <span
          style={{
            fontWeight: 600,
            color: '#334155',
          }}
        >
          {label}
        </span>

        <span
          style={{
            fontWeight: 700,
            color,
          }}
        >
          {value}/100
        </span>
      </div>

      <div
        style={{
          height: 10,
          background: '#e2e8f0',
          borderRadius: 999,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${value}%`,
            height: '100%',
            background: color,
            borderRadius: 999,
          }}
        />
      </div>
    </div>
  )
}
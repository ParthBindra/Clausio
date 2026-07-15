'use client'

interface Strength {
  title: string
  confidence: number
  description: string
  strategy: string
}

const strengths: Strength[] = [
  {
    title: 'Medical Evidence',
    confidence: 97,
    description:
      'Hospital records clearly establish the injuries and treatment timeline.',
    strategy:
      'Use as primary evidence to establish cruelty and support oral testimony.',
  },
  {
    title: 'WhatsApp Conversations',
    confidence: 92,
    description:
      'Chat history contains admissions and consistent communication supporting your client',
    strategy:
      'Highlight key admissions during cross-examination and final arguments.',
  },
  {
    title: 'Financial Records',
    confidence: 89,
    description:
      'Bank statements and expenditure records indicate a higher standard of living than declared.',
    strategy:
      'Use these documents to challenge the respondent’s income disclosure.',
  },
]

export default function StrengthAnalysis() {
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
            Top Strengths
          </h2>

          <p
            style={{
              marginTop: 6,
              color: '#64748b',
              fontSize: 13,
            }}
          >
            Strongest points supporting your case.
          </p>
        </div>

        <div
          style={{
            background: '#dcfce7',
            color: '#15803d',
            padding: '7px 14px',
            borderRadius: 999,
            fontWeight: 700,
            fontSize: 12,
          }}
        >
          3 Strong
        </div>
      </div>

      {strengths.map((item) => (
        <StrengthCard
          key={item.title}
          item={item}
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
            alignItems: 'center',
            gap: 8,
            marginBottom: 8,
          }}
        >
          <i
            className="ti ti-sparkles"
            style={{ color: '#2563eb' }}
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
            color: '#334155',
            lineHeight: 1.7,
            fontSize: 14,
          }}
        >
          Your strongest evidence is documentary and digital.
          Begin the hearing with medical records, then reinforce
          them using WhatsApp conversations and financial
          inconsistencies to build a consistent narrative.
        </div>
      </div>
    </div>
  )
}

/* ===================================================== */

function StrengthCard({
  item,
}: {
  item: Strength
}) {
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
          marginBottom: 12,
        }}
      >
        <div
          style={{
            fontWeight: 700,
            color: '#0f172a',
            fontSize: 15,
          }}
        >
          {item.title}
        </div>

        <span
          style={{
            background: '#dcfce7',
            color: '#15803d',
            padding: '5px 10px',
            borderRadius: 999,
            fontWeight: 700,
            fontSize: 11,
          }}
        >
          {item.confidence}% Confidence
        </span>
      </div>

      <div
        style={{
          color: '#64748b',
          fontSize: 13,
          lineHeight: 1.7,
          marginBottom: 14,
        }}
      >
        {item.description}
      </div>

      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: 10,
          padding: 12,
          marginBottom: 14,
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: '#2563eb',
            marginBottom: 6,
          }}
        >
          Court Strategy
        </div>

        <div
          style={{
            fontSize: 13,
            color: '#475569',
            lineHeight: 1.6,
          }}
        >
          {item.strategy}
        </div>
      </div>

      <button
        style={{
          width: '100%',
          padding: '10px',
          borderRadius: 10,
          border: 'none',
          background: '#16a34a',
          color: '#fff',
          cursor: 'pointer',
          fontWeight: 600,
          fontSize: 13,
        }}
      >
        Use in Arguments
      </button>
    </div>
  )
}
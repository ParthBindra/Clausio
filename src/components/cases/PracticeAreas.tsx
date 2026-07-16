'use client'

import { useRouter } from 'next/navigation'

const practiceAreas = [
  {
    title: 'Family Law',
    description: 'Divorce, custody, maintenance & domestic matters',
    cases: 32,
    color: '#2563eb',
    icon: 'ti ti-users',
    route: '/cases/family',
  },
  {
    title: 'Civil Litigation',
    description: 'Property, recovery suits & injunctions',
    cases: 28,
    color: '#16a34a',
    icon: 'ti ti-scale',
    route: '/cases/civil',
  },
  {
    title: 'Criminal Law',
    description: 'Bail, FIR, criminal trials & appeals',
    cases: 18,
    color: '#dc2626',
    icon: 'ti ti-shield',
    route: '/cases/criminal',
  },
  {
    title: 'Corporate',
    description: 'Companies Act, compliance & contracts',
    cases: 15,
    color: '#7c3aed',
    icon: 'ti ti-building-bank',
    route: '/cases/corporate',
  },
  {
    title: 'GST',
    description: 'GST notices, appeals & litigation',
    cases: 12,
    color: '#ea580c',
    icon: 'ti ti-receipt-tax',
    route: '/cases/gst',
  },
  {
    title: 'Income Tax',
    description: 'Assessment, appeals & tax disputes',
    cases: 14,
    color: '#0891b2',
    icon: 'ti ti-cash-banknote',
    route: '/cases/income-tax',
  },
  {
    title: 'NI Act',
    description: 'Cheque bounce matters under Section 138',
    cases: 20,
    color: '#f59e0b',
    icon: 'ti ti-file-certificate',
    route: '/cases/ni-act',
  },
  {
    title: 'Arbitration',
    description: 'Commercial arbitration & ADR',
    cases: 9,
    color: '#0f766e',
    icon: 'ti ti-gavel',
    route: '/cases/arbitration',
  },
]

export default function PracticeAreas() {
  return (
    <div>
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
              fontSize: 28,
              color: '#0f172a',
            }}
          >
            Practice Areas
          </h2>

          <p
            style={{
              marginTop: 8,
              color: '#64748b',
            }}
          >
            Select a practice area to view all related matters.
          </p>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4,1fr)',
          gap: 22,
        }}
      >
        {practiceAreas.map((area) => (
          <PracticeCard
            key={area.title}
            {...area}
          />
        ))}
      </div>
    </div>
  )
}

function PracticeCard({
  title,
  description,
  cases,
  color,
  icon,
  route,
}: {
  title: string
  description: string
  cases: number
  color: string
  icon: string
  route: string
}) {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push(route)}
      style={{
        background: '#fff',
        borderRadius: 22,
        border: '1px solid #e2e8f0',
        padding: 24,
        cursor: 'pointer',
        transition: '.25s',
        boxShadow: '0 10px 25px rgba(15,23,42,.05)',
      }}
    >
      <div
        style={{
          width: 60,
          height: 60,
          borderRadius: 18,
          background: color,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 18,
        }}
      >
        <i
          className={icon}
          style={{
            color: '#fff',
            fontSize: 28,
          }}
        />
      </div>

      <h3
        style={{
          margin: 0,
          color: '#0f172a',
          fontSize: 22,
        }}
      >
        {title}
      </h3>

      <p
        style={{
          marginTop: 12,
          color: '#64748b',
          lineHeight: 1.6,
          minHeight: 55,
          fontSize: 14,
        }}
      >
        {description}
      </p>

      <div
        style={{
          marginTop: 20,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            color,
            fontWeight: 700,
            fontSize: 20,
          }}
        >
          {cases} Cases
        </span>

        <div
          style={{
            color,
            fontWeight: 600,
          }}
        >
          View →
        </div>
      </div>
    </div>
  )
}
'use client'

const stats = [
  {
    title: 'Total Cases',
    value: '154',
    change: '+12%',
    icon: 'ti ti-folder',
    color: '#2563eb',
    background: '#eff6ff',
  },
  {
    title: 'Active Cases',
    value: '98',
    change: '+8%',
    icon: 'ti ti-briefcase',
    color: '#16a34a',
    background: '#ecfdf5',
  },
  {
    title: "Today's Hearings",
    value: '8',
    change: 'Today',
    icon: 'ti ti-calendar-event',
    color: '#f59e0b',
    background: '#fffbeb',
  },
  {
    title: 'Overdue Tasks',
    value: '12',
    change: '-3%',
    icon: 'ti ti-alert-circle',
    color: '#ef4444',
    background: '#fef2f2',
  },
]

export default function CaseStats() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4,1fr)',
        gap: 20,
        marginTop: 28,
      }}
    >
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          {...stat}
        />
      ))}
    </div>
  )
}

function StatCard({
  title,
  value,
  change,
  icon,
  color,
  background,
}: {
  title: string
  value: string
  change: string
  icon: string
  color: string
  background: string
}) {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: 20,
        padding: 24,
        boxShadow: '0 8px 24px rgba(15,23,42,.05)',
        transition: '.25s',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 54,
            height: 54,
            borderRadius: 14,
            background,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <i
            className={icon}
            style={{
              color,
              fontSize: 24,
            }}
          />
        </div>

        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            color,
          }}
        >
          {change}
        </span>
      </div>

      <h2
        style={{
          margin: '20px 0 6px',
          fontSize: 34,
          color: '#0f172a',
        }}
      >
        {value}
      </h2>

      <p
        style={{
          margin: 0,
          color: '#64748b',
          fontSize: 15,
        }}
      >
        {title}
      </p>

      <div
        style={{
          marginTop: 18,
          height: 6,
          borderRadius: 999,
          background: '#f1f5f9',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width:
              title === 'Total Cases'
                ? '80%'
                : title === 'Active Cases'
                ? '65%'
                : title === "Today's Hearings"
                ? '45%'
                : '30%',
            height: '100%',
            background: color,
            borderRadius: 999,
          }}
        />
      </div>
    </div>
  )
}
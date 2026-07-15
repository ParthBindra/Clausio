'use client'

interface AnalyticsTabsProps {
  activeTab: string
  onChange: (tab: string) => void
}

export default function AnalyticsTabs({
  activeTab,
  onChange,
}: AnalyticsTabsProps) {
  const tabs = [
    'AI Chat',
    'Legal Research',
    'Cross Examination',
    'Strategy Assistant',
    'Judge Insights',
    'Prompt Library',
    'History',
    'Knowledge Base',
    'AI Tools',
    'Automation',
  ]

  return (
    <div
      style={{
        display: 'flex',
        gap: 12,
        overflowX: 'auto',
        paddingBottom: 10,
        borderBottom: '1px solid #e2e8f0',
      }}
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          style={{
            padding: '10px 18px',
            border: 'none',
            borderRadius: 10,
            cursor: 'pointer',
            transition: '.2s',
            fontSize: 14,
            fontWeight: 600,
            fontFamily: 'inherit',
            whiteSpace: 'nowrap',

            background:
              activeTab === tab
                ? '#2563eb'
                : '#f8fafc',

            color:
              activeTab === tab
                ? '#ffffff'
                : '#64748b',

            boxShadow:
              activeTab === tab
                ? '0 6px 16px rgba(37,99,235,.25)'
                : 'none',
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}
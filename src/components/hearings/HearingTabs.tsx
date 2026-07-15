'use client'

interface HearingTabsProps {
  activeTab: string
  onChange: (tab: string) => void
}

const tabs = [
  'Hearing Diary',
  'Prep Brief',
  'Witness Intelligence',
]

export default function HearingTabs({
  activeTab,
  onChange,
}: HearingTabsProps) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 12,
        borderBottom: '1px solid #e2e8f0',
        paddingBottom: 12,
      }}
    >
      {tabs.map((tab) => {
        const active = activeTab === tab

        return (
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

              background: active ? '#2563eb' : '#f8fafc',

              color: active ? '#ffffff' : '#64748b',

              boxShadow: active
                ? '0 6px 16px rgba(37,99,235,.25)'
                : 'none',
            }}
          >
            {tab}
          </button>
        )
      })}
    </div>
  )
}
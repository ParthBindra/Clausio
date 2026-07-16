'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useUIStore } from '@/lib/store'

const NAV = [
  {
    group: 'Workspace',
    items: [
      {
        href: '/dashboard',
        icon: 'ti-layout-dashboard',
        label: 'Dashboard',
      },
      {
        href: '/cases',
        icon: 'ti-folder',
        label: 'Cases',
      },
      {
        href: '/hearings',
        icon: 'ti-notebook',
        label: 'Hearings',
        badge: 2,
      },
      {
        href: '/strategy',
        icon: 'ti-target',
        label: 'Strategy',
      },
      {
        href: '/client',
        icon: 'ti-message-circle',
        label: 'Client',
      },
    ],
  },

  {
    group: 'AI',
    items: [
      {
        href: '/analysis',
        icon: 'ti-brain',
        label: 'Analysis',
      },
      {
        href: '/drafting',
        icon: 'ti-pencil',
        label: 'Drafting',
      },
    ],
  },

  {
    group: 'Business',
    items: [
      {
        href: '/billing',
        icon: 'ti-coin',
        label: 'Billing',
      },
      {
        href: '/analytics',
        icon: 'ti-chart-bar',
        label: ' AI-Analytics',
      },
      {
        href: '/financial',
        icon: 'ti-cash',
        label: 'Financial',
      },
      {
        href: '/readiness',
        icon: 'ti-shield-check',
        label: 'Readiness',
      },
    ],
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const { sidebarExpanded, toggleSidebar } = useUIStore()

  const expanded = sidebarExpanded

  return (
    <aside
      style={{
        background: '#0f172a',
        width: expanded ? 190 : 46,
        flexShrink: 0,
        overflow: 'hidden',
        transition: 'width .25s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Toggle */}

      <button
        onClick={toggleSidebar}
        style={{
          width: 30,
          height: 30,
          margin: expanded ? '8px 0 6px 10px' : '8px auto 6px',
          borderRadius: 8,
          border: 'none',
          background: 'rgba(255,255,255,.05)',
          color: '#94a3b8',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <i className="ti ti-menu-2" />
      </button>

      <nav
        style={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {NAV.map((section) => (
          <div key={section.group}>
            {expanded && (
              <div
                style={{
                  padding: '10px 12px 6px',
                  fontSize: 10,
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                  color: '#475569',
                  fontWeight: 700,
                }}
              >
                {section.group}
              </div>
            )}

            {section.items.map((item) => {
              const active = pathname === item.href

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={!expanded ? item.label : undefined}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: expanded ? 'flex-start' : 'center',
                    gap: expanded ? 10 : 0,
                    margin: '2px 8px',
                    padding: expanded ? '0 10px' : 0,
                    height: 38,
                    borderRadius: 10,
                    position: 'relative',
                    textDecoration: 'none',
                    transition: '.2s',
                    background: active
                      ? 'rgba(37,99,235,.18)'
                      : 'transparent',
                  }}
                >
                  {active && (
                    <span
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: 6,
                        bottom: 6,
                        width: 3,
                        background: '#2563eb',
                        borderRadius: 10,
                      }}
                    />
                  )}

                  <i
                    className={`ti ${item.icon}`}
                    style={{
                      fontSize: 18,
                      color: active ? '#60a5fa' : '#64748b',
                      flexShrink: 0,
                    }}
                  />

                  {expanded && (
                    <span
                      style={{
                        flex: 1,
                        fontSize: 13,
                        fontWeight: active ? 600 : 500,
                        color: active ? '#ffffff' : '#cbd5e1',
                      }}
                    >
                      {item.label}
                    </span>
                  )}

                  {'badge' in item && item.badge && expanded && (
                    <span
                      style={{
                        background: '#dc2626',
                        color: '#fff',
                        fontSize: 10,
                        fontWeight: 700,
                        borderRadius: 999,
                        padding: '2px 7px',
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}

            <div
              style={{
                margin: expanded ? '8px 14px' : '8px 10px',
                height: 1,
                background: 'rgba(255,255,255,.05)',
              }}
            />
          </div>
        ))}
      </nav>

      <div style={{ paddingBottom: 8 }}>
        <Link
          href="/settings"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: expanded ? 'flex-start' : 'center',
            gap: expanded ? 10 : 0,
            margin: '0 8px',
            padding: expanded ? '0 10px' : 0,
            height: 38,
            borderRadius: 10,
            color: '#cbd5e1',
            textDecoration: 'none',
          }}
        >
          <i
            className="ti ti-settings"
            style={{
              fontSize: 18,
              color: '#64748b',
            }}
          />

          {expanded && (
            <span
              style={{
                fontSize: 13,
              }}
            >
              Settings
            </span>
          )}
        </Link>
      </div>
    </aside>
  )
}
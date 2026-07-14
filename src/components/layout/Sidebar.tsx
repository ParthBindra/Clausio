'use client'
import Link            from 'next/link'
import { usePathname } from 'next/navigation'
import { useUIStore }  from '@/lib/store'

const NAV = [
  { group: 'Core', items: [
    { href: '/dashboard', icon: 'ti-layout-dashboard', label: 'Dashboard'    },
    { href: '/cases',     icon: 'ti-folder',           label: 'Cases'        },
    { href: '/analysis',  icon: 'ti-brain',            label: 'AI workspace' },
    { href: '/drafting',  icon: 'ti-pencil',           label: 'Drafting'     },
  ]},
  { group: 'Operations', items: [
    { href: '/hearings', icon: 'ti-notebook',  label: 'Hearings', badge: 2 },
    { href: '/clients',  icon: 'ti-users',     label: 'Clients'            },
    { href: '/billing',  icon: 'ti-coin',      label: 'Billing'            },
  ]},
  { group: 'Finance', items: [
    { href: '/billing',  icon: 'ti-coin',      label: 'Billing'   },
    { href: '/analysis', icon: 'ti-chart-bar', label: 'Analytics' },
  ]},
]

export default function Sidebar() {
  const pathname = usePathname()
  const { sidebarExpanded, toggleSidebar } = useUIStore()
  const exp = sidebarExpanded

  return (
    <aside style={{ background: '#0f172a', width: exp ? 188 : 44, flexShrink: 0, overflow: 'hidden', transition: 'width 0.22s ease', display: 'flex', flexDirection: 'column' }}>
      <button onClick={toggleSidebar} aria-label="Toggle sidebar" style={{ width: 28, height: 28, background: 'rgba(255,255,255,0.05)', borderRadius: 6, border: 'none', color: '#64748b', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, margin: exp ? '5px 0 4px 8px' : '5px auto 4px' }}>
        <i className="ti ti-menu-2" />
      </button>

      <nav style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', width: '100%' }}>
        {NAV.map(({ group, items }) => (
          <div key={group}>
            {exp && <p style={{ fontSize: 8, color: '#1e3a5f', textTransform: 'uppercase', letterSpacing: '1.8px', padding: '7px 0 2px 10px', fontWeight: 600 }}>{group}</p>}
            {items.map(item => {
              const active = pathname === item.href
              return (
                <Link key={item.href + item.label} href={item.href} title={!exp ? item.label : undefined}
                  style={{ display: 'flex', alignItems: 'center', gap: exp ? 8 : 0, justifyContent: exp ? 'flex-start' : 'center', height: 30, borderRadius: 6, marginBottom: 1, marginLeft: 8, width: exp ? 'calc(100% - 16px)' : 28, padding: exp ? '0 8px' : '0', background: active ? 'rgba(59,130,246,0.14)' : 'transparent', color: active ? '#60a5fa' : '#475569', fontSize: 12, textDecoration: 'none', position: 'relative', transition: 'all 0.15s' }}>
                  {active && <span style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 2, background: '#3b82f6', borderRadius: '0 2px 2px 0' }} />}
                  <i className={`ti ${item.icon}`} style={{ fontSize: 13, flexShrink: 0 }} />
                  {exp && <span style={{ fontSize: 11, color: active ? '#e2e8f0' : '#64748b', flex: 1 }}>{item.label}</span>}
                  {'badge' in item && item.badge && (
                    <span style={{ fontSize: 8, background: '#dc2626', color: '#fff', padding: '1px 4px', borderRadius: 5, fontWeight: 600, marginLeft: exp ? 'auto' : undefined, position: exp ? 'static' : 'absolute', top: exp ? undefined : 1, right: exp ? undefined : 1 }}>{item.badge}</span>
                  )}
                </Link>
              )
            })}
            <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', margin: '4px 0 4px 10px', width: exp ? 'calc(100% - 20px)' : 24 }} />
          </div>
        ))}
      </nav>

      <div style={{ paddingBottom: 6 }}>
        <Link href="/settings" style={{ display: 'flex', alignItems: 'center', gap: exp ? 8 : 0, justifyContent: exp ? 'flex-start' : 'center', height: 30, borderRadius: 6, marginLeft: 8, width: exp ? 'calc(100% - 16px)' : 28, padding: exp ? '0 8px' : '0', color: '#475569', fontSize: 12, textDecoration: 'none' }}>
          <i className="ti ti-settings" style={{ fontSize: 13 }} />
          {exp && <span style={{ fontSize: 11, color: '#64748b' }}>Settings</span>}
        </Link>
      </div>
    </aside>
  )
}

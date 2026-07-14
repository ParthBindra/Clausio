'use client'
import { useUIStore } from '@/lib/store'

export default function Header() {
  const { sidebarExpanded, caseListVisible, aiPanelVisible, toggleSidebar, toggleCaseList, toggleAIPanel } = useUIStore()

  const pill = (active: boolean, icon: string, label: string, onClick: () => void) => (
    <button onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '2px 8px', borderRadius: 20, border: `1px solid ${active ? 'rgba(255,255,255,0.30)' : 'rgba(255,255,255,0.16)'}`, background: active ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.07)', color: active ? '#fff' : 'rgba(255,255,255,0.60)', fontSize: 11, cursor: 'pointer', whiteSpace: 'nowrap' }}>
      <i className={`ti ${icon}`} style={{ fontSize: 11 }} />{label}
    </button>
  )

  return (
    <header style={{ height: 44, background: '#1e3a8a', display: 'flex', alignItems: 'center', padding: '0 12px', gap: 6, flexShrink: 0 }}>
      <span style={{ fontFamily: 'Georgia,serif', fontSize: 15, fontWeight: 700, color: '#fff', letterSpacing: '-0.3px', marginRight: 4 }}>Clausio</span>
      <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.15)', margin: '0 2px' }} />
      <div style={{ display: 'flex', gap: 4 }}>
        {pill(sidebarExpanded, 'ti-layout-sidebar', 'Sidebar', toggleSidebar)}
        {pill(caseListVisible,  'ti-list',           'Cases',   toggleCaseList)}
        {pill(aiPanelVisible,   'ti-brain',          'AI',      toggleAIPanel)}
      </div>
      <div style={{ flex: 1, maxWidth: 280, display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.09)', border: '1px solid rgba(255,255,255,0.14)', borderRadius: 6, padding: '4px 10px', marginLeft: 4 }}>
        <i className="ti ti-search" style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }} />
        <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', flex: 1 }}>Search cases, clients...</span>
        <kbd style={{ fontSize: 9, background: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.45)', padding: '1px 4px', borderRadius: 3 }}>⌘K</kbd>
      </div>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5 }}>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.08)', padding: '3px 7px', borderRadius: 20, display: 'flex', alignItems: 'center', gap: 3 }}>
          <i className="ti ti-bolt" style={{ fontSize: 10 }} /> 847 credits
        </span>
        <button aria-label="Notifications" style={{ width: 26, height: 26, borderRadius: 6, background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          <i className="ti ti-bell" />
          <span style={{ position: 'absolute', top: 4, right: 4, width: 5, height: 5, background: '#ef4444', borderRadius: '50%' }} />
        </button>
        <button aria-label="Settings" style={{ width: 26, height: 26, borderRadius: 6, background: 'rgba(255,255,255,0.08)', border: 'none', color: '#fff', fontSize: 12, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <i className="ti ti-settings" />
        </button>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: 26, height: 26, borderRadius: '50%', background: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 700, color: '#fff', cursor: 'pointer' }}>PB</div>
          <span style={{ fontSize: 8, color: 'rgba(255,255,255,0.4)', marginTop: 1 }}>Senior Adv.</span>
        </div>
      </div>
    </header>
  )
}

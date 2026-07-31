'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useUIStore   } from '@/lib/store'
import { useCaseStore } from '@/lib/store'
import { casesApi, hearingsApi, documentsApi, statsApi } from '@/lib/api'
import CaseList     from '@/components/cases/CaseList'
import MetricsRow   from '@/components/dashboard/MetricsRow'
import QuickActions from '@/components/dashboard/QuickActions'
import HearingDiary from '@/components/dashboard/HearingDiary'
import AIInsights   from '@/components/dashboard/AIInsights'
import {
  DocumentsTab,
  HearingsTab,
  TasksTab,
  ResearchTab,
  TimelineTab,
} from '@/components/dashboard/DashboardTabs'

const TABS = ['Overview', 'Documents', 'Hearings', 'Tasks', 'Research', 'Timeline']

export default function DashboardPage() {
  const router = useRouter()
  const { caseListVisible, aiPanelVisible } = useUIStore()
  const { selectedCaseId, setSelectedCase } = useCaseStore()

  const [activeTab, setActiveTab] = useState('Overview')
  const [caseData,  setCaseData]  = useState<any>(null)
  const [hearings,  setHearings]  = useState<any[]>([])
  const [documents, setDocuments] = useState<any[]>([])
  const [activity,  setActivity]  = useState<any[]>([])

  const [aiPanelWidth, setAiPanelWidth] = useState(260)
  const [isResizingAi, setIsResizingAi] = useState(false)

  // Auto load first case if none selected
  useEffect(() => {
    if (selectedCaseId) return
    const token = localStorage.getItem('clausio_token')
    if (!token) return
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/cases`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(r => r.json())
      .then(cases => {
        if (Array.isArray(cases) && cases.length > 0) {
          setSelectedCase(cases[0].id, cases[0].name)
        }
      })
      .catch(err => console.error(err))
  }, [selectedCaseId, setSelectedCase])

  const loadHearings = useCallback(() => {
    if (!selectedCaseId) return
    hearingsApi.getByCaseId(selectedCaseId)
      .then(data => setHearings(Array.isArray(data) ? data : []))
      .catch(err => console.error(err))
  }, [selectedCaseId])

  // Reload case data whenever selectedCaseId changes
  useEffect(() => {
    if (!selectedCaseId) return
    setCaseData(null)
    setHearings([])
    setDocuments([])

    casesApi.getById(selectedCaseId)
      .then(data => setCaseData(data))
      .catch(err => console.error(err))

    loadHearings()

    documentsApi.getByCaseId(selectedCaseId)
      .then(data => setDocuments(Array.isArray(data) ? data : []))
      .catch(err => console.error(err))

  }, [selectedCaseId, loadHearings])

  useEffect(() => {
    statsApi.activity()
      .then(data => setActivity(Array.isArray(data) ? data : []))
      .catch(err => console.error(err))
  }, [])

  const overdueOrders = hearings
    .flatMap(h => h.orders ?? [])
    .filter(o => !o.done && new Date(o.deadline) < new Date())

  // Resize logic for AI Insights panel
  useEffect(() => {
    if (!isResizingAi) return
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate from right side of the screen
      const newWidth = window.innerWidth - e.clientX - 16
      if (newWidth > 220 && newWidth < 600) {
        setAiPanelWidth(newWidth)
      }
    }
    const handleMouseUp = () => setIsResizingAi(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isResizingAi])

  return (
    <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', margin: 16, borderRadius: 24 }}>

      {/* Breadcrumb */}
      <div className="glass-toolbar" style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '8px 16px', fontSize: 11, color: '#64748b', flexShrink: 0 }}>
        <span>Cases</span>
        <span style={{ color: '#94a3b8' }}>›</span>
        <span style={{ color: '#0f172a', fontWeight: 600 }}>{caseData?.name ?? 'Loading...'}</span>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* PANEL 1 — Case list */}
        <div style={{ flexShrink: 0, overflow: 'hidden', transition: 'width 0.22s ease', width: caseListVisible ? 216 : 0, borderRight: caseListVisible ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
          <CaseList />
        </div>

        {/* PANEL 2 — Main workspace */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>

          {/* Case header */}
          <div className="glass-toolbar" style={{ padding: '12px 16px', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.3px' }}>
                {caseData?.name ?? 'Select a case'}
              </span>
              {caseData && (
                <>
                  <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 20, fontWeight: 600, background: '#fef2f2', color: '#dc2626', border: '1px solid #fecaca' }}>● {caseData.status}</span>
                  {overdueOrders.length > 0 && (
                    <span style={{ fontSize: 10, padding: '2px 8px', borderRadius: 20, fontWeight: 600, background: '#fef3c7', color: '#d97706', border: '1px solid #fde68a' }}>{overdueOrders.length} overdue</span>
                  )}
                </>
              )}
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 10, color: '#64748b', fontWeight: 500 }}>Readiness</span>
                <div style={{ width: 80, height: 6, background: 'rgba(0,0,0,0.05)', borderRadius: 3, overflow: 'hidden', boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.05)' }}>
                  <div style={{ width: `${caseData?.readinessScore ?? 0}%`, height: 6, background: '#10b981', borderRadius: 3 }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#10b981' }}>{caseData?.readinessScore ?? 0}%</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, fontSize: 11, color: '#64748b', fontWeight: 500 }}>
              <span>{caseData?.court ?? '—'}</span>
              <span style={{ color: '#cbd5e1' }}>•</span>
              <span>{caseData?.caseNumber ?? '—'}</span>
              <span style={{ color: '#cbd5e1' }}>•</span>
              <span>Next: <strong style={{ color: '#0f172a' }}>
                {caseData?.nextHearing
                  ? new Date(caseData.nextHearing).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                  : '—'}
              </strong></span>
            </div>
          </div>

          {/* Tabs */}
          <div className="glass-toolbar" style={{ display: 'flex', overflowX: 'auto', flexShrink: 0, padding: '0 8px' }}>
            {TABS.map(t => (
              <button key={t} onClick={() => setActiveTab(t)}
                style={{ padding: '10px 12px', fontSize: 12, cursor: 'pointer', background: 'transparent', border: 'none', borderBottom: `2px solid ${activeTab === t ? '#3b82f6' : 'transparent'}`, color: activeTab === t ? '#1e40af' : '#64748b', fontWeight: activeTab === t ? 600 : 500, fontFamily: 'inherit', whiteSpace: 'nowrap', flexShrink: 0, transition: 'all 0.2s' }}>
                {t}
              </button>
            ))}
          </div>

          {/* Overdue alert */}
          {overdueOrders.length > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 7, background: '#fef2f2', borderBottom: '1px solid #fca5a5', borderLeft: '3px solid #dc2626', padding: '6px 12px', fontSize: 10, color: '#7f1d1d', flexShrink: 0 }}>
              <i className="ti ti-alert-triangle" style={{ color: '#dc2626', fontSize: 13 }} />
              <span style={{ fontWeight: 500 }}>{overdueOrders.length} overdue deadlines</span>
            </div>
          )}

          {/* Tab content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '10px 12px' }}>

            {!caseData && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 200, color: '#94a3b8', gap: 8 }}>
                <i className="ti ti-folder-open" style={{ fontSize: 32 }} />
                <span style={{ fontSize: 13 }}>Select a case from the left panel</span>
              </div>
            )}

            {/* OVERVIEW TAB */}
            {activeTab === 'Overview' && caseData && (
              <>
                <MetricsRow hearings={hearings} documents={documents} caseData={caseData} overdueCount={overdueOrders.length} />
                <QuickActions />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                  <HearingDiary hearings={hearings} onChanged={loadHearings} />
                  <div className="glass-card" style={{ borderRadius: 16, padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: '#0f172a', marginBottom: 10 }}>
                      <i className="ti ti-activity" style={{ fontSize: 14, color: '#64748b' }} />
                      Activity feed
                    </div>
                    {activity.length === 0 && (
                      <div style={{ fontSize: 11, color: '#94a3b8', padding: '8px 0' }}>No recent activity.</div>
                    )}
                    {activity.slice(0, 6).map((a, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, padding: '6px 0', borderBottom: i < Math.min(activity.length, 6) - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#3b82f6', flexShrink: 0, marginTop: 4 }} />
                        <div>
                          <div style={{ fontSize: 11, color: '#0f172a', fontWeight: 500 }}>{a.description}</div>
                          <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2 }}>
                            {a.occurredAt ? new Date(a.occurredAt).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' }) : ''}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Analytics */}
                <div className="glass-card" style={{ borderRadius: 16, padding: '12px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: '#0f172a', marginBottom: 12 }}>
                    <i className="ti ti-chart-pie" style={{ fontSize: 14, color: '#64748b' }} />
                    Practice analytics
                  </div>
                  <div style={{ display: 'flex', border: '1px solid rgba(0,0,0,0.05)', borderRadius: 12, overflow: 'hidden', background: 'rgba(255,255,255,0.4)' }}>
                    {[
                      { val: hearings.length.toString(),           lbl: 'Hearing entries',  clr: '#10b981' },
                      { val: `${caseData?.readinessScore ?? 0}%`, lbl: 'Case readiness',   clr: '#10b981' },
                      { val: overdueOrders.length.toString(),      lbl: 'Overdue tasks',    clr: overdueOrders.length > 0 ? '#ef4444' : '#10b981' },
                      { val: caseData?.priority ?? '—',            lbl: 'Priority',         clr: '#f59e0b' },
                    ].map((seg, i) => (
                      <div key={i} style={{ flex: 1, padding: '12px', textAlign: 'center', borderRight: i < 3 ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
                        <div style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', letterSpacing: '-0.5px' }}>{seg.val}</div>
                        <div style={{ fontSize: 10, color: '#64748b', marginTop: 2, fontWeight: 500 }}>{seg.lbl}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* DOCUMENTS TAB */}
            {activeTab === 'Documents' && caseData && (
              <DocumentsTab caseId={selectedCaseId} />
            )}

            {/* HEARINGS TAB */}
            {activeTab === 'Hearings' && caseData && (
              <HearingsTab caseId={selectedCaseId} />
            )}

            {/* TASKS TAB */}
            {activeTab === 'Tasks' && caseData && (
              <TasksTab caseId={selectedCaseId} />
            )}

            {/* RESEARCH TAB */}
            {activeTab === 'Research' && caseData && (
              <ResearchTab caseId={selectedCaseId} />
            )}

            {/* TIMELINE TAB */}
            {activeTab === 'Timeline' && caseData && (
              <TimelineTab caseId={selectedCaseId} />
            )}

          </div>
        </div>

        {/* PANEL 3 — AI Insights */}
        {aiPanelVisible && (
          <div 
            onMouseDown={() => setIsResizingAi(true)}
            style={{ width: 4, cursor: 'col-resize', background: isResizingAi ? '#3b82f6' : 'transparent', transition: 'background 0.2s' }}
            onMouseEnter={e => !isResizingAi && (e.currentTarget.style.background = 'rgba(59,130,246,0.3)')}
            onMouseLeave={e => !isResizingAi && (e.currentTarget.style.background = 'transparent')}
          />
        )}
        <div style={{ flexShrink: 0, overflow: 'hidden', transition: isResizingAi ? 'none' : 'width 0.22s ease', width: aiPanelVisible ? aiPanelWidth : 0, borderLeft: aiPanelVisible ? '1px solid rgba(0,0,0,0.05)' : 'none' }}>
          <AIInsights />
        </div>

      </div>
    </div>
  )
}

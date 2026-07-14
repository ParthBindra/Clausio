'use client'
// This is the main dashboard page — visible at /dashboard
// It uses components from src/components/

import { useState }   from 'react'
import { useUIStore } from '@/lib/store'
import CaseList       from '@/components/cases/CaseList'
import MetricsRow     from '@/components/dashboard/MetricsRow'
import QuickActions   from '@/components/dashboard/QuickActions'
import HearingDiary   from '@/components/dashboard/HearingDiary'
import AIInsights     from '@/components/dashboard/AIInsights'

const TABS = ['Overview','Documents','Timeline','Hearings','AI analysis','Drafts','Research','Evidence','Witnesses','Tasks','Billing','History']

const ACTIVITY = [
  { dot: '#7c3aed', text: 'AI summary generated',            sub: 'Today 10:30 AM · Clausio AI'  },
  { dot: '#3b82f6', text: 'Hospital records uploaded',       sub: 'Yesterday 4:15 PM · Parth B.' },
  { dot: '#10b981', text: 'Client update sent via WhatsApp', sub: '15 Jun 2:00 PM · Parth B.'    },
  { dot: '#f59e0b', text: '17 Jun hearing date confirmed',   sub: '14 Jun 11:00 AM · System'     },
]

export default function DashboardPage() {
  const { caseListVisible, aiPanelVisible } = useUIStore()
  const [activeTab, setActiveTab] = useState('Overview')

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 12px', background: '#fff', borderBottom: '1px solid #e2e8f0', fontSize: 10, color: '#94a3b8', flexShrink: 0 }}>
        <span>Cases</span>
        <span style={{ color: '#cbd5e1' }}>›</span>
        <span style={{ color: '#0f172a', fontWeight: 500 }}>Priya v. Rohit Sharma</span>
      </div>

      {/* Three panels side by side */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* PANEL 1 — Case list (left) */}
        <div style={{ flexShrink: 0, overflow: 'hidden', transition: 'width 0.22s ease', width: caseListVisible ? 216 : 0, borderRight: caseListVisible ? '1px solid #e2e8f0' : 'none' }}>
          <CaseList />
        </div>

        {/* PANEL 2 — Main workspace (centre) */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>

          {/* Case header */}
          <div style={{ padding: '8px 12px', background: '#fff', borderBottom: '1px solid #e2e8f0', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: '#0f172a' }}>Priya v. Rohit Sharma</span>
              <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 20, fontWeight: 600, background: '#fef2f2', color: '#dc2626' }}>● Hearing today</span>
              <span style={{ fontSize: 9, padding: '2px 6px', borderRadius: 20, fontWeight: 600, background: '#fef3c7', color: '#d97706' }}>2 overdue</span>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ fontSize: 9, color: '#64748b' }}>Readiness</span>
                <div style={{ width: 60, height: 5, background: '#e2e8f0', borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ width: '72%', height: 5, background: '#10b981', borderRadius: 3 }} />
                </div>
                <span style={{ fontSize: 9, fontWeight: 600, color: '#10b981' }}>72%</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 6, fontSize: 10, color: '#64748b' }}>
              <span>Family Court Bandra</span><span style={{ color: '#cbd5e1' }}>·</span>
              <span>FC/2847/2023</span><span style={{ color: '#cbd5e1' }}>·</span>
              <span>Next: <strong style={{ color: '#0f172a' }}>17 Jun 2024</strong></span>
            </div>
          </div>

          {/* 12 tabs */}
          <div style={{ display: 'flex', background: '#fff', borderBottom: '1px solid #e2e8f0', overflowX: 'auto', flexShrink: 0 }}>
            {TABS.map(t => (
              <button key={t} onClick={() => setActiveTab(t)}
                style={{ padding: '6px 10px', fontSize: 10, cursor: 'pointer', background: 'transparent', border: 'none', borderBottom: `2px solid ${activeTab === t ? '#3b82f6' : 'transparent'}`, color: activeTab === t ? '#1e40af' : '#64748b', fontWeight: activeTab === t ? 500 : 400, fontFamily: 'inherit', whiteSpace: 'nowrap', flexShrink: 0 }}>
                {t}
              </button>
            ))}
          </div>

          {/* Overdue alert */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, background: '#fef2f2', borderBottom: '1px solid #fca5a5', borderLeft: '3px solid #dc2626', padding: '6px 12px', fontSize: 10, color: '#7f1d1d', flexShrink: 0 }}>
            <i className="ti ti-alert-triangle" style={{ color: '#dc2626', fontSize: 13 }} />
            <span style={{ fontWeight: 500 }}>2 overdue deadlines</span>
            <span style={{ color: '#475569' }}>— Respondent reply due 27 May. Judge warned of ex-parte proceedings.</span>
            <button style={{ marginLeft: 'auto', padding: '2px 8px', borderRadius: 5, border: '1px solid #fca5a5', background: '#fff', color: '#dc2626', fontSize: 9, cursor: 'pointer', fontWeight: 600, fontFamily: 'inherit', whiteSpace: 'nowrap' }}>Resolve →</button>
          </div>

          {/* Scrollable content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '10px 12px' }}>
            <MetricsRow />
            <QuickActions />

            {/* Two columns */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 7, marginBottom: 7 }}>
              <HearingDiary />

              {/* Activity feed */}
              <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 9, padding: '9px 11px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 600, color: '#0f172a', marginBottom: 6 }}>
                  <i className="ti ti-activity" style={{ fontSize: 12, color: '#94a3b8' }} />
                  Activity feed
                  <span style={{ marginLeft: 'auto', fontSize: 9, color: '#3b82f6', cursor: 'pointer', fontWeight: 500 }}>View all</span>
                </div>
                {ACTIVITY.map((a, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, padding: '4px 0', borderBottom: i < ACTIVITY.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: a.dot, flexShrink: 0, marginTop: 3 }} />
                    <div>
                      <div style={{ fontSize: 10, color: '#0f172a' }}>{a.text}</div>
                      <div style={{ fontSize: 9, color: '#94a3b8', marginTop: 1 }}>{a.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Analytics */}
            <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 9, padding: '9px 11px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, fontWeight: 600, color: '#0f172a', marginBottom: 8 }}>
                <i className="ti ti-chart-pie" style={{ fontSize: 12, color: '#94a3b8' }} />
                Practice analytics
                <span style={{ marginLeft: 'auto', fontSize: 9, color: '#3b82f6', cursor: 'pointer', fontWeight: 500 }}>Full report →</span>
              </div>
              <div style={{ display: 'flex', border: '1px solid #e2e8f0', borderRadius: 6, overflow: 'hidden' }}>
                {[
                  { val: '82%',  lbl: 'Success rate',  trend: '↑ vs last qtr', clr: '#10b981' },
                  { val: '12.5L',lbl: 'Revenue (Rs)',   trend: '↑ 18% MoM',     clr: '#10b981' },
                  { val: '78%',  lbl: 'AI usage',       trend: '↑ 12pts',       clr: '#7c3aed' },
                  { val: '154',  lbl: 'Active cases',   trend: '→ Stable',      clr: '#f59e0b' },
                ].map((seg, i) => (
                  <div key={i} style={{ flex: 1, padding: '7px 8px', textAlign: 'center', borderRight: i < 3 ? '1px solid #e2e8f0' : 'none' }}>
                    <div style={{ fontSize: 16, fontWeight: 600, color: '#0f172a' }}>{seg.val}</div>
                    <div style={{ fontSize: 9, color: '#64748b', marginTop: 1 }}>{seg.lbl}</div>
                    <div style={{ fontSize: 9, fontWeight: 600, color: seg.clr, marginTop: 2 }}>{seg.trend}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* PANEL 3 — AI Insights (right) */}
        <div style={{ flexShrink: 0, overflow: 'hidden', transition: 'width 0.22s ease', width: aiPanelVisible ? 200 : 0, borderLeft: aiPanelVisible ? '1px solid #e2e8f0' : 'none' }}>
          <AIInsights />
        </div>

      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────
//  src/components/hearings/HearingHistory.tsx
//
//  RIGHT PANEL — Vertical timeline of all past hearings.
//
//  Each entry shows:
//  • Date + Stage + TODAY/badge
//  • Court location
//  • What happened
//  • Orders made (with status: OVERDUE/Done/Due date)
//
//  Bottom: Download Diary + Send Client Update buttons
//
//  USED IN: src/app/hearings/page.tsx
// ─────────────────────────────────────────────────

interface HearingOrder {
  text:       string
  status:     'overdue' | 'done' | 'due'
  dueLabel:   string
  icon:       string
  iconColor:  string
}

interface HearingEntry {
  date:    string
  stage:   string
  court:   string
  what:    string
  dotClr:  string
  badge?:  { text: string; bg: string; color: string }
  orders:  HearingOrder[]
}

// All hearing entries — will come from API later
const HEARINGS: HearingEntry[] = [
  {
    date:   '13 Jun 2024',
    stage:  'Interim Application',
    court:  'Family Court Bandra · Hall No. 7 · Judge R. Sharma',
    what:   'Judge expressed displeasure at non-compliance. Respondent granted final opportunity to file reply. Judge warned of ex-parte proceedings.',
    dotClr: '#f59e0b',
    badge:  { text: 'TODAY', bg: '#fef3c7', color: '#92400e' },
    orders: [
      { text: 'Respondent: File reply to interim application', status: 'due',  dueLabel: 'Due 24 Jun', icon: 'ti-circle-check', iconColor: '#f59e0b' },
    ],
  },
  {
    date:   '6 May 2024',
    stage:  'Interim Application',
    court:  'Family Court Bandra · Hall No. 7 · Judge R. Sharma',
    what:   '3-week deadline set for respondent to file reply to interim maintenance application.',
    dotClr: '#ef4444',
    orders: [
      { text: 'Respondent: File reply to interim application', status: 'overdue', dueLabel: 'Overdue — 27 May', icon: 'ti-alert-circle', iconColor: '#ef4444' },
      { text: 'Petitioner: File affidavit of assets',         status: 'overdue', dueLabel: 'Overdue — 1 Jun',  icon: 'ti-alert-circle', iconColor: '#ef4444' },
    ],
  },
  {
    date:   '4 Mar 2024',
    stage:  'Written Statement',
    court:  'Family Court Bandra · Hall No. 7 · Judge R. Sharma',
    what:   'Respondent filed written statement. Denied all allegations and relationship with Kavya Nair. Replication ordered within 30 days.',
    dotClr: '#3b82f6',
    orders: [
      { text: 'Petitioner: File replication within 30 days', status: 'done', dueLabel: 'Done — 1 Apr', icon: 'ti-circle-check', iconColor: '#10b981' },
    ],
  },
  {
    date:   '15 Jan 2024',
    stage:  'First Appearance',
    court:  'Family Court Bandra · Hall No. 7 · Judge R. Sharma',
    what:   'Both parties present. Written statement ordered within 45 days. No interim relief at this stage.',
    dotClr: '#10b981',
    orders: [
      { text: 'Respondent: File written statement within 45 days', status: 'done', dueLabel: 'Done — 4 Mar', icon: 'ti-circle-check', iconColor: '#10b981' },
    ],
  },
  {
    date:   '14 Dec 2023',
    stage:  'Filing & Admission',
    court:  'Family Court Bandra · Hall No. 7 · Judge R. Sharma',
    what:   'Case admitted. Notice issued to respondent. First appearance date fixed for 15 Jan 2024.',
    dotClr: '#10b981',
    orders: [
      { text: 'Respondent served notice via process server', status: 'done', dueLabel: 'Done — 28 Dec', icon: 'ti-circle-check', iconColor: '#10b981' },
    ],
  },
]

// Status badge colours
const STATUS_STYLES = {
  overdue: { bg: '#fef2f2', color: '#991b1b' },
  done:    { bg: '#f0fdf4', color: '#15803d' },
  due:     { bg: '#fef3c7', color: '#92400e' },
}

export default function HearingHistory() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

      <p style={{ fontSize: 10, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 8 }}>
        Hearing history
      </p>

      {/* Vertical timeline */}
      <div style={{ paddingLeft: 4 }}>
        {HEARINGS.map((h, i) => (
          <div
            key={i}
            style={{ display: 'flex', alignItems: 'flex-start', gap: 10, paddingBottom: 12 }}
          >
            {/* Dot + connector line */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: h.dotClr }} />
              {/* Connector line — hidden for last item */}
              {i < HEARINGS.length - 1 && (
                <div style={{ width: 1, background: '#e2e8f0', flex: 1, minHeight: 20, marginTop: 3 }} />
              )}
            </div>

            {/* Content */}
            <div style={{ flex: 1, paddingBottom: 4 }}>

              {/* Date + Stage + TODAY badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', fontSize: 12, fontWeight: 600, color: '#0f172a' }}>
                {h.date} — {h.stage}
                {h.badge && (
                  <span
                    style={{
                      fontSize: 9, padding: '1px 5px', borderRadius: 6,
                      fontWeight: 600, background: h.badge.bg, color: h.badge.color,
                    }}
                  >
                    {h.badge.text}
                  </span>
                )}
              </div>

              {/* Court */}
              <div style={{ fontSize: 10, color: '#64748b', marginTop: 2 }}>
                {h.court}
              </div>

              {/* What happened */}
              <div style={{ fontSize: 11, color: '#374151', marginTop: 4, lineHeight: 1.5 }}>
                {h.what}
              </div>

              {/* Orders */}
              {h.orders.map((o, j) => (
                <div
                  key={j}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '5px 8px', background: '#f8fafc',
                    border: '1px solid #e2e8f0', borderRadius: 6,
                    marginTop: 5, fontSize: 10, color: '#374151',
                  }}
                >
                  <i className={`ti ${o.icon}`} style={{ fontSize: 11, color: o.iconColor, flexShrink: 0 }} />
                  <span style={{ flex: 1 }}>{o.text}</span>
                  <span
                    style={{
                      fontSize: 9, padding: '1px 5px', borderRadius: 5,
                      fontWeight: 600, whiteSpace: 'nowrap',
                      background: STATUS_STYLES[o.status].bg,
                      color:      STATUS_STYLES[o.status].color,
                    }}
                  >
                    {o.dueLabel}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom action buttons */}
      <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
        <BottomBtn icon="ti-download">Download diary PDF</BottomBtn>
        <BottomBtn icon="ti-message" primary>Send client update</BottomBtn>
      </div>
    </div>
  )
}

function BottomBtn({ icon, primary, children }: { icon: string; primary?: boolean; children: React.ReactNode }) {
  return (
    <button
      style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
        padding: '7px 0', borderRadius: 7, fontSize: 11, fontWeight: 500,
        cursor: 'pointer', fontFamily: 'inherit',
        border: primary ? '1px solid #1e3a8a' : '1px solid #e2e8f0',
        background: primary ? '#1e3a8a' : '#f8fafc',
        color: primary ? '#fff' : '#64748b',
      }}
    >
      <i className={`ti ${icon}`} style={{ fontSize: 12 }} />
      {children}
    </button>
  )
}

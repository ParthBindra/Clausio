import React from 'react'

export default function DraftPreview() {
  return (
    <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: 9, display: 'flex', flexDirection: 'column', overflow: 'hidden', height: '100%' }}>
      <div style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <i className="ti ti-square" style={{ fontSize: 14, color: '#64748b' }} />
        <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Generated — Divorce Petition</span>
      </div>

      <div style={{ flex: 1, padding: '0 16px 16px 16px', overflowY: 'auto' }}>
        <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 9, padding: '24px', minHeight: 500, fontFamily: 'sans-serif', color: '#000', fontSize: 13, lineHeight: 1.6 }}>
          <div style={{ marginBottom: 20 }}>
            IN THE FAMILY COURT AT BANDRA, MUMBAI<br />
            FC/2847/2023
          </div>
          
          <div style={{ marginBottom: 20 }}>
            BETWEEN:<br />
            PRIYA RAJESH SHARMA &nbsp;&nbsp;&nbsp;&nbsp;...PETITIONER<br />
            AND<br />
            ROHIT VIKRAM SHARMA &nbsp;&nbsp;&nbsp;&nbsp;...RESPONDENT
          </div>
          
          <div style={{ marginBottom: 20 }}>
            PETITION UNDER SECTION 13 OF THE<br />
            HINDU MARRIAGE ACT 1955
          </div>

          <div style={{ marginBottom: 20 }}>
            FACTS OF THE CASE:
          </div>

          <p style={{ marginBottom: 20 }}>
            1. The Petitioner and Respondent were married on 14th February 2015 at Shiv Mandir, Dadar, Mumbai as per Hindu rites and ceremonies...
          </p>
          <p style={{ marginBottom: 20 }}>
            2. On 12th August 2020, the Respondent in a drunken state assaulted the Petitioner causing injuries to her left arm and face, necessitating a 2-day hospitalisation at Lilavati Hospital, Bandra (Exhibit B)...
          </p>
        </div>
      </div>
    </div>
  )
}

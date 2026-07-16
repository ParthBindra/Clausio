'use client'

export default function DeadlineBanner() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#fef2f2',
        border: '1px solid #fecaca',
        borderLeft: '5px solid #dc2626',
        borderRadius: 12,
        padding: '18px 20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 16,
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: '50%',
            background: '#fee2e2',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <i
            className="ti ti-alert-triangle"
            style={{
              fontSize: 22,
              color: '#dc2626',
            }}
          />
        </div>

        <div>
          <div
            style={{
              fontWeight: 700,
              color: '#991b1b',
              fontSize: 16,
            }}
          >
            2 Overdue Deadlines
          </div>

          <div
            style={{
              marginTop: 6,
              fontSize: 14,
              color: '#7f1d1d',
              lineHeight: 1.6,
            }}
          >
            Respondent Reply was due on <b>27 May</b>.
            <br />
            Petitioner Affidavit was due on <b>1 June</b>.
          </div>
        </div>
      </div>

      <button
        style={{
          padding: '10px 18px',
          background: '#dc2626',
          color: '#ffffff',
          border: 'none',
          borderRadius: 10,
          cursor: 'pointer',
          fontWeight: 600,
        }}
      >
        Resolve
      </button>
    </div>
  )
}
'use client'

import { useState } from 'react'

import ReadinessTabs from '@/components/readiness/ReadinessTabs'
import EmergencyResponse from '@/components/readiness/EmergencyResponse'
import ReadinessScore from '@/components/readiness/ReadinessScore'
import GapAnalysis from '@/components/readiness/GapAnalysis'
import StrengthAnalysis from '@/components/readiness/StrengthAnalysis'
import GenerateReadinessModal from '@/components/readiness/GenerateReadinessModal'

export default function ReadinessPage() {
  const [activeTab, setActiveTab] = useState('Overview')
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div
        style={{
          height: '100%',
          background: '#f8fafc',
          overflowY: 'auto',
          padding: 24,
        }}
      >
        {/* ================= HEADER ================= */}

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 24,
          }}
        >
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: 28,
                fontWeight: 700,
                color: '#0f172a',
              }}
            >
              Case Readiness
            </h1>

            <p
              style={{
                marginTop: 6,
                color: '#64748b',
                fontSize: 14,
              }}
            >
              AI readiness assessment before your next hearing.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <div
              style={{
                padding: '10px 18px',
                borderRadius: 999,
                background: '#eff6ff',
                color: '#2563eb',
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              Family & Matrimonial
            </div>

            <button
              onClick={() => setShowModal(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '11px 18px',
                border: 'none',
                borderRadius: 10,
                background: '#2563eb',
                color: '#fff',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: 14,
              }}
            >
              <i className="ti ti-sparkles" />
              Generate AI Report
            </button>
          </div>
        </div>

        {/* ================= TABS ================= */}

        <ReadinessTabs
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {/* ================= OVERVIEW ================= */}

        {activeTab === 'Overview' && (
          <>
            <EmergencyResponse />

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '40% 60%',
                gap: 24,
                marginTop: 24,
              }}
            >
              <ReadinessScore />

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 20,
                }}
              >
                <GapAnalysis />

                <StrengthAnalysis />
              </div>
            </div>
          </>
        )}

        {/* ================= EVIDENCE ================= */}

        {activeTab === 'Evidence' && (
          <ComingSoonCard
            icon="ti-file-search"
            title="Evidence Analysis"
            description="AI will analyse evidence quality, contradictions, missing exhibits and witness support."
          />
        )}

        {/* ================= ARGUMENTS ================= */}

        {activeTab === 'Arguments' && (
          <ComingSoonCard
            icon="ti-scale"
            title="Arguments Review"
            description="Analyse legal arguments, probable objections and counter-strategies before court."
          />
        )}

        {/* ================= DOCUMENTS ================= */}

        {activeTab === 'Documents' && (
          <ComingSoonCard
            icon="ti-files"
            title="Document Readiness"
            description="Review filing status, pending documents and affidavit completeness."
          />
        )}

        {/* ================= TIMELINE ================= */}

        {activeTab === 'Timeline' && (
          <ComingSoonCard
            icon="ti-calendar-event"
            title="Timeline Review"
            description="View chronological events, hearings, deadlines and AI observations."
          />
        )}
      </div>

      {showModal && (
        <GenerateReadinessModal
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}

/* ========================================================= */

function ComingSoonCard({
  icon,
  title,
  description,
}: {
  icon: string
  title: string
  description: string
}) {
  return (
    <div
      style={{
        marginTop: 24,
        background: '#fff',
        border: '1px solid #e2e8f0',
        borderRadius: 16,
        padding: 50,
        textAlign: 'center',
      }}
    >
      <div
        style={{
          width: 70,
          height: 70,
          margin: '0 auto',
          borderRadius: 18,
          background: '#eff6ff',
          color: '#2563eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 34,
        }}
      >
        <i className={`ti ${icon}`} />
      </div>

      <h2
        style={{
          marginTop: 20,
          color: '#0f172a',
        }}
      >
        {title}
      </h2>

      <p
        style={{
          maxWidth: 600,
          margin: '12px auto 0',
          color: '#64748b',
          lineHeight: 1.8,
        }}
      >
        {description}
      </p>
    </div>
  )
}
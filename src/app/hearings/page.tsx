'use client'

import { useState } from 'react'

import HearingForm from '@/components/hearings/HearingForm'
import HearingHistory from '@/components/hearings/HearingHistory'
import AddHearingModal from '@/components/hearings/AddHearingModal'
import HearingTabs from '@/components/hearings/HearingTabs'
import DeadlineBanner from '@/components/hearings/DeadlineBanner'

export default function HearingsPage() {
  const [showAddModal, setShowAddModal] = useState(false)

  const [activeTab, setActiveTab] = useState('Hearing Diary')

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
            marginBottom: 20,
          }}
        >
          {/* Left */}

          <div>
            <h1
              style={{
                margin: 0,
                fontSize: 28,
                fontWeight: 700,
                color: '#0f172a',
              }}
            >
              Hearings
            </h1>

            <p
              style={{
                marginTop: 6,
                fontSize: 14,
                color: '#64748b',
              }}
            >
              Hearing diary, preparation and witness intelligence
            </p>
          </div>

          {/* Right */}

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
              onClick={() => setShowAddModal(true)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '11px 18px',
                border: 'none',
                borderRadius: 10,
                cursor: 'pointer',
                background: '#2563eb',
                color: '#fff',
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              <i className="ti ti-plus" />
              Add Hearing
            </button>
          </div>
        </div>

        {/* ================= TABS ================= */}

        <HearingTabs
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {/* ================= DEADLINE ================= */}

        <div
          style={{
            marginTop: 20,
          }}
        >
          <DeadlineBanner />
        </div>

        {/* ================= PAGE CONTENT ================= */}

        <div
          style={{
            marginTop: 24,
          }}
        >
                    {/* ================= HEARING DIARY ================= */}

          {activeTab === 'Hearing Diary' && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '42% 58%',
                gap: 24,
              }}
            >
              <HearingForm />

              <HearingHistory />
            </div>
          )}

          {/* ================= PREP BRIEF ================= */}

          {activeTab === 'Prep Brief' && (
            <div
              style={{
                background: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: 16,
                padding: 30,
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: 22,
                  color: '#0f172a',
                  marginBottom: 12,
                }}
              >
                Hearing Preparation Brief
              </h2>

              <p
                style={{
                  color: '#64748b',
                  marginBottom: 24,
                }}
              >
                AI generated preparation notes before the next hearing.
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 20,
                }}
              >
                <div
                  style={{
                    background: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    borderRadius: 12,
                    padding: 20,
                  }}
                >
                  <h3 style={{ marginTop: 0 }}>Today's Objective</h3>

                  <p>
                    Secure interim maintenance order and oppose adjournment.
                  </p>
                </div>

                <div
                  style={{
                    background: '#fefce8',
                    border: '1px solid #fde68a',
                    borderRadius: 12,
                    padding: 20,
                  }}
                >
                  <h3 style={{ marginTop: 0 }}>Judge Notes</h3>

                  <p>
                    Previous warning issued to respondent regarding delay.
                  </p>
                </div>

                <div
                  style={{
                    background: '#ecfdf5',
                    border: '1px solid #86efac',
                    borderRadius: 12,
                    padding: 20,
                  }}
                >
                  <h3 style={{ marginTop: 0 }}>Arguments</h3>

                  <ul>
                    <li>Repeated non-compliance.</li>
                    <li>Financial hardship of petitioner.</li>
                    <li>Delay tactics by respondent.</li>
                  </ul>
                </div>

                <div
                  style={{
                    background: '#fef2f2',
                    border: '1px solid #fecaca',
                    borderRadius: 12,
                    padding: 20,
                  }}
                >
                  <h3 style={{ marginTop: 0 }}>Documents Required</h3>

                  <ul>
                    <li>Updated Income Affidavit</li>
                    <li>Medical Bills</li>
                    <li>Bank Statements</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* ================= WITNESS INTELLIGENCE ================= */}

          {activeTab === 'Witness Intelligence' && (
            <div
              style={{
                background: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: 16,
                padding: 30,
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: 22,
                  color: '#0f172a',
                  marginBottom: 12,
                }}
              >
                Witness Intelligence
              </h2>

              <p
                style={{
                  color: '#64748b',
                  marginBottom: 24,
                }}
              >
                AI analysis of witness credibility and cross examination.
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 20,
                }}
              >
                <div
                  style={{
                    background: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: 12,
                    padding: 20,
                  }}
                >
                  <h3>Primary Witness</h3>

                  <p>
                    Mother of petitioner
                  </p>

                  <p
                    style={{
                      color: '#16a34a',
                      fontWeight: 600,
                    }}
                  >
                    Credibility Score: 92%
                  </p>
                </div>

                <div
                  style={{
                    background: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: 12,
                    padding: 20,
                  }}
                >
                  <h3>Risk Factors</h3>

                  <ul>
                    <li>Memory inconsistencies</li>
                    <li>Financial questions expected</li>
                    <li>Timeline clarification required</li>
                  </ul>
                </div>

                <div
                  style={{
                    background: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    borderRadius: 12,
                    padding: 20,
                  }}
                >
                  <h3>Cross Examination Questions</h3>

                  <ul>
                    <li>Income proof?</li>
                    <li>Medical expenditure proof?</li>
                    <li>Communication records?</li>
                  </ul>
                </div>

                <div
                  style={{
                    background: '#ecfdf5',
                    border: '1px solid #86efac',
                    borderRadius: 12,
                    padding: 20,
                  }}
                >
                  <h3>AI Recommendation</h3>

                  <p>
                    Prepare documentary evidence before oral examination.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {showAddModal && (
        <AddHearingModal
          onClose={() => setShowAddModal(false)}
        />
      )}
    </>
  )
}
        
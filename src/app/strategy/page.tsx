'use client'

import { useState } from 'react'

import StrategyTabs from '@/components/strategy/StrategyTabs'
import RiskAssessment from '@/components/strategy/RiskAssessment'
import ActionPlan from '@/components/strategy/ActionPlan'
import RecommendationPanel from '@/components/strategy/RecommendationPanel'
import LegalResearch from '@/components/strategy/LegalResearch'
import GenerateStrategyModal from '@/components/strategy/GenerateStrategyModal'

export default function StrategyPage() {
  const [showModal, setShowModal] = useState(false)

  const [activeTab, setActiveTab] = useState('Risk Assessment')

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
        {/* Header */}

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 22,
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
              Strategy
            </h1>

            <p
              style={{
                marginTop: 6,
                color: '#64748b',
                fontSize: 14,
              }}
            >
              AI litigation strategy and recommendations.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              gap: 14,
              alignItems: 'center',
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
                cursor: 'pointer',
                background: '#2563eb',
                color: '#fff',
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              <i className="ti ti-sparkles" />
              Run AI
            </button>
          </div>
        </div>

        <StrategyTabs
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        <div style={{ marginTop: 24 }}>

          {activeTab === 'Risk Assessment' && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '38% 62%',
                gap: 24,
              }}
            >
              <RiskAssessment />
              <ActionPlan />
            </div>
          )}

          {activeTab === 'Recommendations' && (
            <RecommendationPanel />
          )}

          {activeTab === 'Action Plan' && (
            <ActionPlan />
          )}

          {activeTab === 'Document Gaps' && (
            <div
              style={{
                background: '#fff',
                padding: 30,
                borderRadius: 16,
                border: '1px solid #e2e8f0',
              }}
            >
              Document Gaps Component Coming Soon
            </div>
          )}

          {activeTab === 'Legal Research' && (
            <LegalResearch />
          )}

        </div>
      </div>

      {showModal && (
        <GenerateStrategyModal
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}
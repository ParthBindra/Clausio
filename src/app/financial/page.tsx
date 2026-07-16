'use client'

import { useState } from 'react'

import FinancialTabs from '@/components/financial/FinancialTabs'
import IncomeReality from '@/components/financial/IncomeReality'
import MaintenanceRange from '@/components/financial/MaintenanceRange'
import MaintenanceCalculator from '@/components/financial/MaintenanceCalculator'
import SettlementCalculator from '@/components/financial/SettlementCalculator'
import AnalyzeFinancialModal from '@/components/financial/AnalyzeFinancialModal'

export default function FinancialPage() {
  const [activeTab, setActiveTab] = useState('Financial Intelligence')
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
              Financial Intelligence
            </h1>

            <p
              style={{
                marginTop: 6,
                color: '#64748b',
                fontSize: 14,
              }}
            >
              AI-powered financial investigation and maintenance analysis.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              gap: 14,
              alignItems: 'center',
            }}
          >
            {/* Case Badge */}

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

            {/* Analyze Button */}

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
              <i className="ti ti-chart-bar" />
              Analyse
            </button>
          </div>
        </div>

        {/* ================= Tabs ================= */}

        <FinancialTabs
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {/* ================= Content ================= */}

        <div style={{ marginTop: 24 }}>

          {activeTab === 'Financial Intelligence' && (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '42% 58%',
                gap: 24,
              }}
            >
              <IncomeReality />

              <MaintenanceRange />
            </div>
          )}

          {activeTab === 'Maintenance Calculator' && (
            <MaintenanceCalculator />
          )}

          {activeTab === 'Settlement Calculator' && (
            <SettlementCalculator />
          )}

        </div>
      </div>

      {/* ================= Modal ================= */}

      {showModal && (
        <AnalyzeFinancialModal
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}
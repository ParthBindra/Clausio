'use client'

import { useState } from 'react'

import BillingTabs from '@/components/billing/BillingTabs'

import BillingOverview from '@/components/billing/BillingOverview'
import Invoices from '@/components/billing/Invoices'
import Payments from '@/components/billing/Payments'
import Expenses from '@/components/billing/Expenses'
import ClientBilling from '@/components/billing/ClientBilling'
import TrustAccounts from '@/components/billing/TrustAccounts'
import FinancialReports from '@/components/billing/FinancialReports'
import Subscription from '@/components/billing/Subscription'
import GSTManagement from '@/components/billing/GSTManagement'

import GenerateInvoiceModal from '@/components/billing/GenerateInvoiceModal'

export default function BillingPage() {
  const [activeTab, setActiveTab] = useState('Overview')
  const [showModal, setShowModal] = useState(false)

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <BillingOverview />

      case 'Invoices':
        return <Invoices />

      case 'Payments':
        return <Payments />

      case 'Expenses':
        return <Expenses />

      case 'Client Billing':
        return <ClientBilling />

      case 'Trust Accounts':
        return <TrustAccounts />

      case 'Reports':
        return <FinancialReports />

      case 'Subscription':
        return <Subscription />

      case 'GST':
        return <GSTManagement />

      default:
        return <BillingOverview />
    }
  }

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
              Billing & Finance
            </h1>

            <p
              style={{
                marginTop: 6,
                color: '#64748b',
                fontSize: 14,
              }}
            >
              Manage invoices, payments, subscriptions and law firm finances.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              gap: 12,
            }}
          >
            <button
              style={{
                background: '#fff',
                border: '1px solid #dbe3ef',
                borderRadius: 10,
                padding: '11px 18px',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              <i
                className="ti ti-download"
                style={{ marginRight: 8 }}
              />

              Export
            </button>

            <button
              onClick={() => setShowModal(true)}
              style={{
                background: '#2563eb',
                color: '#fff',
                border: 'none',
                borderRadius: 10,
                padding: '11px 18px',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              <i
                className="ti ti-plus"
                style={{ marginRight: 8 }}
              />

              Generate Invoice
            </button>
          </div>
        </div>

        {/* ================= TABS ================= */}

        <BillingTabs
          activeTab={activeTab}
          onChange={setActiveTab}
        />

        {/* ================= CONTENT ================= */}

        <div
          style={{
            marginTop: 24,
          }}
        >
          {renderContent()}
        </div>
      </div>

      {showModal && (
        <GenerateInvoiceModal
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}
'use client'

import { useState } from 'react'

import WhatsAppUpdate from '@/components/client/WhatsAppUpdate'
import WhatsAppPreview from '@/components/client/WhatsAppPreview'
import GenerateUpdateModal from '@/components/client/GenerateUpdateModal'

export default function ClientPage() {
  const [activeTab, setActiveTab] = useState<'update' | 'fees'>('update')
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
              Client
            </h1>

            <p
              style={{
                marginTop: 6,
                color: '#64748b',
                fontSize: 14,
              }}
            >
              Generate client updates instantly using AI.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            {/* Client Badge */}

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
              Priya Rajesh Sharma
            </div>

            {/* Generate Button */}

            <button
              onClick={() => setShowModal(true)}
              style={{
                padding: '11px 20px',
                borderRadius: 10,
                border: 'none',
                background: '#2563eb',
                color: '#fff',
                cursor: 'pointer',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <i className="ti ti-sparkles" />
              Generate Update
            </button>
          </div>
        </div>

        {/* ================= TABS ================= */}

        <div
          style={{
            display: 'flex',
            gap: 12,
            borderBottom: '1px solid #e2e8f0',
            paddingBottom: 12,
            marginBottom: 24,
          }}
        >
          <TabButton
            active={activeTab === 'update'}
            onClick={() => setActiveTab('update')}
          >
            WhatsApp Update
          </TabButton>

          <TabButton
            active={activeTab === 'fees'}
            onClick={() => setActiveTab('fees')}
          >
            Fee Tracker
          </TabButton>
        </div>

        {/* ================= CONTENT ================= */}

        {activeTab === 'update' && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '36% 64%',
              gap: 24,
            }}
          >
            <WhatsAppUpdate />

            <WhatsAppPreview />
          </div>
        )}

        {activeTab === 'fees' && (
          <div
            style={{
              background: '#ffffff',
              borderRadius: 16,
              padding: 32,
              border: '1px solid #e2e8f0',
              textAlign: 'center',
              color: '#64748b',
            }}
          >
            Fee Tracker will be built next.
          </div>
        )}
      </div>

      {/* ================= MODAL ================= */}

      {showModal && (
        <GenerateUpdateModal
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}

/* ================= TAB ================= */

function TabButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '10px 18px',
        border: 'none',
        borderRadius: 10,
        cursor: 'pointer',
        fontWeight: 600,
        fontSize: 14,
        fontFamily: 'inherit',

        background: active
          ? '#2563eb'
          : '#f8fafc',

        color: active
          ? '#ffffff'
          : '#64748b',

        boxShadow: active
          ? '0 6px 16px rgba(37,99,235,.25)'
          : 'none',
      }}
    >
      {children}
    </button>
  )
}
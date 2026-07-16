'use client'

import { useState } from 'react'

import AnalyticsTabs from '@/components/analytics/AnalyticsTabs'

import AIChat from '@/components/analytics/AIChat'
import LegalResearch from '@/components/analytics/LegalResearch'
import CrossExamination from '@/components/analytics/CrossExamination'
import StrategyAssistant from '@/components/analytics/StrategyAssistant'
import JudgeInsights from '@/components/analytics/JudgeInsights'
import PromptLibrary from '@/components/analytics/PromptLibrary'
import AIHistory from '@/components/analytics/AIHistory'
import KnowledgeBase from '@/components/analytics/KnowledgeBase'
import AITools from '@/components/analytics/AITools'
import AIAutomation from '@/components/analytics/AIAutomation'

export default function AnalyticsPage() {

  const [activeTab, setActiveTab] = useState('AI Chat')

  return (
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
              fontSize: 30,
              fontWeight: 700,
              color: '#0f172a',
            }}
          >
            AI Analytics
          </h1>

          <p
            style={{
              marginTop: 8,
              fontSize: 14,
              color: '#64748b',
            }}
          >
            Your AI legal operating system for research, analysis and automation.
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
            AI Credits : 842
          </div>

          <button
            style={{
              border: '1px solid #cbd5e1',
              background: '#fff',
              borderRadius: 10,
              padding: '11px 18px',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            <i
              className="ti ti-upload"
              style={{ marginRight: 8 }}
            />
            Upload Knowledge
          </button>

          <button
            style={{
              border: 'none',
              background: '#2563eb',
              color: '#fff',
              borderRadius: 10,
              padding: '11px 18px',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            <i
              className="ti ti-message-chatbot"
              style={{ marginRight: 8 }}
            />
            New Chat
          </button>
        </div>
      </div>

      {/* ================= TABS ================= */}

      <AnalyticsTabs
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      {/* ================= CONTENT ================= */}

      <div
        style={{
          marginTop: 24,
        }}
      >
        {activeTab === 'AI Chat' && <AIChat />}

        {activeTab === 'Legal Research' && (
          <LegalResearch />
        )}

        {activeTab === 'Cross Examination' && (
          <CrossExamination />
        )}

        {activeTab === 'Strategy Assistant' && (
          <StrategyAssistant />
        )}

        {activeTab === 'Judge Insights' && (
          <JudgeInsights />
        )}

        {activeTab === 'Prompt Library' && (
          <PromptLibrary />
        )}

        {activeTab === 'History' && (
          <AIHistory />
        )}

        {activeTab === 'Knowledge Base' && (
          <KnowledgeBase />
        )}

        {activeTab === 'AI Tools' && (
          <AITools />
        )}

        {activeTab === 'Automation' && (
          <AIAutomation />
        )}
      </div>
    </div>
  )
}
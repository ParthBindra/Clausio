'use client'

import CasesHeader from '@/components/cases/CasesHeader'
import CasesSearch from '@/components/cases/CasesSearch'
import CaseStats from '@/components/cases/CaseStats'
import PracticeAreas from '@/components/cases/PracticeAreas'

export default function CasesPage() {
  return (
    <div
      style={{
        padding: 32,
        background: '#f8fafc',
        minHeight: '100vh',
      }}
    >
      {/* Header */}

      <CasesHeader />

      {/* Search */}

      <div
        style={{
          marginTop: 28,
        }}
      >
        <CasesSearch />
      </div>

      {/* Statistics */}

      <div
        style={{
          marginTop: 28,
        }}
      >
        <CaseStats />
      </div>

      {/* Practice Areas */}

      <div
        style={{
          marginTop: 36,
        }}
      >
        <PracticeAreas />
      </div>
    </div>
  )
}
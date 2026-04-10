"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import EnterpriseOnboarding from '@/components/onboarding/enterprise-wizard'

export default function EnterpriseOnboardingPage() {
  const router = useRouter()
  const [isInitializing, setIsInitializing] = useState(false)

  const handleComplete = async (finalData: any) => {
    setIsInitializing(true)
    
    try {
      // Send wizard data — the server reads the authenticated userId from the session
      const response = await fetch('/api/onboarding/enterprise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(finalData),
      })

      if (!response.ok) throw new Error('Failed to complete onboarding')

      router.push('/dashboard/enterprise')
      
    } catch (error) {
      console.error('Onboarding Error:', error)
      alert('System initialization failed. Please try again.')
    } finally {
      setIsInitializing(false)
    }
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <EnterpriseOnboarding 
        onComplete={handleComplete}
        isInitializing={isInitializing}
      />
    </main>
  )
}

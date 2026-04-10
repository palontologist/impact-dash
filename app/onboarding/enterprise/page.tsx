"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import EnterpriseOnboarding from '@/components/onboarding/enterprise-wizard'
import { createEnterpriseProfile } from '@/lib/enterprise-seed' // We'll use this for the demo logic

export default function EnterpriseOnboardingPage() {
  const router = useRouter()
  const [isInitializing, setIsInitializing] = useState(false)

  // In a real production app, we would get the clerkUserId from useAuth()
  // For the demo, we'll use a hardcoded ID or a mock
  const MOCK_CLERK_USER_ID = "user_wattcharge_123"

  const handleComplete = async (finalData: any) => {
    setIsInitializing(true)
    
    try {
      // 1. Update the profile in the database
      const response = await fetch('/api/onboarding/enterprise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clerkUserId: MOCK_CLERK_USER_ID,
          ...finalData
        }),
      })

      if (!response.ok) throw new Error('Failed to complete onboarding')

      // 2. Redirect to the Enterprise Dashboard
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
      {/* We pass a callback to the wizard to handle the final step */}
      <EnterpriseOnboarding 
        onComplete={handleComplete} 
      />
    </main>
  )
}

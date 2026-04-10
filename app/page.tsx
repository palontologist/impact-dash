"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Terminal, Activity, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg-primary text-fg-primary selection:bg-bg-brand-solid selection:text-white font-body overflow-hidden">
      
      <main className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center">
        
        {/* Section Label */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 section-label inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-primary bg-bg-secondary"
        >
          <Terminal className="w-3 h-3" />
          Carbon OS v1.0.0
        </motion.div>

        {/* Main Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[5rem] max-w-4xl mb-6 leading-[1.05]"
        >
          Operational <span className="text-fg-tertiary italic">Carbon</span> Intelligence.
        </motion.h1>

        {/* One-liner Description */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-fg-secondary max-w-xl mb-12 font-body leading-relaxed"
        >
          A high-fidelity command center for enterprises to track, analyze, and reduce 
          their operational carbon footprint in real-time.
        </motion.p>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <SignedOut>
            <SignInButton mode="modal">
              <Button size="lg" className="bg-bg-brand-solid text-white hover:bg-bg-brand-solid/90 px-8 py-6 text-base font-medium rounded-full transition-all hover:scale-105 active:scale-95">
                Initialize System
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Link href="/enterprise/dashboard">
              <Button size="lg" className="bg-bg-brand-solid text-white hover:bg-bg-brand-solid/90 px-8 py-6 text-base font-medium rounded-full transition-all hover:scale-105 active:scale-95">
                Enter Command Center
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </motion.div>

        {/* Bottom Status Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-8 text-fg-tertiary text-xs font-accent uppercase tracking-widest"
        >
          <div className="flex items-center gap-2">
            <Activity className="w-3 h-3" />
            <span>System: Online</span>
          </div>
          <div className="w-px h-3 bg-border-primary" />
          <div>
            <span>Latency: 14ms</span>
          </div>
        </motion.div>

      </main>
    </div>
  )
}

"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Terminal, ShieldCheck, Database, Globe, Activity, CheckCircle2, Loader2 } from "lucide-react"

// --- Types ---
type Step = 'identity' | 'baseline' | 'streams' | 'deploying' | 'complete'

interface OnboardingData {
  name: string
  industry: string
  website: string
  baselineIntensity: number
  dataMethod: 'manual' | 'csv' | 'api'
}

interface EnterpriseOnboardingProps {
  onComplete: (data: OnboardingData) => void
  isInitializing?: boolean
}

// --- Sub-Components ---

const StepIndicator = ({ currentStep }: { currentStep: number }) => (
  <div className="flex items-center justify-center space-x-4 mb-8">
    {[1, 2, 3].map((step) => (
      <React.Fragment key={step}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
          step <= currentStep ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-500'
        }`}>
          {step}
        </div>
        {step < 3 && (
          <div className={`w-12 h-1 transition-colors ${step < currentStep ? 'bg-slate-900' : 'bg-slate-200'}`} />
        )}
      </React.Fragment>
    ))}
  </div >
)

// --- Main Component ---

export default function EnterpriseOnboarding({ onComplete, isInitializing = false }: EnterpriseOnboardingProps) {
  const [step, setStep] = useState<Step>('identity')
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<OnboardingData>({
    name: '',
    industry: '',
    website: '',
    baselineIntensity: 0,
    dataMethod: 'manual'
  })

  const nextStep = () => {
    if (step === 'identity') setStep('baseline')
    else if (step === 'baseline') setStep('streams')
    else if (step === 'streams') handleDeployment()
  }

  const handleDeployment = async () => {
    setStep('deploying')
    setLoading(true)
    
    // Simulate "System Initialization"
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    setLoading(false)
    setStep('complete')
    
    // Trigger the parent callback
    onComplete(data)
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
      <div className="max-w-xl w-full">
        
        {/* Header / System Status */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-mono uppercase tracking-widest mb-4">
            <Terminal className="w-3 h-3 mr-2" />
            System Initialization Mode
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Carbon OS Setup</h1>
          <p className="text-slate-500">Configure your enterprise environment.</p>
        </div>

        <AnimatePresence mode="wait">
          {step !== 'complete' && step !== 'deploying' && (
            <motion.div
              key="wizard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <StepIndicator currentStep={step === 'identity' ? 1 : step === 'baseline' ? 2 : 3} />
              
              <Card className="border-none shadow-2xl bg-white overflow-hidden">
                <CardContent className="p-8">
                  {step === 'identity' && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label className="text-xs uppercase tracking-wider text-slate-400">Organization Identity</Label>
                        <div className="space-y-4">
                          <div className="space-y-1">
                            <Label htmlFor="name">Company Name</Label>
                            <Input 
                              id="name" 
                              placeholder="e.g. Wattcharge Logistics" 
                              required 
                              value={data.name}
                              onChange={(e) => setData({...data, name: e.target.value})}
                            />
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="industry">Industry Sector</Label>
                            <Select onValueChange={(v) => setData({...data, industry: v})}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select industry" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="logistics">Logistics & Transport</SelectItem>
                                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                                <SelectItem value="agriculture">Agriculture</SelectItem>
                                <SelectItem value="energy">Energy & Utilities</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-1">
                            <Label htmlFor="website">Corporate Website</Label>
                            <Input 
                              id="website" 
                              placeholder="https://..." 
                              value={data.website}
                              onChange={(e) => setData({...data, website: e.target.value})}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 'baseline' && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label className="text-xs uppercase tracking-wider text-slate-400">Environmental Baseline</Label>
                        <p className="text-sm text-slate-500 mb-4">Set your current average carbon intensity to establish a benchmark for savings.</p>
                        <div className="space-y-4">
                          <div className="space-y-1">
                            <Label htmlFor="baseline">Baseline Intensity (kg CO2e / ton)</Label>
                            <Input 
                              id="baseline" 
                              type="number" 
                              placeholder="e.g. 450" 
                              value={data.baselineIntensity || ''}
                              onChange={(e) => setData({...data, baselineIntensity: parseFloat(e.target.value)})}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 'streams' && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label className="text-xs uppercase tracking-wider text-slate-400">Data Ingestion Streams</Label>
                        <p className="text-sm text-slate-500 mb-4">How will your operational data reach the Command Center?</p>
                        <div className="grid grid-cols-1 gap-3">
                          {[
                            { id: 'manual', label: 'Manual Entry', desc: 'Staff logs shipments via mobile/web', icon: Activity },
                            { id: 'csv', label: 'Batch Upload', desc: 'Weekly CSV/Excel uploads', icon: Database },
                            { id: 'api', label: 'Direct API Sync', desc: 'Automated ERP/Logistics integration', icon: Globe },
                          ].map((item) => (
                            <div 
                              key={item.id}
                              onClick={() => setData({...data, dataMethod: item.id as any})}
                              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all ${
                                data.dataMethod === item.id ? 'border-slate-900 bg-slate-50 ring-1 ring-slate-900' : 'border-slate-200 hover:border-slate-300'
                              }`}
                            >
                              <item.icon className={`w-5 h-5 mr-4 ${data.dataMethod === item.id ? 'text-slate-900' : 'text-slate-400'}`} />
                              <div className="flex-1">
                                <div className="text-sm font-bold">{item.label}</div>
                                <div className="text-xs text-slate-500">{item.desc}</div>
                              </div>
                              {data.dataMethod === item.id && <CheckCircle2 className="w-5 h-5 text-slate-900" />}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="pt-6 flex justify-between">
                    <Button 
                      variant="ghost" 
                      onClick={() => step === 'baseline' ? setStep('identity') : setStep('baseline')}
                      disabled={step === 'identity'}
                    >
                      Back
                    </Button>
                    <Button onClick={nextStep} disabled={step === 'identity' && !data.name}>
                      {step === 'streams' ? 'Initialize System' : 'Continue'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {step === 'deploying' && (
            <motion.div
              key="deploying"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <div className="relative w-24 h-24 mx-auto">
                <Loader2 className="w-24 h-24 text-slate-900 animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Terminal className="w-8 h-8 text-slate-900" />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Deploying Environment...</h2>
                <p className="text-slate-500 font-mono text-sm">Initializing Carbon OS modules...</p>
              </div>
            </motion.div>
          )}

          {step === 'complete' && (
            <motion.div
              key="complete"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                <ShieldCheck className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold">System Ready</h2>
                <p className="text-slate-500">Environment for <span className="font-bold text-slate-900">{data.name}</span> is now online.</p>
              </div>
              {isInitializing ? (
                <div className="flex items-center justify-center gap-2 text-slate-500">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Launching Command Center...</span>
                </div>
              ) : (
                <p className="text-sm text-slate-400">Redirecting to your dashboard...</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

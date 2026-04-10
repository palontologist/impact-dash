"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge as ShadcnBadge } from "@/components/ui/badge"
import { toast } from "sonner"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts'
import { 
  Package, 
  Truck, 
  Ship, 
  Plane, 
  Train, 
  TrendingDown, 
  AlertCircle, 
  Activity,
  Terminal,
  X,
  Plus,
  Zap,
  ShieldCheck,
  Loader2
} from "lucide-react"

// --- Types ---
interface DashboardData {
  metrics: {
    totalCarbon: number;
    totalWeight: number;
    shipmentCount: number;
    carbonIntensity: number;
  };
  recentLogs: any[];
  chartData: any[];
}

// --- Components ---

const MetricCard = ({ title, value, unit, icon: Icon, trend }: { title: string, value: string | number, unit?: string, icon: any, trend?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative group"
  >
    <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <Card className="border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">{title}</CardTitle>
        <Icon className="w-4 h-4 text-white/30" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-white font-mono tracking-tight">
          {typeof value === 'number' ? value.toLocaleString() : value}
          {unit && <span className="text-sm font-normal text-white/40 ml-1">{unit}</span>}
        </div>
        {trend && <p className="text-[10px] text-green-400 font-mono mt-1">{trend}</p>}
      </CardContent>
    </Card>
  </motion.div>
)

const QuickLogModal = ({ isOpen, onClose, organizationId }: { isOpen: boolean, onClose: () => void, organizationId: number }) => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    commodity: '',
    weight: '',
    weightUnit: 'tons',
    transportMode: 'truck',
    distance: ''
  })

  const updateForm = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await fetch('/api/data/export-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organizationId,
          commodityType: formData.commodity,
          weight: parseFloat(formData.weight),
          weightUnit: formData.weightUnit,
          transportMode: formData.transportMode,
          distanceKm: parseFloat(formData.distance),
        }),
      })
      
      const result = await response.json()
      
      if (!response.ok) throw new Error(result.error)
      
      toast.success(`Logged ${result.calculation.carbonEmitted.toFixed(2)} kg CO2e`)
      onClose()
      
      // Refresh the page to show new data
      window.location.reload()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to log shipment')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="w-full max-w-md bg-black border border-white/20 rounded-xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                  <Terminal className="w-4 h-4 text-white" />
                </div>
                <h2 className="text-lg font-bold text-white">Log Shipment</h2>
              </div>
              <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-wider text-white/40">Commodity</label>
                <input
                  type="text"
                  placeholder="e.g. Wheat, Copper, Lithium"
                  value={formData.commodity}
                  onChange={(e) => updateForm('commodity', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2 col-span-2">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-white/40">Weight</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    step="0.01"
                    value={formData.weight}
                    onChange={(e) => updateForm('weight', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-white/40">Unit</label>
                  <select
                    value={formData.weightUnit}
                    onChange={(e) => updateForm('weightUnit', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/30 transition-colors"
                  >
                    <option value="tons" className="bg-black">tons</option>
                    <option value="kg" className="bg-black">kg</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-wider text-white/40">Distance (km)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={formData.distance}
                    onChange={(e) => updateForm('distance', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-white/30 transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-mono uppercase tracking-wider text-white/40">Transport Mode</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'truck', icon: Truck, label: 'Truck' },
                    { id: 'ship', icon: Ship, label: 'Ship' },
                    { id: 'rail', icon: Train, label: 'Rail' },
                    { id: 'air', icon: Plane, label: 'Air' },
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => updateForm('transportMode', mode.id)}
                      className={`p-3 rounded-lg border transition-all ${
                        formData.transportMode === mode.id 
                          ? 'bg-white text-black border-white' 
                          : 'bg-white/5 border-white/10 hover:border-white/30'
                      }`}
                    >
                      <mode.icon className="w-5 h-5 mx-auto" />
                      <div className="text-[9px] font-mono uppercase mt-1">{mode.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <Button type="submit" disabled={loading} className="w-full bg-white text-black hover:bg-white/90 py-6 mt-4 font-mono uppercase tracking-wider">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Zap className="w-4 h-4 mr-2" />
                    Initialize Entry
                  </>
                )}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// --- Main Dashboard Component ---

export default function EnterpriseDashboard({ data, organizationId = 1 }: { data: DashboardData, organizationId?: number }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { metrics, recentLogs, chartData } = data

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-white" />
              <span className="font-mono font-bold tracking-tight">CARBON<span className="text-white/40">.OS</span></span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">Command Center</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-[10px] font-mono text-green-400">
              <Activity className="w-3 h-3" />
              SYSTEM ONLINE
            </div>
            <Button 
              onClick={() => setIsModalOpen(true)}
              size="sm" 
              className="bg-white text-black hover:bg-white/90 font-mono text-[10px] uppercase tracking-wider"
            >
              <Plus className="w-3 h-3 mr-2" />
              Log Shipment
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* KPI Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard title="Total Carbon" value={metrics.totalCarbon.toFixed(1)} unit="kg CO2e" icon={Activity} trend="+12% vs last week" />
          <MetricCard title="Volume Moved" value={metrics.totalWeight.toFixed(1)} unit="tons" icon={Package} trend="+8 shipments" />
          <MetricCard title="Carbon Intensity" value={metrics.carbonIntensity.toFixed(1)} unit="kg/ton" icon={TrendingDown} trend="-5% efficiency" />
          <MetricCard title="Shipments" value={metrics.shipmentCount} unit="total" icon={Truck} trend="All verified" />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart */}
          <Card className="lg:col-span-2 border-white/10 bg-black/40 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sm font-mono uppercase tracking-wider text-white/60">Emission Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
                    <XAxis dataKey="date" tick={{ fill: '#ffffff40', fontSize: 10, fontFamily: 'monospace' }} axisLine={{ stroke: '#ffffff10' }} />
                    <YAxis tick={{ fill: '#ffffff40', fontSize: 10, fontFamily: 'monospace' }} axisLine={{ stroke: '#ffffff10' }} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#000', 
                        border: '1px solid #ffffff20', 
                        borderRadius: '8px',
                        fontFamily: 'monospace',
                        fontSize: '10px'
                      }}
                    />
                    <Bar dataKey="carbon" fill="#ffffff" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-white/10 bg-black/40 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sm font-mono uppercase tracking-wider text-white/60">Recent Shipments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentLogs.length === 0 ? (
                  <div className="text-center py-10 text-white/30 font-mono text-xs">
                    No shipments logged yet.
                  </div>
                ) : (
                  recentLogs.map((log, i) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                          {log.transportMode === 'truck' && <Truck className="w-4 h-4" />}
                          {log.transportMode === 'ship' && <Ship className="w-4 h-4" />}
                          {log.transportMode === 'air' && <Plane className="w-4 h-4" />}
                          {log.transportMode === 'rail' && <Train className="w-4 h-4" />}
                        </div>
                        <div>
                          <div className="text-sm font-medium">{log.commodityType}</div>
                          <div className="text-[10px] font-mono text-white/40">{log.weight} tons</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-mono">{log.carbonEmitted.toFixed(1)}</div>
                        <div className="text-[10px] font-mono text-white/40">kg CO2e</div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Status Bar */}
        <div className="mt-8 flex items-center justify-between px-4 py-3 rounded-lg bg-white/5 border border-white/10">
          <div className="flex items-center gap-6 text-[10px] font-mono text-white/40 uppercase tracking-wider">
            <span>Last Sync: Just now</span>
            <span>•</span>
            <span>Data Stream: Active</span>
            <span>•</span>
            <span>Nodes: 3/3 Online</span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono text-green-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            All Systems Operational
          </div>
        </div>
      </main>

      {/* Quick Log Modal */}
      <QuickLogModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} organizationId={organizationId} />
    </div>
  )
}

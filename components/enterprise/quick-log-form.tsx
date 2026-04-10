"use client"

import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"
import { Loader2, Package, Truck, Ship, Plane, Train } from "lucide-react"

const TRANSPORT_MODES = [
  { id: 'truck', label: 'Truck', icon: Truck },
  { id: 'ship', label: 'Ship', icon: Ship },
  { id: 'rail', label: 'Rail', icon: Train },
  { id: 'air', label: 'Air', icon: Plane },
]

export function QuickLogForm({ organizationId }: { organizationId: number }) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    commodityType: '',
    weight: '',
    weightUnit: 'tons',
    transportMode: 'truck',
    distanceKm: '',
    notes: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/data/export-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          organizationId,
          weight: parseFloat(formData.weight),
          distanceKm: parseFloat(formData.distanceKm),
        }),
      })

      if (!response.ok) throw new Error('Failed to log export')

      const result = await response.json()
      toast.success(`Logged ${result.calculation.carbonEmitted.toFixed(2)} kg CO2e`)
      
      // Reset form
      setFormData({
        commodityType: '',
        weight: '',
        weightUnit: 'tons',
        transportMode: 'truck',
        distanceKm: '',
        notes: ''
      })
    } catch (error) {
      console.error(error)
      toast.error('Error logging export. Please check your inputs.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="border-none shadow-lg bg-white/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Quick Export Log</CardTitle>
        <CardDescription>Log a new shipment to update your carbon footprint.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="commodity">Commodity Type</Label>
            <Input 
              id="commodity" 
              placeholder="e.g. Wheat, Copper, Lithium" 
              required 
              value={formData.commodityType}
              onChange={(e) => setFormData({...formData, commodityType: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight</Label>
              <Input 
                id="weight" 
                type="number" 
                step="0.01" 
                placeholder="0.00" 
                required 
                value={formData.weight}
                onChange={(e) => setFormData({...formData, weight: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <Select 
                value={formData.weightUnit} 
                onValueChange={(v) => setFormData({...formData, weightUnit: v})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tons">Tons</SelectItem>
                  <SelectItem value="kg">Kilograms</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mode">Transport Mode</Label>
              <Select 
                value={formData.transportMode} 
                onValueChange={(v) => setFormData({...formData, transportMode: v})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TRANSPORT_MODES.map((m) => (
                    <SelectItem key={m.id} value={m.id}>{m.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="distance">Distance (km)</Label>
              <Input 
                id="distance" 
                type="number" 
                placeholder="0" 
                required 
                value={formData.distanceKm}
                onChange={(e) => setFormData({...formData, distanceKm: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes (Optional)</Label>
            <Input 
              id="notes" 
              placeholder="Reference number, driver name, etc." 
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Package className="mr-2 h-4 w-4" />}
            Log Shipment
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

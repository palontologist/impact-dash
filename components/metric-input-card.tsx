"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"

interface MetricInputCardProps {
  metricId: string
  metricName: string
  unit: string
  category: string
  description?: string
  onSuccess?: () => void
}

export function MetricInputCard({
  metricId,
  metricName,
  unit,
  category,
  description,
  onSuccess,
}: MetricInputCardProps) {
  const [value, setValue] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [notes, setNotes] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage(null)

    if (!value || !date) {
      setMessage("Please fill in all required fields")
      return
    }

    try {
      setSubmitting(true)
      const res = await fetch("/api/data/manual-input", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          metricId,
          value,
          date,
          notes: notes || undefined,
        }),
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || "Failed to save metric")
      }

      // Reset form
      setValue("")
      setDate(new Date().toISOString().split('T')[0])
      setNotes("")
      setMessage("✓ Saved successfully!")
      
      if (onSuccess) {
        onSuccess()
      }

      // Clear success message after 3 seconds
      setTimeout(() => setMessage(null), 3000)
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : "Error"
      setMessage(`✗ ${errorMessage}`)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg">{metricName}</CardTitle>
            {description && (
              <CardDescription className="text-sm mt-1">{description}</CardDescription>
            )}
          </div>
          <div className="flex gap-1.5">
            <Badge variant="secondary" className="text-xs">{category}</Badge>
            <Badge variant="outline" className="text-xs">{unit}</Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor={`${metricId}-value`} className="text-sm">
                Value *
              </Label>
              <Input
                id={`${metricId}-value`}
                type="number"
                step="any"
                placeholder="0"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor={`${metricId}-date`} className="text-sm">
                Date *
              </Label>
              <Input
                id={`${metricId}-date`}
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor={`${metricId}-notes`} className="text-sm">
              Notes (Optional)
            </Label>
            <Textarea
              id={`${metricId}-notes`}
              placeholder="Add context..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="resize-none"
            />
          </div>
          <Button
            type="submit"
            disabled={submitting || !value || !date}
            className="w-full"
            size="sm"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Data"
            )}
          </Button>
          {message && (
            <p
              className={`text-xs text-center ${
                message.startsWith('✓') ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  )
}

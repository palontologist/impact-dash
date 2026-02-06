"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { 
  Upload, 
  FileSpreadsheet, 
  Edit3, 
  CheckCircle2,
  Info,
  ArrowRight
} from "lucide-react"

interface DataInputConfigProps {
  selectedMethod: string
  onMethodChange: (method: string) => void
  onComplete?: () => void
}

export function DataInputConfig({ selectedMethod, onMethodChange, onComplete }: DataInputConfigProps) {
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "text/csv") {
      setUploadFile(file)
    } else {
      alert("Please upload a valid CSV file")
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files[0]
    if (file && file.type === "text/csv") {
      setUploadFile(file)
    } else {
      alert("Please upload a valid CSV file")
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Configure Data Input</CardTitle>
          <CardDescription>
            Choose how you&apos;ll input your impact data. You can use CSV uploads for bulk data entry,
            manual input for real-time tracking, or both methods.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedMethod} onValueChange={onMethodChange} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="csv">CSV Upload</TabsTrigger>
              <TabsTrigger value="manual">Manual Input</TabsTrigger>
              <TabsTrigger value="both">Both Methods</TabsTrigger>
            </TabsList>

            <TabsContent value="csv" className="space-y-6 mt-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-900">
                    <p className="font-semibold mb-1">CSV Upload Benefits</p>
                    <ul className="list-disc list-inside space-y-1 text-blue-800">
                      <li>Bulk import historical data quickly</li>
                      <li>Integrate with existing data systems</li>
                      <li>Automated data validation and mapping</li>
                      <li>Schedule regular data imports</li>
                    </ul>
                  </div>
                </div>

                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    isDragging 
                      ? "border-blue-500 bg-blue-50" 
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                >
                  <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="font-semibold mb-2">
                    {uploadFile ? uploadFile.name : "Upload CSV File"}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Drag and drop your CSV file here, or click to browse
                  </p>
                  <Input
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="hidden"
                    id="csv-upload"
                  />
                  <label htmlFor="csv-upload">
                    <Button variant="outline" className="cursor-pointer" asChild>
                      <span>
                        <FileSpreadsheet className="w-4 h-4 mr-2" />
                        Select CSV File
                      </span>
                    </Button>
                  </label>
                </div>

                <Card className="bg-gray-50">
                  <CardHeader>
                    <CardTitle className="text-base">CSV Format Requirements</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-2">
                    <p>Your CSV file should include:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                      <li>Header row with metric names</li>
                      <li>Date column (YYYY-MM-DD format)</li>
                      <li>One row per time period</li>
                      <li>Numeric values for quantitative metrics</li>
                    </ul>
                    <Button variant="link" className="px-0 h-auto text-blue-600">
                      Download sample CSV template
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="manual" className="space-y-6 mt-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                  <Info className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-green-900">
                    <p className="font-semibold mb-1">Manual Input Benefits</p>
                    <ul className="list-disc list-inside space-y-1 text-green-800">
                      <li>Real-time data entry and updates</li>
                      <li>Quick input for daily metrics</li>
                      <li>Add contextual notes and insights</li>
                      <li>Perfect for small datasets</li>
                    </ul>
                  </div>
                </div>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Edit3 className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Simple Data Entry Forms</h3>
                        <p className="text-sm text-muted-foreground">
                          Input your metrics through intuitive forms on your dashboard
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">Easy-to-use interface</p>
                          <p className="text-xs text-muted-foreground">
                            Simple forms for each metric you&apos;ve selected
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">Validation built-in</p>
                          <p className="text-xs text-muted-foreground">
                            Automatic validation ensures data quality
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-sm">Historical tracking</p>
                          <p className="text-xs text-muted-foreground">
                            All entries are timestamped and tracked over time
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="both" className="space-y-6 mt-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                  <Info className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-purple-900">
                    <p className="font-semibold mb-1">Flexible Data Management</p>
                    <p className="text-purple-800">
                      Get the best of both worlds! Use CSV uploads for bulk historical data
                      and manual input for real-time updates and adjustments.
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="border-2 border-blue-200">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Upload className="w-8 h-8 text-blue-600" />
                        <h3 className="font-semibold">CSV Uploads</h3>
                      </div>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 text-blue-600 flex-shrink-0" />
                          <span>Bulk import historical data</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 text-blue-600 flex-shrink-0" />
                          <span>Automated data processing</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 text-blue-600 flex-shrink-0" />
                          <span>System integrations</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-green-200">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-4">
                        <Edit3 className="w-8 h-8 text-green-600" />
                        <h3 className="font-semibold">Manual Input</h3>
                      </div>
                      <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
                          <span>Real-time data updates</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
                          <span>Quick adjustments</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-600 flex-shrink-0" />
                          <span>Contextual notes</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-purple-50">
                  <CardContent className="pt-6">
                    <h4 className="font-semibold mb-2 text-purple-900">Recommended Workflow</h4>
                    <ol className="list-decimal list-inside space-y-2 text-sm text-purple-800">
                      <li>Upload historical data via CSV to establish baseline</li>
                      <li>Use manual input for daily or weekly updates</li>
                      <li>Periodically import CSV files for bulk updates</li>
                      <li>Add notes and context through manual entry</li>
                    </ol>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {onComplete && (
            <div className="mt-6 flex justify-end">
              <Button 
                onClick={onComplete}
                disabled={!selectedMethod}
              >
                Continue
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

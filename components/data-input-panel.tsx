"use client"

import { useState } from "react"
import { Upload, Plus, Database, FileSpreadsheet, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function DataInputPanel() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Data Input & Management</h2>
        <p className="text-muted-foreground">Add new data, import bulk records, and manage data sources</p>
      </div>

      <Tabs defaultValue="manual" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Import</TabsTrigger>
          <TabsTrigger value="api">API Integration</TabsTrigger>
          <TabsTrigger value="automated">Automated Collection</TabsTrigger>
        </TabsList>

        <TabsContent value="manual">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Student Registration Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Register New Student
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" placeholder="Enter first name" />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" placeholder="Enter last name" />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="student@email.com" />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input id="location" placeholder="City, Region" />
                </div>
                <div>
                  <Label htmlFor="cohort">Cohort</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select cohort" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2024-a">Cohort 2024-A</SelectItem>
                      <SelectItem value="2024-b">Cohort 2024-B</SelectItem>
                      <SelectItem value="2024-c">Cohort 2024-C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90">Register Student</Button>
              </CardContent>
            </Card>

            {/* Progress Update Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Update Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="studentSelect">Select Student</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose student" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="amina">Amina Hassan</SelectItem>
                      <SelectItem value="david">David Kiprotich</SelectItem>
                      <SelectItem value="grace">Grace Wanjiku</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="completionRate">Completion Rate (%)</Label>
                  <Input id="completionRate" type="number" min="0" max="100" placeholder="85" />
                </div>
                <div>
                  <Label htmlFor="aiLiteracy">AI Literacy Level</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="notes">Progress Notes</Label>
                  <Textarea id="notes" placeholder="Additional notes about student progress..." />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90">Update Progress</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="bulk">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5" />
                Bulk Data Import
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Upload CSV File</h3>
                <p className="text-muted-foreground mb-4">Drag and drop your CSV file here, or click to browse</p>
                <Input
                  type="file"
                  accept=".csv,.xlsx"
                  onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="file-upload"
                />
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <Button variant="outline" asChild>
                    <span>Choose File</span>
                  </Button>
                </Label>
                {selectedFile && <p className="mt-2 text-sm text-muted-foreground">Selected: {selectedFile.name}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <FileSpreadsheet className="h-6 w-6 mb-2" />
                  Download Template
                </Button>
                <Button variant="outline" className="h-20 flex-col bg-transparent">
                  <Database className="h-6 w-6 mb-2" />
                  Validate Data
                </Button>
                <Button className="h-20 flex-col bg-primary hover:bg-primary/90">
                  <Upload className="h-6 w-6 mb-2" />
                  Import Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                API Integration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium text-foreground mb-2">API Endpoints</h4>
                <div className="space-y-2 text-sm font-mono">
                  <div className="flex justify-between">
                    <span className="text-green-600">POST</span>
                    <span>/api/students</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-600">GET</span>
                    <span>/api/students/{"{id}"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-orange-600">PUT</span>
                    <span>/api/students/{"{id}"}/progress</span>
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="apiKey">API Key</Label>
                <Input id="apiKey" type="password" placeholder="Enter your API key" />
              </div>
              <Button className="w-full bg-primary hover:bg-primary/90">Test Connection</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automated">
          <Card>
            <CardHeader>
              <CardTitle>Automated Data Collection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium">Learning Management System</h4>
                  <p className="text-sm text-muted-foreground">
                    Automatically sync completion rates and assessment scores
                  </p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Configure LMS Integration
                  </Button>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Survey Responses</h4>
                  <p className="text-sm text-muted-foreground">Collect satisfaction and feedback data automatically</p>
                  <Button variant="outline" className="w-full bg-transparent">
                    Setup Survey Integration
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

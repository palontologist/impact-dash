"use client"

import { useEffect, useState } from "react"
import { Upload, Plus, Database, FileSpreadsheet, Zap, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { MetricInputCard } from "@/components/metric-input-card"
import { CustomMetricSelector } from "@/components/custom-metric-selector"

interface AvailableMetric {
	id: number
	metricId: string
	metricName: string
	category: string
	unit: string
	dataType: string
}

interface ProfileTab {
	id: string
	label: string
	enabled: boolean
}

interface ProfileConfig {
	name: string
	description: string
	tabs: ProfileTab[]
	metrics: string[]
	features: {
		studentManagement: boolean
		csvUpload: boolean
		manualInput: boolean
		esgReporting: boolean
		sdgMapping: boolean
		customMetrics: boolean
	}
}

interface UserProfile {
	selectedProfile: string
	customMetrics?: string[]
	dataInputMethod?: string
	userType?: string
}

export function DataInputPanel() {
	// Profile configuration state
	const [profileConfig, setProfileConfig] = useState<ProfileConfig | null>(null)
	const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
	const [loadingConfig, setLoadingConfig] = useState(true)
	
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [uploading, setUploading] = useState(false)
	const [uploadMessage, setUploadMessage] = useState<string | null>(null)
	
	// Available metrics from database
	const [availableMetrics, setAvailableMetrics] = useState<AvailableMetric[]>([])

	// Student form state  
	const [firstName, setFirstName] = useState("")
	const [lastName, setLastName] = useState("")
	const [email, setEmail] = useState("")
	const [location, setLocation] = useState("")
	const [cohort, setCohort] = useState<string>("")
	const [submittingStudent, setSubmittingStudent] = useState(false)
	const [studentMsg, setStudentMsg] = useState<string | null>(null)

	// Progress form state
	const [students, setStudents] = useState<{ id: number; firstName: string; lastName: string }[]>([])
	const [selectedStudentId, setSelectedStudentId] = useState<string>("")
	const [completionRate, setCompletionRate] = useState<string>("")
	const [aiLiteracy, setAiLiteracy] = useState<string>("")
	const [notes, setNotes] = useState<string>("")
	const [submittingProgress, setSubmittingProgress] = useState(false)
	const [progressMsg, setProgressMsg] = useState<string | null>(null)

	useEffect(() => {
		loadProfileConfig()
	}, [])

	async function loadProfileConfig() {
		try {
			setLoadingConfig(true)
			const res = await fetch("/api/profile/config")
			if (!res.ok) throw new Error("Failed to load profile configuration")
			
			const data = await res.json()
			setProfileConfig(data.config)
			setUserProfile(data.profile)
			
			// Load available metrics from database
			await loadAvailableMetrics(data.config.metrics)
			
			// Load additional data based on enabled features
			if (data.config.features.studentManagement) {
				loadStudents()
			}
		} catch (error) {
			console.error("Error loading profile config:", error)
		} finally {
			setLoadingConfig(false)
		}
	}

	async function loadAvailableMetrics(allowedMetricIds: string[]) {
		try {
			const res = await fetch("/api/data/available-metrics")
			if (!res.ok) throw new Error("Failed to load metrics")
			
			const data = await res.json()
			// Filter metrics based on profile configuration
			const filtered = data.metrics.filter((m: AvailableMetric) => 
				allowedMetricIds.includes(m.metricId)
			)
			setAvailableMetrics(filtered)
		} catch (error) {
			console.error("Error loading metrics:", error)
		}
	}

	async function loadStudents() {
		try {
			const res = await fetch("/api/students")
			if (!res.ok) throw new Error("Failed to load students")
			const data = await res.json()
			setStudents(data.students || [])
		} catch (error) {
			console.error("Error loading students:", error)
		}
	}

	async function handleRegisterStudent() {
		setStudentMsg(null)
		try {
			setSubmittingStudent(true)
			const res = await fetch("/api/students", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ firstName, lastName, email, location: location || undefined, cohort: cohort || undefined }),
			})
			if (!res.ok) throw new Error("Failed to register student")
			setFirstName("")
			setLastName("")
			setEmail("")
			setLocation("")
			setCohort("")
			setStudentMsg("✓ Student registered successfully!")
			await loadStudents()
		} catch (e: unknown) {
			const message = e instanceof Error ? e.message : "Error"
			setStudentMsg(`✗ ${message}`)
		} finally {
			setSubmittingStudent(false)
		}
	}

	async function handleUpdateProgress() {
		setProgressMsg(null)
		try {
			if (!selectedStudentId) throw new Error("Select a student")
			const studentId = Number(selectedStudentId)
			setSubmittingProgress(true)
			const res = await fetch(`/api/students/${studentId}/progress`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ completionRate: Number(completionRate), aiLiteracyLevel: aiLiteracy || undefined, notes: notes || undefined }),
			})
			if (!res.ok) throw new Error("Failed to update progress")
			setSelectedStudentId("")
			setCompletionRate("")
			setAiLiteracy("")
			setNotes("")
			setProgressMsg("✓ Progress updated successfully!")
		} catch (e: unknown) {
			const message = e instanceof Error ? e.message : "Error"
			setProgressMsg(`✗ ${message}`)
		} finally {
			setSubmittingProgress(false)
		}
	}

	async function handleFileSubmit(e: React.FormEvent) {
		e.preventDefault()
		if (!selectedFile) return

		setUploading(true)
		setUploadMessage(null)

		const formData = new FormData()
		formData.append("file", selectedFile)

		try {
			const res = await fetch("/api/data/upload-csv", {
				method: "POST",
				body: formData,
			})

			if (!res.ok) {
				const error = await res.json()
				throw new Error(error.error || "Upload failed")
			}

			const data = await res.json()
			setUploadMessage(`✓ Successfully processed ${data.rowsProcessed} rows!`)
			setSelectedFile(null)
		} catch (e: unknown) {
			const message = e instanceof Error ? e.message : "Upload error"
			setUploadMessage(`✗ ${message}`)
		} finally {
			setUploading(false)
		}
	}

	if (loadingConfig) {
		return (
			<div className="flex items-center justify-center h-96">
				<div className="flex flex-col items-center gap-4">
					<Loader2 className="h-8 w-8 animate-spin text-primary" />
					<p className="text-muted-foreground">Loading your profile configuration...</p>
				</div>
			</div>
		)
	}

	if (!profileConfig) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Profile Not Found</CardTitle>
					<CardDescription>
						Please complete onboarding to continue.
					</CardDescription>
				</CardHeader>
			</Card>
		)
	}

	// Get enabled tabs for this profile
	const enabledTabs = profileConfig.tabs.filter(tab => tab.enabled)
	
	// Get profile metrics for display
	const profileMetrics = availableMetrics.filter(m => 
		profileConfig.metrics.includes(m.metricId)
	)

	return (
		<div className="space-y-6">
			<div>
				<h2 className="text-2xl font-bold tracking-tight">{profileConfig.name}</h2>
				<p className="text-muted-foreground">{profileConfig.description}</p>
				<div className="flex gap-2 mt-3">
					{profileConfig.metrics.slice(0, 5).map(metricId => (
						<Badge key={metricId} variant="secondary">{metricId}</Badge>
					))}
					{profileConfig.metrics.length > 5 && (
						<Badge variant="outline">+{profileConfig.metrics.length - 5} more</Badge>
					)}
				</div>
			</div>

			<Tabs defaultValue={enabledTabs[0]?.id || "metric-input"} className="space-y-6">
				<TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${enabledTabs.length}, 1fr)` }}>
					{enabledTabs.map(tab => (
						<TabsTrigger key={tab.id} value={tab.id}>{tab.label}</TabsTrigger>
					))}
				</TabsList>

				{/* Metric Input Tab */}
				{enabledTabs.some(t => t.id === 'metric-input') && (
					<TabsContent value="metric-input" className="space-y-4">
						{profileMetrics.length === 0 ? (
							<Card>
								<CardContent className="text-center py-12 text-muted-foreground">
									<p>No metrics configured for your profile.</p>
									<p className="text-sm mt-2">Please complete onboarding or add metrics.</p>
								</CardContent>
							</Card>
						) : (
							<>
								<div className="mb-4">
									<h3 className="text-lg font-semibold">Enter Data for Your Metrics</h3>
									<p className="text-sm text-muted-foreground">
										Track each metric individually with specific values and dates
									</p>
								</div>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									{profileMetrics.map((metric) => (
										<MetricInputCard
											key={metric.metricId}
											metricId={metric.metricId}
											metricName={metric.metricName}
											unit={metric.unit}
											category={metric.category}
											description={metric.description}
										/>
									))}
								</div>
							</>
						)}
					</TabsContent>
				)}

				{/* Add Metrics Tab (for custom profiles) */}
				{enabledTabs.some(t => t.id === 'custom-metrics') && (
					<TabsContent value="custom-metrics">
						<div className="space-y-6">
							<CustomMetricSelector
								selectedMetrics={userProfile?.customMetrics || []}
								onMetricsChange={async (newMetrics) => {
									// Update user profile with new metrics
									try {
										const res = await fetch("/api/profile/config", {
											method: "PATCH",
											headers: { "Content-Type": "application/json" },
											body: JSON.stringify({ customMetrics: newMetrics }),
										})
										if (res.ok) {
											// Reload config to update available metrics
											await loadProfileConfig()
										}
									} catch (error) {
										console.error("Error updating metrics:", error)
									}
								}}
							/>
						</div>
					</TabsContent>
				)}

				{/* Students Tab (only for education profiles) */}
				{profileConfig.features.studentManagement && enabledTabs.some(t => t.id === 'students') && (
					<TabsContent value="students">
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
											<Input id="firstName" placeholder="Enter first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
										</div>
										<div>
											<Label htmlFor="lastName">Last Name</Label>
											<Input id="lastName" placeholder="Enter last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
										</div>
									</div>
									<div>
										<Label htmlFor="email">Email</Label>
										<Input id="email" type="email" placeholder="student@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
									</div>
									<div>
										<Label htmlFor="location">Location</Label>
										<Input id="location" placeholder="City, Region" value={location} onChange={(e) => setLocation(e.target.value)} />
									</div>
									<div>
										<Label htmlFor="cohort">Cohort</Label>
										<Select value={cohort} onValueChange={setCohort}>
											<SelectTrigger>
												<SelectValue placeholder="Select cohort" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="Cohort 2024-A">Cohort 2024-A</SelectItem>
												<SelectItem value="Cohort 2024-B">Cohort 2024-B</SelectItem>
												<SelectItem value="Cohort 2024-C">Cohort 2024-C</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<Button disabled={submittingStudent} onClick={handleRegisterStudent} className="w-full bg-primary hover:bg-primary/90">
										{submittingStudent ? "Registering..." : "Register Student"}
									</Button>
									{studentMsg && <div className={`text-sm ${studentMsg.startsWith('✓') ? 'text-green-600' : 'text-red-600'}`}>{studentMsg}</div>}
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
										<Select value={selectedStudentId} onValueChange={setSelectedStudentId}>
											<SelectTrigger>
												<SelectValue placeholder="Choose student" />
											</SelectTrigger>
											<SelectContent>
												{students.map((s) => (
													<SelectItem key={s.id} value={String(s.id)}>{`${s.firstName} ${s.lastName}`}</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
									<div>
										<Label htmlFor="completionRate">Completion Rate (%)</Label>
										<Input id="completionRate" type="number" min="0" max="100" placeholder="85" value={completionRate} onChange={(e) => setCompletionRate(e.target.value)} />
									</div>
									<div>
										<Label htmlFor="aiLiteracy">AI Literacy Level</Label>
										<Select value={aiLiteracy} onValueChange={setAiLiteracy}>
											<SelectTrigger>
												<SelectValue placeholder="Select level" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="Beginner">Beginner</SelectItem>
												<SelectItem value="Intermediate">Intermediate</SelectItem>
												<SelectItem value="Advanced">Advanced</SelectItem>
											</SelectContent>
										</Select>
									</div>
									<div>
										<Label htmlFor="notes">Progress Notes</Label>
										<Textarea id="notes" placeholder="Additional notes about student progress..." value={notes} onChange={(e) => setNotes(e.target.value)} />
									</div>
									<Button disabled={submittingProgress} onClick={handleUpdateProgress} className="w-full bg-primary hover:bg-primary/90">
										{submittingProgress ? "Updating..." : "Update Progress"}
									</Button>
									{progressMsg && <div className={`text-sm ${progressMsg.startsWith('✓') ? 'text-green-600' : 'text-red-600'}`}>{progressMsg}</div>}
								</CardContent>
							</Card>
						</div>
					</TabsContent>
				)}

				{/* Bulk Import Tab */}
				{profileConfig.features.csvUpload && enabledTabs.some(t => t.id === 'bulk-import') && (
					<TabsContent value="bulk-import">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Upload className="h-5 w-5" />
									Bulk CSV Upload
								</CardTitle>
								<CardDescription>
									Upload CSV files to import historical data for your metrics
								</CardDescription>
							</CardHeader>
							<CardContent>
								<form onSubmit={handleFileSubmit} className="space-y-4">
									<div className="border-2 border-dashed rounded-lg p-8 text-center">
										<FileSpreadsheet className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
										<Input
											type="file"
											accept=".csv"
											onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
											className="max-w-sm mx-auto"
										/>
										{selectedFile && (
											<p className="text-sm text-muted-foreground mt-2">
												Selected: {selectedFile.name}
											</p>
										)}
									</div>
									<Button type="submit" disabled={!selectedFile || uploading} className="w-full">
										{uploading ? "Uploading..." : "Import CSV Data"}
									</Button>
									{uploadMessage && (
										<div className={`text-sm ${uploadMessage.startsWith('✓') ? 'text-green-600' : 'text-red-600'}`}>
											{uploadMessage}
										</div>
									)}
								</form>
							</CardContent>
						</Card>
					</TabsContent>
				)}

				{/* API Integration Tab */}
				{enabledTabs.some(t => t.id === 'api-integration') && (
					<TabsContent value="api-integration">
						<Card>
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Zap className="h-5 w-5" />
									API Integration
								</CardTitle>
								<CardDescription>
									Connect your systems to automatically sync data
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="p-4 bg-muted rounded-lg">
									<p className="text-sm font-semibold mb-2">API Endpoint</p>
									<code className="text-xs bg-background p-2 rounded block">
										POST /api/data/manual-input
									</code>
								</div>
								<div>
									<p className="text-sm font-semibold mb-2">Available Metrics for {userProfile?.selectedProfile} profile:</p>
									<div className="flex flex-wrap gap-2">
										{profileConfig.metrics.map(metricId => (
											<Badge key={metricId} variant="secondary">{metricId}</Badge>
										))}
									</div>
								</div>
								<Button variant="outline" className="w-full">
									<FileSpreadsheet className="h-4 w-4 mr-2" />
									View API Documentation
								</Button>
							</CardContent>
						</Card>
					</TabsContent>
				)}
			</Tabs>
		</div>
	)
}

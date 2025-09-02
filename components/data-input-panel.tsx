"use client"

import { useEffect, useState } from "react"
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

	async function loadStudents() {
		try {
			const res = await fetch("/api/students", { cache: "no-store" })
			if (!res.ok) return
			const json = (await res.json()) as { data: Array<{ id: number; firstName: string; lastName: string }> }
			setStudents((json.data ?? []).map((s) => ({ id: s.id, firstName: s.firstName, lastName: s.lastName })))
		} catch {}
	}

	useEffect(() => {
		loadStudents()
	}, [])

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
			setStudentMsg("Student registered")
			await loadStudents()
		} catch (e: unknown) {
			const message = e instanceof Error ? e.message : "Error"
			setStudentMsg(message)
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
			setProgressMsg("Progress updated")
		} catch (e: unknown) {
			const message = e instanceof Error ? e.message : "Error"
			setProgressMsg(message)
		} finally {
			setSubmittingProgress(false)
		}
	}

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
								<Button disabled={submittingStudent} onClick={handleRegisterStudent} className="w-full bg-primary hover:bg-primary/90">{submittingStudent ? "Registering..." : "Register Student"}</Button>
								{studentMsg && <div className="text-sm text-muted-foreground">{studentMsg}</div>}
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
								<Button disabled={submittingProgress} onClick={handleUpdateProgress} className="w-full bg-primary hover:bg-primary/90">{submittingProgress ? "Updating..." : "Update Progress"}</Button>
								{progressMsg && <div className="text-sm text-muted-foreground">{progressMsg}</div>}
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
										<span className="text-orange-600">POST</span>
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

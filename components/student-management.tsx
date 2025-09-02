"use client"

import { useEffect, useMemo, useState } from "react"
import { Search, Filter, UserPlus, Eye, Edit, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ApiStudent {
	id: number
	firstName: string
	lastName: string
	email: string
	cohort: string | null
	status: string | null
	location: string | null
	enrollmentDate: string | null
	avatarUrl: string | null
}

export function StudentManagement() {
	const [searchTerm, setSearchTerm] = useState("")
	const [filterStatus, setFilterStatus] = useState("all")
	const [students, setStudents] = useState<ApiStudent[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		let ignore = false
		async function load() {
			try {
				setLoading(true)
				const res = await fetch("/api/students", { cache: "no-store" })
				if (!res.ok) throw new Error("Failed to fetch students")
				const json = await res.json()
				if (!ignore) setStudents(json.data ?? [])
			} catch (e: unknown) {
				const message = e instanceof Error ? e.message : "Error"
				if (!ignore) setError(message)
			} finally {
				if (!ignore) setLoading(false)
			}
		}
		load()
		return () => {
			ignore = true
		}
	}, [])

	const filteredStudents = useMemo(() => {
		const normalized = students.map((s) => ({
			...s,
			name: `${s.firstName} ${s.lastName}`.trim(),
			status: s.status ?? "Active",
		}))
		return normalized.filter((student) => {
			const matchesSearch =
				student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
				student.email.toLowerCase().includes(searchTerm.toLowerCase())
			const matchesFilter = filterStatus === "all" || (student.status ?? "").toLowerCase() === filterStatus
			return matchesSearch && matchesFilter
		})
	}, [students, searchTerm, filterStatus])

	return (
		<div className="space-y-6">
			{/* Header with actions */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div>
					<h2 className="text-2xl font-bold text-foreground">Student Management</h2>
					<p className="text-muted-foreground">Track individual student progress and manage cohorts</p>
				</div>
				<Button className="bg-primary hover:bg-primary/90">
					<UserPlus className="h-4 w-4 mr-2" />
					Add Student
				</Button>
			</div>

			{/* Search and filters */}
			<Card>
				<CardContent className="pt-6">
					<div className="flex flex-col sm:flex-row gap-4">
						<div className="relative flex-1">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Search students by name or email..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-10"
							/>
						</div>
						<Select value={filterStatus} onValueChange={setFilterStatus}> 
							<SelectTrigger className="w-full sm:w-48">
								<Filter className="h-4 w-4 mr-2" />
								<SelectValue placeholder="Filter by status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="all">All Students</SelectItem>
								<SelectItem value="active">Active</SelectItem>
								<SelectItem value="completed">Completed</SelectItem>
								<SelectItem value="at risk">At Risk</SelectItem>
							</SelectContent>
						</Select>
					</div>
				</CardContent>
			</Card>

			{/* Student list */}
			<div className="grid gap-4">
				{loading && (
					<Card>
						<CardContent className="pt-6">Loading students...</CardContent>
					</Card>
				)}
				{error && (
					<Card>
						<CardContent className="pt-6 text-red-500">{error}</CardContent>
					</Card>
				)}
				{!loading && !error && filteredStudents.map((student) => (
					<Card key={student.id}>
						<CardContent className="pt-6">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-4">
									<Avatar>
										<AvatarImage src={student.avatarUrl ?? `/placeholder.svg?height=40&width=40&query=${encodeURIComponent(student.firstName)}`} />
										<AvatarFallback>
											{`${student.firstName[0] ?? ""}${student.lastName[0] ?? ""}`}
										</AvatarFallback>
									</Avatar>
									<div>
										<h3 className="font-semibold text-foreground">{`${student.firstName} ${student.lastName}`}</h3>
										<p className="text-sm text-muted-foreground">{student.email}</p>
										<div className="flex items-center gap-2 mt-1">
											<Badge variant="outline" className="text-xs">
												{student.cohort ?? "Unknown Cohort"}
											</Badge>
											<Badge
												variant={(student.status ?? "Active") === "Active" ? "default" : (student.status ?? "") === "Completed" ? "secondary" : "destructive"}
												className="text-xs"
											>
												{student.status ?? "Active"}
											</Badge>
										</div>
									</div>
								</div>

								<div className="flex items-center gap-6">
									<div className="text-right">
										<p className="text-sm font-medium text-foreground">Recent progress available</p>
										<p className="text-xs text-muted-foreground">Enrolled: {student.enrollmentDate ? new Date(student.enrollmentDate).toISOString().slice(0,10) : "—"}</p>
									</div>
									<div className="text-right">
										<p className="text-sm font-medium text-foreground">{student.location ?? "Unknown"}</p>
										<p className="text-xs text-muted-foreground">ID: {student.id}</p>
									</div>
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="ghost" size="sm">
												<MoreHorizontal className="h-4 w-4" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem>
												<Eye className="h-4 w-4 mr-2" />
												View Profile
											</DropdownMenuItem>
											<DropdownMenuItem>
												<Edit className="h-4 w-4 mr-2" />
												Edit Details
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	)
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
    Users,
    Briefcase,
    Building2,
    LineChart,
    Clock,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Star,
    ChevronRight,
    ArrowUpRight,
    CheckCircle2,
    XCircle,
    FileText,
    DollarSign,
    Eye,
    MessageSquare,
    BarChart3,
    TrendingUp,
    UserCheck,
    AlertCircle,
} from "lucide-react";

// Mock data
const mockProfile = {
    name: "Sarah Chen",
    title: "Senior Technical Recruiter",
    company: "TechCorp",
    location: "San Francisco, CA",
    activeJobs: 12,
    totalHires: 45,
    timeToHire: "21 days",
    responseRate: "94%",
};

const mockStats = {
    activeJobs: 12,
    totalCandidates: 156,
    shortlisted: 28,
    interviews: 15,
};

const mockJobPostings = [
    {
        id: 1,
        title: "Senior Frontend Developer",
        department: "Engineering",
        location: "San Francisco, CA",
        type: "Full-time",
        salary: "$120k - $180k",
        applicants: 45,
        views: 234,
        status: "Active",
        posted: "2024-03-01",
        deadline: "2024-03-31",
    },
    {
        id: 2,
        title: "UI/UX Designer",
        department: "Design",
        location: "Remote",
        type: "Full-time",
        salary: "$100k - $150k",
        applicants: 32,
        views: 189,
        status: "Active",
        posted: "2024-03-05",
        deadline: "2024-04-05",
    },
    {
        id: 3,
        title: "Full Stack Engineer",
        department: "Engineering",
        location: "New York, NY",
        type: "Full-time",
        salary: "$130k - $190k",
        applicants: 28,
        views: 167,
        status: "Draft",
        posted: "2024-03-10",
        deadline: "2024-04-10",
    },
];

const mockCandidates = [
    {
        id: 1,
        name: "Michael Brown",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=64&h=64",
        role: "Senior Frontend Developer",
        experience: "8 years",
        location: "San Francisco, CA",
        status: "Interview Scheduled",
        matchScore: 92,
        skills: ["React", "TypeScript", "Node.js"],
        appliedDate: "2024-03-15",
        email: "michael@example.com",
        phone: "+1 (555) 123-4567",
    },
    {
        id: 2,
        name: "Emily Chen",
        photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=64&h=64",
        role: "UI/UX Designer",
        experience: "6 years",
        location: "Remote",
        status: "Shortlisted",
        matchScore: 88,
        skills: ["Figma", "User Research", "Design Systems"],
        appliedDate: "2024-03-14",
        email: "emily@example.com",
        phone: "+1 (555) 234-5678",
    },
    {
        id: 3,
        name: "David Kim",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=64&h=64",
        role: "Full Stack Engineer",
        experience: "5 years",
        location: "New York, NY",
        status: "New",
        matchScore: 85,
        skills: ["React", "Python", "PostgreSQL"],
        appliedDate: "2024-03-13",
        email: "david@example.com",
        phone: "+1 (555) 345-6789",
    },
];

const mockAnalytics = {
    applicationTrend: [
        { date: "Mar 1", count: 12 },
        { date: "Mar 8", count: 18 },
        { date: "Mar 15", count: 15 },
        { date: "Mar 22", count: 25 },
    ],
    sourceBreakdown: [
        { source: "LinkedIn", percentage: 45 },
        { source: "Company Website", percentage: 30 },
        { source: "Indeed", percentage: 15 },
        { source: "Referrals", percentage: 10 },
    ],
    timeToHire: {
        average: 21,
        trend: "decreasing",
    },
};

const ProfileSidebar = ({ profile }) => (
    <div className="space-y-6">
        <Card className="p-6 border-none bg-white/70 backdrop-blur-sm soft-shadow">
            <div className="text-center mb-6">
                <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl font-semibold text-primary">
                        {profile.name.charAt(0)}
                    </span>
                </div>
                <h2 className="text-xl font-semibold mb-1">{profile.name}</h2>
                <p className="text-muted-foreground">{profile.title}</p>
            </div>
            <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2 text-sm">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                        {profile.company}
                    </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                        {profile.location}
                    </span>
                </div>
            </div>
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <ProfileStat
                        label="Active Jobs"
                        value={profile.activeJobs}
                    />
                    <ProfileStat
                        label="Total Hires"
                        value={profile.totalHires}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <ProfileStat
                        label="Time to Hire"
                        value={profile.timeToHire}
                    />
                    <ProfileStat
                        label="Response Rate"
                        value={profile.responseRate}
                    />
                </div>
            </div>
        </Card>

        <QuickActions />
    </div>
);

const ProfileStat = ({ label, value }) => (
    <div className="text-center p-3 rounded-lg bg-primary/5">
        <div className="font-semibold">{value}</div>
        <div className="text-sm text-muted-foreground">{label}</div>
    </div>
);

const QuickActions = () => (
    <Card className="p-6 border-none bg-white/70 backdrop-blur-sm soft-shadow">
        <h3 className="font-semibold mb-4">Quick Actions</h3>
        <div className="space-y-2">
            <Button className="w-full justify-start" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Post New Job
            </Button>
            <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                View All Candidates
            </Button>
            <Button className="w-full justify-start" variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Schedule Interview
            </Button>
            <Button className="w-full justify-start" variant="outline">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Analytics
            </Button>
        </div>
    </Card>
);

const StatCard = ({ icon, value, label }) => (
    <Card className="p-4 border-none bg-white/70 backdrop-blur-sm soft-shadow">
        <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                {icon}
            </div>
            <div>
                <div className="text-2xl font-semibold">{value}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
            </div>
        </div>
    </Card>
);

const StatsSection = ({ stats }) => (
    <div className="grid grid-cols-4 gap-4">
        <StatCard
            icon={<Briefcase className="h-6 w-6 text-primary" />}
            value={stats.activeJobs}
            label="Active Jobs"
        />
        <StatCard
            icon={<Users className="h-6 w-6 text-primary" />}
            value={stats.totalCandidates}
            label="Total Candidates"
        />
        <StatCard
            icon={<UserCheck className="h-6 w-6 text-primary" />}
            value={stats.shortlisted}
            label="Shortlisted"
        />
        <StatCard
            icon={<Calendar className="h-6 w-6 text-primary" />}
            value={stats.interviews}
            label="Interviews"
        />
    </div>
);

const JobPostingsSection = ({ jobs }) => (
    <Card className="border-none bg-white/70 backdrop-blur-sm soft-shadow">
        <div className="p-6 pb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Active Job Postings</h3>
            <Button variant="ghost" className="text-sm">
                View All
            </Button>
        </div>
        <div className="px-6">
            {jobs.map((job) => (
                <JobPostingCard key={job.id} job={job} />
            ))}
        </div>
    </Card>
);

const JobPostingCard = ({ job }) => (
    <div className="flex items-start gap-4 py-4 border-t first:border-t-0">
        <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h4 className="font-semibold">{job.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                        {job.department}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            {job.type}
                        </div>
                        <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            {job.salary}
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {job.status}
                    </div>
                    <div className="mt-2 space-y-1">
                        <div className="flex items-center justify-end gap-1 text-sm text-muted-foreground">
                            <Users className="h-4 w-4" />
                            {job.applicants} applicants
                        </div>
                        <div className="flex items-center justify-end gap-1 text-sm text-muted-foreground">
                            <Eye className="h-4 w-4" />
                            {job.views} views
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between mt-4">
                <div className="text-sm text-muted-foreground">
                    Posted: {job.posted} • Deadline: {job.deadline}
                </div>
                <Button variant="ghost" size="sm" className="text-primary">
                    View Candidates
                    <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
            </div>
        </div>
    </div>
);

const CandidatesSection = ({ candidates }) => (
    <Card className="border-none bg-white/70 backdrop-blur-sm soft-shadow">
        <div className="p-6 pb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recent Candidates</h3>
            <Button variant="ghost" className="text-sm">
                View All
            </Button>
        </div>
        <div className="px-6">
            {candidates.map((candidate) => (
                <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
        </div>
    </Card>
);

const CandidateCard = ({ candidate }) => (
    <div className="flex items-start gap-4 py-4 border-t first:border-t-0">
        <img
            src={candidate.photo}
            alt={candidate.name}
            className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h4 className="font-semibold">{candidate.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                        {candidate.role}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            {candidate.experience}
                        </div>
                        <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {candidate.location}
                        </div>
                        <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {candidate.email}
                        </div>
                        <div className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            {candidate.phone}
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold text-primary mb-1">
                        {candidate.matchScore}%
                    </div>
                    <div className="text-sm text-muted-foreground">Match</div>
                </div>
            </div>
            <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {candidate.status}
                    </div>
                    <span className="text-sm text-muted-foreground">
                        Applied: {candidate.appliedDate}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        Schedule Interview
                    </Button>
                    <Button size="sm">View Profile</Button>
                </div>
            </div>
        </div>
    </div>
);

const ApplicationTrendCard = ({ trends }) => (
    <Card className="p-6 border-none bg-white/70 backdrop-blur-sm soft-shadow">
        <h3 className="font-semibold mb-4">Application Trend</h3>
        <div className="space-y-4">
            {trends.map((point, index) => (
                <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                        {point.date}
                    </span>
                    <div className="flex items-center gap-2">
                        <Progress
                            value={(point.count / 25) * 100}
                            className="w-32 h-2"
                        />
                        <span className="text-sm font-medium">
                            {point.count}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    </Card>
);

const SourceBreakdownCard = ({ sources }) => (
    <Card className="p-6 border-none bg-white/70 backdrop-blur-sm soft-shadow">
        <h3 className="font-semibold mb-4">Source Breakdown</h3>
        <div className="space-y-4">
            {sources.map((source, index) => (
                <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                            {source.source}
                        </span>
                        <span className="font-medium">
                            {source.percentage}%
                        </span>
                    </div>
                    <Progress value={source.percentage} className="h-2" />
                </div>
            ))}
        </div>
    </Card>
);

const TimeToHireCard = ({ timeToHire }) => (
    <Card className="p-6 border-none bg-white/70 backdrop-blur-sm soft-shadow">
        <h3 className="font-semibold mb-4">Time to Hire</h3>
        <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">
                {timeToHire.average}
            </div>
            <div className="text-sm text-muted-foreground mb-4">
                Average Days
            </div>
            <div className="flex items-center justify-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-green-500">Improving</span>
            </div>
        </div>
    </Card>
);

const AnalyticsSection = ({ analytics }) => (
    <div className="grid md:grid-cols-3 gap-4">
        <ApplicationTrendCard trends={analytics.applicationTrend} />
        <SourceBreakdownCard sources={analytics.sourceBreakdown} />
        <TimeToHireCard timeToHire={analytics.timeToHire} />
    </div>
);

export default function RecruiterDashboardPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container py-8">
                <div className="grid lg:grid-cols-[300px_1fr] gap-8">
                    <ProfileSidebar profile={mockProfile} />

                    <div className="space-y-8">
                        <StatsSection stats={mockStats} />
                        <JobPostingsSection jobs={mockJobPostings} />
                        <CandidatesSection candidates={mockCandidates} />
                        <AnalyticsSection analytics={mockAnalytics} />
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client";

import { Briefcase, BookmarkCheck, Clock, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ProfileSidebar } from "@/components/dashboard/ProfileSidebar";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ApplicationCard } from "@/components/dashboard/ApplicationCard";
import { JobCard } from "@/components/dashboard/JobCard";
import { SectionHeader } from "@/components/dashboard/SectionHeader";

const mockApplications = [
    {
        id: 1,
        company: "TechCorp",
        position: "Senior Frontend Developer",
        logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=64&h=64",
        status: "Interview",
        date: "2024-03-15",
        progress: 60,
    },
    {
        id: 2,
        company: "DesignStudio",
        position: "UI/UX Designer",
        logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3624?auto=format&fit=crop&q=80&w=64&h=64",
        status: "Applied",
        date: "2024-03-14",
        progress: 20,
    },
    {
        id: 3,
        company: "InnovateLabs",
        position: "Full Stack Engineer",
        logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3625?auto=format&fit=crop&q=80&w=64&h=64",
        status: "Offer",
        date: "2024-03-13",
        progress: 90,
    },
];

const mockSavedJobs = [
    {
        id: 1,
        title: "Senior Frontend Developer",
        company: "TechCorp",
        logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3626?auto=format&fit=crop&q=80&w=64&h=64",
        location: "San Francisco, CA",
        type: "Full-time",
        salary: "$120k - $180k",
        matchScore: 95,
    },
    {
        id: 2,
        title: "UI/UX Designer",
        company: "DesignStudio",
        logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3627?auto=format&fit=crop&q=80&w=64&h=64",
        location: "Remote",
        type: "Full-time",
        salary: "$100k - $150k",
        matchScore: 88,
    },
];

const mockRecommendedJobs = [
    {
        id: 1,
        title: "Lead Frontend Developer",
        company: "ProductHouse",
        logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3628?auto=format&fit=crop&q=80&w=64&h=64",
        location: "New York, NY",
        type: "Full-time",
        salary: "$140k - $200k",
        matchScore: 92,
        skills: {
            match: ["React", "TypeScript", "Next.js"],
            missing: ["GraphQL"],
        },
    },
    {
        id: 2,
        title: "Senior Full Stack Engineer",
        company: "InnovateLabs",
        logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3629?auto=format&fit=crop&q=80&w=64&h=64",
        location: "Remote",
        type: "Full-time",
        salary: "$130k - $190k",
        matchScore: 89,
        skills: {
            match: ["Node.js", "React", "PostgreSQL"],
            missing: ["AWS", "Docker"],
        },
    },
];

const mockProfile = {
    name: "Alex Johnson",
    title: "Senior Frontend Developer",
    location: "San Francisco, CA",
    experience: "8 years",
    education: "BS Computer Science",
    company: "TechCorp",
    skills: ["React", "TypeScript", "Next.js", "Node.js", "GraphQL"],
    profileCompletion: 85,
    profileViews: 142,
    searchAppearances: 89,
};

const mockStats = {
    applications: 12,
    interviews: 5,
    offers: 2,
    savedJobs: 8,
};

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container py-8">
                <div className="grid lg:grid-cols-[300px_1fr] gap-8">
                    <ProfileSidebar profile={mockProfile} />

                    <div className="space-y-8">
                        <div className="grid grid-cols-4 gap-4">
                            <StatsCard
                                icon={Briefcase}
                                value={mockStats.applications}
                                label="Applications"
                            />
                            <StatsCard
                                icon={Clock}
                                value={mockStats.interviews}
                                label="Interviews"
                            />
                            <StatsCard
                                icon={Award}
                                value={mockStats.offers}
                                label="Offers"
                            />
                            <StatsCard
                                icon={BookmarkCheck}
                                value={mockStats.savedJobs}
                                label="Saved Jobs"
                            />
                        </div>

                        <Card className="border-none bg-white/70 backdrop-blur-sm soft-shadow">
                            <SectionHeader
                                title="Active Applications"
                                onViewAll={() => {}}
                            />
                            <div className="px-6">
                                {mockApplications.map((application) => (
                                    <ApplicationCard
                                        key={application.id}
                                        application={application}
                                    />
                                ))}
                            </div>
                        </Card>

                        <Card className="border-none bg-white/70 backdrop-blur-sm soft-shadow">
                            <SectionHeader
                                title="Recommended Jobs"
                                onViewAll={() => {}}
                            />
                            <div className="px-6">
                                {mockRecommendedJobs.map((job) => (
                                    <JobCard
                                        key={job.id}
                                        job={job}
                                        type="recommended"
                                    />
                                ))}
                            </div>
                        </Card>

                        <Card className="border-none bg-white/70 backdrop-blur-sm soft-shadow">
                            <SectionHeader
                                title="Saved Jobs"
                                onViewAll={() => {}}
                            />
                            <div className="px-6">
                                {mockSavedJobs.map((job) => (
                                    <JobCard
                                        key={job.id}
                                        job={job}
                                        type="saved"
                                    />
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

"use client";

import { ProfileSidebar } from "@/components/dashboard/ProfileSidebar";
import { StatsSection } from "@/components/dashboard/StatsSection";
import { AnalyticsSection } from "@/components/recruiter/dashboard/AnalyticsSection";
import { CandidatesSection } from "@/components/recruiter/dashboard/CandidatesSection";
import { JobPostingsSection } from "@/components/recruiter/dashboard/JobPostingsSection";

import {
    mockProfile,
    mockStats,
    mockJobPostings,
    mockCandidates,
    mockAnalytics,
} from "@/config/constant";

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

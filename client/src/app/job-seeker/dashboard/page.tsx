"use client";

import { useEffect, useState } from "react";
import { useApiRequest } from "@/hooks/use-api";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";
import { ApplicationsSection } from "@/components/dashboard/ApplicationsSection";
import {
    DashboardLoading,
    DashboardError,
    DashboardLayout,
} from "@/components/dashboard/DashboardLayout";
import { ProfileSection } from "@/components/dashboard/ProfileSection";
import { RecommendedJobsSection } from "@/components/dashboard/RecommendedJobsSection";
import { SavedJobsSection } from "@/components/dashboard/SavedJobsSection";
import { StatsSection } from "@/components/dashboard/StatsSection";
import {
    ProfileData,
    DashboardStats,
    Application,
    Job,
} from "@/types/dashboard";
export default function DashboardPage() {
    const { user, isAuthenticated, isLoading: authLoading } = useAuth();
    const router = useRouter();
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [applications, setApplications] = useState<Application[]>([]);
    const [recommendedJobs, setRecommendedJobs] = useState<Job[]>([]);
    const [savedJobs, setSavedJobs] = useState<Job[]>([]);

    const profileRequest = useApiRequest<ProfileData>();
    const statsRequest = useApiRequest<DashboardStats>();
    const applicationsRequest = useApiRequest<Application[]>();
    const recommendedJobsRequest = useApiRequest<Job[]>();
    const savedJobsRequest = useApiRequest<Job[]>();

    useEffect(() => {
        if (!isAuthenticated || !user?.id) return;

        const fetchDashboardData = async () => {
            profileRequest
                .makeRequest("/api/jobs/profile", { showToast: false })
                .then((response) => {
                    if (response?.status === "success" && response.data) {
                        console.log(response.data);
                        setProfile(response.data);
                    }
                });

            statsRequest
                .makeRequest("/api/jobs/stats/dashboard", { showToast: false })
                .then((response) => {
                    if (response?.status === "success" && response.data) {
                        setStats(response.data);
                    }
                });

            applicationsRequest
                .makeRequest("/api/jobs/applications", { showToast: false })
                .then((response) => {
                    if (response?.status === "success" && response.data) {
                        const formattedApplications = response.data.map(
                            (app: any) => ({
                                id: app.id,
                                company: app.job.company,
                                position: app.job.title,
                                logo:
                                    app.job.logo ||
                                    `https://ui-avatars.com/api/?name=${app.job.company}&background=random`,
                                status: app.status,
                                date: new Date(app.applied_date)
                                    .toISOString()
                                    .split("T")[0],
                                progress: app.progress,
                                job: app.job,
                            })
                        );
                        setApplications(formattedApplications);
                    }
                });

            recommendedJobsRequest
                .makeRequest("/api/jobs/recommended", { showToast: false })
                .then((response) => {
                    if (response?.status === "success" && response.data) {
                        const formattedJobs = response.data.map((job: any) => ({
                            id: job.id,
                            title: job.title,
                            company: job.company,
                            logo:
                                job.logo ||
                                `https://ui-avatars.com/api/?name=${job.company}&background=random`,
                            location: job.location,
                            type: job.job_type,
                            salary: job.salary_range,
                            matchScore: job.match_score,
                            skills: {
                                match: job.matching_skills || [],
                                missing: job.missing_skills || [],
                            },
                        }));
                        setRecommendedJobs(formattedJobs);
                    }
                });

            savedJobsRequest
                .makeRequest("/api/jobs/saved", { showToast: false })
                .then((response) => {
                    if (response?.status === "success" && response.data) {
                        const formattedJobs = response.data.map(
                            (savedJob: any) => ({
                                id: savedJob.job.id,
                                title: savedJob.job.title,
                                company: savedJob.job.company,
                                logo:
                                    savedJob.job.logo ||
                                    `https://ui-avatars.com/api/?name=${savedJob.job.company}&background=random`,
                                location: savedJob.job.location,
                                type: savedJob.job.job_type,
                                salary: savedJob.job.salary_range,
                                matchScore: savedJob.job.match_score,
                            })
                        );
                        setSavedJobs(formattedJobs);
                    }
                });
        };

        fetchDashboardData();
    }, [isAuthenticated, user?.id]);

    if (authLoading) {
        return <DashboardLoading />;
    }

    if (!isAuthenticated) {
        return (
            <DashboardError
                title="Authentication Required"
                message="You need to be logged in to view your dashboard."
                buttonText="Go to Login"
                onAction={() => router.push("/login")}
            />
        );
    }

    const hasError =
        profileRequest.error ||
        statsRequest.error ||
        applicationsRequest.error ||
        recommendedJobsRequest.error ||
        savedJobsRequest.error;

    if (hasError) {
        return (
            <DashboardError
                title="Error"
                message="There was an error loading your dashboard. Please try refreshing the page."
                buttonText="Refresh Page"
                onAction={() => router.refresh()}
            />
        );
    }

    return (
        <DashboardLayout>
            <ProfileSection
                isLoading={profileRequest.isLoading}
                profile={profile}
                user={user}
            />

            <div className="space-y-8">
                <StatsSection
                    isLoading={statsRequest.isLoading}
                    stats={stats}
                />

                <ApplicationsSection
                    isLoading={applicationsRequest.isLoading}
                    applications={applications}
                />

                <RecommendedJobsSection
                    isLoading={recommendedJobsRequest.isLoading}
                    jobs={recommendedJobs}
                />

                <SavedJobsSection
                    isLoading={savedJobsRequest.isLoading}
                    jobs={savedJobs}
                />
            </div>
        </DashboardLayout>
    );
}

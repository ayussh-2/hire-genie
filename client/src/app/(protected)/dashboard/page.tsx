"use client";

import { useEffect, useState } from "react";
import { Briefcase, BookmarkCheck, Clock, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ProfileSidebar } from "@/components/dashboard/ProfileSidebar";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ApplicationCard } from "@/components/dashboard/ApplicationCard";
import { JobCard } from "@/components/dashboard/JobCard";
import { SectionHeader } from "@/components/dashboard/SectionHeader";
import { useApiRequest } from "@/hooks/use-api";
import { useAuth } from "@/contexts/auth-context";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

// Types for API responses
type Profile = {
    name: string;
    title: string;
    location: string;
    experience: string;
    education: string;
    company: string;
    skills: string[];
    profileCompletion: number;
    profileViews: number;
    searchAppearances: number;
};

type DashboardStats = {
    applications: number;
    interviews: number;
    offers: number;
    saved_jobs: number;
};

type Application = {
    id: number;
    company: string;
    position: string;
    logo?: string;
    status: string;
    date: string;
    progress: number;
    job: {
        title: string;
        company: string;
        location: string;
    };
};

type Job = {
    id: number;
    title: string;
    company: string;
    logo?: string;
    location: string;
    type: string;
    salary?: string;
    matchScore?: number;
    skills?: {
        match: string[];
        missing: string[];
    };
};

export default function DashboardPage() {
    const { user, isAuthenticated, isLoading: authLoading } = useAuth();
    const router = useRouter();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [applications, setApplications] = useState<Application[]>([]);
    const [recommendedJobs, setRecommendedJobs] = useState<Job[]>([]);
    const [savedJobs, setSavedJobs] = useState<Job[]>([]);

    const profileRequest = useApiRequest<Profile>();
    const statsRequest = useApiRequest<DashboardStats>();
    const applicationsRequest = useApiRequest<Application[]>();
    const recommendedJobsRequest = useApiRequest<Job[]>();
    const savedJobsRequest = useApiRequest<Job[]>();

    useEffect(() => {
        if (!isAuthenticated || !user?.id) return;

        const fetchDashboardData = async () => {
            profileRequest
                .makeRequest("/api/jobs/profile", {
                    showToast: false,
                })
                .then((response) => {
                    if (response?.status === "success" && response.data) {
                        setProfile(response.data);
                    }
                });

            // Fetch stats
            statsRequest
                .makeRequest("/api/jobs/stats/dashboard", {
                    showToast: false,
                })
                .then((response) => {
                    if (response?.status === "success" && response.data) {
                        setStats(response.data);
                    }
                });

            // Fetch applications
            applicationsRequest
                .makeRequest("/api/jobs/applications", {
                    showToast: false,
                })
                .then((response) => {
                    if (response?.status === "success" && response.data) {
                        // Process data to match our component structure
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

            // Fetch recommended jobs
            recommendedJobsRequest
                .makeRequest("/api/jobs/recommended-jobs", {
                    showToast: false,
                })
                .then((response) => {
                    if (response?.status === "success" && response.data) {
                        // Format recommended jobs
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

            // Fetch saved jobs
            savedJobsRequest
                .makeRequest("/api/jobs/saved-jobs", {
                    showToast: false,
                })
                .then((response) => {
                    if (response?.status === "success" && response.data) {
                        // Format saved jobs
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

    // If still loading auth, show loading skeleton
    if (authLoading) {
        return (
            <div className="min-h-screen bg-background">
                <div className="container py-8">
                    <div className="flex items-center justify-center h-96">
                        <div className="space-y-4 w-full max-w-md">
                            <Skeleton className="h-8 w-3/4 mx-auto" />
                            <Skeleton className="h-32 w-full" />
                            <Skeleton className="h-32 w-full" />
                            <Skeleton className="h-32 w-full" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // If not authenticated after auth loading completes, show login button
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-background">
                <div className="container py-8">
                    <div className="flex flex-col items-center justify-center h-96 space-y-4">
                        <h2 className="text-2xl font-bold">
                            Authentication Required
                        </h2>
                        <p className="text-muted-foreground text-center max-w-md">
                            You need to be logged in to view your dashboard.
                        </p>
                        <Button onClick={() => router.push("/login")}>
                            Go to Login
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // Loading state for the entire page
    const isLoading =
        profileRequest.isLoading ||
        statsRequest.isLoading ||
        applicationsRequest.isLoading ||
        recommendedJobsRequest.isLoading ||
        savedJobsRequest.isLoading;

    // Error handling
    const hasError =
        profileRequest.error ||
        statsRequest.error ||
        applicationsRequest.error ||
        recommendedJobsRequest.error ||
        savedJobsRequest.error;

    if (hasError) {
        return (
            <div className="min-h-screen bg-background">
                <div className="container py-8">
                    <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            There was an error loading your dashboard. Please
                            try refreshing the page.
                        </AlertDescription>
                    </Alert>
                    <div className="mt-4">
                        <Button onClick={() => router.refresh()}>
                            Refresh Page
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <div className="container py-8">
                <div className="grid lg:grid-cols-[300px_1fr] gap-8">
                    {profileRequest.isLoading ? (
                        <div className="space-y-4">
                            <Skeleton className="h-32 w-full" />
                            <Skeleton className="h-64 w-full" />
                        </div>
                    ) : (
                        <ProfileSidebar
                            profile={
                                profile || {
                                    name: user?.name || "User",
                                    title: "Please complete your profile",
                                    location: "",
                                    experience: "",
                                    education: "",
                                    company: "",
                                    skills: [],
                                    profileCompletion: 0,
                                    profileViews: 0,
                                    searchAppearances: 0,
                                }
                            }
                        />
                    )}

                    <div className="space-y-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                            {statsRequest.isLoading ? (
                                <>
                                    <Skeleton className="h-24 w-full" />
                                    <Skeleton className="h-24 w-full" />
                                    <Skeleton className="h-24 w-full" />
                                    <Skeleton className="h-24 w-full" />
                                </>
                            ) : (
                                <>
                                    <StatsCard
                                        icon={Briefcase}
                                        value={stats?.applications || 0}
                                        label="Applications"
                                    />
                                    <StatsCard
                                        icon={Clock}
                                        value={stats?.interviews || 0}
                                        label="Interviews"
                                    />
                                    <StatsCard
                                        icon={Award}
                                        value={stats?.offers || 0}
                                        label="Offers"
                                    />
                                    <StatsCard
                                        icon={BookmarkCheck}
                                        value={stats?.saved_jobs || 0}
                                        label="Saved Jobs"
                                    />
                                </>
                            )}
                        </div>

                        <Card className="border-none bg-white/70 backdrop-blur-sm soft-shadow">
                            <SectionHeader
                                title="Active Applications"
                                onViewAll={() => {}}
                            />
                            <div className="px-6">
                                {applicationsRequest.isLoading ? (
                                    <>
                                        <Skeleton className="h-24 w-full my-4" />
                                        <Skeleton className="h-24 w-full my-4" />
                                        <Skeleton className="h-24 w-full my-4" />
                                    </>
                                ) : applications.length > 0 ? (
                                    applications.map((application) => (
                                        <ApplicationCard
                                            key={application.id}
                                            application={application}
                                        />
                                    ))
                                ) : (
                                    <div className="py-8 text-center text-muted-foreground">
                                        No active applications. Start applying
                                        to jobs!
                                    </div>
                                )}
                            </div>
                        </Card>

                        <Card className="border-none bg-white/70 backdrop-blur-sm soft-shadow">
                            <SectionHeader
                                title="Recommended Jobs"
                                onViewAll={() => {}}
                            />
                            <div className="px-6">
                                {recommendedJobsRequest.isLoading ? (
                                    <>
                                        <Skeleton className="h-24 w-full my-4" />
                                        <Skeleton className="h-24 w-full my-4" />
                                    </>
                                ) : recommendedJobs.length > 0 ? (
                                    recommendedJobs.map((job) => (
                                        <JobCard
                                            key={job.id}
                                            job={job}
                                            type="recommended"
                                        />
                                    ))
                                ) : (
                                    <div className="py-8 text-center text-muted-foreground">
                                        Complete your profile to get
                                        personalized job recommendations.
                                    </div>
                                )}
                            </div>
                        </Card>

                        <Card className="border-none bg-white/70 backdrop-blur-sm soft-shadow">
                            <SectionHeader
                                title="Saved Jobs"
                                onViewAll={() => {}}
                            />
                            <div className="px-6">
                                {savedJobsRequest.isLoading ? (
                                    <>
                                        <Skeleton className="h-24 w-full my-4" />
                                        <Skeleton className="h-24 w-full my-4" />
                                    </>
                                ) : savedJobs.length > 0 ? (
                                    savedJobs.map((job) => (
                                        <JobCard
                                            key={job.id}
                                            job={job}
                                            type="saved"
                                        />
                                    ))
                                ) : (
                                    <div className="py-8 text-center text-muted-foreground">
                                        No saved jobs yet. Browse jobs and save
                                        ones you're interested in.
                                    </div>
                                )}
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

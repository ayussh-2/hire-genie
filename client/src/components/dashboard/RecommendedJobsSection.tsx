import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/dashboard/SectionHeader";
import { JobCard } from "@/components/dashboard/JobCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Job } from "@/types/dashboard";

type RecommendedJobsSectionProps = {
    isLoading: boolean;
    jobs: Job[];
};

export function RecommendedJobsSection({
    isLoading,
    jobs,
}: RecommendedJobsSectionProps) {
    return (
        <Card className="border-none bg-white/70 backdrop-blur-sm soft-shadow">
            <SectionHeader title="Recommended Jobs" onViewAll={() => {}} />
            <div className="px-6">
                {isLoading ? (
                    <>
                        <Skeleton className="h-24 w-full my-4" />
                        <Skeleton className="h-24 w-full my-4" />
                    </>
                ) : jobs.length > 0 ? (
                    jobs.map((job) => (
                        <JobCard
                            key={job.id}
                            job={{
                                ...job,
                                logo: job.logo || "default-logo.png",
                                salary: job.salary || "Not specified",
                                matchScore: job.matchScore ?? 0,
                            }}
                            type="recommended"
                        />
                    ))
                ) : (
                    <div className="py-8 text-center text-muted-foreground">
                        Complete your profile to get personalized job
                        recommendations.
                    </div>
                )}
            </div>
        </Card>
    );
}

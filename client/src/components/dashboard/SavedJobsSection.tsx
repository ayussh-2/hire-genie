import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/dashboard/SectionHeader";
import { JobCard } from "@/components/dashboard/JobCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Job } from "@/types/dashboard";

type SavedJobsSectionProps = {
    isLoading: boolean;
    jobs: Job[];
};

export function SavedJobsSection({ isLoading, jobs }: SavedJobsSectionProps) {
    return (
        <Card className="border-none bg-white/70 backdrop-blur-sm soft-shadow">
            <SectionHeader title="Saved Jobs" onViewAll={() => {}} />
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
                            type="saved"
                        />
                    ))
                ) : (
                    <div className="py-8 text-center text-muted-foreground">
                        No saved jobs yet. Browse jobs and save ones you&apos;re
                        interested in.
                    </div>
                )}
            </div>
        </Card>
    );
}

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { JobPostingCard } from "./JobPostingCard";
import { JobPosting } from "@/types/recruiter";

interface JobPostingsSectionProps {
    jobs: JobPosting[];
}

export const JobPostingsSection = ({ jobs }: JobPostingsSectionProps) => (
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

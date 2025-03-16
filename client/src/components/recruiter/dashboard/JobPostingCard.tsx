import { Button } from "@/components/ui/button";
import { JobPosting } from "@/types/recruiter";
import {
    MapPin,
    Briefcase,
    DollarSign,
    Users,
    Eye,
    ChevronRight,
} from "lucide-react";

interface JobPostingCardProps {
    job: JobPosting;
}

export const JobPostingCard = ({ job }: JobPostingCardProps) => (
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

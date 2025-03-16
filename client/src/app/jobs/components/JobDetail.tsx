import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    BookmarkPlus,
    Briefcase,
    ChevronRight,
    Clock,
    DollarSign,
    MapPin,
} from "lucide-react";
import { formatDate } from "../utils";
import type { Job } from "../types";

interface JobDetailProps {
    job: Job;
}

export const JobDetail = ({ job }: JobDetailProps) => {
    return (
        <Card className="p-6 border-none">
            <div className="flex items-start justify-between gap-4 mb-6">
                <div className="flex items-start gap-4">
                    <img
                        src={job.logo}
                        alt={job.company}
                        className="w-16 h-16 rounded-lg object-cover bg-primary/10"
                    />
                    <div>
                        <h2 className="text-xl font-semibold mb-1">
                            {job.title}
                        </h2>
                        <p className="text-muted-foreground">{job.company}</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                        {job.matchScore}%
                    </div>
                    <div className="text-sm text-muted-foreground">Match</div>
                </div>
            </div>
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-primary/5">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <MapPin className="h-4 w-4" />
                            Location
                        </div>
                        <div className="font-medium">{job.location}</div>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/5">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <Briefcase className="h-4 w-4" />
                            Job Type
                        </div>
                        <div className="font-medium">{job.type}</div>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/5">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <DollarSign className="h-4 w-4" />
                            Salary Range
                        </div>
                        <div className="font-medium">{job.salary}</div>
                    </div>
                    <div className="p-4 rounded-lg bg-primary/5">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                            <Clock className="h-4 w-4" />
                            Posted
                        </div>
                        <div className="font-medium">
                            {formatDate(job.postedDate)}
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">{job.description}</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold mb-2">Requirements</h3>
                    <ul className="space-y-2">
                        {job.requirements.map((req, index) => (
                            <li
                                key={index}
                                className="flex items-center gap-2 text-muted-foreground"
                            >
                                <ChevronRight className="h-4 w-4 text-primary" />
                                {req}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="flex gap-4">
                    <Button className="flex-1 h-12">Apply Now</Button>
                    <Button variant="outline" className="h-12 px-6">
                        <BookmarkPlus className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </Card>
    );
};

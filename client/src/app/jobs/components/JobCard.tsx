import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    ArrowUpRight,
    BookmarkPlus,
    Briefcase,
    Clock,
    DollarSign,
    MapPin,
} from "lucide-react";
import Link from "next/link";
import { formatDate } from "../utils";
import type { Job } from "../types";

interface JobCardProps {
    job: Job;
    isSelected: boolean;
    onSelect: () => void;
}

export const JobCard = ({ job, isSelected, onSelect }: JobCardProps) => {
    return (
        <Card
            className={`p-6 border-none cursor-pointer transition-all hover:bg-primary/5 ${
                isSelected ? "ring-2 ring-primary" : ""
            }`}
            onClick={onSelect}
        >
            <div className="flex items-start gap-4">
                <img
                    src={job.logo}
                    alt={job.company}
                    className="w-12 h-12 rounded-lg object-cover bg-primary/10"
                />
                <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h3 className="text-lg font-semibold mb-1">
                                {job.title}
                            </h3>
                            <p className="text-muted-foreground">
                                {job.company}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                            >
                                <BookmarkPlus className="h-4 w-4" />
                            </Button>
                            <Link href={`/jobs/${job.id}`}>
                                <Button size="icon" className="h-8 w-8">
                                    <ArrowUpRight className="h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
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
                        <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {formatDate(job.postedDate)}
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

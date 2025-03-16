import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    MapPin,
    Clock,
    Briefcase,
    DollarSign,
    BookmarkPlus,
} from "lucide-react";
import { Job } from "../../../app/jobs/[id]/types";

interface JobHeaderProps {
    job: Job;
    isBookmarked: boolean;
    setIsBookmarked: (value: boolean) => void;
}

export const JobHeader = ({
    job,
    isBookmarked,
    setIsBookmarked,
}: JobHeaderProps) => {
    return (
        <Card className="p-8 border-none bg-white/70 backdrop-blur-sm soft-shadow mb-8">
            <div className="flex items-start gap-6">
                <img
                    src={job.logo}
                    alt={job.company}
                    className="w-20 h-20 rounded-xl object-cover bg-primary/10"
                />
                <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-manrope font-bold mb-2">
                                {job.title}
                            </h1>
                            <p className="text-lg text-muted-foreground mb-4">
                                {job.company}
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
                                <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    Posted {job.postedDate}
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-bold text-primary mb-1">
                                {job.matchScore}%
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Match Score
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-4 mt-8">
                <Button className="flex-1 h-12">Apply Now</Button>
                <Button
                    variant="outline"
                    className="h-12 px-6"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                >
                    <BookmarkPlus
                        className={`h-5 w-5 ${
                            isBookmarked ? "fill-primary" : ""
                        }`}
                    />
                </Button>
            </div>
        </Card>
    );
};

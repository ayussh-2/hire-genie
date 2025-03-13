import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    MapPin,
    Briefcase,
    DollarSign,
    CheckCircle2,
    XCircle,
    BookmarkPlus,
    ArrowUpRight,
} from "lucide-react";
import Image from "next/image";

interface SavedJobProps {
    job: {
        id: number;
        title: string;
        company: string;
        logo: string;
        location: string;
        type: string;
        salary: string;
        matchScore: number;
        skills?: {
            match: string[];
            missing: string[];
        };
    };
    type: "saved" | "recommended";
}

export function JobCard({ job, type }: SavedJobProps) {
    return (
        <div className="flex items-start gap-4 py-4 border-t first:border-t-0">
            <Image
                src={job.logo}
                alt={job.company}
                className="w-12 h-12 rounded-lg object-cover bg-primary/10"
                width={48}
                height={48}
            />
            <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h4 className="font-semibold font-manrope">
                            {job.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2 font-jakarta">
                            {job.company}
                        </p>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4 font-jakarta" />
                                {job.location}
                            </div>
                            <div className="flex items-center gap-1 font-jakarta">
                                <Briefcase className="h-4 w-4" />
                                {job.type}
                            </div>
                            <div className="flex items-center gap-1 font-jakarta">
                                <DollarSign className="h-4 w-4" />
                                {job.salary}
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-primary mb-1 font-manrope">
                            {job.matchScore}%
                        </div>
                        <div className="text-sm text-muted-foreground font-jakarta">
                            Match
                        </div>
                    </div>
                </div>

                {type === "recommended" && job.skills && (
                    <div className="flex items-center gap-4 mt-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                <span className="text-sm text-muted-foreground font-jakarta">
                                    {job.skills.match.join(", ")}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <XCircle className="h-4 w-4 text-orange-500" />
                                <span className="text-sm text-muted-foreground font-jakarta">
                                    {job.skills.missing.join(", ")}
                                </span>
                            </div>
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
                )}
            </div>
        </div>
    );
}

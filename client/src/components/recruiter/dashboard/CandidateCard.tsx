import { Button } from "@/components/ui/button";
import { Candidate } from "@/types/recruiter";
import { Briefcase, MapPin, Mail, Phone } from "lucide-react";

interface CandidateCardProps {
    candidate: Candidate;
}

export const CandidateCard = ({ candidate }: CandidateCardProps) => (
    <div className="flex items-start gap-4 py-4 border-t first:border-t-0">
        <img
            src={candidate.photo}
            alt={candidate.name}
            className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex-1">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h4 className="font-semibold">{candidate.name}</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                        {candidate.role}
                    </p>
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            {candidate.experience}
                        </div>
                        <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {candidate.location}
                        </div>
                        <div className="flex items-center gap-1">
                            <Mail className="h-4 w-4" />
                            {candidate.email}
                        </div>
                        <div className="flex items-center gap-1">
                            <Phone className="h-4 w-4" />
                            {candidate.phone}
                        </div>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-bold text-primary mb-1">
                        {candidate.matchScore}%
                    </div>
                    <div className="text-sm text-muted-foreground">Match</div>
                </div>
            </div>
            <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-2">
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {candidate.status}
                    </div>
                    <span className="text-sm text-muted-foreground">
                        Applied: {candidate.appliedDate}
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        Schedule Interview
                    </Button>
                    <Button size="sm">View Profile</Button>
                </div>
            </div>
        </div>
    </div>
);

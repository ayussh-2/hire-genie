import { Candidate } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CandidateCard } from "./CandidateCard";

interface CandidatesSectionProps {
    candidates: Candidate[];
}

export const CandidatesSection = ({ candidates }: CandidatesSectionProps) => (
    <Card className="border-none bg-white/70 backdrop-blur-sm soft-shadow">
        <div className="p-6 pb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recent Candidates</h3>
            <Button variant="ghost" className="text-sm">
                View All
            </Button>
        </div>
        <div className="px-6">
            {candidates.map((candidate) => (
                <CandidateCard key={candidate.id} candidate={candidate} />
            ))}
        </div>
    </Card>
);

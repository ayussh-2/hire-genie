import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SourceBreakdown } from "@/types/recruiter";

interface SourceBreakdownCardProps {
    sources: SourceBreakdown[];
}

export const SourceBreakdownCard = ({ sources }: SourceBreakdownCardProps) => (
    <Card className="p-6 border-none bg-white/70 backdrop-blur-sm soft-shadow">
        <h3 className="font-semibold mb-4">Source Breakdown</h3>
        <div className="space-y-4">
            {sources.map((source, index) => (
                <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                            {source.source}
                        </span>
                        <span className="font-medium">
                            {source.percentage}%
                        </span>
                    </div>
                    <Progress value={source.percentage} className="h-2" />
                </div>
            ))}
        </div>
    </Card>
);

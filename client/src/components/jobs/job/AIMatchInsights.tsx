import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle } from "lucide-react";

interface AIMatchInsightsProps {
    matchScore: number;
    skills: {
        match: string[];
        missing: string[];
    };
}

export const AIMatchInsights = ({
    matchScore,
    skills,
}: AIMatchInsightsProps) => {
    return (
        <Card className="p-6 border-none bg-white/70 backdrop-blur-sm soft-shadow">
            <h2 className="text-lg font-semibold mb-4">AI Match Insights</h2>
            <div className="space-y-6">
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">
                            Overall Match
                        </span>
                        <span className="text-sm font-semibold">
                            {matchScore}%
                        </span>
                    </div>
                    <Progress value={matchScore} className="h-2" />
                </div>
                <div>
                    <h3 className="text-sm font-medium mb-3">
                        Matching Skills
                    </h3>
                    <div className="space-y-2">
                        {skills.match.map((skill, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                {skill}
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-sm font-medium mb-3">
                        Skills to Develop
                    </h3>
                    <div className="space-y-2">
                        {skills.missing.map((skill, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                                <XCircle className="h-4 w-4 text-orange-500" />
                                {skill}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    );
};

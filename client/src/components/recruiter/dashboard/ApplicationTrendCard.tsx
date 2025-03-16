import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ApplicationTrendPoint } from "@/types/recruiter";

interface ApplicationTrendCardProps {
    trends: ApplicationTrendPoint[];
}

export const ApplicationTrendCard = ({ trends }: ApplicationTrendCardProps) => (
    <Card className="p-6 border-none bg-white/70 backdrop-blur-sm soft-shadow">
        <h3 className="font-semibold mb-4">Application Trend</h3>
        <div className="space-y-4">
            {trends.map((point, index) => (
                <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                        {point.date}
                    </span>
                    <div className="flex items-center gap-2">
                        <Progress
                            value={(point.count / 25) * 100}
                            className="w-32 h-2"
                        />
                        <span className="text-sm font-medium">
                            {point.count}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    </Card>
);

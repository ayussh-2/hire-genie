import { Card } from "@/components/ui/card";
import { TimeToHire } from "@/types/recruiter";
import { TrendingUp } from "lucide-react";

interface TimeToHireCardProps {
    timeToHire: TimeToHire;
}

export const TimeToHireCard = ({ timeToHire }: TimeToHireCardProps) => (
    <Card className="p-6 border-none bg-white/70 backdrop-blur-sm soft-shadow">
        <h3 className="font-semibold mb-4">Time to Hire</h3>
        <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">
                {timeToHire.average}
            </div>
            <div className="text-sm text-muted-foreground mb-4">
                Average Days
            </div>
            <div className="flex items-center justify-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-green-500" />
                <span className="text-green-500">Improving</span>
            </div>
        </div>
    </Card>
);

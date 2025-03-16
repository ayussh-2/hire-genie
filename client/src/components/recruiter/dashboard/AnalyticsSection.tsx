import { Analytics } from "@/types/recruiter";
import { ApplicationTrendCard } from "./ApplicationTrendCard";
import { SourceBreakdownCard } from "./SourceBreakdownCard";
import { TimeToHireCard } from "./TimeToHireCard";

interface AnalyticsSectionProps {
    analytics: Analytics;
}

export const AnalyticsSection = ({ analytics }: AnalyticsSectionProps) => (
    <div className="grid md:grid-cols-3 gap-4">
        <ApplicationTrendCard trends={analytics.applicationTrend} />
        <SourceBreakdownCard sources={analytics.sourceBreakdown} />
        <TimeToHireCard timeToHire={analytics.timeToHire} />
    </div>
);

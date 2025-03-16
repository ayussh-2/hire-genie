import { Briefcase, BookmarkCheck, Clock, Award } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardStats } from "@/app/(protected)/dashboard/page";

type StatsSectionProps = {
    isLoading: boolean;
    stats: DashboardStats | null;
};

export function StatsSection({ isLoading, stats }: StatsSectionProps) {
    if (isLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <StatsCard
                icon={Briefcase}
                value={stats?.applications || 0}
                label="Applications"
            />
            <StatsCard
                icon={Clock}
                value={stats?.interviews || 0}
                label="Interviews"
            />
            <StatsCard icon={Award} value={stats?.offers || 0} label="Offers" />
            <StatsCard
                icon={BookmarkCheck}
                value={stats?.saved_jobs || 0}
                label="Saved Jobs"
            />
        </div>
    );
}

import { Briefcase, Users, UserCheck, Calendar } from "lucide-react";
import { StatCard } from "./StatCard";
import { Stats } from "@/types/recruiter";

interface StatsSectionProps {
    stats: Stats;
}

export const StatsSection = ({ stats }: StatsSectionProps) => (
    <div className="grid grid-cols-4 gap-4">
        <StatCard
            icon={<Briefcase className="h-6 w-6 text-primary" />}
            value={stats.activeJobs}
            label="Active Jobs"
        />
        <StatCard
            icon={<Users className="h-6 w-6 text-primary" />}
            value={stats.totalCandidates}
            label="Total Candidates"
        />
        <StatCard
            icon={<UserCheck className="h-6 w-6 text-primary" />}
            value={stats.shortlisted}
            label="Shortlisted"
        />
        <StatCard
            icon={<Calendar className="h-6 w-6 text-primary" />}
            value={stats.interviews}
            label="Interviews"
        />
    </div>
);

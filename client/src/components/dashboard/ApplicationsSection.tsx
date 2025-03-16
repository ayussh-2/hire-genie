import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/dashboard/SectionHeader";
import { ApplicationCard } from "@/components/dashboard/ApplicationCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Application } from "@/types/dashboard";

type ApplicationsSectionProps = {
    isLoading: boolean;
    applications: Application[];
};

export function ApplicationsSection({
    isLoading,
    applications,
}: ApplicationsSectionProps) {
    return (
        <Card className="border-none bg-white/70 backdrop-blur-sm soft-shadow">
            <SectionHeader title="Active Applications" onViewAll={() => {}} />
            <div className="px-6">
                {isLoading ? (
                    <>
                        <Skeleton className="h-24 w-full my-4" />
                        <Skeleton className="h-24 w-full my-4" />
                        <Skeleton className="h-24 w-full my-4" />
                    </>
                ) : applications.length > 0 ? (
                    applications.map((application) => (
                        <ApplicationCard
                            key={application.id}
                            application={{
                                ...application,
                                logo: application.logo ?? "default-logo.png",
                            }}
                        />
                    ))
                ) : (
                    <div className="py-8 text-center text-muted-foreground">
                        No active applications. Start applying to jobs!
                    </div>
                )}
            </div>
        </Card>
    );
}

import { Profile } from "@/types";
import { Card } from "@/components/ui/card";
import { Building2, MapPin } from "lucide-react";
import { ProfileStat } from "./ProfileStat";
import { QuickActions } from "./QuickActions";

interface ProfileSidebarProps {
    profile: Profile;
}

export const ProfileSidebar = ({ profile }: ProfileSidebarProps) => (
    <div className="space-y-6">
        <Card className="p-6 border-none bg-white/70 backdrop-blur-sm soft-shadow">
            <div className="text-center mb-6">
                <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                    <span className="text-3xl font-semibold text-primary">
                        {profile.name.charAt(0)}
                    </span>
                </div>
                <h2 className="text-xl font-semibold mb-1">{profile.name}</h2>
                <p className="text-muted-foreground">{profile.title}</p>
            </div>
            <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2 text-sm">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                        {profile.company}
                    </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                        {profile.location}
                    </span>
                </div>
            </div>
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <ProfileStat
                        label="Active Jobs"
                        value={profile.activeJobs}
                    />
                    <ProfileStat
                        label="Total Hires"
                        value={profile.totalHires}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <ProfileStat
                        label="Time to Hire"
                        value={profile.timeToHire}
                    />
                    <ProfileStat
                        label="Response Rate"
                        value={profile.responseRate}
                    />
                </div>
            </div>
        </Card>

        <QuickActions />
    </div>
);

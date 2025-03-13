import { Building2, Briefcase, GraduationCap, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ProfileSidebarProps {
    profile: {
        name: string;
        title: string;
        location: string;
        experience: string;
        education: string;
        company: string;
        skills: string[];
        profileCompletion: number;
        profileViews: number;
        searchAppearances: number;
    };
}

export function ProfileSidebar({ profile }: ProfileSidebarProps) {
    return (
        <div className="space-y-6">
            <Card className="p-6 border-none bg-white/70 backdrop-blur-sm soft-shadow">
                <div className="text-center mb-6">
                    <div className="w-24 h-24 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                        <span className="text-3xl font-semibold text-primary font-manrope">
                            {profile.name.charAt(0)}
                        </span>
                    </div>
                    <h2 className="text-xl font-semibold mb-1 font-manrope">
                        {profile.name}
                    </h2>
                    <p className="text-muted-foreground font-jakarta">
                        {profile.title}
                    </p>
                </div>
                <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground font-manrope">
                            {profile.location}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground font-manrope">
                            {profile.experience}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground font-manrope">
                            {profile.education}
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <Building2 className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground font-manrope">
                            {profile.company}
                        </span>
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium font-jakarta">
                                Profile Completion
                            </span>
                            <span className="text-sm font-semibold font-jakarta">
                                {profile.profileCompletion}%
                            </span>
                        </div>
                        <Progress
                            value={profile.profileCompletion}
                            className="h-2"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="text-center p-3 rounded-lg bg-primary/5">
                            <div className="font-semibold">
                                {profile.profileViews}
                            </div>
                            <div className="text-sm text-muted-foreground font-manrope">
                                Profile Views
                            </div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-primary/5">
                            <div className="font-semibold font-manrope">
                                {profile.searchAppearances}
                            </div>
                            <div className="text-sm text-muted-foreground font-manrope">
                                Search Appearances
                            </div>
                        </div>
                    </div>
                </div>
            </Card>

            <Card className="p-6 border-none bg-white/70 backdrop-blur-sm soft-shadow">
                <h3 className="font-semibold mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                        <div
                            key={index}
                            className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-manrope"
                        >
                            {skill}
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
}

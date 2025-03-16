import { ProfileSidebar } from "@/components/dashboard/ProfileSidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { ProfileData } from "@/types/dashboard";

type ProfileSectionProps = {
    isLoading: boolean;
    profile: ProfileData | null;
    user: any;
};

export function ProfileSection({
    isLoading,
    profile,
    user,
}: ProfileSectionProps) {
    if (isLoading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-32 w-full" />
                <Skeleton className="h-64 w-full" />
            </div>
        );
    }

    const profileData = profile
        ? {
              name: user?.name || "User",
              title: profile.title || "Please complete your profile",
              location: profile.location || "",
              experience: profile.experience || "",
              education: profile.education || "",
              company: profile.company || "",
              skills: profile.skills || [],
              profileCompletion: profile.profile_completion || 0,
              profileViews: profile.profile_views || 0,
              searchAppearances: profile.search_appearances || 0,
          }
        : {
              name: user?.name || "User",
              title: "Please complete your profile",
              location: "",
              experience: "",
              education: "",
              company: "",
              skills: [],
              profileCompletion: 0,
              profileViews: 0,
              searchAppearances: 0,
          };

    return <ProfileSidebar profile={profileData} />;
}

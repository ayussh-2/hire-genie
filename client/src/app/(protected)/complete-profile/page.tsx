"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useApiRequest } from "@/hooks/use-api";
import CompleteProfileForm from "@/components/profile/complete-profile-form";

export default function CompleteProfilePage() {
    const router = useRouter();
    const { isLoading, makeRequest } = useApiRequest();

    useEffect(() => {
        const checkExistingProfile = async () => {
            const response = await makeRequest("/jobs/profile", {
                method: "GET",
                showToast: false,
            });

            if (response?.status === "success" && response?.data) {
                router.push("/dashboard");
            }
        };

        checkExistingProfile();
    }, [makeRequest, router]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                Loading...
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10">
            <CompleteProfileForm />
        </div>
    );
}

"use client";
import { useAuth } from "@/contexts/auth-context";
import React, { useEffect, useState } from "react";

export default function Logout() {
    const { logout } = useAuth();
    const [isLoggingOut, setIsLoggingOut] = useState(true);

    useEffect(() => {
        const performLogout = async () => {
            try {
                await logout();
            } catch (error) {
                console.error("Logout failed:", error);
            } finally {
                setIsLoggingOut(false);
            }
        };

        performLogout();
    }, [logout]);

    return (
        <div>
            {isLoggingOut ? "Logging out..." : "You have been logged out."}
        </div>
    );
}

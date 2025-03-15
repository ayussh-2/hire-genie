// @ts-nocheck
"use client";

import { createContext, useContext, ReactNode, useState } from "react";
import { useSession } from "next-auth/react";
import { signOut } from "@/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type User = {
    accessToken: any;
    id: string;
    email: string;
    name: string;
    role?: string;
};

type AuthContextType = {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    logout: () => Promise<void>;
    updateSession: (userData: any) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [user, setUser] = useState<User | null>(
        session?.user
            ? {
                  id: session.user.id as string,
                  email: session.user.email as string,
                  name: session.user.username as string,
                  role: session.user.role as string,
                  accessToken: (session as any).accessToken as string,
              }
            : null
    );

    const isLoading = status === "loading";
    const isAuthenticated = !!user;

    const logout = async () => {
        try {
            await signOut({ redirect: false });
            router.push("/login");
            toast.success("Logged out successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to logout");
        }
    };

    const updateSession = async (userData: any) => {
        try {
            setUser(userData);
        } catch (error) {
            console.error("Failed to update session:", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated,
                logout,
                updateSession,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

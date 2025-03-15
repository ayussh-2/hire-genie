"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { LoginFormData, loginSchema } from "@/lib/validators/auth";
import { toast } from "sonner";
import LoginForm from "@/components/auth/login-form";
import { login } from "@/actions/auth";
import { useAuth } from "@/contexts/auth-context";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const { updateSession } = useAuth();

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(data: LoginFormData) {
        setIsLoading(true);
        try {
            const result = await login({
                email: data.email,
                password: data.password,
            });

            console.log(result);

            if (result?.error) {
                toast.error("Invalid credentials. Please try again.");
            } else {
                // Store tokens in localStorage
                if (result.tokens) {
                    localStorage.setItem(
                        "accessToken",
                        result.tokens.access_token
                    );
                    localStorage.setItem(
                        "refreshToken",
                        result.tokens.refresh_token
                    );

                    // Update auth context with new user data
                    await updateSession({
                        ...result.user,
                        accessToken: result.tokens.access_token,
                    });
                }

                // router.push("/dashboard");
                toast.success("Login successful!");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred during login");
        } finally {
            setIsLoading(false);
        }
    }

    return <LoginForm form={form} onSubmit={onSubmit} isLoading={isLoading} />;
}

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "@/lib/validators/auth";
import { toast } from "sonner";
import LoginForm from "@/components/auth/login-form";
import { useAuth } from "@/contexts/auth-context";
export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
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
            await login({
                email: data.email,
                password: data.password,
            });

            toast.success("Login successful!");
        } catch (error) {
            console.error(error);
            toast.error("An error occurred during login");
        } finally {
            setIsLoading(false);
        }
    }

    return <LoginForm form={form} onSubmit={onSubmit} isLoading={isLoading} />;
}

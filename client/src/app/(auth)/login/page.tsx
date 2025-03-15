"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { LoginFormData, loginSchema } from "@/lib/validators/auth";
import { toast } from "sonner";
import LoginForm from "@/components/auth/login-form";
import { login } from "@/actions/auth";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

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
                redirect: false,
            });

            if (result?.error) {
                toast.error("Invalid credentials. Please try again.");
            } else {
                router.push("/dashboard");
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

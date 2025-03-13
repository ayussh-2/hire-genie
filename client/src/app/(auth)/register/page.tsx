"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormData, registerSchema } from "@/lib/validators/auth";

import { useApiRequest } from "@/hooks/use-api";
import RegisterForm from "@/components/auth/register-form";

export default function RegisterPage() {
    const { isLoading, makeRequest, data: response, error } = useApiRequest();

    const form = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            role: "jobseeker",
        },
    });

    const watchedRole = form.watch("role");
    const password = form.watch("password");

    async function onSubmit(data: RegisterFormData) {
        await makeRequest("/auth/register", {
            method: "POST",
            body: data,
            showToast: true,
            successMessage: "Account created successfully!",
            errorMessage: "An error occurred while creating your account",
        });

        if (error) {
            console.log(error);
        }

        if (response) {
            console.log(response);
        }
    }

    return (
        <RegisterForm
            form={form}
            onSubmit={onSubmit}
            isLoading={isLoading}
            watchedRole={watchedRole}
            password={password}
        />
    );
}

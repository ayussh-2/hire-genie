"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { RegisterFormData, registerSchema } from "@/lib/validators/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Lock,
    Mail,
    User,
    Briefcase,
    UserCircle,
    Check,
    X,
} from "lucide-react";
import { useApiRequest } from "@/hooks/use-api";

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

    const password = form.watch("password");
    const watchedRole = form.watch("role");

    const passwordChecks = [
        { label: "At least 8 characters", valid: password.length >= 8 },
        { label: "Contains uppercase letter", valid: /[A-Z]/.test(password) },
        { label: "Contains lowercase letter", valid: /[a-z]/.test(password) },
        { label: "Contains number", valid: /\d/.test(password) },
        {
            label: "Contains special character",
            valid: /[@$!%*?&]/.test(password),
        },
    ];

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
        <Card className="border-none soft-shadow max-w-xl mx-auto my-20">
            <CardHeader className="space-y-1 text-center pb-8">
                <CardTitle className="text-3xl font-manrope font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
                    Create an account
                </CardTitle>
                <CardDescription className="text-base text-muted-foreground">
                    Enter your details to get started
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm font-medium">
                            Full Name
                        </Label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 h-5 w-5 text-muted-foreground/50" />
                            <Input
                                id="name"
                                placeholder="John Doe"
                                className="pl-10 h-12 text-base bg-white border-muted"
                                {...form.register("username")}
                            />
                        </div>
                        {form.formState.errors.username && (
                            <p className="text-sm text-destructive mt-1">
                                {form.formState.errors.username.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                            Email
                        </Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground/50" />
                            <Input
                                id="email"
                                placeholder="name@example.com"
                                type="email"
                                className="pl-10 h-12 text-base bg-white border-muted"
                                {...form.register("email")}
                            />
                        </div>
                        {form.formState.errors.email && (
                            <p className="text-sm text-destructive mt-1">
                                {form.formState.errors.email.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-2">
                        <Label
                            htmlFor="password"
                            className="text-sm font-medium"
                        >
                            Password
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground/50" />
                            <Input
                                id="password"
                                type="password"
                                className="pl-10 h-12 text-base bg-white border-muted"
                                {...form.register("password")}
                            />
                        </div>
                        {form.formState.errors.password && (
                            <p className="text-sm text-destructive mt-1">
                                {form.formState.errors.password.message}
                            </p>
                        )}
                        <div className="space-y-2 mt-2 p-3 bg-muted/30 rounded-lg">
                            {passwordChecks.map(({ label, valid }, index) => (
                                <div
                                    key={index}
                                    className="flex items-center space-x-2"
                                >
                                    {valid ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <X className="h-4 w-4 text-muted-foreground" />
                                    )}
                                    <span
                                        className={`text-sm ${
                                            valid
                                                ? "text-green-500"
                                                : "text-muted-foreground"
                                        }`}
                                    >
                                        {label}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label
                            htmlFor="confirmPassword"
                            className="text-sm font-medium"
                        >
                            Confirm Password
                        </Label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground/50" />
                            <Input
                                id="confirmPassword"
                                type="password"
                                className="pl-10 h-12 text-base bg-white border-muted"
                                {...form.register("confirmPassword")}
                            />
                        </div>
                        {form.formState.errors.confirmPassword && (
                            <p className="text-sm text-destructive mt-1">
                                {form.formState.errors.confirmPassword.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-3">
                        <Label className="text-sm font-medium">I am a</Label>
                        <RadioGroup
                            value={watchedRole}
                            onValueChange={(value) =>
                                form.setValue(
                                    "role",
                                    value as "recruiter" | "jobseeker"
                                )
                            }
                            className="grid grid-cols-2 gap-4"
                        >
                            <div className="relative">
                                <RadioGroupItem
                                    value="jobseeker"
                                    id="jobseeker"
                                    className="sr-only"
                                />
                                <Label
                                    htmlFor="jobseeker"
                                    className={`flex flex-col items-center justify-center p-4 border rounded-xl cursor-pointer transition-all ${
                                        watchedRole === "jobseeker"
                                            ? "border-primary bg-primary/5"
                                            : "hover:border-primary"
                                    }`}
                                >
                                    <UserCircle className="h-6 w-6 mb-2 text-muted-foreground" />
                                    <span className="text-sm font-medium">
                                        Job Seeker
                                    </span>
                                </Label>
                            </div>
                            <div className="relative">
                                <RadioGroupItem
                                    value="recruiter"
                                    id="recruiter"
                                    className="sr-only"
                                />
                                <Label
                                    htmlFor="recruiter"
                                    className={`flex flex-col items-center justify-center p-4 border rounded-xl cursor-pointer transition-all ${
                                        watchedRole === "recruiter"
                                            ? "border-primary bg-primary/5"
                                            : "hover:border-primary"
                                    }`}
                                >
                                    <Briefcase className="h-6 w-6 mb-2 text-muted-foreground" />
                                    <span className="text-sm font-medium">
                                        Recruiter
                                    </span>
                                </Label>
                            </div>
                        </RadioGroup>
                        {form.formState.errors.role && (
                            <p className="text-sm text-destructive">
                                {form.formState.errors.role.message}
                            </p>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90 cursor-pointer"
                        disabled={isLoading}
                    >
                        {isLoading ? "Creating account..." : "Create account"}
                    </Button>
                    <p className="text-center text-muted-foreground">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-medium text-primary hover:text-primary/80 transition-colors"
                        >
                            Sign in
                        </Link>
                    </p>
                </form>
            </CardContent>
        </Card>
    );
}

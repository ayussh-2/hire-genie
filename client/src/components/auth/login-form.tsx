"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Lock, Mail, Briefcase, UserCircle } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { LoginFormData } from "@/lib/validators/auth";

type LoginFormProps = {
    form: UseFormReturn<LoginFormData>;
    onSubmit: (data: LoginFormData) => Promise<void>;
    isLoading: boolean;
    watchedRole: string;
};

export default function LoginForm({
    form,
    onSubmit,
    isLoading,
    watchedRole,
}: LoginFormProps) {
    return (
        <Card className="border-none soft-shadow max-w-lg mx-auto my-20">
            <CardHeader className="space-y-1 text-center pb-8">
                <CardTitle className="text-3xl font-manrope font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
                    Welcome back
                </CardTitle>
                <CardDescription className="text-base text-muted-foreground">
                    Enter your credentials to access your account
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
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
                                disabled={isLoading}
                            />
                        </div>
                        {form.formState.errors.email && (
                            <p className="text-sm text-destructive mt-1">
                                {form.formState.errors.email?.message as string}
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
                                disabled={isLoading}
                            />
                        </div>
                        {form.formState.errors.password && (
                            <p className="text-sm text-destructive mt-1">
                                {
                                    form.formState.errors.password
                                        .message as string
                                }
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
                                {form.formState.errors.role.message as string}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Checkbox
                                id="rememberMe"
                                className="border-muted data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                {...form.register("rememberMe")}
                                disabled={isLoading}
                            />
                            <Label htmlFor="rememberMe" className="text-sm">
                                Remember me
                            </Label>
                        </div>
                        <Link
                            href="/reset-password"
                            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                        >
                            Forgot password?
                        </Link>
                    </div>
                    <Button
                        type="submit"
                        className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90"
                        disabled={isLoading}
                    >
                        {isLoading ? "Signing in..." : "Sign in"}
                    </Button>
                    <p className="text-center text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/register"
                            className="font-medium text-primary hover:text-primary/80 transition-colors"
                        >
                            Sign up
                        </Link>
                    </p>
                </form>
            </CardContent>
        </Card>
    );
}

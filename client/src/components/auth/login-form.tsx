"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Lock, Mail } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { LoginFormData } from "@/lib/validators/auth";

type LoginFormProps = {
    form: UseFormReturn<LoginFormData>;
    onSubmit: (data: LoginFormData) => Promise<void>;
    isLoading: boolean;
};

export default function LoginForm({
    form,
    onSubmit,
    isLoading,
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

                    <div className="flex items-center justify-between">
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

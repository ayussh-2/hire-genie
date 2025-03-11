"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import {
    ForgotPasswordFormData,
    forgotPasswordSchema,
} from "@/lib/validators/auth";
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
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const form = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    async function onSubmit(data: ForgotPasswordFormData) {
        setIsLoading(true);
        try {
            // Handle password reset logic here
            console.log(data);
            setIsSubmitted(true);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    if (isSubmitted) {
        return (
            <Card className="border-none soft-shadow bg-white/70 backdrop-blur-xl">
                <CardHeader className="space-y-1 text-center pb-8">
                    <div className="flex justify-center mb-4">
                        <CheckCircle2 className="h-12 w-12 text-green-500" />
                    </div>
                    <CardTitle className="text-3xl font-manrope font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
                        Check your email
                    </CardTitle>
                    <CardDescription className="text-base text-muted-foreground">
                        We&apos;ve sent you a password reset link. Please check
                        your email and follow the instructions to reset your
                        password.
                    </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                    <Link
                        href="/auth/login"
                        className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to login
                    </Link>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="border-none soft-shadow bg-white/70 backdrop-blur-xl max-w-lg mx-auto my-20">
            <CardHeader className="space-y-1 text-center pb-8">
                <CardTitle className="text-3xl font-manrope font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent">
                    Forgot password?
                </CardTitle>
                <CardDescription className="text-base text-muted-foreground">
                    Enter your email address and we&apos;ll send you a link to
                    reset your password
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
                            />
                        </div>
                        {form.formState.errors.email && (
                            <p className="text-sm text-destructive mt-1">
                                {form.formState.errors.email.message}
                            </p>
                        )}
                    </div>
                    <Button
                        type="submit"
                        className="w-full h-12 text-base font-medium bg-primary hover:bg-primary/90"
                        disabled={isLoading}
                    >
                        {isLoading ? "Sending..." : "Send reset link"}
                    </Button>
                    <div className="text-center">
                        <Link
                            href="/login"
                            className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to login
                        </Link>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LoginFormData, loginSchema } from "@/lib/validators/auth";
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
import { toast } from "sonner";

export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            role: "jobseeker",
            rememberMe: false,
        },
    });

    async function onSubmit(data: LoginFormData) {
        setIsLoading(true);
        try {
            const result = await signIn("credentials", {
                email: data.email,
                password: data.password,
                role: data.role,
                redirect: false,
            });

            console.log(result);

            if (result?.error) {
                toast.error("Invalid credentials. Please try again.");
            } else {
                const redirectPath =
                    data.role === "recruiter"
                        ? "/recruiter/dashboard"
                        : "/jobs";

                router.push(redirectPath);
                toast.success("Login successful!");
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred during login");
        } finally {
            setIsLoading(false);
        }
    }

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
                                disabled={isLoading}
                            />
                        </div>
                        {form.formState.errors.password && (
                            <p className="text-sm text-destructive mt-1">
                                {form.formState.errors.password.message}
                            </p>
                        )}
                    </div>
                    <div className="space-y-3">
                        <Label className="text-sm font-medium">I am a</Label>
                        <RadioGroup
                            defaultValue="jobseeker"
                            className="grid grid-cols-2 gap-4"
                            {...form.register("role")}
                        >
                            <div className="relative">
                                <RadioGroupItem
                                    value="jobseeker"
                                    id="jobseeker"
                                    className="peer sr-only"
                                />
                                <Label
                                    htmlFor="jobseeker"
                                    className="flex flex-col items-center justify-center p-4 border rounded-xl cursor-pointer hover:border-primary peer-checked:border-primary peer-checked:bg-primary/5 transition-all"
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
                                    className="peer sr-only"
                                />
                                <Label
                                    htmlFor="recruiter"
                                    className="flex flex-col items-center justify-center p-4 border rounded-xl cursor-pointer hover:border-primary peer-checked:border-primary peer-checked:bg-primary/5 transition-all"
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

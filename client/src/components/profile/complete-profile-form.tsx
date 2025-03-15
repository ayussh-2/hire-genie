"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useApiRequest } from "@/hooks/use-api";
import { ProfileFormData, profileFormSchema } from "@/lib/validators/profile";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function CompleteProfileForm() {
    const router = useRouter();
    const [skillInput, setSkillInput] = useState("");
    const [skills, setSkills] = useState<string[]>([]);
    const { isLoading, makeRequest } = useApiRequest();

    const form = useForm<ProfileFormData>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            title: "",
            location: "",
            experience: "",
            education: "",
            company: "",
            skills: [],
        },
    });

    const addSkill = () => {
        if (skillInput.trim() && !skills.includes(skillInput.trim())) {
            const newSkills = [...skills, skillInput.trim()];
            setSkills(newSkills);
            form.setValue("skills", newSkills);
            setSkillInput("");
        }
    };

    const removeSkill = (skillToRemove: string) => {
        const newSkills = skills.filter((skill) => skill !== skillToRemove);
        setSkills(newSkills);
        form.setValue("skills", newSkills);
    };

    const onSubmit = async (data: ProfileFormData) => {
        // First create the profile
        const profileResponse = await makeRequest("/jobs/profile", {
            method: "POST",
            body: {
                title: data.title,
                location: data.location,
                experience: data.experience,
                education: data.education,
                company: data.company || "",
            },
            successMessage: "Profile created successfully!",
        });

        // If profile creation was successful and we have skills to add
        if (profileResponse?.status === "success" && skills.length > 0) {
            // Add each skill one by one
            for (const skill of skills) {
                await makeRequest(
                    `/jobs/profile/skills/${encodeURIComponent(skill)}`,
                    {
                        method: "POST",
                        showToast: false,
                    }
                );
            }
        }

        // Redirect to dashboard after successful profile creation
        if (profileResponse?.status === "success") {
            router.push("/dashboard");
        }
    };

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold">
                    Complete Your Profile
                </CardTitle>
                <CardDescription>
                    Please fill in your professional details to complete your
                    profile and get started.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Professional Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="e.g. Software Engineer"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="location"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Location</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="e.g. San Francisco, CA"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Current Company (Optional)
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="e.g. Acme Inc."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="experience"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Experience</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Describe your professional experience"
                                            className="min-h-[100px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="education"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Education</FormLabel>
                                    <FormControl>
                                        <Textarea
                                            placeholder="Describe your educational background"
                                            className="min-h-[100px]"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="space-y-2">
                            <FormLabel>Skills</FormLabel>
                            <div className="flex gap-2">
                                <Input
                                    value={skillInput}
                                    onChange={(e) =>
                                        setSkillInput(e.target.value)
                                    }
                                    placeholder="Add a skill (e.g. React, Project Management)"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            addSkill();
                                        }
                                    }}
                                />
                                <Button type="button" onClick={addSkill}>
                                    Add
                                </Button>
                            </div>

                            {skills.length > 0 && (
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {skills.map((skill) => (
                                        <div
                                            key={skill}
                                            className="bg-muted px-3 py-1 rounded-full flex items-center gap-2"
                                        >
                                            <span>{skill}</span>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeSkill(skill)
                                                }
                                                className="text-xs text-muted-foreground hover:text-foreground"
                                            >
                                                ✕
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isLoading}
                        >
                            {isLoading
                                ? "Creating Profile..."
                                : "Complete Profile"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}

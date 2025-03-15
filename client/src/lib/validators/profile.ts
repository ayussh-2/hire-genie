import { z } from "zod";

export const profileFormSchema = z.object({
    title: z.string().min(1, "Job title is required"),
    location: z.string().min(1, "Location is required"),
    experience: z.string().min(1, "Experience information is required"),
    education: z.string().min(1, "Education information is required"),
    company: z.string().optional(),
    skills: z.array(z.string()).optional(),
});

export type ProfileFormData = z.infer<typeof profileFormSchema>;

"use server";

import { signIn } from "@/auth";

export async function login(data: {
    email: string;
    password: string;
    role: string;
    redirect: boolean;
}) {
    return signIn("credentials", {
        email: data.email,
        password: data.password,
        role: data.role,
        redirect: false,
    });
}

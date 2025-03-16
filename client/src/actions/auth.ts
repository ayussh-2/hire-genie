"use server";

import { signIn } from "@/auth";

export async function login(data: { email: string; password: string }) {
    return signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: true,
    });
}

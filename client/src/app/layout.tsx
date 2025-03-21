import type { Metadata } from "next";
import "./globals.css";
import { jakarta, manrope } from "./fonts";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/contexts/auth-context";

export const metadata: Metadata = {
    title: "Hire Genie - Your Career Journey Starts Here",
    description:
        "Connect with opportunities and talent in our professional network",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${jakarta.variable} ${manrope.variable} antialiased`}
            >
                <SessionProvider>
                    <AuthProvider>
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="light"
                            enableSystem={false}
                            storageKey="job-portal-theme"
                        >
                            <Toaster
                                position="top-right"
                                toastOptions={{
                                    style: {
                                        color: "#3fbcea",
                                    },
                                }}
                            />

                            {children}
                        </ThemeProvider>
                    </AuthProvider>
                </SessionProvider>
            </body>
        </html>
    );
}

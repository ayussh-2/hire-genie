import type { Metadata } from "next";
import "./globals.css";
import { jakarta, manrope } from "./fonts";
import { ThemeProvider } from "@/components/theme-provider";

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
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem={false}
                    storageKey="job-portal-theme"
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}

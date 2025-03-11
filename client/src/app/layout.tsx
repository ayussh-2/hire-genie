import type { Metadata } from "next";
import "./globals.css";
import { jakarta, manrope } from "./fonts";
import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

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
                    <Navbar />
                    {children}
                    <Footer />
                </ThemeProvider>
            </body>
        </html>
    );
}

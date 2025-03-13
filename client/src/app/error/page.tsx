"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ErrorPage() {
    const searchParams = useSearchParams();
    const [errorMessage, setErrorMessage] = useState("An error occurred");

    useEffect(() => {
        // Get error type from URL
        const error = searchParams.get("error");

        // Display user-friendly error messages based on the error type
        switch (error) {
            case "CredentialsSignin":
                setErrorMessage("Invalid email or password. Please try again.");
                break;
            case "AccessDenied":
                setErrorMessage(
                    "You don't have permission to access this resource."
                );
                break;
            case "OAuthSignin":
            case "OAuthCallback":
            case "OAuthCreateAccount":
            case "OAuthAccountNotLinked":
                setErrorMessage(
                    "There was a problem with your social sign-in. Please try again."
                );
                break;
            case "SessionRequired":
                setErrorMessage("Please sign in to access this page.");
                break;
            default:
                setErrorMessage("An unexpected authentication error occurred.");
                break;
        }
    }, [searchParams]);

    return (
        <div className="flex min-h-screen flex-col items-center justify-center p-4">
            <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
                <div className="mb-6 flex flex-col items-center">
                    <div className="mb-4 rounded-full bg-red-100 p-3">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-red-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Authentication Error
                    </h2>
                </div>

                <p className="mb-6 text-center text-gray-700">{errorMessage}</p>

                <div className="flex justify-center">
                    <Link
                        href="/login"
                        className="rounded-md bg-blue-600 px-6 py-2 text-center text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        Return to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}

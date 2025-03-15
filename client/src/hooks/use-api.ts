import { useState, useCallback } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth-context";

interface ApiResponse<T> {
    status: "success" | "error";
    message: string;
    data?: T;
    errors?: string | Record<string, string> | any;
    meta?: {
        page?: number;
        limit?: number;
        total?: number;
        cache?: boolean;
    };
}

interface RequestOptions {
    method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
    body?: any;
    headers?: Record<string, string>;
    showToast?: boolean;
    loadingMessage?: string;
    successMessage?: string | ((data: ApiResponse<any>) => string);
    errorMessage?: string | ((errors: ApiResponse<any>["errors"]) => string);
    useErrorMessageFromResponse?: boolean;
    requireAuth?: boolean;
}

interface UseApiRequestResult<T> {
    isLoading: boolean;
    data: T | null;
    error: ApiResponse<any>["errors"] | null;
    makeRequest: (
        url: string,
        options?: RequestOptions
    ) => Promise<ApiResponse<T> | null>;
}

export function useApiRequest<T = any>(): UseApiRequestResult<T> {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<ApiResponse<any>["errors"] | null>(null);
    const { user } = useAuth();

    const makeRequest = useCallback(
        async (
            url: string,
            options: RequestOptions = {}
        ): Promise<ApiResponse<T> | null> => {
            const {
                method = "GET",
                body,
                headers = {},
                showToast = true,
                loadingMessage = "Loading...",
                successMessage = "Success!",
                requireAuth = true,
            } = options;

            setIsLoading(true);
            setError(null);

            const authHeaders: Record<string, string> = {};
            if (requireAuth) {
                if (!user) {
                    setError({ message: "Authentication required" });
                    setIsLoading(false);
                    if (showToast) {
                        toast.error(
                            "You must be logged in to access this resource"
                        );
                    }
                    return null;
                }

                if (user) {
                    try {
                        if (user?.accessToken) {
                            authHeaders[
                                "Authorization"
                            ] = `Bearer ${user.accessToken}`;
                        }
                    } catch (e) {
                        console.error(
                            "Failed to parse session from localStorage",
                            e
                        );
                    }
                }
            }

            const requestOptions: RequestInit = {
                method,
                headers: {
                    "Content-Type": "application/json",
                    ...authHeaders,
                    ...headers,
                },
                credentials: "include",
            };

            if (body && method !== "GET") {
                requestOptions.body = JSON.stringify(body);
            }

            let toastId: any = null;
            if (showToast) {
                toastId = toast.loading(loadingMessage);
            }

            try {
                const apiUrl = url.startsWith("/api") ? url : `/api${url}`;

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}${apiUrl}`,
                    requestOptions
                );

                const responseData = (await response.json()) as ApiResponse<T>;

                if (!response.ok || responseData.status === "error") {
                    // Handle error responses
                    setError(
                        responseData.errors || {
                            message: responseData.message || "Unknown error",
                        }
                    );

                    if (showToast) {
                        toast.error(
                            responseData.message || "An error occurred",
                            { id: toastId }
                        );
                    }

                    setIsLoading(false);

                    if (response.status === 401) {
                        toast.error(
                            "Authentication required. Please log in again."
                        );
                    }

                    return responseData;
                }

                setData(responseData.data || null);

                if (showToast) {
                    toast.success(
                        typeof successMessage === "function"
                            ? successMessage(responseData)
                            : successMessage,
                        { id: toastId }
                    );
                }

                setIsLoading(false);
                return {
                    status: "success",
                    message: successMessage as string,
                    data: responseData.data,
                };
            } catch (err) {
                console.error("API request error:", err);

                const errorMessage =
                    "Network error. Please check your connection.";

                setError({
                    message: errorMessage,
                });

                if (showToast) {
                    toast.error(errorMessage, { id: toastId });
                }

                setIsLoading(false);
                return null;
            }
        },
        [user]
    );

    return { isLoading, data, error, makeRequest };
}

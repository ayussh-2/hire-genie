import { useState, useCallback } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/auth-context";
import { useRouter } from "next/navigation";

interface ApiResponse<T> {
    status: "success" | "error";
    message: string;
    data?: any;
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
    const [data, setData] = useState<any | null>(null);
    const [error, setError] = useState<ApiResponse<any>["errors"] | null>(null);
    const { user, updateSession, logout } = useAuth();
    const router = useRouter();

    const isRefreshing = { current: false };
    const pendingRequests: Array<() => Promise<any>> = [];

    const refreshToken = async (): Promise<boolean> => {
        try {
            if (!localStorage.getItem("refreshToken")) {
                return false;
            }

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        refresh_token: localStorage.getItem("refreshToken"),
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Failed to refresh token");
            }

            const data = await response.json();
            if (data.status === "success") {
                localStorage.setItem("accessToken", data.data.access_token);
                localStorage.setItem("refreshToken", data.data.refresh_token);

                await updateSession({
                    ...user,
                    accessToken: data.data.access_token,
                });

                return true;
            }
            return false;
        } catch (error) {
            console.error("Token refresh failed:", error);
            await logout();
            router.push("/login");
            return false;
        }
    };

    const executeRequest = async (
        url: string,
        options: RequestOptions = {},
        isRetry = false
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

        if (!isRetry) {
            setIsLoading(true);
            setError(null);
        }

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
        if (showToast && !isRetry) {
            toastId = toast.loading(loadingMessage);
        }

        try {
            const apiUrl = url.startsWith("/api") ? url : `/api${url}`;

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}${apiUrl}`,
                requestOptions
            );

            if (response.status === 401 && requireAuth && !isRetry) {
                if (isRefreshing.current) {
                    return new Promise((resolve) => {
                        pendingRequests.push(() =>
                            executeRequest(url, options, true).then(resolve)
                        );
                    });
                }

                isRefreshing.current = true;
                const refreshed = await refreshToken();
                isRefreshing.current = false;

                if (refreshed) {
                    pendingRequests.forEach((callback) => callback());
                    pendingRequests.length = 0;

                    return executeRequest(url, options, true);
                } else {
                    pendingRequests.length = 0;

                    if (showToast) {
                        toast.error("Session expired. Please login again.");
                    }
                    await logout();
                    router.push("/login");
                    setIsLoading(false);
                    return null;
                }
            }

            const responseData = (await response.json()) as ApiResponse<T>;
            if (!response.ok || responseData.status === "error") {
                setError(
                    responseData.errors || {
                        message: responseData.message || "Unknown error",
                    }
                );

                if (showToast) {
                    toast.error(responseData.message || "An error occurred", {
                        id: toastId,
                    });
                }

                setIsLoading(false);
                return responseData;
            }

            setData(responseData || null);

            if (showToast && !isRetry) {
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
                message:
                    typeof successMessage === "string"
                        ? successMessage
                        : "Success",
                data: responseData,
            };
        } catch (err) {
            console.error("API request error:", err);

            const errorMessage = "Network error. Please check your connection.";

            setError({
                message: errorMessage,
            });

            if (showToast && !isRetry) {
                toast.error(errorMessage, { id: toastId });
            }

            setIsLoading(false);
            return null;
        }
    };

    const makeRequest = useCallback(
        async (
            url: string,
            options: RequestOptions = {}
        ): Promise<ApiResponse<T> | null> => {
            return executeRequest(url, options);
        },
        [user]
    );

    return { isLoading, data, error, makeRequest };
}

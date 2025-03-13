import { useState, useCallback } from "react";
import { toast } from "sonner";

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
            } = options;

            setIsLoading(true);
            setError(null);

            const requestOptions: RequestInit = {
                method,
                headers: {
                    "Content-Type": "application/json",
                    ...headers,
                },
            };

            if (body && method !== "GET") {
                requestOptions.body = JSON.stringify(body);
            }

            let toastId: any = null;
            if (showToast) {
                toastId = toast.loading(loadingMessage);
            }

            try {
                const response = await fetch(
                    process.env.NEXT_PUBLIC_API_URL + url,
                    requestOptions
                );
                const responseData = (await response.json()) as ApiResponse<T>;

                // Check status field instead of success
                if (responseData.status !== "success") {
                    throw responseData;
                }

                setData(responseData.data || null);

                if (showToast) {
                    const successMsg =
                        typeof successMessage === "function"
                            ? successMessage(responseData)
                            : successMessage;
                    toast.success(successMsg, { id: toastId });
                }

                setIsLoading(false);
                return responseData;
            } catch (err) {
                const apiError = err as ApiResponse<any>;

                // Update error handling based on your server format
                const errorMsg =
                    apiError.message && apiError.errors
                        ? `${apiError.message}: ${apiError.errors}`
                        : apiError.message || "An error occurred";

                // Set error state
                setError({
                    status: apiError.status || "error",
                    message: apiError.message || "Unknown error",
                    errors: apiError.errors,
                });

                if (showToast) {
                    toast.error(errorMsg, { id: toastId });
                }

                setIsLoading(false);
                return apiError;
            }
        },
        []
    );

    return { isLoading, data, error, makeRequest };
}

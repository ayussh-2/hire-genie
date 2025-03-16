import { ReactNode } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

type DashboardLayoutProps = {
    children: ReactNode;
};

export function DashboardLayout({ children }: DashboardLayoutProps) {
    return (
        <div className="min-h-screen bg-background">
            <div className="container py-8">
                <div className="grid lg:grid-cols-[300px_1fr] gap-8">
                    {children}
                </div>
            </div>
        </div>
    );
}

export function DashboardLoading() {
    return (
        <div className="min-h-screen bg-background">
            <div className="container py-8">
                <div className="flex items-center justify-center h-96">
                    <div className="space-y-4 w-full max-w-md">
                        <Skeleton className="h-8 w-3/4 mx-auto" />
                        <Skeleton className="h-32 w-full" />
                        <Skeleton className="h-32 w-full" />
                        <Skeleton className="h-32 w-full" />
                    </div>
                </div>
            </div>
        </div>
    );
}

type DashboardErrorProps = {
    title: string;
    message: string;
    buttonText: string;
    onAction: () => void;
};

export function DashboardError({
    title,
    message,
    buttonText,
    onAction,
}: DashboardErrorProps) {
    return (
        <div className="min-h-screen bg-background">
            <div className="container py-8">
                {title === "Error" ? (
                    <>
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{message}</AlertDescription>
                        </Alert>
                        <div className="mt-4">
                            <Button onClick={onAction}>{buttonText}</Button>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-96 space-y-4">
                        <h2 className="text-2xl font-bold">{title}</h2>
                        <p className="text-muted-foreground text-center max-w-md">
                            {message}
                        </p>
                        <Button onClick={onAction}>{buttonText}</Button>
                    </div>
                )}
            </div>
        </div>
    );
}

import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface StatCardProps {
    icon: ReactNode;
    value: number;
    label: string;
}

export const StatCard = ({ icon, value, label }: StatCardProps) => (
    <Card className="p-4 border-none bg-white/70 backdrop-blur-sm soft-shadow">
        <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                {icon}
            </div>
            <div>
                <div className="text-2xl font-semibold">{value}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
            </div>
        </div>
    </Card>
);

import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
    icon: LucideIcon;
    value: number;
    label: string;
}

export function StatsCard({ icon: Icon, value, label }: StatsCardProps) {
    return (
        <Card className="p-4 border-none bg-white/70 backdrop-blur-sm soft-shadow">
            <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                    <div className="text-2xl font-semibold font-manrope">
                        {value}
                    </div>
                    <div className="text-sm text-muted-foreground font-jakarta">
                        {label}
                    </div>
                </div>
            </div>
        </Card>
    );
}

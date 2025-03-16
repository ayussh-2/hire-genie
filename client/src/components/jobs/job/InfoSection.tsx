import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";

interface InfoSectionProps {
    title: string;
    items: string[];
}

export const InfoSection = ({ title, items }: InfoSectionProps) => {
    return (
        <Card className="p-6 border-none bg-white/70 backdrop-blur-sm soft-shadow">
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <ul className="space-y-2">
                {items.map((item, index) => (
                    <li
                        key={index}
                        className="flex items-center gap-2 text-muted-foreground"
                    >
                        <ChevronRight className="h-4 w-4 text-primary" />
                        {item}
                    </li>
                ))}
            </ul>
        </Card>
    );
};

import { Button } from "@/components/ui/button";

interface SectionHeaderProps {
    title: string;
    onViewAll?: () => void;
}

export function SectionHeader({ title, onViewAll }: SectionHeaderProps) {
    return (
        <div className="p-6 pb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold font-manrope">{title}</h3>
            {onViewAll && (
                <Button
                    variant="ghost"
                    className="text-sm font-jakarta hover:text-white"
                    onClick={onViewAll}
                >
                    View All
                </Button>
            )}
        </div>
    );
}

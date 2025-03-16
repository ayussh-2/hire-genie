import { Card } from "@/components/ui/card";

interface DescriptionSectionProps {
    description: string;
}

export const DescriptionSection = ({
    description,
}: DescriptionSectionProps) => {
    return (
        <Card className="p-6 border-none bg-white/70 backdrop-blur-sm soft-shadow">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-muted-foreground whitespace-pre-line">
                {description}
            </p>
        </Card>
    );
};

import { Card } from "@/components/ui/card";
import { Users, Briefcase, Calendar, Globe } from "lucide-react";
import { CompanyInfo as CompanyInfoType } from "../../../app/jobs/[id]/types";

interface CompanyInfoProps {
    company: CompanyInfoType;
}

export const CompanyInfo = ({ company }: CompanyInfoProps) => {
    return (
        <Card className="p-6 border-none bg-white/70 backdrop-blur-sm soft-shadow">
            <h2 className="text-lg font-semibold mb-4">About {company.name}</h2>
            <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                    {company.description}
                </p>
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Size:</span>
                        <span className="font-medium">{company.size}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Industry:</span>
                        <span className="font-medium">{company.industry}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Founded:</span>
                        <span className="font-medium">{company.founded}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Website:</span>
                        <a
                            href={company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-primary hover:text-primary/80"
                        >
                            Visit website
                        </a>
                    </div>
                </div>
            </div>
        </Card>
    );
};

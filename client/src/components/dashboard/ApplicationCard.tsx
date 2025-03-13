import { Progress } from "@/components/ui/progress";
import Image from "next/image";

interface ApplicationCardProps {
    application: {
        id: number;
        company: string;
        position: string;
        logo: string;
        status: string;
        date: string;
        progress: number;
    };
}

export function ApplicationCard({ application }: ApplicationCardProps) {
    return (
        <div className="flex items-center gap-4 py-4 border-t first:border-t-0">
            <Image
                src={application.logo}
                alt={application.company}
                className="w-12 h-12 rounded-lg object-cover bg-primary/10"
                width={48}
                height={48}
            />
            <div className="flex-1">
                <div className="flex items-start justify-between">
                    <div>
                        <h4 className="font-semibold font-manrope">
                            {application.position}
                        </h4>
                        <p className="text-sm text-muted-foreground font-jakarta">
                            {application.company}
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-sm font-medium text-primary font-jakarta">
                            {application.status}
                        </div>
                        <div className="text-sm text-muted-foreground font-jakarta">
                            {application.date}
                        </div>
                    </div>
                </div>
                <Progress value={application.progress} className="h-1.5 mt-2" />
            </div>
        </div>
    );
}

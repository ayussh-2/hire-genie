import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, Calendar, Mail } from "lucide-react";
import { Job } from "../../../app/jobs/[id]/types";

interface ApplicationInfoProps {
    job: Job;
}

export const ApplicationInfo = ({ job }: ApplicationInfoProps) => {
    return (
        <Card className="p-6 border-none bg-white/70 backdrop-blur-sm soft-shadow">
            <h2 className="text-lg font-semibold mb-4">Application Info</h2>
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                        {job.applicants} applicants
                    </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                        Application deadline: {job.applicationDeadline}
                    </span>
                </div>
                <Button className="w-full">Apply Now</Button>
                <div className="text-center">
                    <span className="text-sm text-muted-foreground">or</span>
                </div>
                <Button variant="outline" className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    Email to a friend
                </Button>
            </div>
        </Card>
    );
};

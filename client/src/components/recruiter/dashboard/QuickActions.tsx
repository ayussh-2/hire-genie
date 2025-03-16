import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Users, MessageSquare, BarChart3 } from "lucide-react";

export const QuickActions = () => (
    <Card className="p-6 border-none bg-white/70 backdrop-blur-sm soft-shadow">
        <h3 className="font-semibold mb-4">Quick Actions</h3>
        <div className="space-y-2">
            <Button className="w-full justify-start" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Post New Job
            </Button>
            <Button className="w-full justify-start" variant="outline">
                <Users className="mr-2 h-4 w-4" />
                View All Candidates
            </Button>
            <Button className="w-full justify-start" variant="outline">
                <MessageSquare className="mr-2 h-4 w-4" />
                Schedule Interview
            </Button>
            <Button className="w-full justify-start" variant="outline">
                <BarChart3 className="mr-2 h-4 w-4" />
                View Analytics
            </Button>
        </div>
    </Card>
);

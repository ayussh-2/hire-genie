import { CheckCircle, Award } from "lucide-react";
import React from "react";
import { Card } from "../ui/card";

const FeaturePoint = ({
    title,
    description,
}: {
    title: string;
    description: string;
}) => {
    return (
        <div className="flex items-start gap-3">
            <CheckCircle className="h-6 w-6 text-primary mt-1" />
            <div>
                <h3 className="font-semibold mb-1 font-manrope">{title}</h3>
                <p className="text-muted-foreground font-jakarta">
                    {description}
                </p>
            </div>
        </div>
    );
};

const ProgressBar = ({
    label,
    percentage,
}: {
    label: string;
    percentage: string;
}) => {
    return (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <span className="text-sm font-manrope">{label}</span>
                <span className="text-sm font-semibold font-jakarta">
                    {percentage}
                </span>
            </div>
            <div className="h-2 rounded-full bg-primary/20">
                <div
                    className="h-2 rounded-full bg-primary"
                    style={{ width: percentage }}
                />
            </div>
        </div>
    );
};

export default function AIMatching() {
    return (
        <section className="py-20">
            <div className="container">
                <div className=" mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-manrope font-bold mb-6">
                                Intelligent Job Matching
                            </h2>
                            <div className="space-y-4 mb-8">
                                <FeaturePoint
                                    title="Skills Analysis"
                                    description="Advanced AI analyzes skills and experience to find the perfect match"
                                />
                                <FeaturePoint
                                    title="Compatibility Score"
                                    description="Get detailed insights into how well you match with each opportunity"
                                />
                                <FeaturePoint
                                    title="Smart Recommendations"
                                    description="Receive personalized job suggestions based on your profile"
                                />
                            </div>
                        </div>
                        <Card className="p-6 border-none bg-white/70 backdrop-blur-sm soft-shadow">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 rounded-lg bg-primary/5">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                            <Award className="h-6 w-6 text-primary" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold font-manrope">
                                                Senior Developer
                                            </h4>
                                            <p className="text-sm text-muted-foreground font-jakarta">
                                                TechCorp Inc.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-primary font-jakarta">
                                            95%
                                        </div>
                                        <div className="text-sm text-muted-foreground font-jakarta">
                                            Match
                                        </div>
                                    </div>
                                </div>
                                <ProgressBar
                                    label="Technical Skills"
                                    percentage="98%"
                                />
                                <ProgressBar
                                    label="Experience"
                                    percentage="92%"
                                />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}

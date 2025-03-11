import { CheckCircle, Award } from "lucide-react";
import React from "react";
import { Card } from "../ui/card";

export default function AIMatching() {
    return (
        <section className="py-20">
            <div className="container">
                <div className="max-w-4xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-manrope font-bold mb-6">
                                Intelligent Job Matching
                            </h2>
                            <div className="space-y-4 mb-8">
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="h-6 w-6 text-primary mt-1" />
                                    <div>
                                        <h3 className="font-semibold mb-1">
                                            Skills Analysis
                                        </h3>
                                        <p className="text-muted-foreground">
                                            Advanced AI analyzes skills and
                                            experience to find the perfect match
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="h-6 w-6 text-primary mt-1" />
                                    <div>
                                        <h3 className="font-semibold mb-1">
                                            Compatibility Score
                                        </h3>
                                        <p className="text-muted-foreground">
                                            Get detailed insights into how well
                                            you match with each opportunity
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <CheckCircle className="h-6 w-6 text-primary mt-1" />
                                    <div>
                                        <h3 className="font-semibold mb-1">
                                            Smart Recommendations
                                        </h3>
                                        <p className="text-muted-foreground">
                                            Receive personalized job suggestions
                                            based on your profile
                                        </p>
                                    </div>
                                </div>
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
                                            <h4 className="font-semibold">
                                                Senior Developer
                                            </h4>
                                            <p className="text-sm text-muted-foreground">
                                                TechCorp Inc.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-primary">
                                            95%
                                        </div>
                                        <div className="text-sm text-muted-foreground">
                                            Match
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">
                                            Technical Skills
                                        </span>
                                        <span className="text-sm font-semibold">
                                            98%
                                        </span>
                                    </div>
                                    <div className="h-2 rounded-full bg-primary/20">
                                        <div
                                            className="h-2 rounded-full bg-primary"
                                            style={{ width: "98%" }}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">
                                            Experience
                                        </span>
                                        <span className="text-sm font-semibold">
                                            92%
                                        </span>
                                    </div>
                                    <div className="h-2 rounded-full bg-primary/20">
                                        <div
                                            className="h-2 rounded-full bg-primary"
                                            style={{ width: "92%" }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}

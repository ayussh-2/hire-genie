import { jobSeekerBenefits } from "@/config/constant";
import { ArrowRight } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import Link from "next/link";

export default function JobSeekers() {
    return (
        <section className="py-20 bg-white/50">
            <div className="container">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-manrope font-bold mb-4">
                        Accelerate Your Career Growth
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Let AI help you find the perfect job opportunities
                    </p>
                </div>
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {jobSeekerBenefits.map((benefit, index) => (
                        <Card
                            key={index}
                            className="p-6 border-none bg-white/70 backdrop-blur-sm soft-shadow"
                        >
                            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                {benefit.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2 font-manrope">
                                {benefit.title}
                            </h3>
                            <p className="text-muted-foreground font-jakarta">
                                {benefit.description}
                            </p>
                        </Card>
                    ))}
                </div>
                <div className="text-center">
                    <Button
                        asChild
                        size="lg"
                        className="h-12 px-8 text-base font-medium bg-primary hover:bg-primary/90"
                    >
                        <Link href="/register?role=jobseeker">
                            Find Jobs
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}

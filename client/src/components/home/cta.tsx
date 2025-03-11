import { ArrowRight } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function CTA() {
    return (
        <section className="py-20 bg-white/50">
            <div className="container">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-manrope font-bold mb-6">
                        Ready to Transform Your Hiring Process?
                    </h2>
                    <p className="text-xl text-muted-foreground mb-8">
                        Join thousands of companies and job seekers who have
                        already discovered the power of AI-driven recruitment
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            asChild
                            size="lg"
                            className="h-12 px-8 text-base font-medium bg-primary hover:bg-primary/90"
                        >
                            <Link href="/register">
                                Get Started
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="h-12 px-8 text-base font-medium border-primary text-primary hover:bg-primary/5"
                        >
                            <Link href="/login">
                                Sign In
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

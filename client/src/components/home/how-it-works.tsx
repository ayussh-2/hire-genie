import React from "react";
import { Card } from "../ui/card";
import { features } from "@/config/constant";

export default function HowItWorks() {
    return (
        <section className="py-20">
            <div className="container">
                <h2 className="text-3xl font-manrope font-bold text-center mb-12">
                    How It Works
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card
                            key={index}
                            className="p-6 border-none bg-white/70 backdrop-blur-sm soft-shadow"
                        >
                            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2 font-manrope">
                                {feature.title}
                            </h3>
                            <p className="text-muted-foreground font-jakarta">
                                {feature.description}
                            </p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

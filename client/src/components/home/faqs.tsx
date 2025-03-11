import { faqs } from "@/config/constant";
import React from "react";
import { Card } from "../ui/card";

export default function Faqs() {
    return (
        <section className="py-20">
            <div className="container">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-manrope font-bold text-center mb-12">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                        {faqs.map((faq, index) => (
                            <Card
                                key={index}
                                className="p-6 border-none bg-white/70 backdrop-blur-sm soft-shadow"
                            >
                                <h3 className="text-lg font-semibold mb-2 font-manrope">
                                    {faq.question}
                                </h3>
                                <p className="text-muted-foreground font-jakarta">
                                    {faq.answer}
                                </p>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

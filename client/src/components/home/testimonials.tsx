import { testimonials } from "@/config/constant";
import { Star } from "lucide-react";
import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";

export default function Testimonials() {
    return (
        <section className="py-20 bg-white/50">
            <div className="container">
                <h2 className="text-3xl font-manrope font-bold text-center mb-12">
                    Success Stories
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <Card
                            key={index}
                            className="p-6 border-none bg-white/70 backdrop-blur-sm soft-shadow"
                        >
                            <div className="flex items-start gap-4">
                                <Image
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                    width={48}
                                    height={48}
                                />
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                                        <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                                        <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                                        <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                                        <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                                    </div>
                                    <p className="text-muted-foreground mb-4 font-jakarta">
                                        {testimonial.content}
                                    </p>
                                    <div>
                                        <div className="font-semibold font-manrope">
                                            {testimonial.name}
                                        </div>
                                        <div className="text-sm text-muted-foreground font-jakarta">
                                            {testimonial.role} •{" "}
                                            {testimonial.company}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}

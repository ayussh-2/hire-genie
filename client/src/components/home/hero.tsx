import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
export default function Hero() {
    return (
        <section className="relative overflow-hidden min-h-screen flex items-center justify-center">
            <div className="auth-pattern absolute inset-0 opacity-50" />
            <div className="container relative">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-5xl md:text-6xl font-manrope font-bold bg-gradient-to-r from-primary/90 to-primary bg-clip-text text-transparent mb-6">
                        AI-Powered Recruitment for the Future of Work
                    </h1>
                    <p className="text-xl text-muted-foreground mb-8 font-jakarta">
                        Connect talent with opportunity through intelligent
                        matching and advanced resume processing
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                            asChild
                            size="lg"
                            className="h-12 px-8 text-base font-medium bg-primary hover:bg-primary/90"
                        >
                            <Link href="/register?role=recruiter">
                                I&apos;m a Recruiter
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="h-12 px-8 text-base font-medium border-primary text-primary hover:bg-primary/5"
                        >
                            <Link href="/register?role=jobseeker">
                                I&apos;m a Job Seeker
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}

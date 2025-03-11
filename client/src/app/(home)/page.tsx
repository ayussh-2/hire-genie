import AIMatching from "@/components/home/ai-matching";
import CTA from "@/components/home/cta";
import Faqs from "@/components/home/faqs";
import Hero from "@/components/home/hero";
import HowItWorks from "@/components/home/how-it-works";
import JobSeekers from "@/components/home/job-seeker";
import Recruiters from "@/components/home/recruiters";
import Testimonials from "@/components/home/testimonials";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <Hero />
            <HowItWorks />
            <Recruiters />
            <JobSeekers />
            <AIMatching />
            <Testimonials />
            <Faqs />
            <CTA />
        </div>
    );
}

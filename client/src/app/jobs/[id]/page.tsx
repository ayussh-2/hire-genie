"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AIMatchInsights } from "@/components/jobs/job/AIMatchInsights";
import { ApplicationInfo } from "@/components/jobs/job/ApplicationInfo";
import { CompanyInfo } from "@/components/jobs/job/CompanyInfo";
import { DescriptionSection } from "@/components/jobs/job/DescriptionSection";
import { InfoSection } from "@/components/jobs/job/InfoSection";
import { JobHeader } from "@/components/jobs/job/JobHeader";
import { demoJob } from "@/config/constant";

export default function JobDetailsPage() {
    const [isBookmarked, setIsBookmarked] = useState(false);

    return (
        <div className="min-h-screen bg-background">
            <div className="container py-8">
                <div className="max-w-4xl mx-auto">
                    <Link
                        href="/jobs"
                        className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors mb-8"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Jobs
                    </Link>

                    <JobHeader
                        job={demoJob}
                        isBookmarked={isBookmarked}
                        setIsBookmarked={setIsBookmarked}
                    />

                    <div className="grid md:grid-cols-[1fr_300px] gap-8">
                        <div className="space-y-8">
                            <DescriptionSection
                                description={demoJob.description}
                            />
                            <InfoSection
                                title="Key Responsibilities"
                                items={demoJob.responsibilities!}
                            />
                            <InfoSection
                                title="Requirements"
                                items={demoJob.requirements}
                            />
                            <InfoSection
                                title="Nice to Have"
                                items={demoJob.niceToHave!}
                            />
                            <InfoSection
                                title="Benefits"
                                items={demoJob.benefits!}
                            />
                        </div>

                        <div className="space-y-8">
                            <AIMatchInsights
                                matchScore={demoJob.matchScore}
                                skills={demoJob.skills!}
                            />
                            <CompanyInfo company={demoJob.company_info} />
                            <ApplicationInfo job={demoJob} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

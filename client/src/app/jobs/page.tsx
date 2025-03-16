"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { JobFilters } from "./components/JobFilters";
import { JobList } from "./components/JobList";
import { JobDetail } from "./components/JobDetail";
import { mockJobs } from "./utils";
import { FilterValues } from "@/types/job";

const filterSchema = z.object({
    search: z.string().optional(),
    location: z.string().optional(),
    jobType: z.string().optional(),
    experience: z.string().optional(),
    salary: z.array(z.number()).optional(),
});

export default function JobsPage() {
    const [jobs, setJobs] = useState(mockJobs.slice(0, 10));
    const [hasMore, setHasMore] = useState(true);
    const [selectedJob, setSelectedJob] = useState<number | null>(null);

    const form = useForm<FilterValues>({
        resolver: zodResolver(filterSchema),
        defaultValues: {
            search: "",
            location: "",
            jobType: "",
            experience: "",
            salary: [50, 200],
        },
    });

    const fetchMoreData = () => {
        if (jobs.length >= mockJobs.length) {
            setHasMore(false);
            return;
        }

        setTimeout(() => {
            setJobs(jobs.concat(mockJobs.slice(jobs.length, jobs.length + 5)));
        }, 500);
    };

    return (
        <div className="min-h-screen bg-background">
            <JobFilters form={form} />

            <div className="container py-8">
                <div className="grid md:grid-cols-[1fr_400px] gap-8">
                    <div>
                        <JobList
                            jobs={jobs}
                            hasMore={hasMore}
                            fetchMoreData={fetchMoreData}
                            selectedJob={selectedJob}
                            setSelectedJob={setSelectedJob}
                        />
                    </div>

                    {selectedJob && (
                        <div className="sticky top-[50px] h-[calc(100vh-104px-2rem)] overflow-y-auto">
                            <JobDetail
                                job={
                                    mockJobs.find(
                                        (job) => job.id === selectedJob
                                    )!
                                }
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

import InfiniteScroll from "react-infinite-scroll-component";
import { JobCard } from "./JobCard";
import type { Job } from "../types";

interface JobListProps {
    jobs: Job[];
    hasMore: boolean;
    fetchMoreData: () => void;
    selectedJob: number | null;
    setSelectedJob: (id: number) => void;
}

export const JobList = ({
    jobs,
    hasMore,
    fetchMoreData,
    selectedJob,
    setSelectedJob,
}: JobListProps) => {
    return (
        <InfiniteScroll
            dataLength={jobs.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<div className="text-center py-4">Loading...</div>}
            className="space-y-4 bg-[#f8fafc]"
        >
            {jobs.map((job) => (
                <JobCard
                    key={job.id}
                    job={job}
                    isSelected={selectedJob === job.id}
                    onSelect={() => setSelectedJob(job.id)}
                />
            ))}
        </InfiniteScroll>
    );
};

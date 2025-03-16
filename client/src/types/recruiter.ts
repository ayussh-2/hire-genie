export interface Profile {
    name: string;
    title: string;
    company: string;
    location: string;
    activeJobs: number;
    totalHires: number;
    timeToHire: string;
    responseRate: string;
}

export interface Stats {
    activeJobs: number;
    totalCandidates: number;
    shortlisted: number;
    interviews: number;
}

export interface JobPosting {
    id: number;
    title: string;
    department: string;
    location: string;
    type: string;
    salary: string;
    applicants: number;
    views: number;
    status: string;
    posted: string;
    deadline: string;
}

export interface Candidate {
    id: number;
    name: string;
    photo: string;
    role: string;
    experience: string;
    location: string;
    status: string;
    matchScore: number;
    skills: string[];
    appliedDate: string;
    email: string;
    phone: string;
}

export interface ApplicationTrendPoint {
    date: string;
    count: number;
}

export interface SourceBreakdown {
    source: string;
    percentage: number;
}

export interface TimeToHire {
    average: number;
    trend: string;
}

export interface Analytics {
    applicationTrend: ApplicationTrendPoint[];
    sourceBreakdown: SourceBreakdown[];
    timeToHire: TimeToHire;
}

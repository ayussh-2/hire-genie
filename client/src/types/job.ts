export type Job = {
    id: number | string;
    title: string;
    company: string;
    logo: string;
    location: string;
    type: string;
    experience?: string;
    postedDate: Date | string;
    applicationDeadline?: string;
    applicants?: number;
    salary: string;
    matchScore: number;
    description: string;
    responsibilities?: string[];
    requirements: string[];
    niceToHave?: string[];
    benefits?: string[];
    skills?: {
        match: string[];
        missing: string[];
    };
    company_info?: CompanyInfo;
};

export type CompanyInfo = {
    name: string;
    description: string;
    size: string;
    industry: string;
    founded: number;
    location: string;
    website: string;
    benefits?: string[];
    culture?: string[];
};

export type FilterValues = {
    search?: string;
    location?: string;
    jobType?: string;
    experience?: string;
    salary?: number[];
};

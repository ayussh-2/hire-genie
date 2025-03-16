export type ProfileData = {
    id: number;
    user_id: number;
    title: string;
    location: string;
    experience: string;
    education: string;
    company: string;
    skills: string[];
    profile_completion: number;
    profile_views: number;
    search_appearances: number;
    created_at: string;
    updated_at: string;
};

export type DashboardStats = {
    applications: number;
    interviews: number;
    offers: number;
    saved_jobs: number;
};

export type Application = {
    id: number;
    company: string;
    position: string;
    logo?: string;
    status: string;
    date: string;
    progress: number;
    job: {
        title: string;
        company: string;
        location: string;
    };
};

export type Job = {
    id: number;
    title: string;
    company: string;
    logo?: string;
    location: string;
    type: string;
    salary?: string;
    matchScore?: number;
    skills?: {
        match: string[];
        missing: string[];
    };
};

import { Job } from "@/types/job";
import { JobPosting, Candidate, Analytics } from "@/types/recruiter";
interface Stats {
    activeJobs: number;
    totalCandidates: number;
    shortlisted: number;
    interviews: number;
}
import {
    Brain,
    FileText,
    Users,
    LineChart,
    Search,
    Clock,
    Building2,
    GraduationCap,
    Zap,
} from "lucide-react";
import { Profile } from "next-auth";

export const features = [
    {
        icon: <FileText className="h-6 w-6" />,
        title: "Resume Parsing",
        description:
            "Our AI analyzes resumes to extract key skills and experiences",
    },
    {
        icon: <Users className="h-6 w-6" />,
        title: "Smart Matching",
        description:
            "Advanced algorithms match candidates with the perfect opportunities",
    },
    {
        icon: <Brain className="h-6 w-6" />,
        title: "AI-Powered ATS",
        description: "Streamlined applicant tracking with intelligent insights",
    },
];

export const recruiterBenefits = [
    {
        icon: <Search className="h-6 w-6 text-primary" />,
        title: "Smart Candidate Search",
        description: "Find the perfect candidates using AI-powered matching",
    },
    {
        icon: <LineChart className="h-6 w-6 text-primary" />,
        title: "Analytics Dashboard",
        description:
            "Track hiring metrics and optimize your recruitment process",
    },
    {
        icon: <Clock className="h-6 w-6 text-primary" />,
        title: "Time-Saving Automation",
        description: "Automate screening and focus on what matters most",
    },
];

export const jobSeekerBenefits = [
    {
        icon: <Zap className="h-6 w-6 text-primary" />,
        title: "AI Job Matching",
        description:
            "Get matched with jobs that fit your skills and experience",
    },
    {
        icon: <GraduationCap className="h-6 w-6 text-primary" />,
        title: "Skill Analysis",
        description: "Understand your strengths and growth opportunities",
    },
    {
        icon: <Building2 className="h-6 w-6 text-primary" />,
        title: "Company Insights",
        description: "Access detailed information about potential employers",
    },
];

export const testimonials = [
    {
        name: "Sarah Chen",
        role: "HR Manager",
        company: "TechCorp",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120",
        content:
            "The AI-powered matching has revolutionized our hiring process. We've reduced time-to-hire by 60% while finding better-qualified candidates.",
    },
    {
        name: "James Wilson",
        role: "Software Engineer",
        company: "Found dream job at StartupX",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=120&h=120",
        content:
            "The platform suggested jobs that perfectly matched my skills. Within weeks, I landed my dream role at an exciting startup.",
    },
];

export const faqs = [
    {
        question: "How does the AI matching work?",
        answer: "Our AI analyzes both job requirements and candidate profiles using advanced natural language processing, considering skills, experience, and cultural fit to generate accurate compatibility scores.",
    },
    {
        question: "Is my data secure?",
        answer: "We employ industry-leading security measures and encryption to protect your data. Your information is never shared without your explicit consent.",
    },
    {
        question: "How accurate is the resume parsing?",
        answer: "Our AI achieves over 95% accuracy in extracting relevant information from resumes, and continuously improves through machine learning.",
    },
];

export const demoJob: Job = {
    id: "demo",
    title: "Senior Frontend Developer",
    company: "TechCorp",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=96&h=96",
    location: "San Francisco, CA",
    type: "Full-time",
    experience: "5+ years",
    salary: "$120k - $180k",
    postedDate: "2024-03-15",
    applicationDeadline: "2024-04-15",
    applicants: 45,
    matchScore: 92,
    description: `We're looking for a Senior Frontend Developer to join our growing team. You'll be responsible for building and maintaining our web applications, working closely with our design and backend teams to deliver exceptional user experiences.

The ideal candidate has strong experience with modern frontend frameworks, a keen eye for design, and a passion for building performant, accessible web applications.`,
    responsibilities: [
        "Lead development of key frontend projects and features",
        "Collaborate with designers and backend engineers",
        "Mentor junior developers and conduct code reviews",
        "Optimize application performance and accessibility",
        "Contribute to technical architecture decisions",
        "Write clean, maintainable, and well-tested code",
        "Participate in agile ceremonies and technical planning",
    ],
    requirements: [
        "5+ years of experience in frontend development",
        "Expert knowledge of React, TypeScript, and modern JavaScript",
        "Strong understanding of web performance optimization",
        "Experience with state management (Redux, MobX, etc.)",
        "Familiarity with testing frameworks (Jest, React Testing Library)",
        "Knowledge of CI/CD practices and tools",
        "Excellent problem-solving and communication skills",
    ],
    niceToHave: [
        "Experience with Next.js or similar frameworks",
        "Contributions to open source projects",
        "Knowledge of GraphQL",
        "Experience with design systems",
        "Understanding of web accessibility standards",
    ],
    benefits: [
        "Competitive salary and equity package",
        "Health, dental, and vision insurance",
        "Flexible work hours and location",
        "Professional development budget",
        "Home office setup allowance",
        "Regular team events and retreats",
        "Generous PTO and parental leave",
    ],
    skills: {
        match: ["React", "TypeScript", "JavaScript", "HTML/CSS", "Git"],
        missing: ["GraphQL", "AWS", "Node.js"],
    },
    company_info: {
        name: "TechCorp",
        description:
            "TechCorp is a leading software company specializing in developer tools and cloud infrastructure. We're backed by top investors and growing rapidly, with a mission to make developers' lives easier through innovative solutions.",
        size: "201-500 employees",
        industry: "Software Development",
        founded: 2018,
        location: "San Francisco, CA",
        website: "https://example.com",
        benefits: [
            "Remote-friendly",
            "Flexible hours",
            "Competitive pay",
            "Great benefits",
        ],
        culture: [
            "Innovation-driven",
            "Collaborative",
            "Work-life balance",
            "Learning-focused",
        ],
    },
};

export const mockProfile: Profile = {
    name: "Sarah Chen",
    title: "Senior Technical Recruiter",
    company: "TechCorp",
    location: "San Francisco, CA",
    activeJobs: 12,
    totalHires: 45,
    timeToHire: "21 days",
    responseRate: "94%",
    skills: ["Recruiting", "Sourcing", "Interviewing", "Onboarding"],
};

export const mockStats: Stats = {
    activeJobs: 12,
    totalCandidates: 156,
    shortlisted: 28,
    interviews: 15,
};

export const mockJobPostings: JobPosting[] = [
    {
        id: 1,
        title: "Senior Frontend Developer",
        department: "Engineering",
        location: "San Francisco, CA",
        type: "Full-time",
        salary: "$120k - $180k",
        applicants: 45,
        views: 234,
        status: "Active",
        posted: "2024-03-01",
        deadline: "2024-03-31",
    },
    {
        id: 2,
        title: "UI/UX Designer",
        department: "Design",
        location: "Remote",
        type: "Full-time",
        salary: "$100k - $150k",
        applicants: 32,
        views: 189,
        status: "Active",
        posted: "2024-03-05",
        deadline: "2024-04-05",
    },
    {
        id: 3,
        title: "Full Stack Engineer",
        department: "Engineering",
        location: "New York, NY",
        type: "Full-time",
        salary: "$130k - $190k",
        applicants: 28,
        views: 167,
        status: "Draft",
        posted: "2024-03-10",
        deadline: "2024-04-10",
    },
];

export const mockCandidates: Candidate[] = [
    {
        id: 1,
        name: "Michael Brown",
        photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=64&h=64",
        role: "Senior Frontend Developer",
        experience: "8 years",
        location: "San Francisco, CA",
        status: "Interview Scheduled",
        matchScore: 92,
        skills: ["React", "TypeScript", "Node.js"],
        appliedDate: "2024-03-15",
        email: "michael@example.com",
        phone: "+1 (555) 123-4567",
    },
    {
        id: 2,
        name: "Emily Chen",
        photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=64&h=64",
        role: "UI/UX Designer",
        experience: "6 years",
        location: "Remote",
        status: "Shortlisted",
        matchScore: 88,
        skills: ["Figma", "User Research", "Design Systems"],
        appliedDate: "2024-03-14",
        email: "emily@example.com",
        phone: "+1 (555) 234-5678",
    },
    {
        id: 3,
        name: "David Kim",
        photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=64&h=64",
        role: "Full Stack Engineer",
        experience: "5 years",
        location: "New York, NY",
        status: "New",
        matchScore: 85,
        skills: ["React", "Python", "PostgreSQL"],
        appliedDate: "2024-03-13",
        email: "david@example.com",
        phone: "+1 (555) 345-6789",
    },
];

export const mockAnalytics: Analytics = {
    applicationTrend: [
        { date: "Mar 1", count: 12 },
        { date: "Mar 8", count: 18 },
        { date: "Mar 15", count: 15 },
        { date: "Mar 22", count: 25 },
    ],
    sourceBreakdown: [
        { source: "LinkedIn", percentage: 45 },
        { source: "Company Website", percentage: 30 },
        { source: "Indeed", percentage: 15 },
        { source: "Referrals", percentage: 10 },
    ],
    timeToHire: {
        average: 21,
        trend: "decreasing",
    },
};

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

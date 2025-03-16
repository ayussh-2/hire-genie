"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
    MapPin,
    Clock,
    Calendar,
    Briefcase,
    DollarSign,
    BookmarkPlus,
    ChevronRight,
    ArrowLeft,
    CheckCircle2,
    XCircle,
    Users,
    Globe,
    Mail,
} from "lucide-react";

const demoJob = {
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

const JobHeader = ({ job, isBookmarked, setIsBookmarked }) => {
    return (
        <Card className="p-8 border-none bg-white/70 backdrop-blur-sm soft-shadow mb-8">
            <div className="flex items-start gap-6">
                <img
                    src={job.logo}
                    alt={job.company}
                    className="w-20 h-20 rounded-xl object-cover bg-primary/10"
                />
                <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-manrope font-bold mb-2">
                                {job.title}
                            </h1>
                            <p className="text-lg text-muted-foreground mb-4">
                                {job.company}
                            </p>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    {job.location}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Briefcase className="h-4 w-4" />
                                    {job.type}
                                </div>
                                <div className="flex items-center gap-1">
                                    <DollarSign className="h-4 w-4" />
                                    {job.salary}
                                </div>
                                <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    Posted {job.postedDate}
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-bold text-primary mb-1">
                                {job.matchScore}%
                            </div>
                            <div className="text-sm text-muted-foreground">
                                Match Score
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex gap-4 mt-8">
                <Button className="flex-1 h-12">Apply Now</Button>
                <Button
                    variant="outline"
                    className="h-12 px-6"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                >
                    <BookmarkPlus
                        className={`h-5 w-5 ${
                            isBookmarked ? "fill-primary" : ""
                        }`}
                    />
                </Button>
            </div>
        </Card>
    );
};

const InfoSection = ({ title, items }) => {
    return (
        <Card className="p-6 border-none bg-white/70 backdrop-blur-sm soft-shadow">
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <ul className="space-y-2">
                {items.map((item, index) => (
                    <li
                        key={index}
                        className="flex items-center gap-2 text-muted-foreground"
                    >
                        <ChevronRight className="h-4 w-4 text-primary" />
                        {item}
                    </li>
                ))}
            </ul>
        </Card>
    );
};

const DescriptionSection = ({ description }) => {
    return (
        <Card className="p-6 border-none bg-white/70 backdrop-blur-sm soft-shadow">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-muted-foreground whitespace-pre-line">
                {description}
            </p>
        </Card>
    );
};

const AIMatchInsights = ({ matchScore, skills }) => {
    return (
        <Card className="p-6 border-none bg-white/70 backdrop-blur-sm soft-shadow">
            <h2 className="text-lg font-semibold mb-4">AI Match Insights</h2>
            <div className="space-y-6">
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">
                            Overall Match
                        </span>
                        <span className="text-sm font-semibold">
                            {matchScore}%
                        </span>
                    </div>
                    <Progress value={matchScore} className="h-2" />
                </div>
                <div>
                    <h3 className="text-sm font-medium mb-3">
                        Matching Skills
                    </h3>
                    <div className="space-y-2">
                        {skills.match.map((skill, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                {skill}
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="text-sm font-medium mb-3">
                        Skills to Develop
                    </h3>
                    <div className="space-y-2">
                        {skills.missing.map((skill, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                                <XCircle className="h-4 w-4 text-orange-500" />
                                {skill}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    );
};

const CompanyInfo = ({ company }) => {
    return (
        <Card className="p-6 border-none bg-white/70 backdrop-blur-sm soft-shadow">
            <h2 className="text-lg font-semibold mb-4">About {company.name}</h2>
            <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                    {company.description}
                </p>
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Size:</span>
                        <span className="font-medium">{company.size}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Industry:</span>
                        <span className="font-medium">{company.industry}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Founded:</span>
                        <span className="font-medium">{company.founded}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Website:</span>
                        <a
                            href={company.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-primary hover:text-primary/80"
                        >
                            Visit website
                        </a>
                    </div>
                </div>
            </div>
        </Card>
    );
};

const ApplicationInfo = ({ job }) => {
    return (
        <Card className="p-6 border-none bg-white/70 backdrop-blur-sm soft-shadow">
            <h2 className="text-lg font-semibold mb-4">Application Info</h2>
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                        {job.applicants} applicants
                    </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                        Application deadline: {job.applicationDeadline}
                    </span>
                </div>
                <Button className="w-full">Apply Now</Button>
                <div className="text-center">
                    <span className="text-sm text-muted-foreground">or</span>
                </div>
                <Button variant="outline" className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    Email to a friend
                </Button>
            </div>
        </Card>
    );
};

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
                                items={demoJob.responsibilities}
                            />
                            <InfoSection
                                title="Requirements"
                                items={demoJob.requirements}
                            />
                            <InfoSection
                                title="Nice to Have"
                                items={demoJob.niceToHave}
                            />
                            <InfoSection
                                title="Benefits"
                                items={demoJob.benefits}
                            />
                        </div>

                        <div className="space-y-8">
                            <AIMatchInsights
                                matchScore={demoJob.matchScore}
                                skills={demoJob.skills}
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

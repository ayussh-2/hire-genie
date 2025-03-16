export const formatDate = (date: Date) => {
    const days = Math.floor(
        (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24)
    );
    return `${days}d ago`;
};

export const mockJobs = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: [
        "Senior Frontend Developer",
        "Full Stack Engineer",
        "UI/UX Designer",
        "Product Manager",
    ][i % 4],
    company: ["TechCorp", "InnovateLabs", "DesignStudio", "ProductHouse"][
        i % 4
    ],
    logo: `https://images.unsplash.com/photo-${
        1500000000000 + i
    }?auto=format&fit=crop&q=80&w=48&h=48`,
    location: ["San Francisco, CA", "New York, NY", "London, UK", "Remote"][
        i % 4
    ],
    type: ["Full-time", "Part-time", "Contract", "Remote"][i % 4],
    postedDate: new Date(
        Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
    ),
    salary: `$${Math.floor(Math.random() * 50 + 100)}k - $${Math.floor(
        Math.random() * 50 + 150
    )}k`,
    matchScore: Math.floor(Math.random() * 30 + 70),
    description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    requirements: [
        "5+ years of experience",
        "Strong JavaScript skills",
        "React expertise",
        "Team player",
    ],
}));

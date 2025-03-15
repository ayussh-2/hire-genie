from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime


class SkillBase(BaseModel):
    name: str


class SkillCreate(SkillBase):
    pass


class Skill(SkillBase):
    id: int

    class Config:
        from_attributes = True


class ProfileBase(BaseModel):
    title: Optional[str] = None
    location: Optional[str] = None
    experience: Optional[str] = None
    education: Optional[str] = None
    company: Optional[str] = None


class ProfileCreate(ProfileBase):
    pass


class ProfileUpdate(ProfileBase):
    pass


class Profile(ProfileBase):
    id: int
    user_id: int
    profile_completion: int
    profile_views: int
    search_appearances: int
    created_at: datetime
    updated_at: datetime
    skills: List[Skill] = []

    class Config:
        from_attributes = True


class JobBase(BaseModel):
    title: str
    company: str
    company_logo: Optional[str] = None
    location: str
    job_type: str
    salary_min: Optional[float] = None
    salary_max: Optional[float] = None
    description: str
    requirements: str


class JobCreate(JobBase):
    required_skills: List[str] = []


class JobUpdate(JobBase):
    title: Optional[str] = None
    company: Optional[str] = None
    company_logo: Optional[str] = None
    location: Optional[str] = None
    job_type: Optional[str] = None
    salary_min: Optional[float] = None
    salary_max: Optional[float] = None
    description: Optional[str] = None
    requirements: Optional[str] = None
    required_skills: Optional[List[str]] = None
    is_active: Optional[bool] = None


class Job(JobBase):
    id: int
    created_at: datetime
    updated_at: datetime
    is_active: bool
    required_skills: List[Skill] = []
    match_score: Optional[int] = None
    matching_skills: Optional[List[str]] = None
    missing_skills: Optional[List[str]] = None

    class Config:
        from_attributes = True


class ApplicationBase(BaseModel):
    job_id: int
    status: str
    notes: Optional[str] = None


class ApplicationCreate(ApplicationBase):
    pass


class ApplicationUpdate(BaseModel):
    status: Optional[str] = None
    progress: Optional[int] = None
    notes: Optional[str] = None


class Application(ApplicationBase):
    id: int
    user_id: int
    applied_date: datetime
    updated_at: datetime
    progress: int
    job: Job

    class Config:
        from_attributes = True


class SavedJobBase(BaseModel):
    job_id: int


class SavedJobCreate(SavedJobBase):
    pass


class SavedJob(SavedJobBase):
    id: int
    user_id: int
    saved_at: datetime
    job: Job

    class Config:
        from_attributes = True


class DashboardStats(BaseModel):
    applications: int
    interviews: int
    offers: int
    saved_jobs: int

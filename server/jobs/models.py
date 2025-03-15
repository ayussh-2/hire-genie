from sqlalchemy import (
    Boolean,
    Column,
    Integer,
    String,
    ForeignKey,
    Float,
    DateTime,
    Text,
    Table,
)
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime


class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String, index=True)
    location = Column(String)
    experience = Column(String)
    education = Column(String)
    company = Column(String)
    profile_completion = Column(Integer, default=0)
    profile_views = Column(Integer, default=0)
    search_appearances = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="profile")
    skills = relationship(
        "Skill", secondary="profile_skills", back_populates="profiles"
    )


class Skill(Base):
    __tablename__ = "skills"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)

    profiles = relationship(
        "Profile", secondary="profile_skills", back_populates="skills"
    )
    jobs = relationship("Job", secondary="job_skills", back_populates="required_skills")


profile_skills = Table(
    "profile_skills",
    Base.metadata,
    Column("profile_id", Integer, ForeignKey("profiles.id"), primary_key=True),
    Column("skill_id", Integer, ForeignKey("skills.id"), primary_key=True),
)


job_skills = Table(
    "job_skills",
    Base.metadata,
    Column("job_id", Integer, ForeignKey("jobs.id"), primary_key=True),
    Column("skill_id", Integer, ForeignKey("skills.id"), primary_key=True),
)


class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    company = Column(String, index=True)
    company_logo = Column(String, nullable=True)
    location = Column(String, index=True)
    job_type = Column(String, index=True)  # Full-time, Part-time, Contract, etc.
    salary_min = Column(Float, nullable=True)
    salary_max = Column(Float, nullable=True)
    description = Column(Text)
    requirements = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    is_active = Column(Boolean, default=True)

    required_skills = relationship(
        "Skill", secondary="job_skills", back_populates="jobs"
    )
    applications = relationship("Application", back_populates="job")
    saved_by = relationship("SavedJob", back_populates="job")


class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    job_id = Column(Integer, ForeignKey("jobs.id"))
    status = Column(String, index=True)  # Applied, Interview, Offer, Rejected
    applied_date = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    progress = Column(Integer, default=0)  # 0-100
    notes = Column(Text, nullable=True)

    user = relationship("User", back_populates="applications")
    job = relationship("Job", back_populates="applications")


class SavedJob(Base):
    __tablename__ = "saved_jobs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    job_id = Column(Integer, ForeignKey("jobs.id"))
    saved_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="saved_jobs")
    job = relationship("Job", back_populates="saved_by")

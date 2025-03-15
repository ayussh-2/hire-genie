from sqlalchemy.orm import Session
from sqlalchemy import func, and_
from typing import List, Optional, Dict, Set
from . import models, schemas
from datetime import datetime


def get_or_create_skill(db: Session, skill_name: str) -> models.Skill:
    skill = db.query(models.Skill).filter(models.Skill.name == skill_name).first()
    if not skill:
        skill = models.Skill(name=skill_name)
        db.add(skill)
        db.commit()
        db.refresh(skill)
    return skill


# Profile CRUD operations
def get_profile(db: Session, user_id: int) -> Optional[models.Profile]:
    return db.query(models.Profile).filter(models.Profile.user_id == user_id).first()


def create_profile(
    db: Session, user_id: int, profile: schemas.ProfileCreate
) -> models.Profile:
    db_profile = models.Profile(
        user_id=user_id,
        title=profile.title,
        location=profile.location,
        experience=profile.experience,
        education=profile.education,
        company=profile.company,
    )
    db.add(db_profile)
    db.commit()
    db.refresh(db_profile)
    return db_profile


def update_profile(
    db: Session, user_id: int, profile: schemas.ProfileUpdate
) -> Optional[models.Profile]:
    db_profile = get_profile(db, user_id)
    if db_profile:
        update_data = profile.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_profile, key, value)

        db_profile.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(db_profile)
        return db_profile
    return None


def add_skill_to_profile(
    db: Session, user_id: int, skill_name: str
) -> Optional[models.Profile]:
    profile = get_profile(db, user_id)
    if not profile:
        return None

    skill = get_or_create_skill(db, skill_name)

    if skill not in profile.skills:
        profile.skills.append(skill)
        db.commit()
        db.refresh(profile)

    return profile


def remove_skill_from_profile(
    db: Session, user_id: int, skill_name: str
) -> Optional[models.Profile]:
    profile = get_profile(db, user_id)
    if not profile:
        return None

    skill = db.query(models.Skill).filter(models.Skill.name == skill_name).first()
    if skill and skill in profile.skills:
        profile.skills.remove(skill)
        db.commit()
        db.refresh(profile)

    return profile


# Job CRUD operations
def create_job(db: Session, job: schemas.JobCreate) -> models.Job:
    db_job = models.Job(
        title=job.title,
        company=job.company,
        company_logo=job.company_logo,
        location=job.location,
        job_type=job.job_type,
        salary_min=job.salary_min,
        salary_max=job.salary_max,
        description=job.description,
        requirements=job.requirements,
    )
    db.add(db_job)
    db.commit()
    db.refresh(db_job)

    # Add skills
    for skill_name in job.required_skills:
        skill = get_or_create_skill(db, skill_name)
        db_job.required_skills.append(skill)

    db.commit()
    db.refresh(db_job)
    return db_job


def get_job(db: Session, job_id: int) -> Optional[models.Job]:
    return db.query(models.Job).filter(models.Job.id == job_id).first()


def get_jobs(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    location: Optional[str] = None,
    job_type: Optional[str] = None,
    keyword: Optional[str] = None,
) -> List[models.Job]:
    query = db.query(models.Job).filter(models.Job.is_active == True)

    if location:
        query = query.filter(models.Job.location.ilike(f"%{location}%"))
    if job_type:
        query = query.filter(models.Job.job_type == job_type)
    if keyword:
        query = query.filter(
            models.Job.title.ilike(f"%{keyword}%")
            | models.Job.company.ilike(f"%{keyword}%")
            | models.Job.description.ilike(f"%{keyword}%")
        )

    return query.offset(skip).limit(limit).all()


def update_job(
    db: Session, job_id: int, job: schemas.JobUpdate
) -> Optional[models.Job]:
    db_job = get_job(db, job_id)
    if db_job:
        update_data = job.dict(exclude_unset=True, exclude={"required_skills"})
        for key, value in update_data.items():
            setattr(db_job, key, value)

        # Update skills if provided
        if job.required_skills is not None:
            # Clear existing skills
            db_job.required_skills = []

            # Add new skills
            for skill_name in job.required_skills:
                skill = get_or_create_skill(db, skill_name)
                db_job.required_skills.append(skill)

        db_job.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(db_job)
        return db_job
    return None


# Application CRUD operations
def create_application(
    db: Session, user_id: int, application: schemas.ApplicationCreate
) -> Optional[models.Application]:
    # Check if job exists
    job = get_job(db, application.job_id)
    if not job:
        return None

    # Check if application already exists
    existing = (
        db.query(models.Application)
        .filter(
            models.Application.user_id == user_id,
            models.Application.job_id == application.job_id,
        )
        .first()
    )

    if existing:
        return existing

    db_application = models.Application(
        user_id=user_id,
        job_id=application.job_id,
        status=application.status,
        notes=application.notes,
        progress=20,  # Start with 20% progress for new applications
    )
    db.add(db_application)
    db.commit()
    db.refresh(db_application)
    return db_application


def get_application(db: Session, application_id: int) -> Optional[models.Application]:
    return (
        db.query(models.Application)
        .filter(models.Application.id == application_id)
        .first()
    )


def get_user_applications(db: Session, user_id: int) -> List[models.Application]:
    return (
        db.query(models.Application).filter(models.Application.user_id == user_id).all()
    )


def update_application(
    db: Session,
    application_id: int,
    user_id: int,
    application: schemas.ApplicationUpdate,
) -> Optional[models.Application]:
    db_application = (
        db.query(models.Application)
        .filter(
            models.Application.id == application_id,
            models.Application.user_id == user_id,
        )
        .first()
    )

    if db_application:
        update_data = application.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(db_application, key, value)

        # Update progress based on status if not explicitly set
        if "status" in update_data and "progress" not in update_data:
            if update_data["status"] == "Applied":
                db_application.progress = 20
            elif update_data["status"] == "Screening":
                db_application.progress = 40
            elif update_data["status"] == "Interview":
                db_application.progress = 60
            elif update_data["status"] == "Final Interview":
                db_application.progress = 80
            elif update_data["status"] == "Offer":
                db_application.progress = 90
            elif update_data["status"] == "Hired":
                db_application.progress = 100
            elif update_data["status"] == "Rejected":
                db_application.progress = 0

        db_application.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(db_application)
        return db_application
    return None


# Saved Job CRUD operations
def save_job(
    db: Session, user_id: int, saved_job: schemas.SavedJobCreate
) -> models.SavedJob:
    db_saved_job = models.SavedJob(
        user_id=user_id,
        job_id=saved_job.job_id,
    )
    db.add(db_saved_job)
    db.commit()
    db.refresh(db_saved_job)
    return db_saved_job


def get_saved_jobs(db: Session, user_id: int) -> List[models.SavedJob]:
    return db.query(models.SavedJob).filter(models.SavedJob.user_id == user_id).all()


def unsave_job(db: Session, user_id: int, job_id: int) -> bool:
    db_saved_job = (
        db.query(models.SavedJob)
        .filter(models.SavedJob.user_id == user_id, models.SavedJob.job_id == job_id)
        .first()
    )

    if db_saved_job:
        db.delete(db_saved_job)
        db.commit()
        return True
    return False


def get_recommended_jobs(db: Session, user_id: int, limit: int = 5) -> List[Dict]:
    # Get user's skills
    profile = get_profile(db, user_id)
    if not profile or not profile.skills:
        # If no skills, return regular jobs
        return [
            {"job": job, "match_score": 0, "matching_skills": [], "missing_skills": []}
            for job in get_jobs(db, limit=limit)
        ]

    user_skills: Set[str] = {skill.name for skill in profile.skills}

    # Get all active jobs
    jobs = db.query(models.Job).filter(models.Job.is_active == True).all()

    recommended_jobs = []
    for job in jobs:
        job_skills: Set[str] = {skill.name for skill in job.required_skills}

        if not job_skills:
            continue

        matching_skills = list(user_skills.intersection(job_skills))
        missing_skills = list(job_skills - user_skills)

        # Calculate match score
        if job_skills:
            match_score = int((len(matching_skills) / len(job_skills)) * 100)
        else:
            match_score = 0

        recommended_jobs.append(
            {
                "job": job,
                "match_score": match_score,
                "matching_skills": matching_skills,
                "missing_skills": missing_skills,
            }
        )

    # Sort by match score (descending)
    recommended_jobs.sort(key=lambda x: x["match_score"], reverse=True)

    return recommended_jobs[:limit]


def get_dashboard_stats(db: Session, user_id: int) -> schemas.DashboardStats:
    # Get applications count
    applications_count = (
        db.query(func.count(models.Application.id))
        .filter(models.Application.user_id == user_id)
        .scalar()
    )

    # Get interviews count
    interviews_count = (
        db.query(func.count(models.Application.id))
        .filter(
            models.Application.user_id == user_id,
            models.Application.status.in_(["Interview", "Final Interview"]),
        )
        .scalar()
    )

    # Get offers count
    offers_count = (
        db.query(func.count(models.Application.id))
        .filter(
            models.Application.user_id == user_id,
            models.Application.status.in_(["Offer", "Hired"]),
        )
        .scalar()
    )

    # Get saved jobs count
    saved_jobs_count = (
        db.query(func.count(models.SavedJob.id))
        .filter(models.SavedJob.user_id == user_id)
        .scalar()
    )

    return schemas.DashboardStats(
        applications=applications_count,
        interviews=interviews_count,
        offers=offers_count,
        saved_jobs=saved_jobs_count,
    )

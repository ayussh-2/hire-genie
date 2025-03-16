from sqlalchemy.orm import Session
from typing import List, Optional, Dict, Any
from . import models, schemas


def get_profile(db: Session, user_id: int):
    """Get a user's profile by user_id."""
    return db.query(models.Profile).filter(models.Profile.user_id == user_id).first()


def create_profile(db: Session, user_id: int, profile: schemas.ProfileCreate):
    """Create a new user profile."""
    db_profile = models.Profile(
        user_id=user_id,
        title=profile.title,
        bio=profile.bio,
        location=profile.location,
        website=profile.website,
        github=profile.github,
        linkedin=profile.linkedin,
    )
    db.add(db_profile)
    db.commit()
    db.refresh(db_profile)
    return db_profile


def update_profile(db: Session, user_id: int, profile: schemas.ProfileUpdate):
    """Update an existing user profile."""
    db_profile = get_profile(db, user_id)
    if not db_profile:
        return None

    update_data = profile.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_profile, key, value)

    db.commit()
    db.refresh(db_profile)
    return db_profile


def add_skill_to_profile(db: Session, user_id: int, skill_name: str):
    """Add a skill to user's profile."""
    profile = get_profile(db, user_id)
    if not profile:
        return None

    # Check if skill exists in the database
    skill = db.query(models.Skill).filter(models.Skill.name == skill_name).first()
    if not skill:
        # Create the skill if it doesn't exist
        skill = models.Skill(name=skill_name)
        db.add(skill)
        db.commit()

    # Check if the profile already has this skill
    if skill not in profile.skills:
        profile.skills.append(skill)
        db.commit()
        db.refresh(profile)

    return profile


def remove_skill_from_profile(db: Session, user_id: int, skill_name: str):
    """Remove a skill from user's profile."""
    profile = get_profile(db, user_id)
    if not profile:
        return None

    skill = db.query(models.Skill).filter(models.Skill.name == skill_name).first()
    if skill and skill in profile.skills:
        profile.skills.remove(skill)
        db.commit()
        db.refresh(profile)

    return profile


def get_job(db: Session, job_id: int):
    """Get a job by ID."""
    return db.query(models.Job).filter(models.Job.id == job_id).first()


def get_jobs(
    db: Session,
    skip: int = 0,
    limit: int = 10,
    location: Optional[str] = None,
    job_type: Optional[str] = None,
    keyword: Optional[str] = None,
):
    """Get list of jobs with optional filters."""
    query = db.query(models.Job)

    if location:
        query = query.filter(models.Job.location.ilike(f"%{location}%"))
    if job_type:
        query = query.filter(models.Job.job_type == job_type)
    if keyword:
        query = query.filter(
            models.Job.title.ilike(f"%{keyword}%")
            | models.Job.description.ilike(f"%{keyword}%")
        )

    return query.offset(skip).limit(limit).all()


def create_job(db: Session, job: schemas.JobCreate):
    """Create a new job listing."""
    db_job = models.Job(**job.dict())
    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    return db_job


def update_job(db: Session, job_id: int, job_update: schemas.JobUpdate):
    """Update an existing job."""
    db_job = get_job(db, job_id)
    if not db_job:
        return None

    update_data = job_update.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_job, key, value)

    db.commit()
    db.refresh(db_job)
    return db_job


def get_user_applications(db: Session, user_id: int):
    """Get all applications by a specific user."""
    return (
        db.query(models.Application).filter(models.Application.user_id == user_id).all()
    )


def create_application(
    db: Session, user_id: int, application: schemas.ApplicationCreate
):
    """Create a job application."""
    job = get_job(db, application.job_id)
    if not job:
        return None

    db_application = models.Application(
        user_id=user_id,
        job_id=application.job_id,
        cover_letter=application.cover_letter,
        resume_url=application.resume_url,
        status="applied",
    )
    db.add(db_application)
    db.commit()
    db.refresh(db_application)
    return db_application


def update_application(
    db: Session,
    application_id: int,
    user_id: int,
    application: schemas.ApplicationUpdate,
):
    """Update an existing application."""
    db_application = (
        db.query(models.Application)
        .filter(
            models.Application.id == application_id,
            models.Application.user_id == user_id,
        )
        .first()
    )

    if not db_application:
        return None

    update_data = application.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_application, key, value)

    db.commit()
    db.refresh(db_application)
    return db_application


def save_job(db: Session, user_id: int, saved_job: schemas.SavedJobCreate):
    """Save a job for a user."""
    db_saved_job = models.SavedJob(
        user_id=user_id, job_id=saved_job.job_id, notes=saved_job.notes
    )
    db.add(db_saved_job)
    db.commit()
    db.refresh(db_saved_job)
    return db_saved_job


def unsave_job(db: Session, user_id: int, job_id: int):
    """Remove a saved job."""
    db_saved_job = (
        db.query(models.SavedJob)
        .filter(models.SavedJob.user_id == user_id, models.SavedJob.job_id == job_id)
        .first()
    )

    if not db_saved_job:
        return False

    db.delete(db_saved_job)
    db.commit()
    return True


def get_saved_jobs(db: Session, user_id: int):
    """Get all saved jobs for a user."""
    return db.query(models.SavedJob).filter(models.SavedJob.user_id == user_id).all()


def get_recommended_jobs(db: Session, user_id: int, limit: int = 5):
    """Get job recommendations based on user's profile skills."""
    # Get user profile and skills
    profile = get_profile(db, user_id)
    if not profile or not profile.skills:
        return []

    user_skills = set(skill.name for skill in profile.skills)

    # Get all jobs with their required skills
    jobs = db.query(models.Job).all()
    recommendations = []

    for job in jobs:
        job_skills = set(skill.name for skill in job.required_skills)

        if not job_skills:
            continue

        # Calculate matching and missing skills
        matching_skills = user_skills.intersection(job_skills)
        missing_skills = job_skills - user_skills

        # Calculate match score (percentage of job skills that the user has)
        match_score = len(matching_skills) / len(job_skills) * 100 if job_skills else 0

        recommendations.append(
            {
                "job": job,
                "match_score": match_score,
                "matching_skills": list(matching_skills),
                "missing_skills": list(missing_skills),
            }
        )

    # Sort by match score and limit results
    recommendations.sort(key=lambda x: x["match_score"], reverse=True)
    return recommendations[:limit]


def get_dashboard_stats(db: Session, user_id: int):
    """Get statistics for user dashboard."""
    # Count applications by status
    applications = get_user_applications(db, user_id)
    status_counts = {}
    for app in applications:
        status_counts[app.status] = status_counts.get(app.status, 0) + 1

    # Count saved jobs
    saved_jobs_count = (
        db.query(models.SavedJob).filter(models.SavedJob.user_id == user_id).count()
    )

    # Get recent activity (last 5 applications)
    recent_activity = (
        db.query(models.Application)
        .filter(models.Application.user_id == user_id)
        .order_by(models.Application.applied_date.desc())
        .limit(5)
        .all()
    )

    applications_count = status_counts.get("applied", 0)
    interviews_count = status_counts.get("interview", 0)
    offers_count = status_counts.get("offer", 0)

    return schemas.DashboardStats(
        total_applications=len(applications),
        saved_jobs=saved_jobs_count,
        application_status=status_counts,
        recent_activity=[schemas.Application.from_orm(app) for app in recent_activity],
        applications=applications_count,
        interviews=interviews_count,
        offers=offers_count,
    )

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from database import get_db
from auth.dependencies import get_current_user
from . import crud, schemas

router = APIRouter(prefix="/jobs", tags=["jobs"])


# Profile endpoints
@router.get("/profile", response_model=schemas.Profile)
def get_user_profile(
    current_user=Depends(get_current_user), db: Session = Depends(get_db)
):
    profile = crud.get_profile(db, current_user.id)
    if profile is None:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile


@router.post("/profile", response_model=schemas.Profile)
def create_user_profile(
    profile: schemas.ProfileCreate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    existing_profile = crud.get_profile(db, current_user.id)
    if existing_profile:
        raise HTTPException(status_code=400, detail="Profile already exists")
    return crud.create_profile(db, current_user.id, profile)


@router.put("/profile", response_model=schemas.Profile)
def update_user_profile(
    profile: schemas.ProfileUpdate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    updated_profile = crud.update_profile(db, current_user.id, profile)
    if updated_profile is None:
        raise HTTPException(status_code=404, detail="Profile not found")
    return updated_profile


@router.post("/profile/skills/{skill_name}", response_model=schemas.Profile)
def add_skill(
    skill_name: str,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    updated_profile = crud.add_skill_to_profile(db, current_user.id, skill_name)
    if updated_profile is None:
        raise HTTPException(status_code=404, detail="Profile not found")
    return updated_profile


@router.delete("/profile/skills/{skill_name}", response_model=schemas.Profile)
def remove_skill(
    skill_name: str,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    updated_profile = crud.remove_skill_from_profile(db, current_user.id, skill_name)
    if updated_profile is None:
        raise HTTPException(status_code=404, detail="Profile not found")
    return updated_profile


# Job endpoints
@router.post("/", response_model=schemas.Job)
def create_job(
    job: schemas.JobCreate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    # Only admins can create jobs
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized to create jobs")
    return crud.create_job(db, job)


@router.get("/", response_model=List[schemas.Job])
def get_jobs(
    skip: int = 0,
    limit: int = 10,
    location: Optional[str] = None,
    job_type: Optional[str] = None,
    keyword: Optional[str] = None,
    db: Session = Depends(get_db),
):
    jobs = crud.get_jobs(db, skip, limit, location, job_type, keyword)
    return jobs


@router.put("/{job_id}", response_model=schemas.Job)
def update_job_by_id(
    job_id: int,
    job: schemas.JobUpdate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    # Only admins can update jobs
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not authorized to update jobs")

    updated_job = crud.update_job(db, job_id, job)
    if updated_job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    return updated_job


# Application endpoints
@router.get("/applications", response_model=List[schemas.Application])
def get_user_applications(
    current_user=Depends(get_current_user), db: Session = Depends(get_db)
):
    if not current_user:
        raise HTTPException(status_code=401, detail="Not authenticated")
    return crud.get_user_applications(db, current_user.id)


@router.post("/apply", response_model=schemas.Application)
def create_application(
    application: schemas.ApplicationCreate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    created_application = crud.create_application(db, current_user.id, application)
    if created_application is None:
        raise HTTPException(status_code=404, detail="Job not found")
    return created_application


@router.post("/save", response_model=schemas.SavedJob)
def save_job(
    saved_job: schemas.SavedJobCreate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return crud.save_job(db, current_user.id, saved_job)


@router.get("/saved", response_model=List[schemas.SavedJob])
def get_saved_jobs(
    current_user=Depends(get_current_user), db: Session = Depends(get_db)
):
    return crud.get_saved_jobs(db, current_user.id)


@router.get("/recommended", response_model=List[schemas.Job])
def get_recommended_jobs(
    limit: int = Query(5, ge=1, le=20),
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    recommendations = crud.get_recommended_jobs(db, current_user.id, limit)

    result = []
    for rec in recommendations:
        job_dict = schemas.Job.from_orm(rec["job"]).dict()
        job_dict["match_score"] = rec["match_score"]
        job_dict["matching_skills"] = rec["matching_skills"]
        job_dict["missing_skills"] = rec["missing_skills"]
        result.append(schemas.Job(**job_dict))

    return result


# Dashboard Stats endpoint
@router.get("/stats/dashboard", response_model=schemas.DashboardStats)
def get_dashboard_stats(
    current_user=Depends(get_current_user), db: Session = Depends(get_db)
):
    return crud.get_dashboard_stats(db, current_user.id)


# Move this route to the very end of the file
@router.get("/{job_id}", response_model=schemas.Job)
def get_job_by_id(job_id: int, db: Session = Depends(get_db)):
    job = crud.get_job(db, job_id)
    if job is None:
        raise HTTPException(status_code=404, detail="Job not found")
    return job


@router.delete("/saved/{job_id}", response_model=bool)
def unsave_job(
    job_id: int, current_user=Depends(get_current_user), db: Session = Depends(get_db)
):
    result = crud.unsave_job(db, current_user.id, job_id)
    if not result:
        raise HTTPException(status_code=404, detail="Saved job not found")
    return True


@router.put("/applications/{application_id}", response_model=schemas.Application)
def update_application_status(
    application_id: int,
    application: schemas.ApplicationUpdate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db),
):
    updated_application = crud.update_application(
        db, application_id, current_user.id, application
    )
    if updated_application is None:
        raise HTTPException(status_code=404, detail="Application not found")
    return updated_application

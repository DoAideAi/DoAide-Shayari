import glob
import os
import time
import hashlib
import json
import random
from datetime import date
from collections import defaultdict
from contextlib import asynccontextmanager

from dotenv import load_dotenv
from fastapi import FastAPI, Depends, Query, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import func

from database import engine, get_db, Base
from models import Content

load_dotenv()

rate_limit_store: dict[str, list[float]] = defaultdict(list)
RATE_LIMIT = 10
RATE_WINDOW = 60


def seed_if_empty(db: Session):
    count = db.query(Content).count()
    if count > 0:
        return

    seed_dir = os.path.join(os.path.dirname(__file__), "seed_data")
    file_category_map = {
        "shayari.json": "shayari",
        "good_morning.json": "good_morning",
        "good_night.json": "good_night",
        "love_quotes.json": "love",
        "birthday.json": "birthday",
        "anniversary.json": "anniversary",
        "festival.json": "festival",
    }

    for filename, category in file_category_map.items():
        filepath = os.path.join(seed_dir, filename)
        if not os.path.exists(filepath):
            continue
        with open(filepath, "r", encoding="utf-8") as f:
            items = json.load(f)
        for item in items:
            content = Content(
                category=category,
                subcategory=item.get("subcategory"),
                text_hindi=item["text_hindi"],
                text_transliteration=item["text_transliteration"],
                author=item.get("author"),
                tags=item.get("tags"),
                is_featured=item.get("is_featured", False),
            )
            db.add(content)
    db.commit()


def import_scraped(db: Session):
    """Add scraped items (seed_data/scraped_*.json) that aren't in the DB yet."""
    items = []
    for path in sorted(glob.glob(os.path.join(os.path.dirname(__file__), "seed_data", "scraped_*.json"))):
        with open(path, "r", encoding="utf-8") as f:
            items.extend(json.load(f))
    existing = {row[0] for row in db.query(Content.text_hindi).all()}
    added = 0
    for item in items:
        if item["text_hindi"] in existing:
            continue
        db.add(Content(
            category=item["category"],
            subcategory=item.get("subcategory"),
            text_hindi=item["text_hindi"],
            text_transliteration=item["text_transliteration"],
            author=item.get("author"),
            tags=item.get("tags"),
            is_featured=False,
        ))
        existing.add(item["text_hindi"])
        added += 1
    db.commit()
    if added:
        print(f"Imported {added} scraped items.")


@asynccontextmanager
async def lifespan(app: FastAPI):
    Base.metadata.create_all(bind=engine)
    from database import SessionLocal
    db = SessionLocal()
    try:
        seed_if_empty(db)
        import_scraped(db)
    finally:
        db.close()
    yield


app = FastAPI(title="DoAide Shayari API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3088",
        "https://shayari.doaide.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class GenerateRequest(BaseModel):
    category: str
    subcategory: str | None = None
    context: str | None = None


class GenerateResponse(BaseModel):
    text_hindi: str
    text_transliteration: str


def get_client_ip(request: Request) -> str:
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        return forwarded.split(",")[0].strip()
    return request.client.host if request.client else "unknown"


def check_rate_limit(ip: str):
    now = time.time()
    rate_limit_store[ip] = [t for t in rate_limit_store[ip] if now - t < RATE_WINDOW]
    if len(rate_limit_store[ip]) >= RATE_LIMIT:
        raise HTTPException(status_code=429, detail="Rate limit exceeded. Try again in a minute.")
    rate_limit_store[ip].append(now)


@app.get("/api/health")
async def health():
    return {"status": "ok"}


@app.get("/api/categories")
async def list_categories(db: Session = Depends(get_db)):
    results = (
        db.query(Content.category, Content.subcategory, func.count(Content.id))
        .group_by(Content.category, Content.subcategory)
        .all()
    )
    categories = {}
    for cat, subcat, count in results:
        if cat not in categories:
            categories[cat] = {"category": cat, "count": 0, "subcategories": {}}
        categories[cat]["count"] += count
        if subcat:
            categories[cat]["subcategories"][subcat] = count
    return list(categories.values())


@app.get("/api/daily")
async def daily_content(db: Session = Depends(get_db)):
    today_seed = int(date.today().strftime("%Y%m%d"))
    categories = ["shayari", "good_morning", "good_night", "love", "birthday"]
    result = {}
    for cat in categories:
        items = db.query(Content).filter(Content.category == cat).all()
        if items:
            random.seed(today_seed + hash(cat))
            picked = random.sample(items, min(3, len(items)))
            result[cat] = [
                {
                    "id": item.id,
                    "category": item.category,
                    "subcategory": item.subcategory,
                    "text_hindi": item.text_hindi,
                    "text_transliteration": item.text_transliteration,
                    "author": item.author,
                }
                for item in picked
            ]
    random.seed()
    return result


@app.get("/api/content/{category}")
async def get_content(
    category: str,
    subcategory: str | None = Query(None),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    random_order: bool = Query(False, alias="random"),
    db: Session = Depends(get_db),
):
    query = db.query(Content).filter(Content.category == category)
    if subcategory:
        query = query.filter(Content.subcategory == subcategory)

    total = query.count()

    if random_order:
        today_seed = int(date.today().strftime("%Y%m%d"))
        items = query.all()
        random.seed(today_seed)
        random.shuffle(items)
        random.seed()
        start = (page - 1) * limit
        items = items[start : start + limit]
    else:
        items = query.order_by(Content.id.desc()).offset((page - 1) * limit).limit(limit).all()

    return {
        "items": [
            {
                "id": item.id,
                "category": item.category,
                "subcategory": item.subcategory,
                "text_hindi": item.text_hindi,
                "text_transliteration": item.text_transliteration,
                "author": item.author,
                "tags": item.tags,
                "is_featured": item.is_featured,
            }
            for item in items
        ],
        "total": total,
        "page": page,
        "limit": limit,
        "pages": (total + limit - 1) // limit,
    }


@app.get("/api/content/{category}/{content_id}")
async def get_single_content(category: str, content_id: int, db: Session = Depends(get_db)):
    item = db.query(Content).filter(Content.category == category, Content.id == content_id).first()
    if not item:
        raise HTTPException(status_code=404, detail="Content not found")
    return {
        "id": item.id,
        "category": item.category,
        "subcategory": item.subcategory,
        "text_hindi": item.text_hindi,
        "text_transliteration": item.text_transliteration,
        "author": item.author,
        "tags": item.tags,
        "is_featured": item.is_featured,
    }


@app.get("/api/search")
async def search_content(
    q: str = Query(..., min_length=2),
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
):
    query = db.query(Content).filter(
        (Content.text_hindi.contains(q))
        | (Content.text_transliteration.contains(q))
        | (Content.tags.contains(q))
    )
    total = query.count()
    items = query.offset((page - 1) * limit).limit(limit).all()
    return {
        "items": [
            {
                "id": item.id,
                "category": item.category,
                "subcategory": item.subcategory,
                "text_hindi": item.text_hindi,
                "text_transliteration": item.text_transliteration,
                "author": item.author,
            }
            for item in items
        ],
        "total": total,
        "page": page,
        "limit": limit,
    }


@app.post("/api/generate")
async def generate_message(req: GenerateRequest, request: Request):
    ip = get_client_ip(request)
    check_rate_limit(ip)

    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=503, detail="AI generation is currently unavailable")

    category_labels = {
        "shayari": "shayari (poetry)",
        "good_morning": "good morning wish",
        "good_night": "good night wish",
        "love": "love quote",
        "birthday": "birthday wish",
        "anniversary": "anniversary wish",
        "festival": "festival wish",
    }
    subcategory_labels = {
        "love": "romantic/love",
        "sad": "sad/heartbreak",
        "friendship": "friendship",
        "motivational": "motivational/inspirational",
        "attitude": "attitude/swag",
        "funny": "funny/humorous",
        "diwali": "Diwali",
        "holi": "Holi",
        "eid": "Eid",
        "raksha_bandhan": "Raksha Bandhan",
        "navratri": "Navratri",
        "christmas": "Christmas",
        "new_year": "New Year",
    }

    cat_label = category_labels.get(req.category, req.category)
    sub_label = subcategory_labels.get(req.subcategory, req.subcategory) if req.subcategory else ""
    context_str = f" Context: {req.context}." if req.context else ""

    prompt = (
        f"Write a beautiful {sub_label} {cat_label} in Hindi.{context_str} "
        f"The message should be heartfelt, culturally appropriate for Indian audience, "
        f"and poetic if it's a shayari. "
        f"Return ONLY a JSON object with two fields: "
        f'"text_hindi" (the message in Devanagari script) and '
        f'"text_transliteration" (the same message in English/Roman transliteration). '
        f"No explanation, no markdown, just the JSON object."
    )

    try:
        from google import genai
        client = genai.Client(api_key=api_key)
        response = client.models.generate_content(model="gemini-2.0-flash", contents=prompt)
        text = response.text.strip()
        if text.startswith("```"):
            text = text.split("\n", 1)[1] if "\n" in text else text[3:]
            if text.endswith("```"):
                text = text[:-3]
            text = text.strip()
        result = json.loads(text)
        return GenerateResponse(
            text_hindi=result["text_hindi"],
            text_transliteration=result["text_transliteration"],
        )
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Failed to parse AI response")
    except Exception as e:
        raise HTTPException(status_code=500, detail="AI generation failed")


@app.get("/api/sitemap-data")
async def sitemap_data(db: Session = Depends(get_db)):
    categories = db.query(Content.category).distinct().all()
    subcategories = (
        db.query(Content.category, Content.subcategory)
        .filter(Content.subcategory.isnot(None))
        .distinct()
        .all()
    )
    return {
        "categories": [c[0] for c in categories],
        "subcategories": [{"category": s[0], "subcategory": s[1]} for s in subcategories],
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3081)

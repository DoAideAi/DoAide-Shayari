import json
import os
from database import engine, SessionLocal, Base
from models import Content


def seed():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    if db.query(Content).count() > 0:
        print("Database already has data. Skipping seed.")
        db.close()
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

    total = 0
    for filename, category in file_category_map.items():
        filepath = os.path.join(seed_dir, filename)
        if not os.path.exists(filepath):
            print(f"Warning: {filepath} not found, skipping.")
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
            total += 1
        print(f"Loaded {len(items)} items for category: {category}")

    db.commit()
    db.close()
    print(f"Seed complete. Total items: {total}")


if __name__ == "__main__":
    seed()

"""Scrape Hindi good morning messages / shayari / wishes / quotes.

Same approach as scrape_shayari.py (public WordPress REST APIs, title-based
classification, couplet extraction), but with good-morning-specific search
terms and sources, and a subcategory per content type:
messages, shayari, wishes, quotes.

Items already present in seed_data/scraped_shayari.json are skipped.

Usage:
    python scraper/scrape_good_morning.py                # writes seed_data/scraped_good_morning.json
    python scraper/scrape_good_morning.py --max-pages 2  # quicker run
"""
import argparse
import html
import json
import os
import re
import sys
import time
import urllib.parse
from collections import Counter

sys.path.insert(0, os.path.dirname(__file__))
from scrape_shayari import extract_items, fetch_json, norm_key  # noqa: E402
from transliterate import transliterate  # noqa: E402

SEED_DIR = os.path.join(os.path.dirname(__file__), "..", "seed_data")
OUT_PATH = os.path.join(SEED_DIR, "scraped_good_morning.json")

SOURCES = [
    "lovesove.com",
    "www.shayariholic.com",
    "www.hindisoch.com",
    "www.shayaricollection.com",
    "www.achhikhabar.com",
    "www.shayariyan.com",
    "www.hindimehelp.com",
    "www.hindimeaning.com",
    "www.goodmorningimages.in",
    "www.gyanipandit.com",
    "www.dosti-shayari.com",
    "www.hindikiduniya.com",
]

QUERIES = [
    "good morning", "good morning shayari", "good morning message", "good morning wishes",
    "good morning quotes", "good morning images", "suprabhat", "subah", "सुप्रभात",
    "गुड मॉर्निंग", "शुभ प्रभात",
]

IS_MORNING = re.compile(r"good\s*morning|suprabhat|shubh\s*prabhat|सुप्रभात|शुभ प्रभात|गुड मॉर्निंग|सुबह|subah", re.I)

# (regex on lowercased title, subcategory) — first match wins.
SUB_RULES = [
    (r"shayari|शायरी|kavita|कविता", "shayari"),
    (r"quote|suvichar|thought|सुविचार|अनमोल|विचार|कोट्स", "quotes"),
    (r"wish|शुभकामना|बधाई|विशेज", "wishes"),
]

TAGS = {
    "messages": "good morning,suprabhat,message",
    "shayari": "good morning,suprabhat,shayari",
    "wishes": "good morning,suprabhat,wishes",
    "quotes": "good morning,suprabhat,quotes,suvichar",
}


def classify(title):
    t = html.unescape(title).lower()
    if not IS_MORNING.search(t):
        return None
    for pattern, sub in SUB_RULES:
        if re.search(pattern, t):
            return sub
    return "messages"


def existing_keys():
    path = os.path.join(SEED_DIR, "scraped_shayari.json")
    if not os.path.exists(path):
        return set()
    with open(path, encoding="utf-8") as f:
        return {norm_key(i["text_hindi"]) for i in json.load(f)}


def scrape(max_pages, per_page, delay):
    items, seen, seen_posts = [], existing_keys(), set()
    for site in SOURCES:
        site_count = 0
        for q in QUERIES:
            for page in range(1, max_pages + 1):
                params = urllib.parse.urlencode({
                    "search": q, "per_page": per_page, "page": page,
                    "_fields": "id,title,content,link",
                })
                posts = fetch_json(f"https://{site}/wp-json/wp/v2/posts?{params}")
                time.sleep(delay)
                if not posts:
                    break
                for post in posts:
                    key = (site, post["id"])
                    if key in seen_posts:
                        continue
                    seen_posts.add(key)
                    sub = classify(post["title"]["rendered"])
                    if not sub:
                        continue
                    for text in extract_items(post["content"]["rendered"], "good_morning"):
                        k = norm_key(text)
                        if len(k) < 15 or k in seen:
                            continue
                        seen.add(k)
                        items.append({
                            "category": "good_morning",
                            "subcategory": sub,
                            "text_hindi": text,
                            "text_transliteration": transliterate(text),
                            "author": None,
                            "tags": TAGS[sub],
                            "source": post.get("link") or f"https://{site}",
                        })
                        site_count += 1
                if len(posts) < per_page:
                    break
        print(f"{site}: {site_count} items (running total {len(items)})")
    return items


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--max-pages", type=int, default=5)
    ap.add_argument("--per-page", type=int, default=50)
    ap.add_argument("--delay", type=float, default=0.5)
    ap.add_argument("--out", default=OUT_PATH)
    args = ap.parse_args()

    items = scrape(args.max_pages, args.per_page, args.delay)
    with open(args.out, "w", encoding="utf-8") as f:
        json.dump(items, f, ensure_ascii=False, indent=1)
    for sub, n in sorted(Counter(i["subcategory"] for i in items).items()):
        print(f"  good_morning/{sub}: {n}")
    print(f"Wrote {len(items)} items to {os.path.abspath(args.out)}")


if __name__ == "__main__":
    main()

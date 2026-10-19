"""Scrape Hindi shayari / wishes from public WordPress shayari sites.

Uses each site's public WordPress REST API (/wp-json/wp/v2/posts) instead of
crawling HTML pages, so requests are few and polite. Posts are classified by
their title into the app's category/subcategory scheme, and individual
couplets are pulled out of <p>/<blockquote> blocks split on <br>.

Usage:
    python scraper/scrape_shayari.py                # writes seed_data/scraped_shayari.json
    python scraper/scrape_shayari.py --max-pages 3  # quicker run
"""
import argparse
import html
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from collections import Counter

sys.path.insert(0, os.path.dirname(__file__))
from transliterate import transliterate  # noqa: E402

UA = "Mozilla/5.0 (compatible; DoAideShayariBot/1.0; +https://shayari.doaide.com)"
OUT_PATH = os.path.join(os.path.dirname(__file__), "..", "seed_data", "scraped_shayari.json")

SOURCES = [
    "www.hindisoch.com",
    "www.shayari.in",
    "www.hindishayarisad.com",
    "www.shayaricollection.com",
    "www.shayariyan.com",
    "www.achhikhabar.com",
    "www.hindimehelp.com",
    "www.dosti-shayari.com",
    "www.shayariwalla.com",
    "www.shayaricafe.com",
]

# Search terms sent to each site's API. Classification is done on the post title.
QUERIES = [
    "shayari", "love shayari", "sad shayari", "dosti shayari", "friendship shayari",
    "motivational shayari", "attitude shayari", "funny shayari", "bewafa shayari",
    "good morning", "good night", "birthday", "anniversary",
    "diwali", "holi", "eid", "raksha bandhan", "navratri", "christmas", "new year",
]

# (regex on lowercased title, category, subcategory) — first match wins.
TITLE_RULES = [
    (r"good\s*morning|suprabhat|सुप्रभात|गुड मॉर्निंग", "good_morning", None),
    (r"good\s*night|shubh\s*ratri|शुभ रात्रि|गुड नाइट", "good_night", None),
    (r"anniversary|सालगिरह|एनिवर्सरी", "anniversary", None),
    (r"birthday|janamdin|janmdin|जन्मदिन|बर्थडे", "birthday", None),
    (r"diwali|दिवाली|दीपावली", "festival", "diwali"),
    (r"holi\b|होली", "festival", "holi"),
    (r"\beid\b|ईद", "festival", "eid"),
    (r"raksha\s*bandhan|rakhi|रक्षाबंधन|राखी", "festival", "raksha_bandhan"),
    (r"navratri|नवरात्रि", "festival", "navratri"),
    (r"christmas|क्रिसमस", "festival", "christmas"),
    (r"new\s*year|नया साल|नववर्ष", "festival", "new_year"),
    (r"funny|comedy|मजेदार|फनी|jokes?", "shayari", "funny"),
    (r"attitude|एटीट्यूड|रॉयल|royal", "shayari", "attitude"),
    (r"dosti|friendship|friend|दोस्ती|यारी", "shayari", "friendship"),
    (r"motivat|inspir|mehnat|प्रेरणा|मोटिवेशनल|हौसला|success", "shayari", "motivational"),
    (r"sad|bewafa|dard|breakup|broken|dhokha|alone|tanhai|judai|दर्द|बेवफा|उदास|ग़म|गम", "shayari", "sad"),
    (r"love|romantic|pyar|ishq|mohabbat|प्यार|मोहब्बत|इश्क|लव", "shayari", "love"),
]

TAGS = {
    ("shayari", "love"): "love,pyar,romantic",
    ("shayari", "sad"): "sad,dard,bewafa",
    ("shayari", "friendship"): "dosti,friendship,yaari",
    ("shayari", "motivational"): "motivational,inspiration,zindagi",
    ("shayari", "attitude"): "attitude,swag,royal",
    ("shayari", "funny"): "funny,comedy,mazedaar",
    ("good_morning", None): "good morning,suprabhat",
    ("good_night", None): "good night,shubh ratri",
    ("birthday", None): "birthday,janamdin,wishes",
    ("anniversary", None): "anniversary,salgirah,wishes",
}

# Lines that are editorial chatter rather than shayari.
JUNK = re.compile(
    r"http|www\.|शेयर|कमेंट|पोस्ट|आर्टिकल|लेख|वेबसाइट|यहाँ पर|यहां पर|हमने|हम आपके|आप लोग|आपको ये|"
    r"इमेज|फोटो|डाउनलोड|whatsapp|facebook|instagram|status|कैप्शन|caption|पढ़ें|क्लिक|"
    r"शायरी इन हिंदी|इस साल|\d{4}|Read|Also",
    re.IGNORECASE,
)
WISH_CATEGORIES = {"good_morning", "good_night", "birthday", "anniversary", "festival"}
DEVA = re.compile(r"[ऀ-ॿ]")
LATIN = re.compile(r"[A-Za-z]")


def fetch_json(url, retries=2):
    for attempt in range(retries + 1):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "application/json"})
            with urllib.request.urlopen(req, timeout=30) as resp:
                return json.loads(resp.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            if e.code == 400:  # page past the end
                return []
            if attempt == retries:
                print(f"  ! {url}: HTTP {e.code}", file=sys.stderr)
                return []
        except Exception as e:  # noqa: BLE001
            if attempt == retries:
                print(f"  ! {url}: {e}", file=sys.stderr)
                return []
        time.sleep(2 * (attempt + 1))
    return []


def classify(title):
    t = html.unescape(title).lower()
    for pattern, cat, sub in TITLE_RULES:
        if re.search(pattern, t):
            return cat, sub
    return None


def clean_line(line):
    line = re.sub(r"<[^>]+>", "", line)
    line = html.unescape(line).replace("\xa0", " ")
    line = re.sub(r"^\s*(\d+[\.\)]|[-–•*✔✅👉🔸🔹➤►])\s*", "", line)
    return re.sub(r"\s+", " ", line).strip()


def extract_items(content_html, category):
    blocks = re.findall(r"<(?:p|blockquote)[^>]*>(.*?)</(?:p|blockquote)>", content_html, re.S | re.I)
    for block in blocks:
        if "<img" in block or "<a " in block:
            continue
        lines = [clean_line(l) for l in re.split(r"<br\s*/?>|\n", block)]
        lines = [l for l in lines if l]
        if not lines:
            continue
        text = "\n".join(lines)
        letters = len(DEVA.findall(text)) + len(LATIN.findall(text))
        if letters == 0 or len(DEVA.findall(text)) / letters < 0.9:
            continue
        if JUNK.search(text):
            continue
        if any(len(l) > 110 for l in lines):
            continue
        if not (2 <= len(lines) <= 8):
            # Single-line greetings are fine for wishes, not for couplets.
            if not (len(lines) == 1 and category in WISH_CATEGORIES and 30 <= len(text) <= 220):
                continue
        if not (20 <= len(text) <= 500):
            continue
        yield text


def norm_key(text):
    return re.sub(r"[^ऀ-ॿ]", "", text).replace("़", "")


def scrape(max_pages, per_page, delay):
    items, seen, seen_posts = [], set(), set()
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
                    cls = classify(post["title"]["rendered"])
                    if not cls:
                        continue
                    cat, sub = cls
                    for text in extract_items(post["content"]["rendered"], cat):
                        k = norm_key(text)
                        if len(k) < 15 or k in seen:
                            continue
                        seen.add(k)
                        tags = TAGS.get((cat, sub)) or f"festival,{sub},wishes"
                        items.append({
                            "category": cat,
                            "subcategory": sub,
                            "text_hindi": text,
                            "text_transliteration": transliterate(text),
                            "author": None,
                            "tags": tags,
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
    counts = Counter((i["category"], i["subcategory"]) for i in items)
    for (cat, sub), n in sorted(counts.items(), key=lambda x: (x[0][0], x[0][1] or "")):
        print(f"  {cat}/{sub or '-'}: {n}")
    print(f"Wrote {len(items)} items to {os.path.abspath(args.out)}")


if __name__ == "__main__":
    main()

"""Static server for web/dist with SEO prerender support and SPA fallback.

Serves prerendered HTML for known routes (e.g. /good-morning-images →
good-morning-images.html) so crawlers get correct title, canonical, h1,
and JSON-LD in the initial HTML. Falls back to index.html for unknown
paths (SPA client-side routing).

Usage (from web/dist): python3 ../serve.py 3088
"""
import os
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class SPAHandler(SimpleHTTPRequestHandler):
    def send_head(self):
        path = self.translate_path(self.path)

        # If the file exists on disk (assets, sitemap, etc.), serve as-is
        if os.path.exists(path) and not os.path.isdir(path):
            return super().send_head()

        # Check for prerendered HTML: /good-morning-images → good-morning-images.html
        clean = self.path.split("?")[0].split("#")[0].rstrip("/")
        if clean == "" or clean == "/":
            prerender = os.path.join(os.getcwd(), "_home.html")
        else:
            slug = clean.lstrip("/")
            prerender = os.path.join(os.getcwd(), f"{slug}.html")

        if os.path.exists(prerender):
            self.path = "/" + os.path.basename(prerender)
            return super().send_head()

        # SPA fallback
        self.path = "/index.html"
        return super().send_head()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 3088
    ThreadingHTTPServer(("0.0.0.0", port), SPAHandler).serve_forever()

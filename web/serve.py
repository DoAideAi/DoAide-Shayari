"""Static server for web/dist with SPA fallback: unknown paths serve index.html.

Usage (from web/dist): python3 ../serve.py 3088
"""
import os
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class SPAHandler(SimpleHTTPRequestHandler):
    def send_head(self):
        path = self.translate_path(self.path)
        if not os.path.exists(path):
            self.path = "/index.html"
        return super().send_head()


if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 3088
    ThreadingHTTPServer(("0.0.0.0", port), SPAHandler).serve_forever()

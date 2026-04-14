"""Local preview server with fallback to index.html.

Usage:
    python3 preview_server.py
"""

from http.server import HTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
import os

HOST = os.getenv("HOST", "0.0.0.0")
PORT = int(os.getenv("PORT", "8000"))
ROOT = Path(__file__).parent.resolve()
INDEX_FILE = ROOT / "index.html"


class PreviewHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_GET(self):
        requested = (ROOT / self.path.lstrip("/")).resolve()

        # Serve regular files/directories normally.
        if str(requested).startswith(str(ROOT)) and (requested.exists() or self.path in ("/", "")):
            return super().do_GET()

        # Fallback unknown routes to index.html.
        if INDEX_FILE.exists():
            self.path = "/index.html"
            return super().do_GET()

        self.send_error(404, "Not Found")


if __name__ == "__main__":
    server = HTTPServer((HOST, PORT), PreviewHandler)
    print(f"Preview server started: http://{HOST}:{PORT}")
    print("Tip: open http://localhost:%s in your browser" % PORT)
    print("Unknown paths fallback to index.html")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        server.server_close()

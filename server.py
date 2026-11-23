#!/usr/bin/env python3
"""Simple HTTP server for Sunrise Global University website template."""
import http.server
import socketserver
import os
import sys

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def log_message(self, format, *args):
        print(f"[{self.log_date_time_string()}] {format % args}")

if __name__ == "__main__":
    if len(sys.argv) > 1:
        PORT = int(sys.argv[1])
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"\n{'='*50}")
        print(f"  Sunrise Global University - Dev Server")
        print(f"  Running at: http://localhost:{PORT}")
        print(f"  Serving from: {DIRECTORY}")
        print(f"{'='*50}\n")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")

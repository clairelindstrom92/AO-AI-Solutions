#!/usr/bin/env python3
"""
AO AI Solutions — Sitemap Ping Script
Pings Google, Bing, and Yandex with the sitemap URL.
No API key required — uses public ping endpoints.

Usage:
    python3 ping-sitemaps.py

Run after every significant site update to trigger re-indexing.
"""

import urllib.request
import urllib.parse
import urllib.error
import json
from datetime import datetime

SITEMAP_URL = "https://aoaisolutions.dev/sitemap.xml"

PING_ENDPOINTS = [
    {
        "name": "Google",
        "url": f"https://www.google.com/ping?sitemap={urllib.parse.quote(SITEMAP_URL)}",
        "note": "Google may take 24-48h to process"
    },
    {
        "name": "Bing",
        "url": f"https://www.bing.com/ping?sitemap={urllib.parse.quote(SITEMAP_URL)}",
        "note": "Bing typically processes within hours"
    },
    {
        "name": "IndexNow (Bing/Yandex/others)",
        "url": f"https://api.indexnow.org/indexnow?url={urllib.parse.quote('https://aoaisolutions.dev/')}&key=[YOUR_INDEXNOW_KEY]",
        "note": "Get a free key at https://www.indexnow.org/"
    },
]

def ping_sitemap(endpoint):
    try:
        req = urllib.request.Request(
            endpoint["url"],
            headers={"User-Agent": "AO-AI-Solutions-SitemapPinger/1.0"}
        )
        with urllib.request.urlopen(req, timeout=10) as response:
            status = response.status
            return {"success": True, "status": status, "message": f"HTTP {status}"}
    except urllib.error.HTTPError as e:
        return {"success": False, "status": e.code, "message": f"HTTP Error {e.code}: {e.reason}"}
    except urllib.error.URLError as e:
        return {"success": False, "status": None, "message": f"Connection error: {e.reason}"}
    except Exception as e:
        return {"success": False, "status": None, "message": str(e)}

def main():
    print("=" * 60)
    print("AO AI Solutions — Sitemap Ping Tool")
    print(f"Sitemap: {SITEMAP_URL}")
    print(f"Run at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 60)

    results = []
    for endpoint in PING_ENDPOINTS:
        print(f"\nPinging {endpoint['name']}...")
        result = ping_sitemap(endpoint)
        results.append({**endpoint, **result})

        status_icon = "✅" if result["success"] else "❌"
        print(f"  {status_icon} {result['message']}")
        print(f"  Note: {endpoint['note']}")

    print("\n" + "=" * 60)
    print("SUMMARY")
    print("=" * 60)
    success_count = sum(1 for r in results if r["success"])
    print(f"Pinged: {len(results)} engines | Success: {success_count} | Failed: {len(results) - success_count}")
    print("\nNext Steps:")
    print("1. Submit sitemap manually in Google Search Console:")
    print("   → https://search.google.com/search-console")
    print("2. Submit in Bing Webmaster Tools:")
    print("   → https://www.bing.com/webmasters")
    print("3. Get IndexNow key at https://www.indexnow.org/ for instant indexing")

    # Save log
    log_file = f"ping-log-{datetime.now().strftime('%Y%m%d-%H%M%S')}.json"
    with open(log_file, "w") as f:
        json.dump({"timestamp": datetime.now().isoformat(), "sitemap": SITEMAP_URL, "results": results}, f, indent=2)
    print(f"\nLog saved to: {log_file}")

if __name__ == "__main__":
    main()

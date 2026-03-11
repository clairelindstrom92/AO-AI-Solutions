#!/bin/bash
# ============================================================
# AO AI Solutions — Google Search Console Sitemap Submitter
# Uses GSC API via service account (OAuth2 / gcloud CLI)
#
# SETUP (one-time):
# 1. Go to console.cloud.google.com → APIs & Services → Enable "Search Console API"
# 2. Create a Service Account → download JSON key → save as gsc-service-account.json
# 3. In Google Search Console → Settings → Users & permissions → Add the service account email
# 4. Install gcloud CLI: https://cloud.google.com/sdk/docs/install
# 5. Run: gcloud auth activate-service-account --key-file=gsc-service-account.json
# ============================================================

SITE_URL="https://aoaisolutions.dev/"
SITEMAP_URL="https://aoaisolutions.dev/sitemap.xml"
SERVICE_ACCOUNT_KEY="./gsc-service-account.json"

echo "AO AI Solutions — GSC Sitemap Submitter"
echo "Site: $SITE_URL"
echo "Sitemap: $SITEMAP_URL"
echo ""

# Step 1: Get access token from service account
echo "Step 1: Getting access token..."
ACCESS_TOKEN=$(gcloud auth print-access-token 2>/dev/null)

if [ -z "$ACCESS_TOKEN" ]; then
  echo "❌ Could not get access token."
  echo "   Make sure you've run: gcloud auth activate-service-account --key-file=$SERVICE_ACCOUNT_KEY"
  exit 1
fi
echo "✅ Access token obtained"

# Step 2: Submit sitemap to GSC
echo ""
echo "Step 2: Submitting sitemap to Google Search Console..."
ENCODED_SITE=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$SITE_URL', safe=''))")
ENCODED_SITEMAP=$(python3 -c "import urllib.parse; print(urllib.parse.quote('$SITEMAP_URL', safe=''))")

RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" \
  -X PUT \
  "https://searchconsole.googleapis.com/webmasters/v3/sites/${ENCODED_SITE}/sitemaps/${ENCODED_SITEMAP}" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json")

if [ "$RESPONSE" = "200" ] || [ "$RESPONSE" = "204" ]; then
  echo "✅ Sitemap submitted successfully! (HTTP $RESPONSE)"
  echo ""
  echo "Next: Visit Google Search Console to confirm:"
  echo "  https://search.google.com/search-console/sitemaps?resource_id=$ENCODED_SITE"
else
  echo "❌ Submission failed (HTTP $RESPONSE)"
  echo "   Check that the service account has access to the GSC property."
fi

# Step 3: Verify submission
echo ""
echo "Step 3: Verifying submission..."
VERIFY_RESPONSE=$(curl -s \
  "https://searchconsole.googleapis.com/webmasters/v3/sites/${ENCODED_SITE}/sitemaps" \
  -H "Authorization: Bearer $ACCESS_TOKEN")

echo "Current sitemaps registered:"
echo "$VERIFY_RESPONSE" | python3 -c "
import json, sys
data = json.load(sys.stdin)
sitemaps = data.get('sitemap', [])
for s in sitemaps:
    print(f\"  - {s.get('path', 'N/A')} | Indexed: {s.get('contents', [{}])[0].get('indexed', 'N/A')} pages\")
" 2>/dev/null || echo "  (Could not parse response — check manually in GSC)"

# SEO Setup — AO AI Solutions

## Files
- `ping-sitemaps.py` — Pings Google, Bing, and Yandex with no API key needed
- `submit-sitemap-gsc.sh` — Submits via Google Search Console API (service account)
- Updated `public/sitemap.xml` — Now includes `/ai-audit` page and schema-ready structure
- Updated `public/robots.txt` — Already optimized in existing repo

## Quick Start (no API key needed)
```bash
python3 ping-sitemaps.py
```

## GSC API Setup (one-time)
1. Enable Search Console API at console.cloud.google.com
2. Create service account → download JSON key
3. In GSC → Settings → Add service account email
4. `chmod +x submit-sitemap-gsc.sh && ./submit-sitemap-gsc.sh`

## Manual Steps (fastest)
1. Go to https://search.google.com/search-console
2. Select your property: aoaisolutions.dev
3. Left sidebar → Sitemaps → Enter `sitemap.xml` → Submit
4. Bing: https://www.bing.com/webmasters → Add sitemap

## Schema Markup for LocalBusiness
Add to your `index.html` `<head>`:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "AO AI Solutions",
  "url": "https://aoaisolutions.dev",
  "email": "michael.smith@aoaisolutions.dev",
  "description": "AI-powered business systems for DC-area law firms, medical practices, contractors, and federal contractors.",
  "areaServed": {
    "@type": "City",
    "name": "Washington, D.C."
  },
  "serviceType": ["AI Websites", "Chatbots", "Lead Automation", "CRM Integration"],
  "priceRange": "$$$$"
}
</script>
```

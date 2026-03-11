# Tracking Pixel Package — AO AI Solutions

## What's Installed
This single snippet installs 5 tracking tools simultaneously, all asynchronously (non-blocking — won't slow your site).

| Pixel | Purpose | Where to Get ID |
|-------|---------|----------------|
| **Google Analytics 4 (GA4)** | Track all visitor behavior, pageviews, scroll depth | analytics.google.com → Admin → Data Streams |
| **Google Ads Conversion** | Track ad-driven form submits & CTA clicks | ads.google.com → Tools → Conversions |
| **Meta Pixel** | Build Facebook/Instagram ad audiences, track leads | business.facebook.com → Events Manager → Pixels |
| **LinkedIn Insight Tag** | Track LinkedIn ad conversions, build retargeting audiences | linkedin.com/campaignmanager → Account Assets → Insight Tag |
| **Hotjar** | Session recordings — see exactly where visitors drop off | hotjar.com → Settings → Tracking Code |

---

## Installation in Your React/Vite Site

### Option A — index.html (Simplest)
Add inside `<head>` in `index.html`:
```html
<script src="/leadgen-system/tracking/tracking-snippet.js"></script>
```

### Option B — Inline in index.html (Recommended for production)
Copy the entire contents of `tracking-snippet.js` directly into a `<script>` tag in `index.html` `<head>`.

### Option C — React Helmet (for dynamic consent)
```jsx
import { Helmet } from 'react-helmet';
// In your App.jsx:
<Helmet>
  <script>{trackingSnippetCode}</script>
</Helmet>
```

---

## Replace These Placeholders

Open `tracking-snippet.js` and replace:

| Placeholder | Where to Find It |
|-------------|----------------|
| `[YOUR_GA4_MEASUREMENT_ID]` | analytics.google.com → property → Data Streams → Web stream → Measurement ID (starts with `G-`) |
| `[YOUR_GOOGLE_ADS_CONVERSION_ID]` | ads.google.com → Tools → Conversions → Conversion → Tag setup (starts with `AW-`) |
| `[YOUR_BOOK_DEMO_CONVERSION_LABEL]` | Same conversion detail page — the label after the `/` |
| `[YOUR_META_PIXEL_ID]` | business.facebook.com → Events Manager → Your Pixel → Pixel ID (numbers only) |
| `[YOUR_LINKEDIN_PARTNER_ID]` | linkedin.com/campaignmanager → Account Assets → Insight Tag → Partner ID |
| `[YOUR_LINKEDIN_CONVERSION_ID]` | LinkedIn Campaign Manager → Account Assets → Conversions → Conversion ID |
| `[YOUR_HOTJAR_SITE_ID]` | hotjar.com → Settings → Tracking Code → hjid value |

---

## GDPR Compliance
The snippet checks `window.AO_CONSENT === true` before loading any pixels.

**Wire to your cookie banner:**
```javascript
// When user accepts cookies:
window.AO_CONSENT = true;
// Then reload tracking (or refresh page)
```

---

## Firing Conversion Events in Your Code
Call these functions anywhere in your React components:

```javascript
// When a form is submitted:
window.AO_trackFormSubmit();
window.AO_trackMetaLead(email);
window.AO_trackLinkedInConversion();

// When a CTA button is clicked:
window.AO_trackCTAClick('hero_claim_audit');
```

Or add `data-cta="book-demo"` to any button — the snippet auto-attaches listeners.

---

## Verify Installation
1. **GA4**: Install [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger) Chrome extension
2. **Meta Pixel**: Install [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper) Chrome extension
3. **LinkedIn**: Install [LinkedIn Insight Tag Helper](https://chrome.google.com/webstore/detail/linkedin-insight-tag-help) Chrome extension
4. **Hotjar**: Visit your site → check hotjar.com dashboard for session recordings

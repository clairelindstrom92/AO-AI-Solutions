# Google Ads Campaign Setup Guide — AO AI Solutions

## Overview
5 campaigns targeting Washington DC metro area.
Total daily budget: $50/day to start. Scale based on cost-per-audit (target: <$75).

---

## ACCOUNT SETUP (Before Launching)

1. Create account at ads.google.com
2. Set billing to credit card (don't use auto-pay bank account initially)
3. Link to Google Analytics 4 property
4. Set up conversion actions:
   - Form Submit: Track `/ai-audit` form submission (value: $75)
   - Button Click: Track "Claim My Free AI Audit" clicks (value: $25)
   - Phone Call: Track calls > 60 seconds from ads
5. Enable "Maximize Conversions" bidding initially → switch to Target CPA ($75) after 30 conversions

---

## GLOBAL SETTINGS (All Campaigns)

- **Geography:** Washington DC metro — 25-mile radius from DC center
- **Language:** English
- **Ad schedule:** Mon–Fri 7am–8pm, Sat 9am–5pm (EST)
- **Bid adjustments:** +30% DC city core | +20% Arlington/Alexandria | +15% Bethesda/McLean
- **Devices:** All — but +20% bid on mobile (most searches happen on phone)
- **Networks:** Search only (no Display Network for cold campaigns)

---

## NEGATIVE KEYWORD LIST (Apply to ALL campaigns)

```
free template
DIY website
build yourself
free ai tool
chatgpt
how to build
tutorial
learn ai
ai course
udemy
coursera
cheap website
$99 website
ai jobs
ai careers
hiring ai
ai engineer job
resume
template download
free software
open source
github
discord
reddit
ai news
what is ai
ai explained
google ai
microsoft copilot
make.com free
zapier free
salary
glassdoor
indeed
```

---

## GEO BID ADJUSTMENTS

| Location | Bid Adjustment |
|----------|---------------|
| Washington, DC (zip codes 200xx) | +30% |
| Arlington, VA | +25% |
| Alexandria, VA | +20% |
| Bethesda, MD | +20% |
| McLean, VA | +20% |
| Tysons, VA | +15% |
| Silver Spring, MD | +10% |
| Reston, VA | +10% |
| Herndon, VA | +10% |
| Fairfax, VA | +10% |
| Locations outside 25-mile radius | -50% |

---

## AD EXTENSIONS (All Campaigns)

### Sitelinks
- "Get Free AI Audit" → aoaisolutions.dev/ai-audit
- "View Our Results" → aoaisolutions.dev/#results
- "See Pricing" → aoaisolutions.dev/#pricing
- "How It Works" → aoaisolutions.dev/#how-it-works

### Callouts
- AI-Powered Business Systems
- Results in 48 Hours
- No Long-Term Contracts
- DC-Based Team
- Free 30-Min AI Audit
- 312% More Consultations — DC Law Firm

### Structured Snippets
- **Services:** AI Websites, Chatbots, Lead Automation, CRM Integration, 24/7 Lead Capture

### Call Extension
- Phone: [YOUR_BUSINESS_PHONE] — Call Mon–Fri 9am–6pm

---

## CONVERSION ACTIONS

| Action | Category | Value | Counting |
|--------|----------|-------|---------|
| Audit Form Submit | Lead | $75 | One per click |
| CTA Button Click | Engagement | $25 | One per click |
| Phone Call (60s+) | Lead | $75 | One per click |
| Calendly Booking | Lead | $100 | One per click |

---

## CAMPAIGN DETAILS

See `campaigns.csv` for full import-ready format.

---

## LAUNCH CHECKLIST

- [ ] Conversion tracking verified in Google Analytics
- [ ] Billing set up and credit applied
- [ ] All 5 campaigns created with correct budgets
- [ ] Negative keyword list applied to all campaigns
- [ ] Ad extensions created at account level
- [ ] Landing page `/ai-audit` live and tested
- [ ] Form webhook connected and tested
- [ ] GA4 linked to Google Ads
- [ ] Search Console verified
- [ ] Initial bids set: Maximize Conversions (switch to Target CPA after 30 conversions)

---

## OPTIMIZATION SCHEDULE

**Week 1:** Monitor search terms daily. Add negatives aggressively.
**Week 2:** Pause keywords with 100+ clicks and 0 conversions.
**Week 3:** A/B test top-performing headline against 2 new variations.
**Month 1:** Switch from Maximize Conversions to Target CPA: $75.
**Month 2:** Add bid adjustments by device, time, and location based on data.
**Month 3:** Scale budget 20% on campaigns with CPA < $75.

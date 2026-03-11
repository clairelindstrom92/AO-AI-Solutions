#!/usr/bin/env python3
"""
AO AI Solutions — Case Study Social Proof Snippet Generator
Generates LinkedIn posts, Twitter threads, email stories, ad headlines,
and testimonial cards from a completed case study interview.

Usage:
    python3 snippet-generator.py
    python3 snippet-generator.py --json case-data.json
    python3 snippet-generator.py --output ./snippets/

Output files (in output directory):
    linkedin-post.txt
    twitter-thread.txt
    email-signature-story.txt
    google-ads-headlines.txt
    testimonial-card.html
    all-snippets-YYYYMMDD.txt   (combined file)
"""

import argparse
import json
import os
import sys
import textwrap
from datetime import datetime


# ─────────────────────────────────────────────
#  CONFIG
# ─────────────────────────────────────────────
BRAND = {
    "company": "AO AI Solutions",
    "website": "aoaisolutions.dev",
    "audit_url": "https://aoaisolutions.dev/ai-audit",
    "hashtags": ["#AIAutomation", "#DCBusiness", "#LeadGeneration", "#AIForBusiness"],
    "navy": "#0D1B2A",
    "cyan": "#00B4D8",
}


# ─────────────────────────────────────────────
#  DATA COLLECTION
# ─────────────────────────────────────────────
FIELDS = [
    ("client_name",       "Client's full name"),
    ("client_title",      "Client's title (e.g. Managing Partner)"),
    ("company_name",      "Company name"),
    ("industry",          "Industry (e.g. Law Firm, Med Spa, GovCon)"),
    ("city_state",        "City, State (e.g. Washington, DC)"),
    ("stat_1_number",     "Key result #1 number (e.g. 312%)"),
    ("stat_1_label",      "Key result #1 label (e.g. more consultations booked)"),
    ("stat_1_timeframe",  "Key result #1 timeframe (e.g. within 60 days)"),
    ("stat_2_number",     "Key result #2 number (e.g. 18 hrs)"),
    ("stat_2_label",      "Key result #2 label (e.g. saved per week on manual intake)"),
    ("stat_3_number",     "Key result #3 number (e.g. $12,400)"),
    ("stat_3_label",      "Key result #3 label (e.g. in additional monthly revenue)"),
    ("main_problem",      "Main problem before (1 sentence, specific)"),
    ("solution_summary",  "What AO AI built (1–2 sentences)"),
    ("quote",             "Verbatim client quote from interview"),
    ("headline_result",   "Headline result for posts (e.g. 312% more consultations in 60 days)"),
]


def collect_interactive():
    """Prompt user for all fields interactively."""
    print("\n" + "=" * 60)
    print("  AO AI Solutions — Case Study Snippet Generator")
    print("=" * 60)
    print("Enter case study details. Press Enter to skip optional fields.\n")

    data = {}
    for key, label in FIELDS:
        val = input(f"  {label}: ").strip()
        data[key] = val
    return data


def load_json(path):
    """Load case study data from a JSON file."""
    with open(path, "r") as f:
        data = json.load(f)
    # Validate required fields
    missing = [k for k, _ in FIELDS if k not in data or not data[k]]
    if missing:
        print(f"⚠️  Missing fields in JSON: {', '.join(missing)}")
        print("   You can add them interactively below:\n")
        for key in missing:
            label = next(l for k, l in FIELDS if k == key)
            data[key] = input(f"  {label}: ").strip()
    return data


# ─────────────────────────────────────────────
#  GENERATORS
# ─────────────────────────────────────────────

def gen_linkedin_post(d):
    """LinkedIn post — target ~1,200–1,300 characters, narrative hook format."""
    hashtags = " ".join(BRAND["hashtags"])

    post = f"""{d['company_name']} was losing leads every single night.

Every inquiry that came in after 5pm went unanswered until morning — sometimes longer.

For a {d['industry'].lower()} firm competing in {d['city_state']}, that 16-hour gap was quietly killing their growth.

{d['main_problem']}

We built them an AI system that changed everything:

→ Responds to every inquiry in under 60 seconds — 24/7
→ Qualifies leads automatically and books consultations directly into their calendar
→ Follows up with every unclosed lead for 7 days without any manual effort

The results after {d['stat_1_timeframe']}:

📈 {d['stat_1_number']} {d['stat_1_label']}
⏱ {d['stat_2_number']} {d['stat_2_label']}
💰 {d['stat_3_number']} {d['stat_3_label']}

{d['client_name']}, {d['client_title']} at {d['company_name']}, put it simply:

"{d['quote'][:150]}{"..." if len(d['quote']) > 150 else ""}"

This isn't automation for automation's sake.

It's revenue that was always there — just being left on the table.

If you're a {d['industry'].lower()} in the DC metro area and you're still responding to leads manually, we should talk.

🔗 Book a free AI audit → {BRAND['audit_url']}

{hashtags}"""

    return post.strip()


def gen_twitter_thread(d):
    """Twitter/X thread — 5 tweets, each under 280 characters."""
    tweets = [
        (f"1/5  A {d['industry'].lower()} in {d['city_state']} was losing leads every night after 5pm.\n\n"
         f"We fixed it.\n\n"
         f"Here's what happened when they turned on AI lead capture: 🧵"),

        (f"2/5  The problem:\n\n"
         f"{d['main_problem'][:200]}\n\n"
         f"Every missed inquiry = missed revenue."),

        (f"3/5  We deployed an AI system for {d['company_name']}:\n\n"
         f"→ 24/7 lead response (under 60 seconds)\n"
         f"→ Auto-qualification + calendar booking\n"
         f"→ 7-day follow-up sequences\n"
         f"→ Full CRM integration"),

        (f"4/5  Results {d['stat_1_timeframe']}:\n\n"
         f"📈 {d['stat_1_number']} {d['stat_1_label']}\n"
         f"⏱ {d['stat_2_number']} {d['stat_2_label']}\n"
         f"💰 {d['stat_3_number']} {d['stat_3_label']}"),

        (f"5/5  {d['client_name']}, {d['client_title']}:\n\n"
         f'"{d["quote"][:160]}{"..." if len(d["quote"]) > 160 else ""}"\n\n'
         f"Free AI audit for DC-area businesses → {BRAND['audit_url']}"),
    ]

    # Warn if any tweet exceeds 280 chars
    output_lines = []
    for i, tweet in enumerate(tweets, 1):
        char_count = len(tweet)
        flag = f"  ⚠️  {char_count} chars — TRIM NEEDED" if char_count > 280 else f"  ✓ {char_count}/280"
        output_lines.append(f"{'─'*50}")
        output_lines.append(f"Tweet {i}{flag}")
        output_lines.append(f"{'─'*50}")
        output_lines.append(tweet)
        output_lines.append("")

    return "\n".join(output_lines)


def gen_email_signature_story(d):
    """Email signature story — 2 punchy sentences for use after email sign-off."""
    story = (
        f"P.S. — We helped {d['company_name']}, a {d['industry'].lower()} in {d['city_state']}, "
        f"achieve {d['headline_result']} using AI lead automation. "
        f"If you'd like a free 30-minute audit to see what's possible for your business, "
        f"grab a slot here: {BRAND['audit_url']}"
    )
    return story


def gen_google_ads_headlines(d):
    """Google Ads RSA headlines — 30 chars max each, generate 10 variations."""
    # Truncate numbers cleanly
    s1 = d['stat_1_number']
    s2 = d['stat_2_number']
    s3 = d['stat_3_number']

    candidates = [
        f"{s1} More {d['industry']} Leads",
        f"AI Leads for DC {d['industry']}s",
        f"{s1} Results in 60 Days",
        f"Stop Missing After-Hours Leads",
        f"AI Lead Capture — 24/7",
        f"{s2} Saved Per Week",
        f"Free AI Audit — DC Businesses",
        f"Never Miss a Lead Again",
        f"{d['industry']} AI Automation DC",
        f"Book More Consults With AI",
        f"AI System Built in 48 Hours",
        f"{s3} More Revenue Monthly",
        f"DC AI Lead Generation",
        f"Automate Your Lead Follow-Up",
        f"Free 30-Min AI Strategy Call",
    ]

    output_lines = ["Google Ads RSA Headlines (max 30 chars each)", "=" * 45]
    for i, headline in enumerate(candidates, 1):
        char_count = len(headline)
        flag = " ⚠️ OVER LIMIT — trim" if char_count > 30 else f" ✓ ({char_count}/30)"
        output_lines.append(f"H{i:02d}: {headline}{flag}")

    output_lines.append("")
    output_lines.append("Descriptions (max 90 chars each)")
    output_lines.append("=" * 45)

    descriptions = [
        f"We helped a {d['city_state']} {d['industry'].lower()} get {d['headline_result']}. Free audit → {BRAND['website']}",
        f"AI lead capture, follow-up & CRM for DC businesses. Book your free audit today.",
        f"24/7 AI responds to every lead in 60 seconds. {d['stat_1_number']} more clients for one DC firm.",
    ]
    for i, desc in enumerate(descriptions, 1):
        char_count = len(desc)
        flag = " ⚠️ OVER LIMIT — trim" if char_count > 90 else f" ✓ ({char_count}/90)"
        output_lines.append(f"D{i:02d}: {desc}{flag}")

    return "\n".join(output_lines)


def gen_testimonial_card(d):
    """Website testimonial card — HTML snippet using AO AI brand colors."""
    initials = "".join(w[0].upper() for w in d['client_name'].split()[:2])
    quote_escaped = d['quote'].replace('"', '&ldquo;').replace('"', '&rdquo;').replace("'", "&#39;")

    html = f"""<!-- AO AI Solutions — Testimonial Card for {d['company_name']} -->
<!-- Drop this anywhere in your site HTML -->
<div style="
  background: #0D1B2A;
  border-radius: 12px;
  padding: 32px 36px;
  max-width: 680px;
  font-family: 'Inter', sans-serif;
  position: relative;
">
  <!-- Quote mark decoration -->
  <div style="
    font-size: 5rem;
    color: rgba(0,180,216,0.2);
    font-family: Georgia, serif;
    line-height: 0.5;
    margin-bottom: 16px;
    user-select: none;
  ">&ldquo;</div>

  <!-- Stats bar -->
  <div style="
    display: flex;
    gap: 32px;
    margin-bottom: 24px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(0,180,216,0.2);
  ">
    <div style="text-align:center;">
      <div style="font-size:1.8rem;font-weight:900;color:#00B4D8;">{d['stat_1_number']}</div>
      <div style="font-size:0.72rem;color:#9CA3AF;margin-top:4px;">{d['stat_1_label']}</div>
    </div>
    <div style="text-align:center;">
      <div style="font-size:1.8rem;font-weight:900;color:#00B4D8;">{d['stat_2_number']}</div>
      <div style="font-size:0.72rem;color:#9CA3AF;margin-top:4px;">{d['stat_2_label']}</div>
    </div>
    <div style="text-align:center;">
      <div style="font-size:1.8rem;font-weight:900;color:#00B4D8;">{d['stat_3_number']}</div>
      <div style="font-size:0.72rem;color:#9CA3AF;margin-top:4px;">{d['stat_3_label']}</div>
    </div>
  </div>

  <!-- Quote -->
  <blockquote style="
    font-size: 1.05rem;
    color: #F9FAFB;
    line-height: 1.75;
    font-style: italic;
    margin: 0 0 24px 0;
    border-left: 3px solid #00B4D8;
    padding-left: 16px;
  ">{quote_escaped}</blockquote>

  <!-- Attribution -->
  <div style="display:flex;align-items:center;gap:14px;">
    <div style="
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: rgba(0,180,216,0.25);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      color: #00B4D8;
      font-size: 0.9rem;
      flex-shrink: 0;
    ">{initials}</div>
    <div>
      <div style="font-weight:700;color:#F9FAFB;font-size:0.9rem;">{d['client_name']}</div>
      <div style="font-size:0.78rem;color:#9CA3AF;">{d['client_title']}, {d['company_name']} · {d['city_state']}</div>
    </div>
    <div style="margin-left:auto;">
      <div style="
        background: rgba(0,180,216,0.12);
        border: 1px solid rgba(0,180,216,0.3);
        border-radius: 100px;
        padding: 4px 12px;
        font-size: 0.7rem;
        color: #00B4D8;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      ">{d['industry']}</div>
    </div>
  </div>
</div>
<!-- End testimonial card -->"""

    return html


def gen_combined(d, snippets):
    """Generate a combined all-snippets file."""
    date_str = datetime.now().strftime("%B %d, %Y")
    lines = [
        "=" * 70,
        f"  AO AI Solutions — Case Study Snippets",
        f"  Client: {d['company_name']} ({d['industry']})",
        f"  Generated: {date_str}",
        "=" * 70,
        "",
    ]
    for title, content in snippets:
        lines += [
            f"\n{'─' * 70}",
            f"  {title.upper()}",
            f"{'─' * 70}\n",
            content,
            "",
        ]
    return "\n".join(lines)


# ─────────────────────────────────────────────
#  SAVE OUTPUTS
# ─────────────────────────────────────────────

def save_snippets(d, output_dir):
    os.makedirs(output_dir, exist_ok=True)
    date_str = datetime.now().strftime("%Y%m%d")

    linkedin  = gen_linkedin_post(d)
    twitter   = gen_twitter_thread(d)
    email_sig = gen_email_signature_story(d)
    ads       = gen_google_ads_headlines(d)
    card_html = gen_testimonial_card(d)

    snippets = [
        ("LinkedIn Post (~1,300 chars)", linkedin),
        ("Twitter/X Thread (5 tweets)", twitter),
        ("Email Signature Story (2 sentences)", email_sig),
        ("Google Ads Headlines & Descriptions", ads),
        ("Testimonial Card HTML", card_html),
    ]

    files = {
        "linkedin-post.txt":           linkedin,
        "twitter-thread.txt":          twitter,
        "email-signature-story.txt":   email_sig,
        "google-ads-headlines.txt":    ads,
        "testimonial-card.html":       card_html,
        f"all-snippets-{date_str}.txt": gen_combined(d, snippets),
    }

    print(f"\n{'─' * 60}")
    print(f"  Saving snippets to: {output_dir}")
    print(f"{'─' * 60}")

    for filename, content in files.items():
        path = os.path.join(output_dir, filename)
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        char_count = len(content)
        print(f"  ✓  {filename}  ({char_count:,} chars)")

    print(f"\n✅  Done! {len(files)} files written to {output_dir}\n")

    # Print LinkedIn post char count as a quick sanity check
    li_len = len(linkedin)
    li_flag = "✅ Good" if li_len <= 3000 else "⚠️ May be too long for LinkedIn"
    print(f"  LinkedIn post length: {li_len} chars — {li_flag}")
    print(f"  Testimonial card: paste the HTML into your website's testimonials section.")
    print(f"  Google Ads: copy headlines/descriptions into your RSA ad groups.\n")


# ─────────────────────────────────────────────
#  MAIN
# ─────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="AO AI Solutions — Case Study Snippet Generator"
    )
    parser.add_argument(
        "--json", metavar="FILE",
        help="Path to a JSON file with case study data (see sample-case-data.json)"
    )
    parser.add_argument(
        "--output", metavar="DIR", default="./snippets",
        help="Output directory for generated files (default: ./snippets)"
    )
    parser.add_argument(
        "--preview", action="store_true",
        help="Print all snippets to stdout instead of saving files"
    )
    args = parser.parse_args()

    # Load data
    if args.json:
        print(f"\nLoading case data from: {args.json}")
        data = load_json(args.json)
    else:
        data = collect_interactive()

    # Generate + output
    if args.preview:
        snippets = [
            ("LinkedIn Post", gen_linkedin_post(data)),
            ("Twitter Thread", gen_twitter_thread(data)),
            ("Email Signature Story", gen_email_signature_story(data)),
            ("Google Ads Headlines", gen_google_ads_headlines(data)),
            ("Testimonial Card HTML", gen_testimonial_card(data)),
        ]
        print(gen_combined(data, snippets))
    else:
        save_snippets(data, args.output)


if __name__ == "__main__":
    main()

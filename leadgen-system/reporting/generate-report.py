#!/usr/bin/env python3
"""
AO AI Solutions — Weekly Lead Gen Performance Report Generator
Generates a PDF report and optionally emails it.

Usage:
    python3 generate-report.py            # Interactive mode
    python3 generate-report.py --csv data.csv  # From CSV file

Requirements:
    pip install reportlab --break-system-packages
    pip install fpdf2 --break-system-packages  (alternative)

Setup:
    1. Edit config.json with your email settings and targets
    2. For Gmail: Use an App Password (myaccount.google.com > Security > 2-Step > App passwords)
"""

import json
import os
import sys
import smtplib
import csv
from datetime import datetime, timedelta
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.application import MIMEApplication
from pathlib import Path

# ── TRY TO IMPORT REPORTLAB ──────────────────────────────────────────────────
try:
    from reportlab.lib.pagesizes import letter
    from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
    from reportlab.lib.units import inch
    from reportlab.lib import colors
    from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, HRFlowable
    from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_RIGHT
    REPORTLAB_AVAILABLE = True
except ImportError:
    REPORTLAB_AVAILABLE = False
    print("Note: reportlab not installed. Install with: pip install reportlab --break-system-packages")
    print("      Running in text-only mode.")

# ── LOAD CONFIG ──────────────────────────────────────────────────────────────
CONFIG_PATH = Path(__file__).parent / "config.json"
with open(CONFIG_PATH) as f:
    CONFIG = json.load(f)

TARGETS = CONFIG["targets"]

# ── COLORS ───────────────────────────────────────────────────────────────────
NAVY = colors.HexColor("#0D1B2A")
CYAN = colors.HexColor("#00B4D8")
GREEN = colors.HexColor("#22C55E")
YELLOW = colors.HexColor("#F59E0B")
RED = colors.HexColor("#EF4444")
LIGHT_GRAY = colors.HexColor("#F9FAFB")
MID_GRAY = colors.HexColor("#94A3B8")

# ── DATA INPUT ───────────────────────────────────────────────────────────────
def get_metrics_interactive():
    """Prompt user for weekly metrics."""
    print("\n" + "="*60)
    print("AO AI Solutions — Weekly Report Generator")
    print("="*60)
    print("\nEnter this week's metrics (press Enter for 0):\n")

    def inp(label, default=0):
        val = input(f"  {label}: ").strip()
        try:
            return float(val) if val else default
        except ValueError:
            return default

    week_num = input("  Week number (e.g. 1): ").strip() or "1"
    start_date = input("  Week start date (YYYY-MM-DD): ").strip() or datetime.now().strftime("%Y-%m-%d")

    return {
        "week_number": week_num,
        "start_date": start_date,
        "emails_sent": inp("Emails sent"),
        "emails_opened": inp("Emails opened"),
        "emails_replied": inp("Emails replied"),
        "li_connects_sent": inp("LinkedIn connects sent"),
        "li_connects_accepted": inp("LinkedIn connects accepted"),
        "li_dms_sent": inp("LinkedIn DMs sent"),
        "li_dms_replied": inp("LinkedIn DMs replied"),
        "google_ads_spend": inp("Google Ads spend ($)"),
        "google_ads_clicks": inp("Google Ads clicks"),
        "google_ads_impressions": inp("Google Ads impressions"),
        "google_ads_conversions": inp("Google Ads conversions"),
        "calendly_bookings": inp("Calendly bookings"),
        "discovery_calls": inp("Discovery calls completed"),
        "proposals_sent": inp("Proposals sent"),
        "deals_closed": inp("Deals closed"),
        "revenue": inp("Revenue this week ($)"),
        "prev_emails_sent": inp("\n[Previous week] Emails sent (for trend)"),
        "prev_open_rate": inp("[Previous week] Open rate (decimal, e.g. 0.32)"),
        "prev_reply_rate": inp("[Previous week] Reply rate (decimal)"),
        "prev_calendly_bookings": inp("[Previous week] Calendly bookings"),
    }

def get_metrics_from_csv(csv_path):
    """Load metrics from CSV file."""
    with open(csv_path, newline='') as f:
        reader = csv.DictReader(f)
        rows = list(reader)
        if not rows:
            raise ValueError("CSV is empty")
        return {k: float(v) if v.replace('.','').isdigit() else v for k,v in rows[-1].items()}

# ── CALCULATIONS ─────────────────────────────────────────────────────────────
def compute_rates(m):
    """Compute derived rates and comparisons."""
    r = {}
    # Email
    r["open_rate"] = m["emails_opened"] / m["emails_sent"] if m["emails_sent"] > 0 else 0
    r["reply_rate"] = m["emails_replied"] / m["emails_sent"] if m["emails_sent"] > 0 else 0
    r["open_rate_vs_target"] = r["open_rate"] - TARGETS["email_open_rate"]
    r["reply_rate_vs_target"] = r["reply_rate"] - TARGETS["email_reply_rate"]
    # LinkedIn
    r["li_accept_rate"] = m["li_connects_accepted"] / m["li_connects_sent"] if m["li_connects_sent"] > 0 else 0
    r["li_response_rate"] = m["li_dms_replied"] / m["li_dms_sent"] if m["li_dms_sent"] > 0 else 0
    # Google Ads
    r["ads_ctr"] = m["google_ads_clicks"] / m["google_ads_impressions"] if m["google_ads_impressions"] > 0 else 0
    r["ads_cpc"] = m["google_ads_spend"] / m["google_ads_clicks"] if m["google_ads_clicks"] > 0 else 0
    r["ads_cpa"] = m["google_ads_spend"] / m["google_ads_conversions"] if m["google_ads_conversions"] > 0 else 0
    # Pipeline
    total_leads = m["calendly_bookings"] + m["google_ads_conversions"]
    total_spend = m["google_ads_spend"]
    r["cost_per_lead"] = total_spend / total_leads if total_leads > 0 else 0
    r["proposal_to_close"] = m["deals_closed"] / m["proposals_sent"] if m["proposals_sent"] > 0 else 0
    # Trends (week-over-week)
    r["open_rate_trend"] = r["open_rate"] - float(m.get("prev_open_rate", 0))
    r["reply_rate_trend"] = r["reply_rate"] - float(m.get("prev_reply_rate", 0))
    r["booking_trend"] = m["calendly_bookings"] - float(m.get("prev_calendly_bookings", 0))
    return r

def trend_arrow(value):
    if value > 0.005: return "↑"
    if value < -0.005: return "↓"
    return "→"

def pct(val):
    return f"{val*100:.1f}%"

def dollar(val):
    return f"${val:,.2f}"

def generate_recommendations(m, r):
    """Generate actionable recommendations based on metrics."""
    recs = []
    if r["open_rate"] < TARGETS["email_open_rate"]:
        recs.append(("Email Open Rate Low", f"Open rate is {pct(r['open_rate'])} vs target {pct(TARGETS['email_open_rate'])}. A/B test subject lines — try question-based vs. statement-based. Review send times (aim for Tue–Thu, 8–10am)."))
    if r["reply_rate"] < TARGETS["email_reply_rate"]:
        recs.append(("Email Reply Rate Low", f"Reply rate is {pct(r['reply_rate'])} vs target {pct(TARGETS['email_reply_rate'])}. Shorten email body — aim for under 100 words. Personalize the first line more aggressively."))
    if r["li_accept_rate"] < TARGETS["li_connection_rate"]:
        recs.append(("LinkedIn Accept Rate Low", f"Accept rate {pct(r['li_accept_rate'])} vs target {pct(TARGETS['li_connection_rate'])}. Refine connection request notes — add more specific personalization. Review target list quality."))
    if r["ads_cpa"] > TARGETS["target_cpa_dollars"] and m["google_ads_spend"] > 0:
        recs.append(("Google Ads CPA High", f"Cost per acquisition {dollar(r['ads_cpa'])} vs target {dollar(TARGETS['target_cpa_dollars'])}. Pause lowest-performing keywords. Review search terms for irrelevant traffic. Test new ad copy."))
    if m["calendly_bookings"] < TARGETS["audits_per_week"]:
        recs.append(("Audits Below Target", f"Booked {int(m['calendly_bookings'])} audits vs target {TARGETS['audits_per_week']}/week. Add Calendly link to email signature and LinkedIn profile. Feature the free audit offer in LinkedIn posts."))
    if not recs:
        recs.append(("Great Week!", "All key metrics are on track or above target. Consider scaling: increase email volume by 20%, add $10/day to best-performing ad campaign."))
    return recs

# ── PDF GENERATION ────────────────────────────────────────────────────────────
def generate_pdf(m, r, output_path):
    if not REPORTLAB_AVAILABLE:
        generate_text_report(m, r, output_path.replace('.pdf', '.txt'))
        return output_path.replace('.pdf', '.txt')

    doc = SimpleDocTemplate(output_path, pagesize=letter, topMargin=0.5*inch, bottomMargin=0.5*inch, leftMargin=0.75*inch, rightMargin=0.75*inch)
    styles = getSampleStyleSheet()

    # Custom styles
    title_style = ParagraphStyle('title', fontName='Helvetica-Bold', fontSize=18, textColor=NAVY, spaceAfter=4)
    sub_style = ParagraphStyle('sub', fontName='Helvetica', fontSize=10, textColor=MID_GRAY, spaceAfter=16)
    section_style = ParagraphStyle('section', fontName='Helvetica-Bold', fontSize=11, textColor=CYAN, spaceBefore=16, spaceAfter=8)
    body_style = ParagraphStyle('body', fontName='Helvetica', fontSize=9, textColor=colors.HexColor("#374151"), spaceAfter=6, leading=14)
    rec_title_style = ParagraphStyle('rec_title', fontName='Helvetica-Bold', fontSize=9, textColor=NAVY, spaceAfter=2)

    story = []

    # HEADER
    story.append(Paragraph("AO AI Solutions", title_style))
    story.append(Paragraph(f"Weekly Lead Gen Report — Week {m['week_number']} | {m['start_date']}", sub_style))
    story.append(HRFlowable(width="100%", thickness=1, color=CYAN, spaceAfter=16))

    recs = generate_recommendations(m, r)

    # EXECUTIVE SUMMARY BOX
    wins = [r for r in recs if r[0] == "Great Week!"]
    issues = [r for r in recs if r[0] != "Great Week!"]
    summary_text = f"This week: {int(m['emails_sent'])} emails sent, {int(m['calendly_bookings'])} audits booked, {int(m['deals_closed'])} deals closed. "
    if issues:
        summary_text += f"{len(issues)} area(s) need attention (see recommendations below)."
    else:
        summary_text += "All metrics on track — consider scaling spend."
    story.append(Paragraph("Executive Summary", section_style))
    story.append(Paragraph(summary_text, body_style))

    # METRICS TABLE
    story.append(Paragraph("Key Metrics", section_style))

    def status(actual, target, higher_is_better=True):
        if higher_is_better:
            return "✓" if actual >= target else "✗"
        else:
            return "✓" if actual <= target else "✗"

    metrics_data = [
        ["Metric", "This Week", "Target", "Trend", "Status"],
        ["Emails Sent", str(int(m["emails_sent"])), str(int(TARGETS["email_send_rate"]/4)), "—", status(m["emails_sent"], TARGETS["email_send_rate"]/4)],
        ["Email Open Rate", pct(r["open_rate"]), pct(TARGETS["email_open_rate"]), trend_arrow(r["open_rate_trend"]), status(r["open_rate"], TARGETS["email_open_rate"])],
        ["Email Reply Rate", pct(r["reply_rate"]), pct(TARGETS["email_reply_rate"]), trend_arrow(r["reply_rate_trend"]), status(r["reply_rate"], TARGETS["email_reply_rate"])],
        ["LI Connection Accept Rate", pct(r["li_accept_rate"]), pct(TARGETS["li_connection_rate"]), "—", status(r["li_accept_rate"], TARGETS["li_connection_rate"])],
        ["LI DM Response Rate", pct(r["li_response_rate"]), pct(TARGETS["li_response_rate"]), "—", status(r["li_response_rate"], TARGETS["li_response_rate"])],
        ["Calendly Bookings", str(int(m["calendly_bookings"])), str(TARGETS["audits_per_week"]), trend_arrow(r["booking_trend"]), status(m["calendly_bookings"], TARGETS["audits_per_week"])],
        ["Discovery Calls", str(int(m["discovery_calls"])), str(TARGETS["discovery_calls_per_week"]), "—", status(m["discovery_calls"], TARGETS["discovery_calls_per_week"])],
        ["Proposals Sent", str(int(m["proposals_sent"])), str(TARGETS["proposals_per_week"]), "—", status(m["proposals_sent"], TARGETS["proposals_per_week"])],
        ["Deals Closed", str(int(m["deals_closed"])), "—", "—", ""],
        ["Revenue", dollar(m["revenue"]), "—", "—", ""],
        ["Google Ads Spend", dollar(m["google_ads_spend"]), "—", "—", ""],
        ["Google Ads CPA", dollar(r["ads_cpa"]) if m["google_ads_spend"]>0 else "—", dollar(TARGETS["target_cpa_dollars"]), "—", status(r["ads_cpa"] if m["google_ads_spend"]>0 else 0, TARGETS["target_cpa_dollars"], higher_is_better=False) if m["google_ads_spend"]>0 else ""],
    ]

    table = Table(metrics_data, colWidths=[2.5*inch, 1.2*inch, 1.2*inch, 0.7*inch, 0.8*inch])
    table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), NAVY),
        ('TEXTCOLOR', (0,0), (-1,0), colors.white),
        ('FONTNAME', (0,0), (-1,0), 'Helvetica-Bold'),
        ('FONTSIZE', (0,0), (-1,-1), 9),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, LIGHT_GRAY]),
        ('GRID', (0,0), (-1,-1), 0.25, colors.HexColor("#E5E7EB")),
        ('ALIGN', (1,0), (-1,-1), 'CENTER'),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(table)

    # RECOMMENDATIONS
    story.append(Paragraph("Recommendations for Next Week", section_style))
    for title, detail in recs:
        story.append(Paragraph(f"► {title}", rec_title_style))
        story.append(Paragraph(detail, body_style))

    # FOOTER
    story.append(Spacer(1, 0.3*inch))
    story.append(HRFlowable(width="100%", thickness=0.5, color=MID_GRAY))
    story.append(Paragraph(f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M')} | AO AI Solutions | aoaisolutions.dev | michael.smith@aoaisolutions.dev",
        ParagraphStyle('footer', fontName='Helvetica', fontSize=7, textColor=MID_GRAY, alignment=TA_CENTER)))

    doc.build(story)
    return output_path

def generate_text_report(m, r, output_path):
    """Fallback text report when reportlab not available."""
    recs = generate_recommendations(m, r)
    lines = [
        "=" * 60,
        f"AO AI Solutions — Weekly Lead Gen Report",
        f"Week {m['week_number']} | {m['start_date']}",
        "=" * 60,
        "",
        "KEY METRICS",
        "-" * 40,
        f"Emails Sent:        {int(m['emails_sent'])}",
        f"Email Open Rate:    {pct(r['open_rate'])} (target: {pct(TARGETS['email_open_rate'])}) {trend_arrow(r['open_rate_trend'])}",
        f"Email Reply Rate:   {pct(r['reply_rate'])} (target: {pct(TARGETS['email_reply_rate'])}) {trend_arrow(r['reply_rate_trend'])}",
        f"LI Accept Rate:     {pct(r['li_accept_rate'])}",
        f"LI Response Rate:   {pct(r['li_response_rate'])}",
        f"Calendly Bookings:  {int(m['calendly_bookings'])} (target: {TARGETS['audits_per_week']}) {trend_arrow(r['booking_trend'])}",
        f"Discovery Calls:    {int(m['discovery_calls'])}",
        f"Proposals Sent:     {int(m['proposals_sent'])}",
        f"Deals Closed:       {int(m['deals_closed'])}",
        f"Revenue:            {dollar(m['revenue'])}",
        f"Ad Spend:           {dollar(m['google_ads_spend'])}",
        f"Cost Per Lead:      {dollar(r['cost_per_lead']) if r['cost_per_lead'] else 'N/A'}",
        "",
        "RECOMMENDATIONS",
        "-" * 40,
    ]
    for title, detail in recs:
        lines.append(f"► {title}")
        lines.append(f"  {detail}")
        lines.append("")
    lines += ["=" * 60, f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M')}"]
    with open(output_path, 'w') as f:
        f.write('\n'.join(lines))
    return output_path

# ── EMAIL SENDING ─────────────────────────────────────────────────────────────
def send_report(report_path, m, r):
    smtp_cfg = CONFIG["smtp"]
    if smtp_cfg["username"] == "[YOUR_GMAIL_ADDRESS]":
        print("⚠️  Email not configured. Update config.json with your Gmail credentials.")
        print(f"   Report saved to: {report_path}")
        return
    recs = generate_recommendations(m, r)
    body_text = f"""AO AI Solutions — Weekly Lead Gen Report
Week {m['week_number']} | {m['start_date']}

KEY NUMBERS:
- Emails sent: {int(m['emails_sent'])} | Open rate: {pct(r['open_rate'])} | Reply rate: {pct(r['reply_rate'])}
- Audits booked: {int(m['calendly_bookings'])} | Discovery calls: {int(m['discovery_calls'])}
- Deals closed: {int(m['deals_closed'])} | Revenue: {dollar(m['revenue'])}

TOP RECOMMENDATION:
{recs[0][0]}: {recs[0][1]}

Full PDF report attached.
"""
    msg = MIMEMultipart()
    msg['From'] = smtp_cfg['username']
    msg['To'] = ', '.join(CONFIG['report_recipients'])
    msg['Subject'] = f"[AO AI] Lead Gen Report — Week {m['week_number']} ({m['start_date']})"
    msg.attach(MIMEText(body_text, 'plain'))
    with open(report_path, 'rb') as f:
        part = MIMEApplication(f.read(), Name=os.path.basename(report_path))
        part['Content-Disposition'] = f'attachment; filename="{os.path.basename(report_path)}"'
        msg.attach(part)
    try:
        with smtplib.SMTP(smtp_cfg['host'], smtp_cfg['port']) as server:
            server.starttls()
            server.login(smtp_cfg['username'], smtp_cfg['app_password'])
            server.send_message(msg)
        print(f"✅ Report emailed to: {', '.join(CONFIG['report_recipients'])}")
    except Exception as e:
        print(f"❌ Email failed: {e}")
        print(f"   Report saved locally: {report_path}")

# ── MAIN ──────────────────────────────────────────────────────────────────────
def main():
    if '--csv' in sys.argv:
        csv_path = sys.argv[sys.argv.index('--csv') + 1]
        m = get_metrics_from_csv(csv_path)
    else:
        m = get_metrics_interactive()

    r = compute_rates(m)

    # Ensure output directory exists
    os.makedirs(CONFIG["report_output_dir"], exist_ok=True)
    filename = f"week-{m['week_number']}-report-{datetime.now().strftime('%Y%m%d')}.pdf"
    output_path = os.path.join(CONFIG["report_output_dir"], filename)

    # Generate
    actual_path = generate_pdf(m, r, output_path)
    print(f"\n✅ Report generated: {actual_path}")

    # Ask to send
    send = input("\nSend report via email? (y/n): ").strip().lower()
    if send == 'y':
        send_report(actual_path, m, r)

if __name__ == "__main__":
    main()

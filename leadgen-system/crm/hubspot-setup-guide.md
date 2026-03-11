# HubSpot CRM Setup Guide — AO AI Solutions
Complete pipeline, property, and automation configuration.

---

## STEP 1 — CREATE THE DEAL PIPELINE

**Navigation:** CRM → Deals → Manage Pipelines → Create Pipeline

**Pipeline Name:** AO AI — DC Lead Gen

**Deal Stages (in order):**

| Stage Name | Win Probability | Goal |
|-----------|----------------|------|
| New Lead | 5% | Contact is in the system |
| Contacted | 10% | First email or LinkedIn DM sent |
| Opened Email (2x+) | 15% | Email opened 2+ times — warm signal |
| Replied | 30% | Any reply received (positive or neutral) |
| Discovery Call Booked | 50% | Calendly booking confirmed |
| Audit Delivered | 65% | Free AI audit report sent |
| Proposal Sent | 75% | Formal proposal delivered |
| Negotiating | 85% | Back-and-forth on scope/price |
| Closed Won | 100% | Contract signed, deposit received |
| Closed Lost | 0% | Lost — log reason |

---

## STEP 2 — CUSTOM CONTACT PROPERTIES

**Navigation:** Settings → Data Management → Properties → Create Property (Contact)

Create these custom properties:

| Property Name | Type | Options |
|--------------|------|---------|
| Vertical | Dropdown | Law Firm / Medical / Contractor / Real Estate / GovCon / Association / Other |
| Lead Source | Dropdown | Cold Email / LinkedIn / Google Ads / Meta Ads / Referral / Inbound / Event |
| AI Audit Delivered | Checkbox | Yes / No |
| Audit Delivery Date | Date picker | — |
| Case Study Permission | Checkbox | Yes / No |
| Monthly Revenue Est. | Number | — |
| Employees | Number | — |
| Pain Point | Multi-line text | — |
| LinkedIn Profile URL | URL | — |
| Sequence Enrolled | Dropdown | Law Firm Seq / Medical Seq / Contractor Seq / Association Seq / None |
| Last Contacted | Date picker | — |

---

## STEP 3 — EMAIL SEQUENCE SETUP

**Navigation:** Marketing → Email → Sequences → Create Sequence

Create 4 sequences (one per vertical):

**For each sequence:**
1. Click "Create Sequence" → Manual email-based
2. Set enrollment delay: 0 days (immediate)
3. Add 5 emails at these delays: Day 0, Day 3, Day 7, Day 10, Day 14
4. Copy emails from `outreach/email-sequences.md`
5. Set auto-unenroll trigger: "Contact replies to any email"

**Sequence Names:**
- AO — Law Firm Sequence (5 emails)
- AO — Medical Sequence (5 emails)
- AO — Contractor Sequence (5 emails)
- AO — Association Sequence (5 emails)

---

## STEP 4 — EMAIL ENROLLMENT TRIGGERS (Automations)

**Navigation:** Automation → Workflows → Create Workflow → Contact-based

### Workflow 1: Auto-Enroll in Sequence by Vertical
**Trigger:** Contact property "Vertical" is set
**Actions:**
- If Vertical = "Law Firm" → Enroll in "AO — Law Firm Sequence"
- If Vertical = "Medical" → Enroll in "AO — Medical Sequence"
- If Vertical = "Contractor" → Enroll in "AO — Contractor Sequence"
- If Vertical = "Association" → Enroll in "AO — Association Sequence"

### Workflow 2: Move to "Opened Email (2x+)" Stage
**Trigger:** Email open count ≥ 2
**Actions:**
- Update deal stage to "Opened Email (2x+)"
- Create task: "Contact opened email 2+ times — reach out via LinkedIn or call"
- Assign to: Michael Smith
- Due: 1 business day

### Workflow 3: Create Follow-Up Task on Reply
**Trigger:** Contact replies to any sequence email
**Actions:**
- Unenroll from all sequences
- Update deal stage to "Replied"
- Create task: "Reply received — respond within 2 hours"
- Assign to: Michael Smith
- Due: Same day

### Workflow 4: Discovery Call Auto-Follow
**Trigger:** Deal stage moves to "Discovery Call Booked"
**Actions:**
- Create task: "Prep for discovery call — review contact's website and LinkedIn"
- Due: 1 day before call date
- Send internal notification to Michael

### Workflow 5: Audit Reminder
**Trigger:** Deal stage = "Discovery Call Booked" for 48+ hours, "AI Audit Delivered" = No
**Actions:**
- Create task: "AI Audit overdue — complete and send within 24 hours"

---

## STEP 5 — DEAL CREATION AUTOMATION

**Navigation:** Automation → Workflows → Contact-based

### Auto-Create Deal When Contact Added
**Trigger:** Contact is created
**Actions:**
- Create associated deal
- Set deal name: "[Contact First Name] [Last Name] — [Company]"
- Set deal stage: "New Lead"
- Associate deal with contact

---

## STEP 6 — TASK VIEWS & DAILY WORKFLOW

**Navigation:** Tasks → Create View

Create a "Daily Outreach" task view with these filters:
- Due date: Today or overdue
- Assigned to: Me
- Status: Not complete

Pin this view as your home page for sales activity.

**Daily HubSpot Routine (30 min/day):**
1. Review "Opened Email 2x+" contacts → reach out via LinkedIn or phone
2. Reply to all inbound replies within 2 hours
3. Update deal stages after every touch
4. Log all calls/meetings to contact record

---

## STEP 7 — REPORTING DASHBOARDS

**Navigation:** Reports → Dashboards → Create Dashboard

**Dashboard: AO AI — Lead Gen Performance**

Reports to add:
- Deals by stage (funnel view) — weekly
- Email open rate by sequence — last 30 days
- New contacts created — daily
- Discovery calls booked — this month
- Revenue in pipeline (weighted) — current
- Deals won/lost by vertical — last 90 days

---

## HubSpot Tier Recommendation

**Free tier** works for getting started (up to 1M contacts, limited automation).

**Starter ($20/month)** unlocks:
- Email sequences
- Task automation
- Conversation inbox

**Professional ($500/month)** adds:
- Full workflow automation
- ABM tools
- Predictive lead scoring

Start with **Starter** — it covers everything in this guide.

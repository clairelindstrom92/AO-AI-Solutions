# Spam Filter Checklist — AO AI Solutions Cold Email

## DO NOT USE in subject lines or body
These trigger spam filters and lower deliverability:

### High-Risk Words (immediate spam flag)
- Free (when used alone without context — "free trial", "free offer")
- Guaranteed / guarantee
- Click here / Click below
- Act now / Urgent / Last chance
- Limited time offer
- No obligation (only use sparingly — once, in body, never subject)
- Congratulations
- Winner / You've won
- Increase sales / Boost revenue (generic)
- Make money
- Get rich
- Buy now / Order now
- 100% (especially "100% free" or "100% guaranteed")
- $$$ or multiple dollar signs
- CAPITALIZE ENTIRE WORDS IN SUBJECTS
- Multiple exclamation marks!!!
- Re: or Fwd: (fake reply threads)

### Medium-Risk Words (use sparingly)
- Free audit (safe in body, avoid in subject if combined with other triggers)
- Exclusive offer
- Special deal
- Promotion
- Discount
- Unsubscribe (must appear in footer — required by CAN-SPAM but don't feature it)
- Deal / Best deal

---

## TECHNICAL DELIVERABILITY CHECKLIST

### Domain Setup (do this before sending)
- [ ] SPF record configured for sending domain
- [ ] DKIM record configured
- [ ] DMARC policy set to at least `p=none`
- [ ] Custom tracking domain set up (don't use shared tracking links)
- [ ] Sending from `@aoaisolutions.dev` (not Gmail/Yahoo — big red flag)
- [ ] Warm up domain: start at 20 emails/day, increase 20% per day for 2 weeks

### Email Content
- [ ] Plain text version included alongside HTML
- [ ] No image-only emails (images blocked by default in most clients)
- [ ] Unsubscribe link in footer (legally required by CAN-SPAM)
- [ ] Physical mailing address in footer (legally required)
- [ ] Text-to-link ratio: at least 60% text, max 1–2 links per email
- [ ] No link shorteners (bit.ly, etc. — huge spam flag)
- [ ] All links go to aoaisolutions.dev domain (not third-party redirects)

### Sending Behavior
- [ ] Never send more than 100 emails/day from a new domain
- [ ] Space sends: 60–90 second gaps between individual sends
- [ ] Send during business hours: Tue–Thu, 8–10am or 1–3pm recipient's timezone
- [ ] Remove bounced emails immediately (hard bounces > 2% kills deliverability)
- [ ] Remove unsubscribes immediately (legally required within 10 business days)

### List Quality
- [ ] Verify emails before sending (use Hunter.io or NeverBounce — aim for <2% bounce rate)
- [ ] No purchased lists from unknown sources
- [ ] No .edu, .gov, or role-based addresses (info@, contact@, etc.)
- [ ] Never email someone who has previously unsubscribed

---

## SUBJECT LINE BEST PRACTICES

### What works:
- Question format: "How does [Company] handle X?"
- Name personalization: "[First Name] — quick question"
- Curiosity gap: "What a DC law firm did differently"
- Specificity: "312% more consultations — here's how"
- Short (under 50 characters): higher open rates on mobile
- Lowercase: feels more personal, less like marketing

### What doesn't work:
- All-caps any word
- Emoji in B2B subject lines (acceptable in follow-up sequences, risky in cold)
- Generic: "Following up" / "Checking in" / "Just circling back"
- Deceptive: "Re: Our earlier conversation" (never fake a thread)
- Overpromising: "Triple your revenue in 30 days"

---

## LEGAL COMPLIANCE (CAN-SPAM)
Every cold email must include:
1. Accurate "From" name and email
2. Honest subject line (no deceptive headers)
3. Physical mailing address: AO AI Solutions, Washington DC Metro Area
4. Clear unsubscribe mechanism
5. Honor opt-outs within 10 business days

GDPR note: If emailing EU contacts, you need a lawful basis for processing.
For US-based DC/NoVA/MD contacts, CAN-SPAM applies (opt-out vs. opt-in).

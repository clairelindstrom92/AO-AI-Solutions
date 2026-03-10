// ============================================================
// FILE: api/contact.js
// PURPOSE: Vercel serverless function — sends email notification on form submit
// Emails both Claire and Michael whenever a visitor submits the contact form.
// SETUP REQUIRED:
//   1. Sign up free at resend.com
//   2. In Resend, add & verify aoaisolutions.dev as a sending domain
//      (adds one TXT record to Vercel DNS — same process as before)
//   3. In Vercel → Project Settings → Environment Variables, add:
//      RESEND_API_KEY = re_xxxxxxxxxxxx
// ============================================================
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const SERVICE_LABELS = {
  'ai-website': 'AI Website',
  'lead-automation': 'Lead Automation',
  'custom-ai': 'Custom AI',
  'not-sure': 'Not sure yet',
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { fullName, company, email, phone, service, message } = req.body;

  try {
    await resend.emails.send({
      from: 'AO AI Solutions <noreply@aoaisolutions.dev>',
      to: [
        'claire.lindstrom@aoaisolutions.dev',
        'michael.smith@aoaisolutions.dev',
      ],
      replyTo: email,
      subject: `New Lead: ${fullName} — ${company}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a1a2e;">
          <div style="background:#0C1220;padding:24px 28px;border-radius:12px 12px 0 0;">
            <h1 style="color:#00C8F0;font-size:20px;margin:0;">
              New Lead — aoaisolutions.dev
            </h1>
          </div>
          <div style="background:#f9fafb;padding:28px;border-radius:0 0 12px 12px;border:1px solid #e5e7eb;">
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:10px 0;font-weight:600;width:130px;color:#374151;">Name</td>
                <td style="padding:10px 0;color:#111827;">${fullName}</td>
              </tr>
              <tr style="border-top:1px solid #e5e7eb;">
                <td style="padding:10px 0;font-weight:600;color:#374151;">Company</td>
                <td style="padding:10px 0;color:#111827;">${company}</td>
              </tr>
              <tr style="border-top:1px solid #e5e7eb;">
                <td style="padding:10px 0;font-weight:600;color:#374151;">Email</td>
                <td style="padding:10px 0;">
                  <a href="mailto:${email}" style="color:#00C8F0;">${email}</a>
                </td>
              </tr>
              ${phone ? `<tr style="border-top:1px solid #e5e7eb;">
                <td style="padding:10px 0;font-weight:600;color:#374151;">Phone</td>
                <td style="padding:10px 0;color:#111827;">${phone}</td>
              </tr>` : ''}
              <tr style="border-top:1px solid #e5e7eb;">
                <td style="padding:10px 0;font-weight:600;color:#374151;">Service</td>
                <td style="padding:10px 0;color:#111827;">${SERVICE_LABELS[service] || service}</td>
              </tr>
              ${message ? `<tr style="border-top:1px solid #e5e7eb;">
                <td style="padding:10px 0;font-weight:600;color:#374151;vertical-align:top;">Message</td>
                <td style="padding:10px 0;color:#111827;white-space:pre-wrap;">${message}</td>
              </tr>` : ''}
            </table>
            <div style="margin-top:24px;padding-top:16px;border-top:1px solid #e5e7eb;">
              <a href="mailto:${email}?subject=Re: Your inquiry — AO AI Solutions"
                 style="display:inline-block;background:#00C8F0;color:#0C1220;font-weight:700;
                        padding:11px 24px;border-radius:100px;text-decoration:none;font-size:14px;">
                Reply to ${fullName} →
              </a>
            </div>
            <p style="margin-top:20px;font-size:12px;color:#9ca3af;">
              Submitted via aoaisolutions.dev contact form
            </p>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('[Contact API] Resend error:', error);
    // Don't block the user — Supabase already captured the lead
    return res.status(500).json({ error: 'Email notification failed' });
  }
}

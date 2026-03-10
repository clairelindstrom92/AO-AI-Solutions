// ============================================================
// FILE: analytics.js
// PURPOSE: GA4 conversion event tracking utilities
// SECTION: Shared library — imported by Nav, Hero, Pricing, Contact
// DATA: Update EVENT_NAMES if GA4 event naming conventions change
// MANUAL EDITS: Safe to add new trackXxx() functions below
// SEO/ANALYTICS: All conversion events fire via window.gtag()
//   Activate by uncommenting the GA4 script block in index.html
//   Replace G-XXXXXXXXXX with your real Measurement ID
// CLAUDE AUTOMATION: Add new track functions for any new CTA added
// ============================================================

/**
 * Safe wrapper around window.gtag — no-ops if GA4 isn't loaded yet
 * (avoids console errors during local development)
 *
 * @param {string} eventName   - GA4 event name (snake_case)
 * @param {Object} [params={}] - Additional event parameters
 */
function trackEvent(eventName, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params)
  }
}

// ── CONVERSION EVENTS ─────────────────────────────────────────────────────────

/**
 * Fired when a visitor clicks "Get AI Website" (Hero or Nav)
 * GA4 event: get_website_click
 */
export function trackGetWebsiteClick(source = 'unknown') {
  trackEvent('get_website_click', {
    event_category: 'CTA',
    event_label: 'Get AI Website',
    source,
  })
}

/**
 * Fired when a visitor clicks "Book a Demo" (Hero or Nav)
 * GA4 event: book_demo_click
 */
export function trackBookDemoClick(source = 'unknown') {
  trackEvent('book_demo_click', {
    event_category: 'CTA',
    event_label: 'Book a Demo',
    source,
  })
}

/**
 * Fired when a visitor clicks a pricing plan CTA
 * GA4 event: pricing_cta_click
 * @param {string} tierName - e.g. 'Starter', 'Growth', 'Enterprise'
 */
export function trackPricingCtaClick(tierName) {
  trackEvent('pricing_cta_click', {
    event_category: 'Pricing',
    event_label: tierName,
    tier: tierName,
  })
}

/**
 * Fired on successful contact form submission
 * GA4 event: contact_form_submit
 * Treat this as your primary lead conversion event in GA4
 */
export function trackContactFormSubmit() {
  trackEvent('contact_form_submit', {
    event_category: 'Lead',
    event_label: 'Contact Form',
  })
}

/**
 * Generic page-section view tracker (scroll depth / intersection)
 * GA4 event: section_view
 * @param {string} sectionId - e.g. 'pricing', 'services', 'team'
 */
export function trackSectionView(sectionId) {
  trackEvent('section_view', {
    event_category: 'Engagement',
    event_label: sectionId,
    section: sectionId,
  })
}

/**
 * AO AI Solutions — Universal Tracking Snippet
 * Installs: GA4, Google Ads, Meta Pixel, LinkedIn Insight Tag, Hotjar
 * All pixels load asynchronously (non-blocking)
 * GDPR-compliant: checks consent flag before firing
 *
 * ─── HOW TO INSTALL ───────────────────────────────────────────────
 * 1. Replace all [YOUR_*] placeholders with your actual IDs (see README.md)
 * 2. Add this entire script to your site's <head> tag
 *    In React/Vite: add to index.html <head>, or use a Helmet component
 * 3. Set CONSENT_GIVEN = true when user accepts cookies
 *    (wire this to your cookie banner)
 * ──────────────────────────────────────────────────────────────────
 */

;(function () {
  // ─── CONFIGURATION — Replace these with your real IDs ───────────
  var CONFIG = {
    GA4_MEASUREMENT_ID:        '[YOUR_GA4_MEASUREMENT_ID]',         // e.g. G-XXXXXXXXXX
    GOOGLE_ADS_CONVERSION_ID:  '[YOUR_GOOGLE_ADS_CONVERSION_ID]',   // e.g. AW-XXXXXXXXX
    GOOGLE_ADS_BOOK_DEMO_LABEL:'[YOUR_BOOK_DEMO_CONVERSION_LABEL]', // e.g. AbCdEfGhIjK
    META_PIXEL_ID:             '[YOUR_META_PIXEL_ID]',              // e.g. 1234567890123
    LINKEDIN_PARTNER_ID:       '[YOUR_LINKEDIN_PARTNER_ID]',        // e.g. 1234567
    HOTJAR_SITE_ID:            '[YOUR_HOTJAR_SITE_ID]',             // e.g. 3456789
    HOTJAR_VERSION:            6,
    WEBHOOK_FORM_URL:          '[YOUR_FORM_WEBHOOK_URL]',           // e.g. Zapier/n8n endpoint
  };
  // ──────────────────────────────────────────────────────────────────

  // ─── GDPR CONSENT FLAG ────────────────────────────────────────────
  // Set window.AO_CONSENT = true when user accepts cookies
  // All tracking will fire only if this is true
  var CONSENT_GIVEN = window.AO_CONSENT === true;
  // ──────────────────────────────────────────────────────────────────

  // ─── GTM DATA LAYER ──────────────────────────────────────────────
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  gtag('js', new Date());
  // ──────────────────────────────────────────────────────────────────

  if (!CONSENT_GIVEN) {
    console.info('[AO Tracking] Consent not given — pixels not loaded.');
    // Wire your cookie banner to set window.AO_CONSENT = true and re-run this script
    return;
  }

  // ─── 1. GOOGLE ANALYTICS 4 (GA4) ─────────────────────────────────
  // Tracks: pageviews, scroll depth, CTA clicks, form submissions
  // Get ID at: analytics.google.com → Admin → Data Streams
  ;(function loadGA4() {
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + CONFIG.GA4_MEASUREMENT_ID;
    document.head.appendChild(script);

    gtag('config', CONFIG.GA4_MEASUREMENT_ID, {
      send_page_view: true,
      cookie_flags: 'SameSite=None;Secure',
    });
  })();
  // ──────────────────────────────────────────────────────────────────

  // ─── 2. GOOGLE ADS CONVERSION TRACKING ───────────────────────────
  // Tracks: "book_demo" button clicks + form submits as conversions
  // Get ID at: ads.google.com → Tools → Conversions
  ;(function loadGoogleAds() {
    gtag('config', CONFIG.GOOGLE_ADS_CONVERSION_ID);

    // Fires on form submit
    window.AO_trackFormSubmit = function() {
      gtag('event', 'conversion', {
        send_to: CONFIG.GOOGLE_ADS_CONVERSION_ID + '/' + CONFIG.GOOGLE_ADS_BOOK_DEMO_LABEL,
      });
      window.dataLayer.push({ event: 'form_submit', vertical: 'audit_request' });
    };

    // Fires on "Book Demo" / "Claim My Free AI Audit" CTA clicks
    window.AO_trackCTAClick = function(label) {
      gtag('event', 'book_demo', { event_category: 'CTA', event_label: label || 'hero_cta' });
      gtag('event', 'conversion', {
        send_to: CONFIG.GOOGLE_ADS_CONVERSION_ID + '/' + CONFIG.GOOGLE_ADS_BOOK_DEMO_LABEL,
      });
      window.dataLayer.push({ event: 'cta_click', cta_label: label });
    };
  })();
  // ──────────────────────────────────────────────────────────────────

  // ─── 3. META PIXEL (Facebook / Instagram) ────────────────────────
  // Tracks: PageView, Lead (form submit), ViewContent
  // Get ID at: business.facebook.com → Events Manager → Pixels
  ;(function loadMetaPixel() {
    !function(f,b,e,v,n,t,s){
      if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)
    }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');

    fbq('init', CONFIG.META_PIXEL_ID);
    fbq('track', 'PageView');

    // Call this on form submit: AO_trackMetaLead()
    window.AO_trackMetaLead = function(email) {
      fbq('track', 'Lead', { email: email || '' });
    };
  })();
  // ──────────────────────────────────────────────────────────────────

  // ─── 4. LINKEDIN INSIGHT TAG ──────────────────────────────────────
  // Tracks: pageviews, conversions for LinkedIn Ads audiences
  // Get ID at: linkedin.com/campaignmanager → Account Assets → Insight Tag
  ;(function loadLinkedIn() {
    window._linkedin_partner_id = CONFIG.LINKEDIN_PARTNER_ID;
    window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
    window._linkedin_data_partner_ids.push(CONFIG.LINKEDIN_PARTNER_ID);

    var s = document.getElementsByTagName('script')[0];
    var b = document.createElement('script');
    b.type = 'text/javascript';
    b.async = true;
    b.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
    s.parentNode.insertBefore(b, s);

    // Conversion tracking on form submit
    window.AO_trackLinkedInConversion = function() {
      if (window.lintrk) {
        window.lintrk('track', { conversion_id: '[YOUR_LINKEDIN_CONVERSION_ID]' });
      }
    };
  })();
  // ──────────────────────────────────────────────────────────────────

  // ─── 5. HOTJAR SESSION RECORDING (Free Tier) ─────────────────────
  // Records user sessions to see where visitors drop off
  // Get ID at: hotjar.com → Settings → Tracking Code
  ;(function loadHotjar() {
    (function(h,o,t,j,a,r){
      h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
      h._hjSettings={hjid:CONFIG.HOTJAR_SITE_ID,hjsv:CONFIG.HOTJAR_VERSION};
      a=o.getElementsByTagName('head')[0];
      r=o.createElement('script');r.async=1;
      r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
      a.appendChild(r);
    })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
  })();
  // ──────────────────────────────────────────────────────────────────

  // ─── AUTO-ATTACH CTA LISTENERS ───────────────────────────────────
  // Automatically attaches conversion tracking to all CTA buttons
  document.addEventListener('DOMContentLoaded', function () {
    // Book demo / audit CTA buttons
    var ctaButtons = document.querySelectorAll(
      '[data-cta="book-demo"], .cta-button, #book-demo-btn, #claim-audit-btn'
    );
    ctaButtons.forEach(function(btn) {
      btn.addEventListener('click', function() {
        window.AO_trackCTAClick(btn.dataset.label || btn.innerText);
      });
    });

    // Form submit tracking
    var forms = document.querySelectorAll('form[data-track="audit-form"], #audit-form');
    forms.forEach(function(form) {
      form.addEventListener('submit', function() {
        var emailInput = form.querySelector('input[type="email"]');
        window.AO_trackFormSubmit();
        window.AO_trackMetaLead(emailInput ? emailInput.value : '');
        window.AO_trackLinkedInConversion();
        window.dataLayer.push({ event: 'audit_form_submitted' });
      });
    });
  });
  // ──────────────────────────────────────────────────────────────────

  console.info('[AO Tracking] All pixels loaded successfully.');
})();

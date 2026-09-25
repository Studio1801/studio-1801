---
name: Studio 1801 SEO checklist
description: User-provided on-page SEO requirements and SPA-specific verification guidance for Studio 1801.
---

For every indexable Studio 1801 route:

- Use a unique, descriptive `<title>` and meta description that accurately describe that page.
- Keep one meaningful `<h1>` and a logical heading hierarchy.
- Give meaningful images descriptive alt text; decorative images may use empty alt text. A text wordmark is already accessible as text and does not need an alt attribute.
- Provide Open Graph title, description, and an actual hosted image so shared links preview correctly.
- Add canonical URLs only when there is a real duplicate-URL risk, and use the verified canonical production origin.

**Why:** The user wants core SEO details correct in Replit before promoting or sharing the site, and prefers no edits when an audit confirms they are already correct.

**How to apply:** Studio 1801 is a client-rendered Vite SPA. Verify route metadata in the initial HTML, not only after React renders; use prerendering or SSR when crawlers and social preview bots need route-specific metadata before JavaScript runs. Do not invent a canonical origin when the production domain is unknown.
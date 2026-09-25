---
name: SPA route SEO routing
description: Client-side fallback and pre-rendered metadata route handling for Studio 1801.
---

Keep the SPA catch-all rewrite last. When clean routes need crawler-visible metadata before JavaScript runs, generate a route-specific static HTML shell and put exact rewrites ahead of the catch-all in both Vercel and the artifact production config.

**Why:** A clean URL without a trailing slash can fall through to the root SPA shell even when a route's `index.html` exists in a nested directory. Route-specific rewrites make the canonical, title, description, and robots directive available in the initial response.

**How to apply:** Preserve the root fallback for unknown client-side paths, but add exact mappings for indexable and noindex routes that need separate head tags. Verify the deployed clean URLs, not only the Vite preview's trailing-slash behavior.
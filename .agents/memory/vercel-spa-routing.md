---
name: SPA route SEO routing
description: Client-side fallback and pre-rendered metadata route handling for Studio 1801.
---

Keep the SPA catch-all rewrite last. When clean routes need crawler-visible metadata before JavaScript runs, generate a route-specific static HTML shell and put exact rewrites ahead of the catch-all in both Vercel and the artifact production config. If production switches from static serving to a Vite preview process, the artifact-level rewrites no longer apply; reproduce the exact route mappings in preview middleware before static serving and SPA fallback.

**Why:** A clean URL without a trailing slash can fall through to the root SPA shell even when a route's `index.html` exists in a nested directory. Vite preview also returns the root shell for those URLs unless its middleware maps the clean path to the generated route file.

**How to apply:** Preserve the root fallback for unknown client-side paths, add exact mappings for indexable and noindex routes that need separate head tags, and verify clean URLs without trailing slashes against the actual serving mode.
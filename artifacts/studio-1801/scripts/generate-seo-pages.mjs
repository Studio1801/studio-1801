import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const artifactDir = dirname(dirname(fileURLToPath(import.meta.url)));
const outputDir = resolve(artifactDir, 'dist/public');
const origin = 'https://1801.studio';
const socialImage = `${origin}/og-studio1801.jpg`;

const indexablePages = [
  {
    path: '/other-works',
    title: 'Restaurant Website Projects | Studio 1801',
    description:
      'Browse selected restaurant, bakery, café, and food studio website projects by Studio 1801, including identities and digital experiences.',
  },
  {
    path: '/work/after-hours',
    title: 'After Hours Pasta Website Design | Studio 1801',
    description:
      'Explore After Hours, a late-night pasta and restaurant identity by Studio 1801, with an immersive shopping and dining experience.',
  },
  {
    path: '/work/common-table',
    title: 'Common Table Hospitality Design | Studio 1801',
    description:
      'Explore Common Table, a hospitality art direction project by Studio 1801 centered on sharing, warmth, and the rituals of gathering.',
  },
  {
    path: '/work/field-notes',
    title: 'Field Notes Food Studio Website | Studio 1801',
    description:
      'Discover Field Notes, a food studio web experience by Studio 1801, designed to give every dish, story, and detail room to breathe.',
  },
  {
    path: '/work/the-flour-room',
    title: 'The Flour Room Bakery Website | Studio 1801',
    description:
      'Explore The Flour Room, a bakery identity and digital experience by Studio 1801, shaped by craft, warmth, and the first bake of the day.',
  },
  {
    path: '/work/market-table',
    title: 'Market Table Restaurant Website | Studio 1801',
    description:
      'See Market Table, a restaurant identity and digital experience by Studio 1801, built around abundance, color, and connection.',
  },
  {
    path: '/work/first-light',
    title: 'First Light Cafe Website Design | Studio 1801',
    description:
      'Explore First Light, a café identity and digital experience by Studio 1801 for slow starts, warm coffee, and everyday rituals.',
  },
];

const previewPages = [
  ['after-hours', 'After Hours'],
  ['common-table', 'Common Table'],
  ['field-notes', 'Field Notes'],
  ['the-flour-room', 'The Flour Room'],
  ['market-table', 'Market Table'],
  ['first-light', 'First Light'],
].map(([slug, name]) => ({
  path: `/preview/${slug}`,
  title: `Live Preview: ${name} | Studio 1801`,
  description: `View the live website preview for ${name}, a portfolio project by Studio 1801.`,
  robots: 'noindex',
  indexable: false,
}));

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function siteUrl(path) {
  return new URL(path, origin).href;
}

function setRequired(html, pattern, replacement, label) {
  if (!pattern.test(html)) {
    throw new Error(`Expected ${label} in the built index.html`);
  }
  return html.replace(pattern, replacement);
}

function pageHtml(template, page) {
  if (page.description.length > 160) {
    throw new Error(`Meta description exceeds 160 characters for ${page.path}`);
  }

  let html = template;
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);
  const canonical = page.indexable === false ? '' : `<link rel="canonical" href="${siteUrl(page.path)}" />`;
  const replacements = [
    [/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`, 'title'],
    [
      /<meta\s+name="description"[^>]*\/?>/,
      `<meta name="description" content="${description}" />`,
      'description meta',
    ],
    [
      /<meta\s+name="robots"[^>]*\/?>/,
      `<meta name="robots" content="${page.robots || 'index, follow'}" />`,
      'robots meta',
    ],
    [
      /<link\s+rel="canonical"[^>]*\/?>/,
      canonical,
      'canonical link',
    ],
    [
      /<meta\s+property="og:title"[^>]*\/?>/,
      `<meta property="og:title" content="${title}" />`,
      'Open Graph title',
    ],
    [
      /<meta\s+property="og:description"[^>]*\/?>/,
      `<meta property="og:description" content="${description}" />`,
      'Open Graph description',
    ],
    [
      /<meta\s+property="og:url"[^>]*\/?>/,
      `<meta property="og:url" content="${siteUrl(page.path)}" />`,
      'Open Graph URL',
    ],
    [
      /<meta\s+property="og:image"[^>]*\/?>/,
      `<meta property="og:image" content="${socialImage}" />`,
      'Open Graph image',
    ],
    [
      /<meta\s+name="twitter:title"[^>]*\/?>/,
      `<meta name="twitter:title" content="${title}" />`,
      'Twitter title',
    ],
    [
      /<meta\s+name="twitter:description"[^>]*\/?>/,
      `<meta name="twitter:description" content="${description}" />`,
      'Twitter description',
    ],
    [
      /<meta\s+name="twitter:image"[^>]*\/?>/,
      `<meta name="twitter:image" content="${socialImage}" />`,
      'Twitter image',
    ],
  ];

  for (const [pattern, replacement, label] of replacements) {
    html = setRequired(html, pattern, replacement, label);
  }

  return html;
}

const template = await readFile(resolve(outputDir, 'index.html'), 'utf8');
for (const page of [...indexablePages, ...previewPages]) {
  const target = resolve(outputDir, `.${page.path}`, 'index.html');
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, pageHtml(template, page));
}

console.log(
  `Generated static SEO pages for ${indexablePages.length} indexable routes and ${previewPages.length} noindex previews.`,
);
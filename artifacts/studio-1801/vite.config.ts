import path from 'path';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, type Connect, type Plugin } from 'vite';

import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';

const canonicalOrigin = 'https://1801.studio';
const replitAppHost = 'studio-1801-website.replit.app';
const prerenderedRoutes = new Set([
  '/other-works',
  '/work/after-hours',
  '/work/common-table',
  '/work/field-notes',
  '/work/the-flour-room',
  '/work/market-table',
  '/work/first-light',
  '/preview/after-hours',
  '/preview/common-table',
  '/preview/field-notes',
  '/preview/the-flour-room',
  '/preview/market-table',
  '/preview/first-light',
]);

function createCanonicalHostMiddleware(rewritePrerenderedRoutes = false): Connect.HandleFunction {
  return (req, res, next) => {
    const host = req.headers.host?.toLowerCase().replace(/:\d+$/, '');

    if (host === replitAppHost) {
      let requestTarget = req.url ?? '/';
      if (!requestTarget.startsWith('/')) {
        try {
          const absoluteUrl = new URL(requestTarget, canonicalOrigin);
          requestTarget = `${absoluteUrl.pathname}${absoluteUrl.search}`;
        } catch {
          requestTarget = '/';
        }
      }

      res.statusCode = 301;
      res.setHeader('Location', `${canonicalOrigin}${requestTarget}`);
      res.end();
      return;
    }

    if (rewritePrerenderedRoutes && (req.method === 'GET' || req.method === 'HEAD')) {
      const requestTarget = req.url ?? '/';
      const queryIndex = requestTarget.indexOf('?');
      const pathname = queryIndex === -1 ? requestTarget : requestTarget.slice(0, queryIndex);
      const routePath = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;

      if (prerenderedRoutes.has(routePath)) {
        const query = queryIndex === -1 ? '' : requestTarget.slice(queryIndex);
        req.url = `${routePath}/index.html${query}`;
      }
    }

    next();
  };
}

function canonicalHostRedirect(): Plugin {
  return {
    name: 'studio-1801-canonical-host-redirect',
    configureServer(server) {
      server.middlewares.use(createCanonicalHostMiddleware());
    },
    configurePreviewServer(server) {
      server.middlewares.use(createCanonicalHostMiddleware(true));
    },
  };
}

const rawPort = process.env.PORT;

if (!rawPort) {
  throw new Error(
    'PORT environment variable is required but was not provided.',
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH;

if (!basePath) {
  throw new Error(
    'BASE_PATH environment variable is required but was not provided.',
  );
}

export default defineConfig({
  base: basePath,
  plugins: [
    canonicalHostRedirect(),
    react(),
    tailwindcss(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== 'production' &&
    process.env.REPL_ID !== undefined
      ? [
          await import('@replit/vite-plugin-cartographer').then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, '..'),
            }),
          ),
          await import('@replit/vite-plugin-dev-banner').then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      '@assets': path.resolve(
        import.meta.dirname,
        '..',
        '..',
        'attached_assets',
      ),
    },
    dedupe: ['react', 'react-dom'],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, 'dist/public'),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: '0.0.0.0',
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: '0.0.0.0',
    allowedHosts: true,
  },
});

import { useEffect, useState } from 'react';
import type { RouteComponentProps } from 'wouter';

const previewSites: Record<string, { title: string; url: string }> = {
  'after-hours': {
    title: 'After Hours',
    url: 'https://ichizu-ramen-api-server.vercel.app',
  },
  'common-table': {
    title: 'Common Table',
    url: 'https://the-clovery-api-server-inky.vercel.app',
  },
  'field-notes': {
    title: 'Field Notes',
    url: 'https://mashiko-seattle-api-server.vercel.app',
  },
  'the-flour-room': {
    title: 'The Flour Room',
    url: 'https://lunar-bakery-lunar-bakery.vercel.app',
  },
  'market-table': {
    title: 'Market Table',
    url: 'https://suea-augusta.vercel.app',
  },
  'first-light': {
    title: 'First Light',
    url: 'https://url-bakery-website-api-server-ruddy.vercel.app',
  },
};

export default function PreviewPage({ params }: RouteComponentProps<{ slug: string }>) {
  const [isMobile, setIsMobile] = useState(false);
  const site = previewSites[params.slug];

  useEffect(() => {
    const robotsMeta = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (!robotsMeta) return;

    const previousContent = robotsMeta.content;
    robotsMeta.content = 'noindex';

    return () => {
      if (robotsMeta.content === 'noindex') {
        robotsMeta.content = previousContent.includes('noindex') ? 'index, follow' : previousContent;
      }
    };
  }, [params.slug]);

  if (!site) {
    return (
      <main className="preview-page">
        <header className="preview-header">
          <a className="preview-brand" href={`${import.meta.env.BASE_URL}`}>Studio 1801</a>
          <a className="preview-back" href={`${import.meta.env.BASE_URL}`}>← Back home</a>
        </header>
        <section className="preview-empty">
          <p>Preview not found.</p>
          <a href={`${import.meta.env.BASE_URL}`}>Return home <span aria-hidden="true">↗</span></a>
        </section>
      </main>
    );
  }

  return (
    <main className="preview-page" data-testid={`page-preview-${params.slug}`}>
      <header className="preview-header">
        <a className="preview-brand" href={`${import.meta.env.BASE_URL}`}>Studio 1801</a>
        <div className="preview-title">
          <div className="preview-title-line">
            <span>Live preview</span>
            <strong>{site.title}</strong>
          </div>
          <div className="preview-device-toggle" role="group" aria-label="Preview size">
            <button
              type="button"
              className={!isMobile ? 'is-active' : ''}
              aria-pressed={!isMobile}
              onClick={() => setIsMobile(false)}
            >
              Desktop
            </button>
            <button
              type="button"
              className={isMobile ? 'is-active' : ''}
              aria-pressed={isMobile}
              onClick={() => setIsMobile(true)}
            >
              Mobile
            </button>
          </div>
        </div>
        <a className="preview-back" href={`${import.meta.env.BASE_URL}`}>← Back home</a>
      </header>
      <section className="preview-browser" aria-label={`${site.title} live preview`}>
        <div className="preview-browser-bar" aria-hidden="true">
          <span className="preview-dots"><i /><i /><i /></span>
          <span className="preview-address">{site.url.replace('https://', '')}</span>
          <span className="preview-open">↗</span>
        </div>
        <div className={`preview-viewport${isMobile ? ' preview-viewport-mobile' : ''}`}>
          <iframe
            src={site.url}
            title={`${site.title} website preview`}
            loading="eager"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
      </section>
      <footer className="preview-footer">
        <span>Studio 1801 · Selected work</span>
        <a href={site.url} target="_blank" rel="noreferrer">
          Open original site <span aria-hidden="true">↗</span>
        </a>
      </footer>
    </main>
  );
}
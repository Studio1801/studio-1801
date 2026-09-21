import { type CSSProperties, type MouseEvent, useEffect, useState } from 'react';
import { Instagram, Mail, MessageCircle, MessageSquare } from 'lucide-react';
import projectOne from '@assets/Unknown_1787504780455.png';
import projectTwo from '@assets/Unknown1_1787438547314.png';
import projectThree from '@assets/Unknown2_1787438547314.png';
import projectFour from '@assets/image_1787495321878.png';
import projectFive from '@assets/image_1787495413455.png';
import projectSix from '@assets/image_1787495063895.png';
import afterHoursSelectedWork from '@assets/image_1787590125025.png';
import serviceDesign from '@assets/image_1787440461289.png';
import serviceDevelopment from '@assets/image_1787441232956.png';
import serviceIntegration from '@assets/image_1787440676159.png';
import serviceSeo from '@assets/image_1787440851872.png';
import processOne from '@assets/image_1787442021416.png';
import processTwo from '@assets/image_1787442058572.png';
import processThree from '@assets/image_1787442170090.png';
import processFour from '@assets/image_1787442266936.png';
import processFive from '@assets/image_1787442378754.png';
import processSix from '@assets/image_1787442428529.png';
import strategyRoom from '@assets/image_1787508416188.png';
import strategyStreet from '@assets/image_1787508483431.png';
import commonTableSelectedWork from '@assets/image_1787589715542.png';
import fieldNotesSelectedWork from '@assets/image_1787589680522.png';

const freeOfferFormUrl = 'https://docs.google.com/forms/d/1LIemhhTpNWY5vYamUZItCsHsG6jIuRgtHJfoDMbWYz8/viewform?pli=1&pli=1&edit_requested=true';
const contactDraftUrl = `mailto:hello@1801.studio?subject=${encodeURIComponent('FREE website design and mockup')}&body=${encodeURIComponent(`Hi Studio 1801,

I’d like to claim my FREE website for my restaurant.

Restaurant name:
Current website:
What I’d like help with:

Thank you,
`)}`;

const serviceOptions = [
  {
    label: 'Website Design',
    number: '01',
    description: 'Distinctive digital identities that make a restaurant feel familiar before a guest ever walks through the door.',
    image: serviceDesign,
    alt: 'Abstract blue, coral, and cream texture',
  },
  {
    label: 'Website Development',
    number: '02',
    description: 'Clean, considered code that keeps your site quick, responsive, and easy to use on every screen.',
    image: serviceDevelopment,
    alt: 'Abstract red, orange, and blue vertical texture',
  },
  {
    label: 'Website Integration',
    number: '03',
    description: 'The right reservations, ordering, and menu tools connected into one effortless guest journey.',
    image: serviceIntegration,
    alt: 'Soft abstract landscape in muted neutral tones',
  },
  {
    label: 'SEO Development',
    number: '04',
    description: 'A clearer structure and smarter content that helps the right guests find you, then choose you.',
    image: serviceSeo,
    alt: 'Abstract rippled image with soft blue, green, and coral tones',
  },
];

export default function Home() {
  const [activeService, setActiveService] = useState(0);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [mockupOffset, setMockupOffset] = useState({ x: 0, y: 0 });

  const handleMockupMove = (event: MouseEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    const normalizedX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const normalizedY = (event.clientY - bounds.top) / bounds.height - 0.5;

    setMockupOffset({
      x: Number((normalizedX * 6).toFixed(2)),
      y: Number((normalizedY * 5).toFixed(2)),
    });
  };

  useEffect(() => {
    if (!isContactOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsContactOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isContactOpen]);

  return (
    <main className="reference-page" data-testid="page-home">
      <div className="reference-frame" data-testid="frame-hero">
        <nav className="reference-nav" aria-label="Main navigation" data-testid="nav-main">
          <a className="reference-studio" href="#top" data-testid="link-studio-home">Studio 1801</a>
          <div className="reference-nav-links">
            <a href="#work" data-testid="link-nav-work">Work</a>
            <a href="#services" data-testid="link-nav-services">Services</a>
            <a href="#process" data-testid="link-nav-process">Process</a>
          </div>
          <a className="reference-project-link" href="mailto:hello@1801.studio" data-testid="link-nav-contact">
            Start a Project <span aria-hidden="true">→</span>
          </a>
        </nav>

        <div className="reference-meta" aria-hidden="true" data-testid="hero-meta">
          <span>Studio 1801</span>
          <span>Independent web studio</span>
          <span>01</span>
          <span>Web design</span>
        </div>

        <div className="hero-content">
          <section id="services" className="reference-left" data-testid="section-hero-left">
            <h1 data-testid="text-hero-title">
              Your Website Could Be Costing You Customers.
            </h1>
            <p className="reference-description" data-testid="text-hero-desc">
              3 Ways You Can Increase Orders for Your F&amp;B Website. For FREE.
            </p>
            <p className="hero-trust-line">
              <span className="hero-rating-stars" aria-hidden="true">★★★★★</span>
              <span className="sr-only">Rated 4.9 out of 5 stars.</span>
              <span>4.9/5 satisfaction guarantee.</span>
            </p>
            <ul className="hero-checks" aria-label="What is included" data-testid="list-hero-checks">
              <li>Three high-impact issues</li>
              <li>Step-by-step solutions</li>
              <li>Delivered within 48 hours</li>
              <li className="hero-check-emphasis">Free. No obligation.</li>
            </ul>
            <div className="hero-actions">
              <a className="hero-cta" href={freeOfferFormUrl} target="_blank" rel="noreferrer" data-testid="button-claim-offer">
                Claim My Free Offer <span aria-hidden="true">→</span>
              </a>
              <a className="hero-secondary-cta" href="#work" data-testid="button-see-work">
                See our work <span aria-hidden="true">↗</span>
              </a>
            </div>
          </section>

          <section className="reference-right" data-testid="section-hero-right">
            <div className="reference-work-copy">
              <h2 data-testid="text-hero-secondary-title">
                Make a better first impression.
              </h2>
              <p data-testid="text-hero-secondary-desc">
                A clear, considered website that gives your best work the attention it deserves.
              </p>
              <a href="#work" data-testid="link-hero-explore">Explore the work <span aria-hidden="true">→</span></a>
            </div>
            <div
              className="hero-mockup-stage"
              data-testid="hero-mockup-stage"
              onMouseMove={handleMockupMove}
              onMouseLeave={() => setMockupOffset({ x: 0, y: 0 })}
              style={{
                '--mockup-parallax-x': `${mockupOffset.x}px`,
                '--mockup-parallax-y': `${mockupOffset.y}px`,
              } as CSSProperties}
            >
              <div className="hero-mockup hero-browser-mockup" data-testid="mockup-browser">
                <div className="mockup-browser-bar">
                  <span className="mockup-browser-dots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="mockup-browser-url">studio1801.com</span>
                </div>
                <div className="mockup-browser-body">
                  <div className="mockup-browser-nav">
                    <strong>studio 1801</strong>
                    <span>Menu&nbsp; · &nbsp;Contact</span>
                  </div>
                  <div className="mockup-image-block mockup-browser-image" aria-hidden="true">
                    <span>Make room for what matters.</span>
                  </div>
                  <div className="mockup-display-heading">A better digital front door.</div>
                  <div className="mockup-text-bars" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </div>
                  <span className="mockup-button">Explore the work&nbsp; →</span>
                </div>
              </div>

              <div className="hero-mockup hero-phone-mockup" data-testid="mockup-phone">
                <div className="mockup-phone-speaker" aria-hidden="true" />
                <div className="mockup-phone-screen">
                  <div className="mockup-phone-nav">
                    <strong>1801</strong>
                    <span>•••</span>
                  </div>
                  <div className="mockup-phone-image-stack" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="mockup-phone-heading">Find your next favorite place.</div>
                  <div className="mockup-text-bars mockup-phone-bars" aria-hidden="true">
                    <i />
                    <i />
                  </div>
                  <span className="mockup-button mockup-phone-button">Book a table</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        <footer className="reference-footer" data-testid="footer-hero">
          <div className="reference-locations">
            <span data-testid="text-footer-location-1">Based in Philadelphia, PA</span>
            <span data-testid="text-footer-location-2">Working everywhere</span>
          </div>
          <strong data-testid="text-footer-brand">Studio 1801</strong>
          <span className="reference-scroll" aria-hidden="true">scroll ↓</span>
        </footer>
      </div>

      <section id="about" className="reference-about" data-testid="section-about">
        <span className="about-label" data-testid="text-about-label">( Studio 1801 ® )</span>
        <p className="about-statement" data-testid="text-about-statement">
          Studio 1801 ®, a design studio
          <br className="about-desktop-break" />{' '}
          working at the intersection of brand,
          <br className="about-desktop-break" />{' '}
          product, and technology. Designing
          <br className="about-desktop-break" />{' '}
          brands and digital products that move
          <br className="about-desktop-break" />{' '}
          businesses forward.
        </p>
        <a className="about-cta" href="mailto:hello@1801.studio" data-testid="link-about-chat">
          <span aria-hidden="true">•</span>
          Let&apos;s chat
        </a>
      </section>

      <section id="work" className="reference-work" data-testid="section-work">
        <div className="work-meta" aria-hidden="true" data-testid="work-meta">
          <span>Selected works</span>
          <span>Food and beverage</span>
          <span>03</span>
        </div>
        <div className="work-intro">
          <h2 data-testid="text-work-title">Selected works</h2>
          <p className="work-summary" data-testid="text-work-desc">
            Digital identities and spaces for places worth remembering.
          </p>
        </div>

        <div className="work-grid" data-testid="grid-work-projects">
          <a className="work-card" href={`${import.meta.env.BASE_URL}preview/after-hours`} data-testid="card-project-1">
              <div className="work-card-image">
              <img src={afterHoursSelectedWork} alt="Ramen served in a dark restaurant setting" data-testid="img-project-1" />
            </div>
            <div className="work-card-meta">
              <h3 data-testid="text-project-1-title">After Hours</h3>
              <p data-testid="text-project-1-desc">Restaurant identity <span>·</span> Digital</p>
            </div>
          </a>
          <a className="work-card" href={`${import.meta.env.BASE_URL}preview/common-table`} data-testid="card-project-2">
            <div className="work-card-image">
              <img src={commonTableSelectedWork} alt="Common Table hospitality art direction" data-testid="img-project-2" />
            </div>
            <div className="work-card-meta">
              <h3 data-testid="text-project-2-title">Common Table</h3>
              <p data-testid="text-project-2-desc">Hospitality <span>·</span> Art direction</p>
            </div>
          </a>
          <a className="work-card" href={`${import.meta.env.BASE_URL}preview/field-notes`} data-testid="card-project-3">
            <div className="work-card-image">
              <img src={fieldNotesSelectedWork} alt="Sushi and wine served at a dark restaurant table" data-testid="img-project-3" />
            </div>
            <div className="work-card-meta">
              <h3 data-testid="text-project-3-title">Field Notes</h3>
              <p data-testid="text-project-3-desc">Food studio <span>·</span> Web experience</p>
            </div>
          </a>
          <a className="work-card" href={`${import.meta.env.BASE_URL}preview/the-flour-room`} data-testid="card-project-4">
            <div className="work-card-image">
              <img src={projectFour} alt="Bakers arranging rows of fresh croissants on a tray" data-testid="img-project-4" />
            </div>
            <div className="work-card-meta">
              <h3 data-testid="text-project-4-title">The Flour Room</h3>
              <p data-testid="text-project-4-desc">Bakery identity <span>·</span> Digital</p>
            </div>
          </a>
          <a className="work-card" href={`${import.meta.env.BASE_URL}preview/market-table`} data-testid="card-project-5">
            <div className="work-card-image">
              <img src={projectFive} alt="A Thai restaurant table filled with colorful shared dishes" data-testid="img-project-5" />
            </div>
            <div className="work-card-meta">
              <h3 data-testid="text-project-5-title">Market Table</h3>
              <p data-testid="text-project-5-desc">Restaurant identity <span>·</span> Digital</p>
            </div>
          </a>
          <a className="work-card" href={`${import.meta.env.BASE_URL}preview/first-light`} data-testid="card-project-6">
            <div className="work-card-image">
              <img src={projectSix} alt="Coffee and a pastry on a warm wooden cafe table" data-testid="img-project-6" />
            </div>
            <div className="work-card-meta">
              <h3 data-testid="text-project-6-title">First Light</h3>
              <p data-testid="text-project-6-desc">Café identity <span>·</span> Digital</p>
            </div>
          </a>
        </div>
        <a className="see-other-works" href={`${import.meta.env.BASE_URL}other-works`}>
          See Other Works <span aria-hidden="true">↗</span>
        </a>
      </section>

      <section id="strategy" className="reference-strategy" data-testid="section-strategy">
        <div className="strategy-grid">
          <div className="strategy-lead">
            <span className="strategy-arrow" aria-hidden="true">&#8600;</span>
            <h2 data-testid="text-strategy-title">The cost of an overlooked website.</h2>
            <p className="strategy-opportunity-line" data-testid="text-strategy-opportunity">
              <strong>&asymp; $32,700 a year</strong> back on the table — for a
              typical 80-seat room with a $42 average check.
            </p>
            <p className="strategy-urgency" data-testid="text-strategy-urgency">
              Every week this waits, another <strong>&asymp; $630</strong> walks
              past the door.
            </p>
          </div>

          <div className="strategy-details">
            <div className="strategy-facts">
              <div className="strategy-fact" data-testid="strategy-fact-diagnosis">
                <span className="strategy-label">Diagnosis</span>
                <p>Revenue leaks</p>
                <span className="strategy-label">Outcome</span>
                <p>
                  More direct bookings.<br />
                  Less revenue left behind.
                </p>
              </div>
              <div className="strategy-fact" data-testid="strategy-fact-leaks">
                <span className="strategy-label">The leaks</span>
                <p>
                  The vibe disconnect<br />
                  The booking friction<br />
                  The invisible menu<br />
                  The missing narrative
                </p>
              </div>
            </div>

            <div className="strategy-description" data-testid="strategy-description">
              <span className="strategy-label">Description</span>
              <p>
                Your dining room is full on Saturday, but how many covers did you
                lose on Tuesday because your digital front door was locked? An
                outdated website is not just a missed introduction. It is a quiet,
                continuous leak in revenue.
              </p>
              <p>
                Guests eat with their eyes first. A clearer digital front door
                turns more visits into action before a third-party marketplace
                takes the margin.
              </p>
            </div>
          </div>
        </div>

        <div className="strategy-visuals">
          <figure className="strategy-visual strategy-visual-wide" data-testid="img-strategy-room">
            <img src={strategyRoom} alt="A full dining room in motion on a busy evening" />
            <figcaption>Saturday, 8:10 pm. The room sells itself.</figcaption>
          </figure>
          <figure className="strategy-visual strategy-visual-tall" data-testid="img-strategy-street">
            <img src={strategyStreet} alt="A dropped takeaway cup on the pavement as someone walks past" />
            <figcaption>Tuesday, noon. The guests who walked past.</figcaption>
          </figure>
        </div>

      </section>

      <section id="what-we-do" className="reference-services" data-testid="section-services">
        <h2 className="sr-only">What we do</h2>
        <div className="services-layout">
          <div className="services-copy">
            <p className="services-overview" data-testid="text-services-overview">
              We design and build restaurant websites that help more guests choose
              you, then make it easier to book, order, and come back.
            </p>
          </div>

          <div className="services-image" data-testid="img-service-active-container">
            <img src={serviceOptions[activeService].image} alt={serviceOptions[activeService].alt} data-testid="img-service-active" />
          </div>

          <nav className="services-list" aria-label="What we do" data-testid="nav-services">
            {serviceOptions.map((service, index) => (
              <button
                className={`service-item ${activeService === index ? 'service-item-active' : ''}`}
                key={service.label}
                type="button"
                aria-pressed={activeService === index}
                onClick={() => setActiveService(index)}
                data-testid={`button-service-${index}`}
              >
                <span>{service.label}</span>
                <span aria-hidden="true">↗</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="services-proof" aria-label="Studio 1801 guarantees" data-testid="services-proof">
          <div className="proof-item" data-testid="proof-item-1">
            <strong>7 day</strong>
            <span>guarantee delivery</span>
          </div>
          <div className="proof-item" data-testid="proof-item-2">
            <strong>95%</strong>
            <span>satisfaction rate</span>
          </div>
          <div className="proof-item" data-testid="proof-item-3">
            <strong>Unlimited</strong>
            <span>revisions</span>
          </div>
        </div>
      </section>

      <section id="process" className="reference-process" data-testid="section-process">
        <div className="process-meta" aria-hidden="true" data-testid="process-meta">
          <span>How we work</span>
          <span>From first idea to launch</span>
          <span>Studio 1801</span>
          <span>06</span>
        </div>

        <div className="process-intro">
          <h2 data-testid="text-process-title">Design process</h2>
          <p data-testid="text-process-desc">
            Thoughtful work for restaurants that want to be chosen, remembered,
            and visited again.
          </p>
        </div>

        <div className="process-steps" data-testid="grid-process-steps">
          {[
            {
              duration: '2–3 days',
              title: 'Brief and discovery',
              copy: 'We learn what makes your place worth crossing the street for.',
              image: processOne,
              alt: 'Person standing beneath a wide sky on a checkered landscape',
            },
            {
              duration: '3–5 days',
              title: 'Research and direction',
              copy: 'We find the clearest story, audience, and visual point of view.',
              image: processTwo,
              alt: 'Creative research wall with connected references and notes',
            },
            {
              duration: '1 week',
              title: 'Structure and prototype',
              copy: 'We shape the experience around menus, moments, and momentum.',
              image: processThree,
              alt: 'Black and white architectural structure in a city street',
            },
            {
              duration: '1–2 weeks',
              title: 'Design and refinement',
              copy: 'We make every page feel as considered as the room itself.',
              image: processFour,
              alt: 'Classic car beside a red wall and reflecting pool',
            },
            {
              duration: '1–2 weeks',
              title: 'Build and integration',
              copy: 'We connect the tools that make booking and ordering effortless.',
              image: processFive,
              alt: 'Light installation with landscapes and colorful lines in a dark space',
            },
            {
              duration: 'Ongoing',
              title: 'Launch and growth',
              copy: 'We stay close after launch, using what we learn to keep improving.',
              image: processSix,
              alt: 'Person looking up beneath a curved sky and checkerboard floor',
            },
          ].map((step, index) => (
            <article className={`process-step process-step-${index + 1}`} key={step.title} data-testid={`article-process-${index + 1}`}>
              <span className="process-duration" data-testid={`text-process-${index + 1}-duration`}>{step.duration}</span>
              <div className="process-step-image">
                <img src={step.image} alt={step.alt} data-testid={`img-process-${index + 1}`} />
              </div>
              <div className="process-step-copy">
                <h3 data-testid={`text-process-${index + 1}-title`}>{step.title}</h3>
                <p data-testid={`text-process-${index + 1}-desc`}>{step.copy}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="process-philosophy" data-testid="process-philosophy">
          <h3 data-testid="text-philosophy-title">A good website should feel like the first warm welcome.</h3>
          <p data-testid="text-philosophy-desc">
            Clear enough to guide a guest, distinctive enough to stay with them,
            and useful enough to bring them back.
          </p>
        </div>
      </section>

      <section id="contact" className="reference-contact" data-testid="section-contact">
        <div className="contact-meta" aria-hidden="true" data-testid="contact-meta">
          <span>Studio 1801</span>
          <span>Philadelphia, PA / Worldwide</span>
          <span>07</span>
          <span>Contact</span>
        </div>

        <div className="contact-content">
          <div className="contact-editorial">
            <h2 data-testid="text-contact-title">
              The table is set.<br />
              Let's build something<br />
              worth remembering.
            </h2>
          </div>
          <div className="contact-info" data-testid="contact-info">
            <div className="contact-info-item">
              <span className="contact-label">Email</span>
              <a href="mailto:hello@1801.studio" className="contact-email" data-testid="link-contact-email">
                hello@1801.studio <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className="contact-info-item">
              <span className="contact-label">Studio</span>
              <p>
                Philadelphia, PA,<br />
                working everywhere.
              </p>
            </div>
            <div className="contact-info-item">
              <span className="contact-label">Availability</span>
              <p>
                Taking on two new<br />
                rooms this fall.
              </p>
            </div>
            <div className="contact-info-item">
              <span className="contact-label">Instagram</span>
              <a
                href="https://www.instagram.com/studio____1801/"
                className="contact-email"
                target="_blank"
                rel="noreferrer"
                data-testid="link-contact-instagram"
              >
                Studio____1801 <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>

        <div className="contact-footer" data-testid="footer-contact">
          <div className="contact-locations" data-testid="contact-locations">
            <span>Based in Philadelphia, PA</span>
            <span>Working everywhere</span>
          </div>
          <div className="contact-signoff" data-testid="text-contact-signoff">
            Studio 1801
          </div>
        </div>
      </section>

      {isContactOpen && (
        <div
          className="contact-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsContactOpen(false);
            }
          }}
        >
          <div className="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title">
            <div className="contact-modal-header">
              <h2 id="contact-modal-title">Choose how to reach us</h2>
              <button
                className="contact-modal-close"
                type="button"
                aria-label="Close contact options"
                onClick={() => setIsContactOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="contact-modal-options">
              <a
                className="contact-modal-option"
                href="https://www.instagram.com/studio____1801/"
                target="_blank"
                rel="noreferrer"
                data-testid="contact-option-instagram"
              >
                <span className="contact-modal-option-main">
                  <Instagram className="contact-modal-icon" aria-hidden="true" strokeWidth={1.6} />
                  <span>
                  <strong>Instagram</strong>
                  <small>@Studio____1801</small>
                  </span>
                </span>
                <span aria-hidden="true">↗</span>
              </a>
              <a className="contact-modal-option" href="sms:+15102299053" data-testid="contact-option-imessage">
                <span className="contact-modal-option-main">
                  <MessageSquare className="contact-modal-icon" aria-hidden="true" strokeWidth={1.6} />
                  <span>
                  <strong>iMessage</strong>
                  </span>
                </span>
                <span aria-hidden="true">↗</span>
              </a>
              <a
                className="contact-modal-option"
                href="https://wa.me/6285110808158"
                target="_blank"
                rel="noreferrer"
                data-testid="contact-option-whatsapp"
              >
                <span className="contact-modal-option-main">
                  <MessageCircle className="contact-modal-icon" aria-hidden="true" strokeWidth={1.6} />
                  <span>
                  <strong>WhatsApp</strong>
                  </span>
                </span>
                <span aria-hidden="true">↗</span>
              </a>
              <a className="contact-modal-option" href={contactDraftUrl} data-testid="contact-option-email">
                <span className="contact-modal-option-main">
                  <Mail className="contact-modal-icon" aria-hidden="true" strokeWidth={1.6} />
                  <span>
                  <strong>Email</strong>
                  <small>hello@1801.studio</small>
                  </span>
                </span>
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

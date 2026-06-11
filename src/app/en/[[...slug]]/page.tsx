import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  CheckCircle,
  ChevronRight,
  ExternalLink,
  Globe,
  Images,
  Mail,
  ShieldCheck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { CheckList } from "@/components/check-list";
import { ContactForm } from "@/components/contact-form";
import { FadeIn } from "@/components/motion";
import { Section } from "@/components/section";
import { pageMetadata } from "@/lib/metadata";
import {
  enGuidePages,
  englishPathSegments,
  enServices,
  enSystemServices,
  getEnglishGuide,
  getEnglishPageKind,
} from "@/lib/i18n";
import { getActiveReferences } from "@/lib/references";
import { site } from "@/lib/site";

type Props = {
  params: Promise<{ slug?: string[] }>;
};

type ServiceContent = {
  title: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  intro: string;
  icon: LucideIcon;
  tasks: string[];
  cta: string;
};

const services: Record<string, ServiceContent> = {
  "web-design-development": {
    title: "Websites, landing pages and shop solutions",
    metaTitle: "Website creation, landing pages & redesign | Klickhafen",
    metaDescription:
      "Websites, landing pages, one-pagers and online shops created or improved with WordPress, website builders, redesigns and custom solutions.",
    eyebrow: "Web Design & Development",
    intro:
      "Klickhafen creates complete websites, landing pages, one-pagers and shop solutions from scratch. Projects can be built with WordPress, website builders or as custom solutions without a builder. Existing websites can be redesigned, relaunched or technically improved.",
    icon: Globe,
    cta: "Request a website project",
    tasks: [
      "complete websites from scratch",
      "landing pages and one-pagers",
      "small business websites",
      "WordPress websites",
      "builder-based websites",
      "custom solutions without a website builder",
      "redesigns and relaunches",
      "responsive implementation",
      "contact forms",
      "SEO basics",
      "domain and email connection by agreement",
    ],
  },
  "website-shop-help": {
    title: "Website & shop help",
    metaTitle: "Website & shop help | Klickhafen",
    metaDescription:
      "Support for WordPress, Shopify, Wix, WooCommerce, website builders and existing websites or shops that need adjustments or fixes.",
    eyebrow: "Website Support",
    intro:
      "Klickhafen helps when an existing website or shop needs changes, troubleshooting, better structure, mobile improvements, forms, products, payments, shipping or technical checks.",
    icon: CheckCircle,
    cta: "Describe your website issue",
    tasks: ["content changes", "forms", "mobile layout", "menus and footer", "products and product pages", "payments and shipping", "domain and email links", "small technical issues", "clear next steps"],
  },
  "seo-visibility": {
    title: "SEO & visibility",
    metaTitle: "SEO & visibility | Klickhafen",
    metaDescription: "SEO basics, local visibility, metadata, internal links and technical foundations for new and existing websites.",
    eyebrow: "SEO Basics",
    intro:
      "Klickhafen checks realistic SEO foundations for new and existing websites: page structure, headings, metadata, internal links, Google Search Console, indexability and local visibility.",
    icon: ShieldCheck,
    cta: "Request SEO support",
    tasks: ["SEO basic check", "local visibility", "metadata", "headings and structure", "internal links", "Google Search Console", "sitemap and indexing", "technical basics", "no ranking guarantees"],
  },
  "wordpress-help": {
    title: "WordPress website creation, redesign or improvement",
    metaTitle: "WordPress website creation & redesign | Klickhafen",
    metaDescription: "WordPress websites created, redesigned or improved: Elementor, forms, mobile layout, structure, maintenance and SEO basics.",
    eyebrow: "WordPress Websites",
    intro:
      "Klickhafen creates new WordPress websites, redesigns existing pages and supports Elementor, forms, mobile layout, page structure, maintenance and technical improvements.",
    icon: CheckCircle,
    cta: "Request a WordPress project",
    tasks: ["new WordPress websites", "redesigns", "Elementor adjustments", "new subpages", "forms", "mobile layout", "menus and footer", "plugin checks", "SEO basics", "maintenance"],
  },
  "shopify-help": {
    title: "Shopify shop creation, redesign or improvement",
    metaTitle: "Shopify shop creation & redesign | Klickhafen",
    metaDescription: "Shopify shops created or improved: products, variants, collections, payments, shipping, mobile layout and SEO basics.",
    eyebrow: "Shopify Shops",
    intro:
      "Klickhafen creates new Shopify shops from scratch and improves existing shops with better design, product pages, start pages, collections, variants, payments, shipping, mobile layout and SEO basics.",
    icon: CheckCircle,
    cta: "Request a shop project",
    tasks: ["new Shopify shops", "shop redesigns", "product pages", "start page and subpages", "products and variants", "collections", "payment methods", "shipping options", "mobile layout", "SEO basics"],
  },
  "wix-help": {
    title: "Wix website creation, redesign or editing",
    metaTitle: "Wix website creation & editing | Klickhafen",
    metaDescription: "Wix websites created, redesigned or edited: structure, texts, images, forms, mobile layout, domain and SEO basics.",
    eyebrow: "Wix Websites",
    intro:
      "Klickhafen creates new Wix websites from scratch, redesigns existing Wix pages and supports structure, texts, images, contact forms, mobile layout, domain connection and SEO basics.",
    icon: CheckCircle,
    cta: "Request a Wix project",
    tasks: ["new Wix websites", "redesigns", "better page structure", "texts and images", "contact forms", "mobile layout", "buttons and links", "domain connection", "SEO basics"],
  },
  "woocommerce-help": {
    title: "WooCommerce shop creation, redesign or improvement",
    metaTitle: "WooCommerce shop creation & redesign | Klickhafen",
    metaDescription: "WooCommerce shops created or improved: product pages, checkout, payments, shipping, mobile layout and SEO basics.",
    eyebrow: "WooCommerce Shops",
    intro:
      "Klickhafen creates WooCommerce shops on WordPress and improves existing shops. Typical work includes product pages, checkout, payment methods, shipping, mobile layout, shop structure and SEO basics.",
    icon: CheckCircle,
    cta: "Request a shop project",
    tasks: ["new WooCommerce shops", "shop redesigns", "product pages", "checkout checks", "payment methods", "shipping methods", "mobile shop layout", "shop structure", "SEO basics"],
  },
  "website-builder-help": {
    title: "Website builder creation, redesign or improvement",
    metaTitle: "Website builder websites | Klickhafen",
    metaDescription: "Builder-based websites created or improved with Strato, IONOS, Jimdo, Wix, Squarespace, Webflow, GoDaddy, One.com, Weebly and more.",
    eyebrow: "Website Builders",
    intro:
      "Klickhafen creates and improves builder-based websites in systems such as Strato, IONOS, Jimdo, Squarespace, Webflow, GoDaddy, One.com, Weebly, Wix and similar platforms.",
    icon: CheckCircle,
    cta: "Request a builder project",
    tasks: ["new builder-based websites", "redesigns", "relaunch support", "page structure", "texts and images", "forms", "mobile layout", "domain connection", "email links", "SEO basics"],
  },
  "website-maintenance": {
    title: "Website maintenance",
    metaTitle: "Website maintenance | Klickhafen",
    metaDescription: "Ongoing website maintenance for WordPress, Shopify, Wix, WooCommerce and website builder websites.",
    eyebrow: "Website Maintenance",
    intro:
      "Klickhafen offers ongoing support for websites and shops so content, small changes, forms, mobile display and SEO basics can be checked and maintained regularly.",
    icon: CheckCircle,
    cta: "Request maintenance",
    tasks: ["small text and image changes", "content updates", "links and contact details", "forms", "mobile checks", "shop adjustments", "product updates", "SEO basics"],
  },
};

const simpleMeta: Record<string, { title: string; description: string }> = {
  pricing: {
    title: "Pricing | Website help, maintenance & projects | Klickhafen",
    description: "Transparent pricing for website help, maintenance packages, SEO basics and individual website or landing page projects.",
  },
  "why-klickhafen": {
    title: "Why Klickhafen | Personal website support",
    description: "Personal support, transparent communication and practical help for websites, shops and website builder systems.",
  },
  references: {
    title: "References & projects | Klickhafen",
    description: "Selected websites, landing pages and projects implemented or supported through Klickhafen.",
  },
  contact: {
    title: "Contact | Request website support | Klickhafen",
    description: "Send a request for a website project, shop project, WordPress, Shopify, Wix, WooCommerce or website builder support.",
  },
  "legal-notice": { title: "Legal notice | Klickhafen", description: "Legal notice and provider information for Klickhafen." },
  "privacy-policy": { title: "Privacy policy | Klickhafen", description: "Privacy information for the Klickhafen website." },
  terms: { title: "Terms | Klickhafen", description: "Terms and conditions for Klickhafen services." },
  withdrawal: { title: "Withdrawal policy | Klickhafen", description: "Withdrawal information for consumers." },
  cookies: { title: "Cookie information | Klickhafen", description: "Information about cookies, analytics and performance services on this website." },
};

export function generateStaticParams() {
  return [{}, ...englishPathSegments()];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug ?? [];
  const path = `/en${slug.length ? `/${slug.join("/")}` : ""}`;
  const kind = getEnglishPageKind(path);

  if (kind.type === "home") {
    return pageMetadata({
      title: "Websites, Landing Pages & Shop Solutions | Klickhafen",
      description:
        "Klickhafen creates websites, landing pages and online shops from scratch and supports WordPress, Shopify, Wix, WooCommerce, website builders, redesigns and website maintenance.",
      path,
    });
  }

  if (kind.type === "services") {
    return pageMetadata({
      title: "Web Design & Website Services | Klickhafen",
      description:
        "Web design, website development, landing pages, WordPress, Shopify, Wix, WooCommerce, website builders, redesigns and ongoing website support.",
      path,
    });
  }

  if (kind.type === "service" && services[kind.slug]) {
    return pageMetadata({ title: services[kind.slug].metaTitle, description: services[kind.slug].metaDescription, path });
  }

  if (kind.type === "guides") {
    return pageMetadata({
      title: "Guides for websites, shops & SEO | Klickhafen",
      description: "Practical guidance for WordPress, Shopify, Wix, WooCommerce, website builders, domains, forms, landing pages and SEO basics.",
      path,
    });
  }

  if (kind.type === "guide") {
    const guide = getEnglishGuide(kind.slug);
    if (!guide) return {};
    return pageMetadata({ title: guide.metaTitle, description: guide.metaDescription, path });
  }

  if (kind.type === "simple" && simpleMeta[kind.slug]) {
    return pageMetadata({ title: simpleMeta[kind.slug].title, description: simpleMeta[kind.slug].description, path });
  }

  return {};
}

export default async function EnglishPage({ params }: Props) {
  const slug = (await params).slug ?? [];
  const path = `/en${slug.length ? `/${slug.join("/")}` : ""}`;
  const kind = getEnglishPageKind(path);

  if (kind.type === "home") return <HomeEn />;
  if (kind.type === "services") return <ServicesEn />;
  if (kind.type === "service" && services[kind.slug]) return <ServiceEn page={services[kind.slug]} />;
  if (kind.type === "guides") return <GuidesEn />;
  if (kind.type === "guide") {
    const guide = getEnglishGuide(kind.slug);
    if (!guide) notFound();
    return <GuideEn guide={guide} />;
  }
  if (kind.type === "simple") {
    if (kind.slug === "pricing") return <PricingEn />;
    if (kind.slug === "why-klickhafen") return <WhyEn />;
    if (kind.slug === "references") return <ReferencesEn />;
    if (kind.slug === "contact") return <ContactEn />;
    if (["legal-notice", "privacy-policy", "terms", "withdrawal", "cookies"].includes(kind.slug)) return <LegalEn slug={kind.slug} />;
  }

  notFound();
}

function HeroIcon({ Icon }: { Icon: LucideIcon }) {
  return <Icon className="size-10 text-cyan-700" aria-hidden="true" />;
}

function HomeEn() {
  const entryCards = [
    {
      title: "New website creation",
      text: "Complete websites, landing pages and one-pagers from scratch with WordPress, website builders or custom implementation without a builder.",
      href: "/en/services/web-design-development",
      cta: "Create a website",
      icon: Globe,
    },
    {
      title: "Improve an existing website",
      text: "Relaunch, new design, better structure, mobile optimization, new sections and technical improvements for existing websites.",
      href: "/en/contact",
      cta: "Improve a website",
      icon: Wrench,
    },
    {
      title: "Website & shop help",
      text: "Support for WordPress, Shopify, Wix, WooCommerce, Strato, IONOS, Jimdo, Squarespace, Webflow and other builder or shop systems.",
      href: "/en/services/website-shop-help",
      cta: "View website help",
      icon: CheckCircle,
    },
  ];

  return (
    <>
      <section className="bg-slate-950 py-20 text-white sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-cyan-200">Website projects & support</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Websites, landing pages & shop solutions for freelancers and small businesses
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-100">
              Klickhafen creates complete websites, landing pages and online shops from scratch with WordPress, Shopify, Wix,
              Strato, IONOS or suitable website builders. I also support existing websites, relaunches, new designs, technical
              improvements and custom solutions without a builder.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/en/contact" className="w-full sm:w-auto">Request a website project</ButtonLink>
              <ButtonLink href="/en/contact" variant="secondary" className="w-full sm:w-auto">Improve an existing website</ButtonLink>
            </div>
          </div>
          <div className="rounded-lg border border-white/10 bg-white/10 p-6 shadow-sm">
            <p className="text-sm font-semibold text-cyan-100">Systems supported</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["WordPress", "Shopify", "Wix", "WooCommerce", "Strato", "IONOS", "Jimdo", "Squarespace", "Webflow"].map((item) => (
                <span key={item} className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white">{item}</span>
              ))}
            </div>
          </div>
        </div>
      </section>
      <Section title="Choose the right starting point" text="Whether you need a new website from scratch, a redesign, a relaunch or help with an existing system, Klickhafen keeps the process clear and practical.">
        <div className="grid gap-5 lg:grid-cols-3">
          {entryCards.map(({ title, text, href, cta, icon: Icon }) => (
            <FadeIn key={title} className="flex min-h-full flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
              <Icon className="size-7 text-cyan-700" aria-hidden="true" />
              <h2 className="mt-4 text-xl font-semibold text-slate-950">{title}</h2>
              <p className="mt-3 flex-1 leading-7 text-slate-650">{text}</p>
              <ButtonLink href={href} variant="secondary" className="mt-6 w-full sm:w-fit">{cta}</ButtonLink>
            </FadeIn>
          ))}
        </div>
      </Section>
      <Section className="bg-slate-50" title="Services" text="Complete projects, redesigns and reliable support for common website, shop and builder systems.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {enServices.map((service) => <Card key={service.href} {...service} />)}
        </div>
      </Section>
    </>
  );
}

function ServicesEn() {
  return (
    <>
      <Section eyebrow="Services" title="Websites, shops, redesigns and website support" text="Klickhafen creates new websites, landing pages and online shops and also supports existing systems, relaunches, new designs, maintenance and technical improvements.">
        <div className="grid gap-5 lg:grid-cols-3">
          {enServices.map((service) => <Card key={service.href} {...service} />)}
        </div>
      </Section>
      <Section className="bg-slate-50" title="Targeted implementation by system" text="Dedicated pages explain typical work for WordPress, Shopify, Wix, WooCommerce and website builder systems.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <Card title="Website creation" text="New websites from scratch with clear structure, responsive design and practical request paths." href="/en/services/web-design-development" icon={Globe} />
          <Card title="Landing page creation" text="Landing pages and one-pagers for offers, services, campaigns and focused contact requests." href="/en/services/web-design-development" icon={Globe} />
          {enSystemServices.map((service) => <Card key={service.href} {...service} />)}
        </div>
      </Section>
    </>
  );
}

function Card({ title, text, href, icon: Icon }: EnCardProps) {
  return (
    <Link href={href} className="flex min-h-full flex-col rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:border-cyan-700">
      <Icon className="size-7 text-cyan-700" aria-hidden="true" />
      <h2 className="mt-4 text-xl font-semibold text-slate-950">{title}</h2>
      <p className="mt-3 flex-1 leading-7 text-slate-650">{text}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-cyan-800">
        Learn more <ArrowRight className="size-4" aria-hidden="true" />
      </span>
    </Link>
  );
}

type EnCardProps = { title: string; text: string; href: string; icon: LucideIcon };

function ServiceEn({ page }: { page: ServiceContent }) {
  const Icon = page.icon;
  return (
    <>
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb current={page.title} parent="Services" parentHref="/en/services" />
          <div className="max-w-4xl">
            <HeroIcon Icon={Icon} />
            <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-cyan-700">{page.eyebrow}</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">{page.title}</h1>
            <p className="mt-6 text-lg leading-8 text-slate-650">{page.intro}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/en/contact">{page.cta}</ButtonLink>
              <ButtonLink href="/en/pricing" variant="secondary">View pricing</ButtonLink>
            </div>
          </div>
        </div>
      </section>
      <Section title="Typical services" text="Support ranges from new websites, shops and relaunches to specific checks, adjustments and improvements for existing systems.">
        <CheckList columns items={page.tasks} />
      </Section>
      <Section className="bg-slate-50" title="Request a project or support" text="Briefly describe whether you need a new website, a relaunch, a shop or help with an existing system.">
        <ButtonLink href="/en/contact">{page.cta}</ButtonLink>
      </Section>
    </>
  );
}

function GuidesEn() {
  return (
    <>
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <BookOpenIcon />
            <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-cyan-700">Guides</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">Guides for websites, shops & online visibility</h1>
            <p className="mt-6 text-lg leading-8 text-slate-650">Practical guidance for common website tasks, WordPress, Shopify, Wix, WooCommerce, website builders, domains, forms and SEO basics.</p>
          </div>
        </div>
      </section>
      <Section title="All guide articles" text="Practical notes for common tasks and issues around websites and shops.">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {enGuidePages.map((article) => <Card key={article.slug} title={article.title} text={article.description} href={`/en/guides/${article.slug}`} icon={article.icon} />)}
        </div>
      </Section>
    </>
  );
}

function BookOpenIcon() {
  return <span className="inline-flex size-10 items-center justify-center rounded-md bg-cyan-50 text-cyan-700"><CheckCircle className="size-6" aria-hidden="true" /></span>;
}

function GuideEn({ guide }: { guide: (typeof enGuidePages)[number] }) {
  const Icon = guide.icon;
  return (
    <>
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Breadcrumb current={guide.title} parent="Guides" parentHref="/en/guides" />
          <div className="max-w-4xl">
            <Icon className="size-10 text-cyan-700" aria-hidden="true" />
            <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-cyan-700">{guide.category}</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">{guide.title}</h1>
            <p className="mt-6 text-lg leading-8 text-slate-650">{guide.intro}</p>
          </div>
        </div>
      </section>
      <Section title="What this is about" text="These notes help with first orientation. They do not replace a technical check of the actual website, shop or account settings.">
        <p className="rounded-lg border border-slate-200 bg-white p-6 leading-7 text-slate-650 shadow-sm">
          Klickhafen supports freelancers, small businesses and local companies online when websites, shops or technical foundations need to be checked and improved in a clear way.
        </p>
      </Section>
      <Section className="bg-slate-50" title="When support makes sense" text="Professional help is useful when several systems interact, when changes must remain stable on mobile devices or when the cause is not obvious.">
        <ButtonLink href="/en/contact">Describe your website issue</ButtonLink>
      </Section>
    </>
  );
}

function PricingEn() {
  return (
    <>
      <Section eyebrow="Pricing" title="Transparent pricing for website and shop support" text="Klickhafen keeps pricing understandable: individual support, maintenance packages and custom offers for website, landing page or shop projects.">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-lg bg-cyan-950 p-8 text-white shadow-sm">
            <h2 className="text-2xl font-semibold">One-off website & shop support</h2>
            <p className="mt-5 text-5xl font-semibold">29 euros</p>
            <p className="mt-2 text-cyan-100">per hour</p>
            <p className="mt-6 leading-7 text-cyan-50">For individual adjustments, small issues and setup support for WordPress, Shopify, Wix, WooCommerce and website builder systems.</p>
            <ButtonLink href="/en/contact" variant="secondary" className="mt-8">Describe your issue</ButtonLink>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-2xl font-semibold text-slate-950">Website and landing page projects</h2>
            <p className="mt-4 leading-7 text-slate-650">New websites, landing pages, relaunches and larger work are priced individually by scope, system and desired implementation.</p>
            <CheckList items={["clear estimate before work starts", "custom offer by scope", "maintenance packages available", "fixed-price projects by agreement"]} />
          </div>
        </div>
      </Section>
    </>
  );
}

function WhyEn() {
  const reasons = ["no oversized agency packages", "fast online support", "clear communication", "personal support", "experience with websites, shops and website builders", "support for freelancers and small businesses", "available Germany-wide", "clear billing", "initial estimate possible"];
  return (
    <Section eyebrow="Why Klickhafen" title="Personal support instead of oversized agency packages" text="Klickhafen is for people who want practical progress with a new or existing website, landing page or shop: clear, understandable and fairly scoped.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((reason) => <div key={reason} className="rounded-lg bg-white p-5 text-sm font-semibold text-slate-800 shadow-sm ring-1 ring-slate-200">{reason}</div>)}
      </div>
    </Section>
  );
}

async function ReferencesEn() {
  const references = await getActiveReferences();
  return (
    <>
      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <Images className="size-10 text-cyan-700" aria-hidden="true" />
            <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-cyan-700">References</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">References & completed projects</h1>
            <p className="mt-6 text-lg leading-8 text-slate-650">Selected websites and projects implemented or supported through Klickhafen.</p>
          </div>
        </div>
      </section>
      <Section title="Selected references" text="A look at selected Klickhafen websites and projects.">
        {references.length ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {references.map((reference) => (
              <article key={reference.id} className="flex min-h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                {reference.media_url || reference.screenshot_url ? <img src={reference.media_url || reference.screenshot_url || ""} alt={`Project preview ${reference.title}`} className="aspect-[3/2] w-full object-cover" loading="lazy" /> : null}
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="text-xl font-semibold text-slate-950">{reference.title}</h2>
                  {reference.description ? <p className="mt-3 flex-1 leading-7 text-slate-650">{reference.description}</p> : <div className="flex-1" />}
                  <ButtonLink href={reference.url} variant="secondary" className="mt-6 w-full sm:w-fit">View project <ExternalLink className="ml-2 size-4" aria-hidden="true" /></ButtonLink>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="rounded-lg bg-white p-6 text-slate-650 shadow-sm ring-1 ring-slate-200">References are currently being prepared.</p>
        )}
      </Section>
    </>
  );
}

function ContactEn() {
  return (
    <Section eyebrow="Contact" title="Request a website or shop project" text="Briefly describe your website project, shop project or issue. Klickhafen will reply with a clear initial assessment.">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="space-y-4">
          <a href={`mailto:${site.email}`} className="flex gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-cyan-700">
            <Mail className="size-6 shrink-0 text-cyan-700" />
            <span><span className="block font-semibold text-slate-950">Email</span><span className="mt-1 block text-sm text-slate-650">{site.email}</span></span>
          </a>
          <a href={site.url} className="flex gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-cyan-700">
            <Globe className="size-6 shrink-0 text-cyan-700" />
            <span><span className="block font-semibold text-slate-950">Website</span><span className="mt-1 block text-sm text-slate-650">{site.domain}</span></span>
          </a>
        </aside>
        <ContactForm locale="en" />
      </div>
    </Section>
  );
}

function LegalEn({ slug }: { slug: string }) {
  const titles: Record<string, string> = {
    "legal-notice": "Legal notice",
    "privacy-policy": "Privacy policy",
    terms: "Terms and conditions",
    withdrawal: "Withdrawal policy",
    cookies: "Cookie information",
  };
  const title = titles[slug] ?? "Legal information";
  return (
    <Section eyebrow="Legal information" title={title} text="This English version is provided for convenience. The German version is legally authoritative.">
      <div className="prose prose-slate max-w-none rounded-lg bg-white p-6 shadow-sm ring-1 ring-slate-200">
        {slug === "legal-notice" ? (
          <>
            <p><strong>Provider:</strong> Enrico Gross, Klickhafen, Gerther Straße 76, 44577 Castrop-Rauxel, Germany.</p>
            <p><strong>Email:</strong> <a href={`mailto:${site.email}`}>{site.email}</a></p>
            <p>Information under Section 5 DDG and further details are available in the German legal notice.</p>
          </>
        ) : slug === "privacy-policy" ? (
          <>
            <p>This website processes personal data only where necessary for operation, contact requests, security and optional analytics after consent.</p>
            <p>Contact requests are used to respond to your inquiry. Optional Vercel Analytics and Vercel Speed Insights are loaded only with consent.</p>
            <p>Please refer to the German privacy policy for the legally authoritative wording.</p>
          </>
        ) : slug === "terms" ? (
          <>
            <p>Klickhafen provides website and shop services, including website creation, redesigns, maintenance and support for common systems.</p>
            <p>Scope, prices and deadlines depend on the agreed project or support request. The German terms are legally authoritative.</p>
          </>
        ) : slug === "withdrawal" ? (
          <>
            <p>Consumers may have statutory withdrawal rights depending on the type of contract and service start. The German withdrawal policy is legally authoritative.</p>
          </>
        ) : (
          <>
            <p>Necessary technologies are used for website operation. Optional analytics and performance services are loaded only after consent.</p>
            <p>You can change your selection at any time using the cookie settings button in the footer.</p>
          </>
        )}
      </div>
    </Section>
  );
}

function Breadcrumb({ current, parent, parentHref }: { current: string; parent: string; parentHref: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-600">
      <Link href="/en" className="font-medium text-slate-700 hover:text-cyan-800">Home</Link>
      <ChevronRight className="size-4 text-slate-400" aria-hidden="true" />
      <Link href={parentHref} className="font-medium text-slate-700 hover:text-cyan-800">{parent}</Link>
      <ChevronRight className="size-4 text-slate-400" aria-hidden="true" />
      <span className="font-semibold text-slate-950">{current}</span>
    </nav>
  );
}

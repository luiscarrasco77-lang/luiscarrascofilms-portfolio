import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "@/lib/dictionaries";
import { CONTACT, SITE_URL, hasLocale, localizePath } from "@/lib/locales";
import { jsonLdScript, pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: PageProps<"/[lang]/services">): Promise<Metadata> {
  const { lang } = await params;
  return hasLocale(lang) ? pageMetadata(lang, "services", "/services") : {};
}

const CITIES = ["St. Gallen", "Zürich", "Winterthur", "Appenzell", "Thurgau", "Rheintal", "Liechtenstein"];

// Server-rendered (no client JS): the page search engines read for
// "video production / photographer St. Gallen".
export default async function ServicesPage({ params }: PageProps<"/[lang]/services">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const s = t.services;
  const url = `${SITE_URL}${localizePath("/services", lang)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: s.faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Luis Carrasco Films", item: `${SITE_URL}${localizePath("/", lang)}` },
          { "@type": "ListItem", position: 2, name: s.eyebrow, item: url },
        ],
      },
      ...s.items.map((item) => ({
        "@type": "Service",
        name: item.title,
        description: item.desc,
        provider: { "@id": `${SITE_URL}/#business` },
        areaServed: CITIES.map((name) => ({ "@type": "Place", name })),
      })),
    ],
  };

  const eyebrow = (text: string) => (
    <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-muted mb-6">
      <span aria-hidden="true" className="h-px w-8 bg-gold/60" />
      {text}
    </p>
  );

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />

      {/* Intro */}
      <section className="px-5 md:px-10 pt-36 md:pt-44 pb-16 md:pb-20">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            {eyebrow(s.eyebrow)}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extralight tracking-tight leading-[1.05] text-balance">{s.title}</h1>
          </div>
          <div className="lg:col-span-4 lg:pt-24">
            <p className="text-base md:text-lg text-white/60 font-light leading-relaxed">{s.intro}</p>
          </div>
        </div>
      </section>

      {/* Banner */}
      <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden bg-surface">
        <Image
          src="/fotos1/Pizol-28.jpg"
          alt="Pizol, St. Gallen – tourism photography by Luis Carrasco"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/60" />
      </div>

      {/* Services */}
      <section className="px-5 md:px-10 py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 border-t border-white/[0.08]">
          {s.items.map((item, i) => (
            <article
              key={item.title}
              className={`py-10 md:py-14 border-b border-white/[0.08] ${i % 2 === 0 ? "md:pr-14 md:border-r" : "md:pl-14"}`}
            >
              <span className="block text-[11px] tracking-[0.3em] text-gold/80 mb-6">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="text-2xl md:text-3xl font-extralight tracking-tight mb-4">{item.title}</h2>
              <p className="text-base text-muted leading-relaxed max-w-md">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="px-5 md:px-10 pb-24 md:pb-32">
        <div className="max-w-[1400px] mx-auto">
          {eyebrow(s.processTitle)}
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.08] border border-white/[0.08]">
            {s.process.map((step, i) => (
              <li key={step.title} className="bg-background p-8 md:p-10">
                <span className="block text-5xl font-extralight text-white/15 mb-8 leading-none">{i + 1}</span>
                <h3 className="text-lg font-light tracking-tight mb-3">{step.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Areas */}
      <section className="px-5 md:px-10 pb-24 md:pb-32">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            {eyebrow(s.areasTitle)}
            <p className="text-xl md:text-2xl font-extralight tracking-tight leading-snug text-white/85">{s.areas}</p>
          </div>
          <ul className="lg:col-span-6 lg:col-start-7 flex flex-wrap content-start gap-3 lg:pt-14">
            {CITIES.map((city) => (
              <li
                key={city}
                className="px-5 py-2.5 border border-white/15 rounded-full text-[11px] uppercase tracking-[0.25em] text-white/70"
              >
                {city}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ — native details/summary, no JS */}
      <section className="px-5 md:px-10 pb-24 md:pb-32">
        <div className="max-w-[1000px] mx-auto">
          {eyebrow(s.faqTitle)}
          <div className="border-t border-white/[0.08]">
            {s.faq.map((f) => (
              <details key={f.q} className="group border-b border-white/[0.08]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7 [&::-webkit-details-marker]:hidden">
                  <h3 className="text-base md:text-lg font-light">{f.q}</h3>
                  <span
                    aria-hidden="true"
                    className="relative h-4 w-4 shrink-0 before:absolute before:left-0 before:top-1/2 before:h-px before:w-4 before:bg-gold after:absolute after:left-1/2 after:top-0 after:h-4 after:w-px after:bg-gold after:transition-transform after:duration-300 group-open:after:scale-y-0"
                  />
                </summary>
                <p className="pb-7 pr-10 text-base text-muted leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 md:px-10 py-24 md:py-32 border-t border-white/[0.06] text-center">
        <h2 className="text-4xl md:text-6xl font-extralight tracking-tight leading-[1.05] text-balance mb-10">{s.ctaTitle}</h2>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href={localizePath("/contact", lang)}
            className="inline-flex items-center gap-4 px-11 py-4 bg-white text-black text-[11px] font-normal uppercase tracking-[0.32em] hover:bg-gold transition-colors duration-500"
          >
            {s.ctaButton}
          </Link>
          <a
            href={CONTACT.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] uppercase tracking-[0.25em] text-white/60 hover:text-white transition-colors duration-300"
          >
            WhatsApp · {CONTACT.phoneDisplay}
          </a>
        </div>
      </section>
    </>
  );
}

"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { CONTACT } from "@/lib/locales";

// Values stay in English so inquiry emails are consistent; labels are localized.
const BUDGET_VALUES = ["Under CHF 1,500", "CHF 1,500-5,000", "CHF 5,000-10,000", "CHF 10,000+"];

const directLinkClass =
  "group flex items-center gap-4 py-4 border-b border-white/[0.06] text-sm text-white/70 hover:text-white transition-colors duration-300";
const directLabelClass = "block text-[10px] uppercase tracking-[0.3em] text-white/35 mb-1";

export default function ContactForm() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    budget: "",
    details: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    /* paddingTop 120px via inline style — bypasses Tailwind compilation issues,
       guarantees the title never sits behind the fixed 64px header */
    <section style={{ paddingTop: "120px", paddingBottom: "96px" }} className="px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">

          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center"
          >
            <p className="flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-muted mb-8">
              <span aria-hidden="true" className="h-px w-8 bg-white/25" />
              {t.contact.eyebrow}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight leading-[1.1] tracking-tight text-balance mb-8">
              {t.contact.headingLine1}
              <br />
              <span className="text-muted">{t.contact.headingLine2}</span>
            </h1>
            <p className="text-base text-muted font-light leading-relaxed max-w-md mb-10">
              {t.contact.intro}
            </p>

            {/* Direct contact — phone, WhatsApp, email, studio location */}
            <div className="max-w-md mb-10 border-t border-white/[0.06]">
              <a href={CONTACT.phoneHref} className={directLinkClass}>
                <svg className="w-5 h-5 shrink-0 text-white/40 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <span>
                  <span className={directLabelClass}>{t.contact.phone}</span>
                  {CONTACT.phoneDisplay}
                </span>
              </a>
              <a href={CONTACT.whatsappHref} target="_blank" rel="noopener noreferrer" className={directLinkClass}>
                <svg className="w-5 h-5 shrink-0 text-white/40 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>
                  <span className={directLabelClass}>{t.contact.whatsapp}</span>
                  {CONTACT.phoneDisplay}
                </span>
              </a>
              <a href={`mailto:${CONTACT.email}`} className={directLinkClass}>
                <svg className="w-5 h-5 shrink-0 text-white/40 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <span className="min-w-0">
                  <span className={directLabelClass}>{t.contact.email}</span>
                  <span className="break-all">{CONTACT.email}</span>
                </span>
              </a>
              <div className="flex items-center gap-4 py-4 border-b border-white/[0.06] text-sm text-white/70">
                <svg className="w-5 h-5 shrink-0 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span>
                  <span className={directLabelClass}>{t.contact.location}</span>
                  {t.location.based}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-foreground transition-colors duration-300 flex items-center gap-3"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                @carrascoluis_
              </a>
              <a
                href={CONTACT.behance}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-foreground transition-colors duration-300 flex items-center gap-3"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 6.053-2.207 7.061zM2.87 8.654h3.742c4.952-.073 4.72-4.35.048-4.35H2.87v4.35zm0 8.58h3.947c5.479-.153 5.326-5.27-.045-5.27H2.87v5.27z" />
                </svg>
                Behance Portfolio
              </a>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-lg font-light">{t.contact.successTitle}</p>
                  <p className="text-sm text-muted mt-2">{t.contact.successMsg}</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label htmlFor="name" className="text-[11px] uppercase tracking-[0.25em] text-muted block mb-3">{t.contact.name}</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-b border-white/10 py-3 text-foreground font-light focus:outline-none focus:border-white/40 transition-colors duration-300 placeholder:text-white/15"
                    placeholder={t.contact.namePlaceholder}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="text-[11px] uppercase tracking-[0.25em] text-muted block mb-3">{t.contact.email}</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    inputMode="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-b border-white/10 py-3 text-foreground font-light focus:outline-none focus:border-white/40 transition-colors duration-300 placeholder:text-white/15"
                    placeholder={t.contact.emailPlaceholder}
                  />
                </div>

                <div>
                  <label htmlFor="company" className="text-[11px] uppercase tracking-[0.25em] text-muted block mb-3">{t.contact.company}</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    autoComplete="organization"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full bg-transparent border-b border-white/10 py-3 text-foreground font-light focus:outline-none focus:border-white/40 transition-colors duration-300 placeholder:text-white/15"
                    placeholder={t.contact.companyPlaceholder}
                  />
                </div>

                <div>
                  <label htmlFor="budget" className="text-[11px] uppercase tracking-[0.25em] text-muted block mb-3">{t.contact.budget}</label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-transparent border-b border-white/10 py-3 text-foreground font-light focus:outline-none focus:border-white/40 transition-colors duration-300 appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-background">{t.contact.budgetSelect}</option>
                    {BUDGET_VALUES.map((v, i) => (
                      <option key={v} value={v} className="bg-background">{t.contact.budgetOptions[i]}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="details" className="text-[11px] uppercase tracking-[0.25em] text-muted block mb-3">{t.contact.details}</label>
                  <textarea
                    id="details"
                    name="details"
                    required
                    rows={4}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full bg-transparent border-b border-white/10 py-3 text-foreground font-light focus:outline-none focus:border-white/40 transition-colors duration-300 resize-none placeholder:text-white/15"
                    placeholder={t.contact.detailsPlaceholder}
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-red-400">{t.contact.error}</p>
                )}

                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  whileHover={{ scale: status === "loading" ? 1 : 1.02 }}
                  whileTap={{ scale: status === "loading" ? 1 : 0.98 }}
                  className="w-full py-4 bg-white text-black text-[11px] font-normal uppercase tracking-[0.32em] hover:bg-white/85 transition-colors duration-500 disabled:opacity-50"
                >
                  {status === "loading" ? t.contact.sending : t.contact.submit}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

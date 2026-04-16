"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    budget: "",
    details: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build mailto link as a simple solution without backend
    const subject = encodeURIComponent(
      `Project Inquiry from ${formData.name} — ${formData.company}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nCompany: ${formData.company}\nBudget: ${formData.budget}\n\nProject Details:\n${formData.details}`
    );
    window.open(
      `mailto:contact@luiscarrascofilms.com?subject=${subject}&body=${body}`,
      "_self"
    );
    setSubmitted(true);
  };

  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32 px-6">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Left: Copy */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center"
          >
            <p className="text-[11px] uppercase tracking-[0.3em] text-muted mb-8">
              Get in Touch
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extralight leading-[1.1] tracking-tight mb-8">
              Let&apos;s scale your brand
              <br />
              <span className="text-muted">through visual storytelling.</span>
            </h1>

            <p className="text-base text-muted font-light leading-relaxed max-w-md mb-12">
              Whether you&apos;re a hotel, a brand, a festival, or a creator — I
              help you turn visual content into real growth. Let&apos;s talk.
            </p>

            {/* Social links */}
            <div className="flex flex-col gap-4">
              <a
                href="https://www.instagram.com/carrascoluis_/"
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
                href="https://www.behance.net/luiscarrasco07"
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
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-lg font-light">Message prepared.</p>
                  <p className="text-sm text-muted mt-2">Your email client should open shortly.</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name */}
                <div>
                  <label className="text-[11px] uppercase tracking-[0.25em] text-muted block mb-3">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-white/10 py-3 text-foreground font-light focus:outline-none focus:border-white/40 transition-colors duration-300 placeholder:text-white/15"
                    placeholder="Your name"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="text-[11px] uppercase tracking-[0.25em] text-muted block mb-3">
                    Brand / Hotel / Agency
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-white/10 py-3 text-foreground font-light focus:outline-none focus:border-white/40 transition-colors duration-300 placeholder:text-white/15"
                    placeholder="Company or brand name"
                  />
                </div>

                {/* Budget */}
                <div>
                  <label className="text-[11px] uppercase tracking-[0.25em] text-muted block mb-3">
                    Estimated Budget
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) =>
                      setFormData({ ...formData, budget: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-white/10 py-3 text-foreground font-light focus:outline-none focus:border-white/40 transition-colors duration-300 appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-background">
                      Select a range
                    </option>
                    <option value="< $5K" className="bg-background">
                      Under $5,000
                    </option>
                    <option value="$5K - $15K" className="bg-background">
                      $5,000 – $15,000
                    </option>
                    <option value="$15K - $50K" className="bg-background">
                      $15,000 – $50,000
                    </option>
                    <option value="$50K+" className="bg-background">
                      $50,000+
                    </option>
                  </select>
                </div>

                {/* Details */}
                <div>
                  <label className="text-[11px] uppercase tracking-[0.25em] text-muted block mb-3">
                    Project Details
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.details}
                    onChange={(e) =>
                      setFormData({ ...formData, details: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-white/10 py-3 text-foreground font-light focus:outline-none focus:border-white/40 transition-colors duration-300 resize-none placeholder:text-white/15"
                    placeholder="Tell me about your project, timeline, and vision..."
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-white text-black text-sm uppercase tracking-[0.25em] hover:bg-white/90 transition-colors duration-300"
                >
                  Send Inquiry
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

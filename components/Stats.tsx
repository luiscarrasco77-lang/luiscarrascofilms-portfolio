"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";

const stats = [
  { value: 5, suffix: "+", key: "years" },
  { value: 1, suffix: "M+", key: "instagram" },
  { value: 500, suffix: "K+", key: "youtube" },
  { value: 2, suffix: "M", key: "monthly" },
] as const;

function AnimatedCounter({
  target,
  suffix,
  inView,
}: {
  target: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const { t } = useI18n();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="pt-24 md:pt-32 pb-14 md:pb-20 bg-background flex flex-col items-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-muted mb-16 text-center"
        >
          <span aria-hidden="true" className="h-px w-8 bg-gold/60" />
          {t.stats.impact}
          <span aria-hidden="true" className="h-px w-8 bg-gold/60" />
        </motion.p>

        <div className="grid grid-cols-2 gap-x-6 gap-y-12 px-6 w-full max-w-sm mx-auto md:flex md:flex-nowrap md:justify-center md:gap-x-0 md:max-w-none md:divide-x md:divide-white/[0.08]">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="text-center flex flex-col items-center min-w-0 md:px-5 lg:px-10 xl:px-14"
            >
              <div className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-white mb-3 leading-none">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  inView={inView}
                />
              </div>
              <p className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-muted leading-relaxed">
                {t.stats[stat.key]}
              </p>
            </motion.div>
          ))}
        </div>
    </section>
  );
}

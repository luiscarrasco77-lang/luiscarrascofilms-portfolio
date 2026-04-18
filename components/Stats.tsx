"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const stats = [
  { value: 5, suffix: "+", label: "Years of Global Production" },
  { value: 1, suffix: "M+", label: "Instagram Followers Reached" },
  { value: 500, suffix: "K+", label: "YouTube Subs Built" },
  { value: 2, suffix: "M", label: "Monthly Views" },
];

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
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background">
        <div className="px-12 md:px-44">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-[11px] uppercase tracking-[0.3em] text-muted mb-16"
        >
          The Impact
        </motion.p>

        <div className="grid grid-cols-2 gap-x-16 gap-y-12 md:gap-x-24 max-w-sm">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="text-center flex flex-col items-center min-w-[120px]"
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-extralight tracking-tight text-accent mb-3">
                <AnimatedCounter
                  target={stat.value}
                  suffix={stat.suffix}
                  inView={inView}
                />
              </div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted leading-relaxed">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
        </div>
    </section>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

// Quick fade-in on client-side navigation. No exit animation, so the old page
// leaves immediately and the next one appears without waiting. initial={false}
// keeps the server HTML visible on first load (fast first paint).
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="w-full overflow-x-hidden"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

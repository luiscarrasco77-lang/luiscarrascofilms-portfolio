"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface VideoModalProps {
  src: string;
  title: string;
  shareId?: string;
  onClose: () => void;
}

export default function VideoModal({ src, title, shareId, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Lock scroll
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const copyLink = async () => {
    if (!shareId) return;
    const url = `${window.location.origin}/watch/${shareId}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Fallback for older browsers / non-secure contexts
      const ta = document.createElement("textarea");
      ta.value = url;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand("copy"); } catch { /* ignore */ }
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-8"
        onClick={onClose}
      >
        {/* Copy-link button */}
        {shareId && (
          <button
            className="absolute top-5 left-5 flex items-center gap-2 px-3.5 py-2 border border-white/20 rounded-full text-[11px] uppercase tracking-[0.2em] text-white/70 hover:bg-white hover:text-black transition-all duration-300 z-10"
            onClick={(e) => { e.stopPropagation(); copyLink(); }}
            aria-label="Copy link to this video"
          >
            {copied ? (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Link copied
              </>
            ) : (
              <>
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 010 5.656l-3 3a4 4 0 01-5.656-5.656l1.5-1.5M10.172 13.828a4 4 0 010-5.656l3-3a4 4 0 015.656 5.656l-1.5 1.5" />
                </svg>
                Copy link
              </>
            )}
          </button>
        )}

        {/* Close button */}
        <button
          className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors z-10"
          onClick={onClose}
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Title */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 hidden sm:block">
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">{title}</p>
        </div>

        {/* Video container */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.94, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-5xl max-h-[85vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <video
            ref={videoRef}
            autoPlay
            controls
            playsInline
            className="w-full h-full max-h-[85vh] object-contain"
            style={{ background: "transparent" }}
          >
            <source src={src} type="video/mp4" />
          </video>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

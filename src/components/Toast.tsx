"use client";
import { AnimatePresence, motion } from "framer-motion";
import { useToast } from "@/lib/toast-store";

export default function Toast() {
  const message = useToast((s) => s.message);
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.95 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-24 right-6 z-50 bg-cream border border-champagne rounded-full pl-3 pr-5 py-2.5 shadow-lg flex items-center gap-3"
        >
          <span className="w-7 h-7 rounded-full bg-thyme text-champagne flex items-center justify-center shrink-0">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12l5 5L20 7" />
            </svg>
          </span>
          <span className="text-sm font-serif text-ink whitespace-nowrap">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

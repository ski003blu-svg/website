import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    // Animate progress 0 → 100 over ~1.8s
    let p = 0;
    intervalRef.current = setInterval(() => {
      p += Math.random() * 18 + 4;
      if (p >= 100) {
        p = 100;
        clearInterval(intervalRef.current!);
        setTimeout(() => {
          setVisible(false);
          setTimeout(onComplete, 900);
        }, 300);
      }
      setProgress(Math.min(p, 100));
    }, 80);

    return () => clearInterval(intervalRef.current!);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "hsl(20 12% 8%)" }}
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Ambient orb */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 60% at 50% 50%, hsl(42 60% 62% / 0.08) 0%, transparent 70%)",
            }}
          />

          {/* Brand wordmark */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative mb-16 text-center"
          >
            <div className="font-serif text-4xl md:text-6xl font-light tracking-[0.15em] text-white/90 uppercase">
              Bluski
            </div>
            <div className="mt-1 text-[10px] font-sans tracking-[0.4em] uppercase text-white/35 font-light">
              Solutions
            </div>
          </motion.div>

          {/* Progress bar */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-48 h-px overflow-hidden"
            style={{ background: "hsl(0 0% 100% / 0.1)" }}
          >
            <motion.div
              className="absolute inset-y-0 left-0 origin-left"
              style={{
                background: "linear-gradient(90deg, hsl(42 60% 62%), hsl(42 80% 80%))",
                scaleX: progress / 100,
              }}
              animate={{ scaleX: progress / 100 }}
              transition={{ duration: 0.2, ease: "linear" }}
            />
          </motion.div>

          {/* Counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-4 font-mono text-[11px] text-white/25 tracking-widest"
          >
            {Math.round(progress).toString().padStart(3, "0")}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

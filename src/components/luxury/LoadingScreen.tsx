import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"loading" | "revealing" | "hidden">("loading");
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let p = 0;
    intervalRef.current = setInterval(() => {
      p += Math.random() * 12 + 3;
      if (p >= 100) {
        p = 100;
        clearInterval(intervalRef.current!);
        setTimeout(() => setPhase("revealing"), 400);
        setTimeout(() => setPhase("hidden"), 1400);
        setTimeout(onComplete, 2000);
      }
      setProgress(Math.min(p, 100));
    }, 60);

    return () => clearInterval(intervalRef.current!);
  }, [onComplete]);

  const words = ["Engineered", "Intelligence", "Delivered"];

  return (
    <AnimatePresence>
      {phase !== "hidden" && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: "hsl(20 12% 6%)" }}
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 1.1, ease: [0.83, 0, 0.17, 1] },
          }}
        >
          {/* Animated noise grain */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.04]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              backgroundSize: "200px",
            }}
          />

          {/* Morphing orb background */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, hsl(42 70% 55% / 0.12), transparent 60%)",
              filter: "blur(80px)",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 0.9, 0.6],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Secondary orb */}
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, hsl(36 30% 85% / 0.08), transparent 60%)",
              filter: "blur(60px)",
            }}
            animate={{
              x: [-50, 50, -50],
              y: [50, -30, 50],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center">
            {phase === "loading" && (
              <>
                {/* Animated word reveal */}
                <div className="flex flex-col items-center gap-1 mb-20">
                  {words.map((word, i) => (
                    <motion.div
                      key={word}
                      className="overflow-hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 + i * 0.15, duration: 0.6 }}
                    >
                      <motion.span
                        className="block font-serif text-4xl md:text-6xl lg:text-7xl font-light tracking-[0.08em] text-white/90"
                        initial={{ y: "100%", rotateX: -90 }}
                        animate={{ y: 0, rotateX: 0 }}
                        transition={{
                          delay: 0.3 + i * 0.2,
                          duration: 0.9,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        {word}
                      </motion.span>
                    </motion.div>
                  ))}
                </div>

                {/* Progress line with glow */}
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                  className="relative w-56 h-[2px] overflow-hidden rounded-full"
                  style={{ background: "hsl(0 0% 100% / 0.08)" }}
                >
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full origin-left"
                    style={{
                      background: "linear-gradient(90deg, hsl(42 70% 55%), hsl(42 90% 75%))",
                      boxShadow: "0 0 20px hsl(42 70% 55% / 0.6)",
                      width: "100%",
                      scaleX: progress / 100,
                    }}
                    animate={{ scaleX: progress / 100 }}
                    transition={{ duration: 0.15, ease: "linear" }}
                  />
                </motion.div>

                {/* Counter */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  className="mt-5 font-mono text-[10px] text-white/20 tracking-[0.3em]"
                >
                  {Math.round(progress).toString().padStart(3, "0")}
                </motion.div>
              </>
            )}

            {phase === "revealing" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <div className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-[0.06em] text-white">
                  BLUSKI
                </div>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-4 h-px w-32 mx-auto"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, hsl(42 70% 55%), transparent)",
                  }}
                />
                <div className="mt-4 text-[11px] tracking-[0.5em] uppercase text-white/30 font-light">
                  Solutions
                </div>
              </motion.div>
            )}
          </div>

          {/* Bottom scroll hint */}
          {phase === "loading" && progress > 80 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute bottom-12 flex flex-col items-center gap-3 text-white/20"
            >
              <span className="text-[9px] tracking-[0.4em] uppercase">Scroll to discover</span>
              <motion.div
                className="w-px h-8 bg-white/10"
                animate={{ scaleY: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

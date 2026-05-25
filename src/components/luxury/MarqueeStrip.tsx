import { motion } from "framer-motion";

const items = [
  "AI & Machine Learning",
  "Software Development",
  "Data Analytics",
  "DevOps & Cloud",
  "Computer Vision",
  "API Integration",
  "Website Development",
  "MLOps",
];

export function MarqueeStrip({ dark = false }: { dark?: boolean }) {
  const repeated = [...items, ...items, ...items];

  return (
    <div
      className="relative overflow-hidden py-5 border-y"
      style={{
        background: dark ? "hsl(20 12% 8%)" : "hsl(36 15% 97%)",
        borderColor: dark ? "hsl(0 0% 100% / 0.06)" : "hsl(36 15% 88%)",
      }}
    >
      <div
        className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 z-10"
        style={{
          background: dark
            ? "linear-gradient(90deg, hsl(20 12% 8%), transparent)"
            : "linear-gradient(90deg, hsl(36 15% 97%), transparent)",
        }}
      />
      <div
        className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 z-10"
        style={{
          background: dark
            ? "linear-gradient(-90deg, hsl(20 12% 8%), transparent)"
            : "linear-gradient(-90deg, hsl(36 15% 97%), transparent)",
        }}
      />

      <motion.div
        className="flex items-center gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{ duration: 35, ease: "linear", repeat: Infinity }}
      >
        {repeated.map((item, i) => (
          <div key={i} className="flex items-center gap-10">
            <span
              className="text-[11px] tracking-[0.3em] uppercase font-sans font-medium"
              style={{ color: dark ? "hsl(0 0% 100% / 0.2)" : "hsl(20 8% 50%)" }}
            >
              {item}
            </span>
            <span
              className="size-1 rounded-full shrink-0"
              style={{ background: dark ? "hsl(42 60% 62% / 0.4)" : "hsl(42 60% 70% / 0.6)" }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

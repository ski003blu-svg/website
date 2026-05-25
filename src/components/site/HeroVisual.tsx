import { motion } from "framer-motion";

/**
 * Game-style animated neural-network visualization.
 * Pure SVG + framer-motion. No external libs.
 */
export function HeroVisual({ dark = false }: { dark?: boolean }) {
  const stroke = dark ? "hsl(217 91% 70%)" : "hsl(217 91% 55%)";
  const faint = dark ? "hsl(217 91% 70% / 0.25)" : "hsl(217 91% 55% / 0.25)";

  // Layered nodes (input / hidden / output)
  const cols = [
    { x: 60, ys: [60, 140, 220, 300] },
    { x: 200, ys: [40, 110, 180, 250, 320] },
    { x: 340, ys: [80, 160, 240] },
    { x: 460, ys: [140, 220] },
  ];

  const edges: Array<[number, number, number, number, number]> = [];
  for (let i = 0; i < cols.length - 1; i++) {
    cols[i].ys.forEach((y1, a) => {
      cols[i + 1].ys.forEach((y2, b) => {
        // deterministic pseudo-random so SSR matches client
        const seed = ((i + 1) * 13 + a * 7 + b * 3) % 17 / 17;
        edges.push([cols[i].x, y1, cols[i + 1].x, y2, seed]);
      });
    });
  }

  return (
    <div className="relative w-full aspect-square max-w-[560px] mx-auto">
      {/* Ambient orbs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[10%] left-[15%] size-40 rounded-full bg-primary/30 blur-3xl animate-float-slow" />
        <div
          className="absolute bottom-[10%] right-[10%] size-48 rounded-full bg-primary-glow/40 blur-3xl animate-float-slow"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      {/* Rotating ring */}
      <div className="absolute inset-6 rounded-full border border-dashed border-primary/30 animate-spin-slow" />
      <div
        className="absolute inset-16 rounded-full border border-primary/20 animate-spin-slow"
        style={{ animationDirection: "reverse", animationDuration: "60s" }}
      />

      <svg viewBox="0 0 520 380" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="edgeGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={stroke} stopOpacity="0" />
            <stop offset="50%" stopColor={stroke} stopOpacity="1" />
            <stop offset="100%" stopColor={stroke} stopOpacity="0" />
          </linearGradient>
          <radialGradient id="nodeGrad">
            <stop offset="0%" stopColor={stroke} stopOpacity="1" />
            <stop offset="100%" stopColor={stroke} stopOpacity="0.2" />
          </radialGradient>
        </defs>

        {/* Static faint edges */}
        {edges.map(([x1, y1, x2, y2], i) => (
          <line
            key={`s-${i}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={faint}
            strokeWidth="1"
          />
        ))}

        {/* Animated "data pulse" edges */}
        {edges.map(([x1, y1, x2, y2, r], i) =>
          r > 0.55 ? (
            <motion.line
              key={`a-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="url(#edgeGrad)"
              strokeWidth="1.5"
              strokeDasharray="6 14"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -200 }}
              transition={{
                duration: 2 + r * 2,
                repeat: Infinity,
                ease: "linear",
                delay: r * 1.5,
              }}
            />
          ) : null
        )}

        {/* Nodes */}
        {cols.map((c, ci) =>
          c.ys.map((y, ni) => (
            <g key={`${ci}-${ni}`}>
              <motion.circle
                cx={c.x}
                cy={y}
                r={14}
                fill="url(#nodeGrad)"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: [0.3, 0.9, 0.3] }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  delay: (ci + ni) * 0.18,
                }}
              />
              <circle cx={c.x} cy={y} r={4} fill={stroke} />
            </g>
          ))
        )}
      </svg>

      {/* HUD chips */}
      <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md glass border border-primary/30 font-mono text-[10px] uppercase tracking-widest text-primary">
        ◉ inference.live
      </div>
      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md glass border border-primary/30 font-mono text-[10px] uppercase tracking-widest text-foreground/70">
        22ms · 99.99%
      </div>
    </div>
  );
}

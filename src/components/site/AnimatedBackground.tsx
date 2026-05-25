/** Animated grid + radial mask + floating orbs. Use behind dark sections. */
export function AnimatedBackground({ variant = "light" }: { variant?: "light" | "dark" }) {
  const isDark = variant === "dark";
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
      <div
        className={`absolute inset-0 ${isDark ? "grid-bg-dark" : "grid-bg"}`}
        style={{
          maskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 80%)",
        }}
      />
      <div className="absolute top-[-15%] left-[10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] animate-float-slow" />
      <div
        className="absolute bottom-[-10%] right-[5%] w-[45%] h-[45%] rounded-full bg-primary-glow/20 blur-[140px] animate-float-slow"
        style={{ animationDelay: "2s" }}
      />
    </div>
  );
}

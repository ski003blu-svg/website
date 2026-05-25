import { useRef, MouseEvent, ReactNode } from "react";

/** 3D-tilt card with mouse-tracked spotlight. Game-feel hover. */
export function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rx = ((y / r.height) - 0.5) * -6;
    const ry = ((x / r.width) - 0.5) * 8;
    el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`relative transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{
        backgroundImage:
          "radial-gradient(400px circle at var(--mx,50%) var(--my,50%), hsl(217 91% 55% / 0.12), transparent 50%)",
      }}
    >
      {children}
    </div>
  );
}

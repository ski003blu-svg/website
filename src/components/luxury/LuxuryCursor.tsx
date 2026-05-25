import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function LuxuryCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const springX = useSpring(cursorX, { stiffness: 120, damping: 28, mass: 0.5 });
  const springY = useSpring(cursorY, { stiffness: 120, damping: 28, mass: 0.5 });

  const hovered = useRef(false);
  const sizeMotion = useMotionValue(14);
  const opacityMotion = useMotionValue(0);
  const springSize = useSpring(sizeMotion, { stiffness: 200, damping: 25 });

  useEffect(() => {
    // Only show on desktop
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      dotX.set(e.clientX);
      dotY.set(e.clientY);
      opacityMotion.set(1);
    };

    const onEnterLink = () => {
      sizeMotion.set(44);
    };

    const onLeaveLink = () => {
      sizeMotion.set(14);
    };

    window.addEventListener("mousemove", onMove);

    const setupLinks = () => {
      document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
        el.addEventListener("mouseenter", onEnterLink);
        el.addEventListener("mouseleave", onLeaveLink);
      });
    };

    setupLinks();

    const observer = new MutationObserver(setupLinks);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      observer.disconnect();
    };
  }, [cursorX, cursorY, dotX, dotY, sizeMotion, opacityMotion]);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed z-[99999] top-0 left-0 rounded-full border border-foreground/30 mix-blend-multiply hidden md:flex items-center justify-center"
        style={{
          x: springX,
          y: springY,
          width: springSize,
          height: springSize,
          translateX: "-50%",
          translateY: "-50%",
          opacity: opacityMotion,
        }}
      />
      {/* Dot */}
      <motion.div
        className="pointer-events-none fixed z-[99999] top-0 left-0 w-1 h-1 rounded-full bg-foreground/60 hidden md:block"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
          opacity: opacityMotion,
        }}
      />
    </>
  );
}

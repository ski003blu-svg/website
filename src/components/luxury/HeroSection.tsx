import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles, MeshDistortMaterial, Environment } from "@react-three/drei";
import * as THREE from "three";
import { Suspense } from "react";

/* ── Morphing 3D ambient mesh ──────────────────────────── */
function AmbientMesh({ mouse }: { mouse: { x: number; y: number } }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.3 + mouse.y * 0.1;
    ref.current.rotation.y = state.clock.elapsedTime * 0.08 + mouse.x * 0.1;
  });
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={ref} scale={2.8}>
        <icosahedronGeometry args={[1, 5]} />
        <MeshDistortMaterial
          color="hsl(42, 65%, 88%)"
          roughness={0.2}
          metalness={0.05}
          distort={0.35}
          speed={1.5}
          transparent
          opacity={0.5}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}

/* ── Secondary floating sphere ───────────────────────── */
function FloatingSphere({ position, color }: { position: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.3;
  });
  return (
    <mesh ref={ref} position={position} scale={0.6}>
      <sphereGeometry args={[1, 32, 32]} />
      <MeshDistortMaterial
        color={color}
        roughness={0.1}
        metalness={0.2}
        distort={0.4}
        speed={2}
        transparent
        opacity={0.35}
      />
    </mesh>
  );
}

/* ── Character-by-character text animation ───────────────────────── */
function CharsReveal({
  text,
  delay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const chars = text.split("");
  return (
    <span className={`inline-flex flex-wrap ${className}`} aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: "120%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.03,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ marginRight: char === " " ? "0.25em" : "0" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}

/* ── Large word reveal with perspective ───────────────────────── */
function PerspWord({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <div className="overflow-hidden">
      <motion.span
        className="block"
        initial={{ y: "100%", rotateX: -40, opacity: 0 }}
        animate={{ y: 0, rotateX: 0, opacity: 1 }}
        transition={{
          duration: 1.4,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {text}
      </motion.span>
    </div>
  );
}

/* ── Scroll indicator ────────────────────────────────── */
function ScrollIndicator() {
  return (
    <motion.div
      className="flex flex-col items-center gap-3 text-foreground/30"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.2, duration: 0.8 }}
    >
      <div className="w-px h-14 overflow-hidden bg-foreground/10">
        <motion.div
          className="w-full bg-foreground/40"
          style={{ height: "50%" }}
          animate={{ y: ["0%", "200%", "0%"] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <span className="text-[9px] tracking-[0.3em] uppercase font-sans rotate-90 origin-center ml-3">
        Scroll
      </span>
    </motion.div>
  );
}

/* ── Main hero ───────────────────────────────────────── */
export function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const yText = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const yCanvas = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  const mouseX = useSpring(0, { stiffness: 60, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 60, damping: 20 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      mouseX.set(x);
      mouseY.set(y);
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "var(--gradient-warm)" }}
    >
      {/* Full-screen 3D canvas */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: yCanvas, opacity }}
      >
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[5, 5, 5]} intensity={0.6} color="#fff8f0" />
            <pointLight position={[-4, -2, 3]} intensity={0.4} color="hsl(42,70%,75%)" />
            <pointLight position={[4, 2, -2]} intensity={0.3} color="hsl(200,30%,80%)" />

            <AmbientMesh mouse={mousePos} />
            <FloatingSphere position={[-3, 2, -2]} color="hsl(42, 60%, 85%)" />
            <FloatingSphere position={[3.5, -1.5, -1]} color="hsl(36, 40%, 90%)" />
            <FloatingSphere position={[-2, -2.5, -3]} color="hsl(200, 25%, 88%)" />

            <Sparkles
              count={50}
              scale={12}
              size={2}
              speed={0.15}
              color="hsl(42,65%,78%)"
              opacity={0.3}
            />
          </Suspense>
        </Canvas>
      </motion.div>

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-5 opacity-25"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "180px",
        }}
      />

      {/* Layered floating gradiens */}
      <motion.div
        className="absolute top-[-20%] right-[-10%] w-[900px] h-[900px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(42 65% 85% / 0.25), transparent 65%)",
          x: mouseX,
          y: mouseY,
          filter: "blur(60px)",
        }}
      />
      <motion.div
        className="absolute bottom-[-10%] left-[-15%] w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(36 35% 90% / 0.35), transparent 65%)",
          x: useTransform(mouseX, (v) => -v * 0.7),
          y: useTransform(mouseY, (v) => -v * 0.5),
          filter: "blur(80px)",
        }}
      />
      <motion.div
        className="absolute top-[40%] left-[50%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(200 20% 92% / 0.2), transparent 60%)",
          x: useTransform(mouseX, (v) => v * 0.3),
          y: useTransform(mouseY, (v) => -v * 0.4),
          filter: "blur(50px)",
        }}
      />

      {/* Main content */}
      <motion.div
        className="relative z-20 max-w-7xl mx-auto px-6 md:px-10 lg:px-20 pt-32 pb-24 w-full"
        style={{ y: yText, opacity, scale }}
      >
        {/* Left column - main hero text */}
        <div className="max-w-5xl">
          {/* Eyebrow with animation */}
          <motion.div
            className="flex items-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="w-12 h-px"
              style={{ background: "linear-gradient(90deg, hsl(42 70% 55%), transparent)" }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
            <span className="text-[11px] tracking-[0.4em] uppercase font-sans text-foreground/45 font-medium">
              Iowa-born · Globally deployed
            </span>
          </motion.div>

          {/* Massive headline with perspective reveals */}
          <div className="mb-12">
            <PerspWord
              text={
                <span className="font-serif text-[clamp(4rem,12vw,11rem)] leading-[0.88] text-foreground font-light tracking-[-0.02em]">
                  Engineered
                </span>
              }
              delay={0.4}
            />
            <PerspWord
              text={
                <span className="font-serif text-[clamp(4rem,12vw,11rem)] leading-[0.88] text-foreground font-light tracking-[-0.02em] mt-2 block">
                  intelligence
                </span>
              }
              delay={0.55}
            />
            <div className="flex items-baseline gap-4 mt-2 flex-wrap">
              <PerspWord
                text={
                  <span className="font-serif text-[clamp(3rem,8vw,8rem)] leading-[0.9] text-foreground font-light tracking-[-0.02em]">
                    for the
                  </span>
                }
                delay={0.7}
              />
              <motion.span
                className="font-serif italic text-foreground/30 font-light text-[clamp(2.5rem,6vw,6rem)]"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              >
                enterprise.
              </motion.span>
            </div>
          </div>

          {/* Descriptor with typing effect */}
          <motion.div
            className="max-w-xl mb-14"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-1 rounded-full bg-foreground/30" />
              <div className="w-1 h-1 rounded-full bg-foreground/25" />
              <div className="w-1 h-1 rounded-full bg-foreground/20" />
            </div>
            <p className="text-base md:text-lg text-foreground/50 leading-relaxed font-sans font-light">
              AI, software, and data systems built for organizations that need infrastructure
              to outlast its authors. From Des Moines to the frontier.
            </p>
          </motion.div>

          {/* CTAs with magnetic effect */}
          <motion.div
            className="flex flex-wrap gap-5"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <MagneticButton primary>
              Start a project
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton>
              View our work
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right side - floating stats */}
        <motion.div
          className="mt-20 md:mt-32 grid grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-10 md:gap-y-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1.2 }}
        >
          {[
            { value: "120+", label: "Production systems", delay: 1.9 },
            { value: "22ms", label: "Median inference", delay: 2.0 },
            { value: "8 yrs", label: "Avg. team tenure", delay: 2.1 },
            { value: "100%", label: "Senior engineers", delay: 2.2 },
          ].map(({ value, label, delay }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              <motion.div
                className="font-serif text-5xl md:text-6xl lg:text-7xl font-light text-foreground tracking-tight"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
              >
                {value}
              </motion.div>
              <div className="text-[10px] tracking-[0.28em] uppercase text-foreground/35 mt-2 font-sans">
                {label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom decorative line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(36 15% 82% / 0.5), transparent)",
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 2.5, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      />
    </section>
  );
}

/* ── Magnetic button component ───────────────────────── */
function MagneticButton({
  children,
  primary = false,
}: {
  children: React.ReactNode;
  primary?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
    setPosition({ x, y });
  };

  const reset = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.a
      ref={ref}
      href="#contact"
      className={`group inline-flex items-center gap-3 px-8 py-4 rounded-full text-[13px] font-medium tracking-wide transition-all duration-400 ${
        primary
          ? "bg-foreground text-background hover:bg-foreground/85"
          : "text-foreground/70 hover:text-foreground border border-foreground/12 hover:border-foreground/25"
      }`}
      style={{ x: position.x, y: position.y }}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
    >
      {children}
    </motion.a>
  );
}

import { useEffect, useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Float, Environment, Sparkles, Icosahedron, Torus, Octahedron } from "@react-three/drei";
import * as THREE from "three";

/**
 * Persistent WebGL hero scene.
 * - Mouse-reactive distorted core
 * - Orbiting wireframe geometry
 * - Floating sparkles, HDR environment lighting
 * - SSR-safe: only mounts client-side
 */

function MouseTracker({ children }: { children: (p: { x: number; y: number }) => React.ReactNode }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setPos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: -(e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return <>{children(pos)}</>;
}

function CoreOrb({ mouse, color = "#3b82f6" }: { mouse: { x: number; y: number }; color?: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.15;
    ref.current.rotation.y += delta * 0.2;
    // ease-toward mouse
    ref.current.position.x += (mouse.x * 0.6 - ref.current.position.x) * 0.05;
    ref.current.position.y += (mouse.y * 0.4 - ref.current.position.y) * 0.05;
  });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.4, 24]} />
      <MeshDistortMaterial
        color={color}
        roughness={0.15}
        metalness={0.9}
        distort={0.45}
        speed={2.2}
        emissive={color}
        emissiveIntensity={0.25}
      />
    </mesh>
  );
}

function OrbitingRing({ radius = 2.6, speed = 0.4, tilt = 0.4, color = "#60a5fa" }: { radius?: number; speed?: number; tilt?: number; color?: string }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((s) => {
    if (ref.current) ref.current.rotation.z = s.clock.elapsedTime * speed;
  });
  return (
    <group ref={ref} rotation={[tilt, tilt * 0.5, 0]}>
      <Torus args={[radius, 0.012, 8, 128]}>
        <meshBasicMaterial color={color} transparent opacity={0.45} />
      </Torus>
    </group>
  );
}

function Satellite({ orbit = 2.6, speed = 0.6, offset = 0, tilt = 0.4, shape = "ico" }: { orbit?: number; speed?: number; offset?: number; tilt?: number; shape?: "ico" | "oct" }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((s) => {
    if (!ref.current) return;
    const t = s.clock.elapsedTime * speed + offset;
    ref.current.position.x = Math.cos(t) * orbit;
    ref.current.position.y = Math.sin(t) * orbit * Math.sin(tilt);
    ref.current.position.z = Math.sin(t) * orbit * Math.cos(tilt);
    ref.current.rotation.x = t;
    ref.current.rotation.y = t * 0.7;
  });
  const Geo = shape === "ico" ? Icosahedron : Octahedron;
  return (
    <mesh ref={ref}>
      <Geo args={[0.18, 0]} />
      <meshStandardMaterial color="#93c5fd" metalness={0.8} roughness={0.2} emissive="#3b82f6" emissiveIntensity={0.5} />
    </mesh>
  );
}

export function Scene3D({
  className = "w-full h-full",
  variant = "hero",
}: {
  className?: string;
  variant?: "hero" | "ambient" | "compact";
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // SSR/hydration placeholder — keep layout stable
    return <div className={className} aria-hidden />;
  }

  const intensity = variant === "ambient" ? 0.4 : 1;

  return (
    <div className={className}>
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.35} />
          <directionalLight position={[5, 5, 5]} intensity={1.2 * intensity} color="#ffffff" />
          <pointLight position={[-4, -3, -3]} intensity={1.5 * intensity} color="#3b82f6" />
          <pointLight position={[4, 3, -2]} intensity={0.8 * intensity} color="#60a5fa" />

          <MouseTracker>
            {(mouse) => (
              <Float speed={1.2} rotationIntensity={0.4} floatIntensity={0.8}>
                <CoreOrb mouse={mouse} />
              </Float>
            )}
          </MouseTracker>

          <OrbitingRing radius={2.2} speed={0.3} tilt={0.5} />
          <OrbitingRing radius={2.8} speed={-0.2} tilt={-0.3} color="#93c5fd" />
          <OrbitingRing radius={3.4} speed={0.15} tilt={0.8} color="#3b82f6" />

          <Satellite orbit={2.2} speed={0.7} offset={0} tilt={0.5} />
          <Satellite orbit={2.8} speed={-0.5} offset={1.5} tilt={-0.3} shape="oct" />
          <Satellite orbit={3.4} speed={0.4} offset={3} tilt={0.8} />
          <Satellite orbit={2.5} speed={-0.6} offset={4.5} tilt={0.2} shape="oct" />

          <Sparkles count={60} scale={8} size={2} speed={0.4} color="#60a5fa" opacity={0.6} />

          <Environment preset="city" />
        </Suspense>
      </Canvas>
    </div>
  );
}

/** Lower-cost ambient backdrop for non-hero pages. */
export function AmbientScene3D({ className = "absolute inset-0 -z-10 opacity-60" }: { className?: string }) {
  return <Scene3D className={className} variant="ambient" />;
}

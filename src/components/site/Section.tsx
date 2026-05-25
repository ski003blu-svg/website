import { cn } from "@/lib/utils";

export function Section({
  children,
  className,
  dark = false,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 md:py-28",
        dark && "bg-[hsl(220_15%_6%)] text-white",
        className,
      )}
    >
      <div className="max-w-7xl mx-auto px-6">{children}</div>
    </section>
  );
}

export function SectionEyebrow({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <div
      className={cn(
        "text-xs font-mono uppercase tracking-widest mb-4",
        dark ? "text-primary-glow" : "text-primary",
      )}
    >
      {children}
    </div>
  );
}

export function SectionTitle({
  children,
  dark = false,
  className,
}: {
  children: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "text-3xl md:text-5xl font-bold tracking-tight leading-[1.05] text-balance",
        dark ? "text-white" : "text-foreground",
        className,
      )}
    >
      {children}
    </h2>
  );
}

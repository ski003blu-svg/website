import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { submitConsultation } from "@/lib/contact.functions";
import { toast } from "sonner";

function InputField({
  label,
  name,
  type = "text",
  required = false,
  span = 1,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  span?: 1 | 2;
}) {
  const [focused, setFocused] = useState(false);

  return (
    <div className={span === 2 ? "md:col-span-2" : ""}>
      <motion.div
        className="relative"
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <label className="block text-[10px] tracking-[0.3em] uppercase font-sans text-foreground/40 mb-2.5 font-medium">
          {label} {required && <span className="text-gold">*</span>}
        </label>
        <div
          className="relative"
          style={{
            borderBottom: focused
              ? "1px solid hsl(20 12% 10% / 0.6)"
              : "1px solid hsl(20 12% 10% / 0.15)",
            transition: "border-color 0.3s ease",
          }}
        >
          <input
            name={name}
            type={type}
            required={required}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            className="w-full bg-transparent py-3 text-[15px] font-light text-foreground placeholder:text-foreground/25 outline-none font-sans"
            placeholder={type === "email" ? "you@company.com" : ""}
          />
        </div>
      </motion.div>
    </div>
  );
}

function TextareaField() {
  const [focused, setFocused] = useState(false);

  return (
    <div className="md:col-span-2">
      <label className="block text-[10px] tracking-[0.3em] uppercase font-sans text-foreground/40 mb-2.5 font-medium">
        What are you building?
      </label>
      <div
        style={{
          borderBottom: focused
            ? "1px solid hsl(20 12% 10% / 0.6)"
            : "1px solid hsl(20 12% 10% / 0.15)",
          transition: "border-color 0.3s ease",
        }}
      >
        <textarea
          name="message"
          rows={4}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder="Share your vision, constraints, timeline..."
          className="w-full bg-transparent py-3 text-[15px] font-light text-foreground placeholder:text-foreground/25 outline-none resize-none font-sans"
        />
      </div>
    </div>
  );
}

export function ContactSection() {
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const submit = useServerFn(submitConsultation);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });
  const yHeader = useTransform(scrollYProgress, [0, 1], [40, 0]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setLoading(true);
    try {
      await submit({
        data: {
          name: String(fd.get("name") || ""),
          email: String(fd.get("email") || ""),
          company: String(fd.get("company") || ""),
          phone: String(fd.get("phone") || ""),
          service: String(fd.get("service") || ""),
          budget: "",
          message: String(fd.get("message") || ""),
        },
      });
      setDone(true);
      toast.success("Message received. A senior partner will respond within 24h.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-28 md:py-40 overflow-hidden"
      style={{ background: "hsl(20 12% 8%)" }}
    >
      {/* Ambient warm glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 30% 60%, hsl(42 60% 40% / 0.10), transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
        {/* Header */}
        <motion.div className="mb-16 md:mb-24" style={{ y: yHeader }}>
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="w-6 h-px bg-white/20" />
            <span className="text-[10px] tracking-[0.35em] uppercase text-white/35 font-sans">
              Start a project
            </span>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h2
              className="font-serif text-[clamp(2.8rem,7vw,6.5rem)] font-light text-white leading-[0.92] tracking-tight"
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              Let's build
              <br />
              <span className="italic text-white/35">something</span>
              <br />
              remarkable.
            </motion.h2>
          </div>
        </motion.div>

        {/* Grid: form + info */}
        <div className="grid lg:grid-cols-[1.6fr_1fr] gap-16 md:gap-24">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {done ? (
              <motion.div
                className="py-20 text-center"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <div className="font-serif text-3xl font-light text-white mb-4">
                  Message received.
                </div>
                <p className="text-white/45 text-sm font-light">
                  A senior partner will reach out within one business day.
                </p>
                <button
                  onClick={() => setDone(false)}
                  className="mt-8 text-xs tracking-widest uppercase text-white/35 hover:text-white/60 transition-colors"
                >
                  Send another
                </button>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-10">
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-8">
                  <InputField name="name" label="Full name" required />
                  <InputField name="email" label="Work email" type="email" required />
                  <InputField name="company" label="Company" />
                  <InputField name="phone" label="Phone" type="tel" />
                  <div>
                    <label className="block text-[10px] tracking-[0.3em] uppercase font-sans text-white/40 mb-2.5 font-medium">
                      Service of interest
                    </label>
                    <div
                      style={{
                        borderBottom: "1px solid hsl(0 0% 100% / 0.12)",
                      }}
                    >
                      <select
                        name="service"
                        className="w-full bg-transparent py-3 text-[15px] font-light text-white/70 outline-none font-sans appearance-none cursor-pointer"
                      >
                        <option value="" className="bg-[hsl(20_12%_12%)]">Select...</option>
                        {[
                          "AI & Machine Learning",
                          "Software Development",
                          "Data Analytics",
                          "DevOps & Cloud",
                          "Website Development",
                          "API Integration",
                          "Not sure yet",
                        ].map((o) => (
                          <option key={o} value={o} className="bg-[hsl(20_12%_12%)]">
                            {o}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div /> {/* spacer */}
                  <div className="md:col-span-2">
                    <label className="block text-[10px] tracking-[0.3em] uppercase font-sans text-white/40 mb-2.5 font-medium">
                      What are you building?
                    </label>
                    <div style={{ borderBottom: "1px solid hsl(0 0% 100% / 0.12)" }}>
                      <textarea
                        name="message"
                        rows={4}
                        placeholder="Share your vision, constraints, timeline..."
                        className="w-full bg-transparent py-3 text-[15px] font-light text-white/70 placeholder:text-white/20 outline-none resize-none font-sans"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-[13px] font-medium tracking-wide text-foreground bg-white hover:bg-white/90 transition-colors disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Request consultation"}
                  <ArrowUpRight className="size-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </form>
            )}
          </motion.div>

          {/* Contact info */}
          <motion.div
            className="space-y-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {[
              {
                icon: MapPin,
                label: "Headquarters",
                content: (
                  <span>
                    801 Grand Ave
                    <br />
                    Des Moines, IA 50309
                  </span>
                ),
              },
              {
                icon: Mail,
                label: "Email",
                content: (
                  <a href="mailto:hello@bluski.io" className="hover:text-white/80 transition-colors">
                    hello@bluski.io
                  </a>
                ),
              },
              {
                icon: Phone,
                label: "Phone",
                content: <span>(515) 555-0184</span>,
              },
            ].map(({ icon: Icon, label, content }) => (
              <div key={label} className="flex gap-5">
                <div className="size-9 rounded-full border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="size-3.5 text-white/35" />
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.25em] uppercase text-white/25 mb-1.5 font-sans">
                    {label}
                  </div>
                  <div className="text-sm text-white/50 font-light leading-relaxed font-sans">
                    {content}
                  </div>
                </div>
              </div>
            ))}

            {/* Response time */}
            <div className="border-t border-white/8 pt-10">
              <p className="text-[13px] text-white/30 font-light leading-relaxed font-sans">
                Senior partner response within 1 business day. Discovery scheduled within 5 days.
                We don't route through SDRs.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

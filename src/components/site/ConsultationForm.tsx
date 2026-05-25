import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { submitConsultation } from "@/lib/contact.functions";
import { toast } from "sonner";

export function ConsultationForm({ defaultService, compact = false }: { defaultService?: string; compact?: boolean }) {
  const submit = useServerFn(submitConsultation);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

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
          service: String(fd.get("service") || defaultService || ""),
          budget: String(fd.get("budget") || ""),
          message: String(fd.get("message") || ""),
        },
      });
      setDone(true);
      toast.success("Request received. We'll be in touch within 24h.");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="p-8 rounded-2xl border border-border bg-card text-center">
        <h3 className="text-xl font-bold mb-2">Request received.</h3>
        <p className="text-muted-foreground">A senior partner will respond within one business day.</p>
        <button
          onClick={() => setDone(false)}
          className="mt-6 text-sm font-medium text-primary hover:underline"
        >
          Send another →
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className={compact ? "grid grid-cols-1 gap-4" : "grid grid-cols-1 md:grid-cols-2 gap-4"}>
        <Field name="name" label="Full name" required />
        <Field name="email" label="Work email" type="email" required />
        <Field name="company" label="Company" />
        <Field name="phone" label="Phone (optional)" type="tel" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SelectField
          name="service"
          label="Service of interest"
          defaultValue={defaultService}
          options={[
            "AI & Machine Learning",
            "Website Development",
            "Software Development",
            "Data Analytics",
            "Digital Marketing",
            "Branding",
            "API Integration",
            "DevOps & Cloud",
            "Not sure yet",
          ]}
        />
        <SelectField
          name="budget"
          label="Engagement budget"
          options={["Under $25K", "$25K–$75K", "$75K–$200K", "$200K+", "Not yet defined"]}
        />
      </div>
      <div>
        <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
          What are you trying to build?
        </label>
        <textarea
          name="message"
          rows={5}
          className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Share context, constraints, and timeline."
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full md:w-auto px-8 py-3.5 bg-primary text-primary-foreground font-semibold rounded-xl shadow-[var(--shadow-elegant)] hover:translate-y-[-1px] transition-transform disabled:opacity-60"
      >
        {loading ? "Sending..." : "Request consultation →"}
      </button>
    </form>
  );
}

function Field({
  name,
  label,
  type = "text",
  required = false,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}

function SelectField({
  name,
  label,
  options,
  defaultValue,
}: {
  name: string;
  label: string;
  options: string[];
  defaultValue?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">
        {label}
      </label>
      <select
        name={name}
        defaultValue={defaultValue}
        className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

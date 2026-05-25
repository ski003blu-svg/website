import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(2000),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      company: data.company || null,
      message: data.message,
    });
    if (error) {
      console.error("contact submit error", error);
      throw new Error("Failed to submit message. Please try again.");
    }
    return { ok: true };
  });

const consultationSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  service: z.string().trim().max(120).optional().or(z.literal("")),
  budget: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
});

export const submitConsultation = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => consultationSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("consultation_requests").insert({
      name: data.name,
      email: data.email,
      company: data.company || null,
      phone: data.phone || null,
      service: data.service || null,
      budget: data.budget || null,
      message: data.message || null,
    });
    if (error) {
      console.error("consultation submit error", error);
      throw new Error("Failed to submit request. Please try again.");
    }
    return { ok: true };
  });

const newsletterSchema = z.object({
  email: z.string().trim().email().max(255),
});

export const subscribeNewsletter = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => newsletterSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin
      .from("newsletter_subscribers")
      .insert({ email: data.email });
    if (error && !error.message.includes("duplicate")) {
      console.error("newsletter error", error);
      throw new Error("Failed to subscribe.");
    }
    return { ok: true };
  });

const applicationSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  role: z.string().trim().min(1).max(120),
  portfolio_url: z.string().trim().url().max(500).optional().or(z.literal("")),
  cover_letter: z.string().trim().max(4000).optional().or(z.literal("")),
});

export const submitApplication = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => applicationSchema.parse(input))
  .handler(async ({ data }) => {
    const { error } = await supabaseAdmin.from("job_applications").insert({
      name: data.name,
      email: data.email,
      role: data.role,
      portfolio_url: data.portfolio_url || null,
      cover_letter: data.cover_letter || null,
    });
    if (error) {
      console.error("application error", error);
      throw new Error("Failed to submit application.");
    }
    return { ok: true };
  });

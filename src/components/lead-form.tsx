"use client";

import { useState } from "react";
import { ArrowRight, Check, TriangleAlert } from "lucide-react";

type LeadType = "waitlist" | "counselor" | "institution";

const copy: Record<LeadType, { title: string; intro: string; cta: string; success: string }> = {
  waitlist: {
    title: "Get early access",
    intro: "We are opening the pathway planner in stages. Leave your email and we will contact you when your education stage and destination are covered.",
    cta: "Join the waitlist",
    success: "You are on the list. We will only email you about the launch.",
  },
  counselor: {
    title: "Talk to us about counselor access",
    intro: "Tell us about your practice or school. We are onboarding a small first group of counselors to shape the research workspace.",
    cta: "Request counselor access",
    success: "Request received. We will reply personally — usually within two working days.",
  },
  institution: {
    title: "List or update your institution",
    intro: "Claim your institution, propose source-backed updates, or ask about a verified profile. Editorial review stays independent.",
    cta: "Contact the partnerships team",
    success: "Request received. We will reply personally — usually within two working days.",
  },
};

export function LeadForm({ type }: { type: LeadType }) {
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const text = copy[type];
  const extended = type !== "waitlist";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("submitting");
    setError("");
    const form = new FormData(event.currentTarget);
    const payload = {
      type,
      email: String(form.get("email") ?? ""),
      name: String(form.get("name") ?? ""),
      organization: String(form.get("organization") ?? ""),
      message: String(form.get("message") ?? ""),
      source_path: window.location.pathname,
    };
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(body?.error ?? "Something went wrong. Please try again.");
      }
      setState("success");
    } catch (err) {
      setState("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (state === "success") {
    return (
      <div className="lead-form lead-form-success" role="status">
        <Check size={22} />
        <h3>{text.success}</h3>
      </div>
    );
  }

  return (
    <form className="lead-form" onSubmit={onSubmit}>
      <h3>{text.title}</h3>
      <p>{text.intro}</p>
      <div className={extended ? "field-row" : undefined}>
        <div className="field">
          <label htmlFor={`lead-email-${type}`}>Email</label>
          <input id={`lead-email-${type}`} name="email" type="email" required placeholder="you@example.com" />
        </div>
        {extended && (
          <div className="field">
            <label htmlFor={`lead-name-${type}`}>Name</label>
            <input id={`lead-name-${type}`} name="name" required placeholder="Your name" />
          </div>
        )}
      </div>
      {extended && (
        <>
          <div className="field">
            <label htmlFor={`lead-org-${type}`}>{type === "institution" ? "Institution" : "School or organization"}</label>
            <input id={`lead-org-${type}`} name="organization" required placeholder="Organization name" />
          </div>
          <div className="field">
            <label htmlFor={`lead-message-${type}`}>What would you like to do?</label>
            <textarea id={`lead-message-${type}`} name="message" rows={3} placeholder={type === "institution" ? "e.g. Update our published program information" : "e.g. I advise students applying abroad"} />
          </div>
        </>
      )}
      {state === "error" && (
        <p className="form-error" role="alert"><TriangleAlert size={14} /> {error}</p>
      )}
      <button className="button button-dark" type="submit" disabled={state === "submitting"}>
        {state === "submitting" ? "Sending…" : text.cta} <ArrowRight size={15} />
      </button>
    </form>
  );
}

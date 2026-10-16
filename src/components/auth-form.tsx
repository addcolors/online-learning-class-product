"use client";

import { useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Check, TriangleAlert } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Mode = "sign-in" | "sign-up";
type Action = Mode | "magic-link";

export function AuthForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") ?? "/workspace";
  const formRef = useRef<HTMLFormElement>(null);

  const [mode, setMode] = useState<Mode>("sign-in");
  const [state, setState] = useState<"idle" | "busy" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  async function run(action: Action) {
    const form = formRef.current;
    if (!form?.reportValidity()) return;
    if (!configured) {
      setState("error");
      setMessage("Authentication is not configured yet. Add Supabase environment variables to enable sign-in.");
      return;
    }
    const data = new FormData(form);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");
    setState("busy");
    setMessage("");
    const supabase = createClient();
    const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent(next)}`;

    const result =
      action === "magic-link"
        ? await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: redirectTo } })
        : action === "sign-up"
          ? await supabase.auth.signUp({ email, password, options: { emailRedirectTo: redirectTo } })
          : await supabase.auth.signInWithPassword({ email, password });

    if (result.error) {
      setState("error");
      setMessage(result.error.message);
      return;
    }
    if (action === "sign-in") {
      router.push(next.startsWith("/") && !next.startsWith("//") ? next : "/workspace");
      router.refresh();
      return;
    }
    setState("sent");
    setMessage(action === "magic-link" ? "Check your email for the sign-in link." : "Check your email to confirm your account.");
  }

  if (state === "sent") {
    return (
      <div className="lead-form lead-form-success" role="status">
        <Check size={22} />
        <h3>{message}</h3>
        <button className="text-arrow" type="button" onClick={() => setState("idle")}>Use a different email</button>
      </div>
    );
  }

  return (
    <form ref={formRef} className="grid" style={{ marginTop: 30 }} onSubmit={(event) => { event.preventDefault(); void run(mode); }}>
      {!configured && (
        <p className="form-error" role="status"><TriangleAlert size={14} /> Demo mode: sign-in activates when Supabase environment variables are configured.</p>
      )}
      <div className="field">
        <label htmlFor="email">Email address</label>
        <input id="email" name="email" type="email" required placeholder="you@example.com" autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" required minLength={6} placeholder="••••••••" autoComplete={mode === "sign-in" ? "current-password" : "new-password"} />
      </div>
      {state === "error" && <p className="form-error" role="alert"><TriangleAlert size={14} /> {message}</p>}
      <button className="button button-dark" type="submit" disabled={state === "busy"}>
        {state === "busy" ? "Please wait…" : mode === "sign-in" ? "Sign in" : "Create account"} <ArrowRight size={15} />
      </button>
      <div className="field-row">
        <button className="button button-outline" type="button" disabled={state === "busy"} onClick={() => void run("magic-link")}>Email me a magic link</button>
        <button className="button button-outline" type="button" onClick={() => setMode(mode === "sign-in" ? "sign-up" : "sign-in")}>
          {mode === "sign-in" ? "Create an account" : "Back to sign in"}
        </button>
      </div>
    </form>
  );
}

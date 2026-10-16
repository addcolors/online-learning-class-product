import type { Metadata } from "next";
import { Suspense } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs, Eyebrow } from "@/components/ui";
import { AuthForm } from "@/components/auth-form";

export const metadata: Metadata = { title: "Sign in", robots: { index: false } };

export default function Page() {
  return <>
    <SiteHeader />
    <main className="page">
      <section className="section">
        <div className="shell" style={{ maxWidth: 620 }}>
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Sign in" }]} />
          <div className="form-card">
            <Eyebrow>Your workspace</Eyebrow>
            <h1 style={{ fontSize: 52 }}>Welcome back.</h1>
            <p className="lead">Sign in to continue a pathway or open your organization workspace.</p>
            <Suspense fallback={null}><AuthForm /></Suspense>
            <p className="micro-note" style={{ marginTop: 25 }}>We use password or a one-time email link. Your pathway, saved options and alerts stay attached to your account.</p>
          </div>
        </div>
      </section>
    </main>
    <SiteFooter />
  </>;
}

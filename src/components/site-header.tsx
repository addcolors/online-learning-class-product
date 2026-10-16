"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const nav = [
  { label: "Explore", href: "/explore" },
  { label: "Study abroad", href: "/study-abroad" },
  { label: "Scholarships", href: "/scholarships" },
  { label: "For counselors", href: "/for-counselors" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const router = useRouter();
  const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  useEffect(() => {
    if (!configured) return;
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setSignedIn(Boolean(data.user)));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSignedIn(Boolean(session?.user)));
    return () => subscription.unsubscribe();
  }, [configured]);

  async function signOut() {
    await createClient().auth.signOut();
    setSignedIn(false);
    router.push("/");
    router.refresh();
  }
  return (
    <header className="site-header">
      <div className="utility-bar">
        <div className="shell utility-inner">
          <span>Independent education pathways, with sources you can inspect.</span>
          <div><Link href="/methodology">Methodology</Link><Link href="/coverage">Coverage</Link><Link href="/trust">Trust center</Link></div>
        </div>
      </div>
      <div className="shell nav-row">
        <Link href="/" className="brand" aria-label="Online Learning Class home">
          <span className="brand-mark">OLC</span>
          <span className="brand-copy"><strong>Online Learning</strong><em>Class</em></span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map((item) => <Link key={item.href} href={item.href}>{item.label}{item.label === "Explore" && <ChevronDown size={14} />}</Link>)}
        </nav>
        <div className="nav-actions">
          <Link href="/explore" className="icon-link" aria-label="Search"><Search size={19} /></Link>
          {signedIn ? (
            <>
              <Link href="/workspace" className="text-link">My workspace</Link>
              <button type="button" className="text-link" onClick={() => void signOut()}>Sign out</button>
            </>
          ) : (
            <Link href="/login" className="text-link">Sign in</Link>
          )}
          <Link href="/plan" className="button button-dark button-small">Plan my path <span>→</span></Link>
          <button className="mobile-menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      {open && <nav className="mobile-nav" aria-label="Mobile navigation">{nav.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}<Link href="/plan" className="button button-dark">Plan my path</Link></nav>}
    </header>
  );
}

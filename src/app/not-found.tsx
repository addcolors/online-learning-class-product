import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
export default function NotFound() { return <><SiteHeader /><main className="page"><section className="section"><div className="shell empty-state"><p className="eyebrow" style={{ justifyContent: "center" }}><span />404</p><h1 style={{ fontSize: 58 }}>This route is not in our map.</h1><p className="lead" style={{ marginInline: "auto" }}>Try the education explorer or return to the homepage.</p><div className="hero-actions" style={{ justifyContent: "center" }}><Link href="/explore" className="button button-dark">Explore options</Link><Link href="/" className="button button-outline">Return home</Link></div></div></section></main><SiteFooter /></>; }

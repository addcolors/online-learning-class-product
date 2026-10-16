import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs, Eyebrow } from "@/components/ui";
import { countries } from "@/lib/data";
export const metadata: Metadata = { title: "Explore study destinations", description: "Compare representative destination context, program coverage and planning costs." };
export default function Page() { return <><SiteHeader /><main className="page"><section className="page-hero"><div className="shell"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Countries" }]} /><Eyebrow>Destination context</Eyebrow><h1>Explore education around the world.</h1><p className="lead">Start with representative destination guidance, then inspect institutions, programs and published requirements.</p></div></section><section className="section"><div className="shell"><div className="grid grid-2">{countries.map((country) => <Link className="country-card" style={{ background: country.color }} href={`/countries/${country.slug}`} key={country.slug}><div className="country-code"><span>{country.code}</span><ArrowRight size={20} /></div><h3>{country.name}</h3><p>{country.note}</p><footer><span>{country.programs} covered programs</span><span>{country.cost}</span></footer></Link>)}</div></div></section></main><SiteFooter /></>; }

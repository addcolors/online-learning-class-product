import Link from "next/link";
import { ArrowRight, Search } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Breadcrumbs, Eyebrow, InstitutionCard, ProgramCard, StatusBadge } from "@/components/ui";
import { careers, courses, curricula, institutions, programs, scholarships } from "@/lib/data";

export type CatalogKind = "programs" | "institutions" | "schools" | "scholarships" | "courses" | "careers" | "curricula";

const copy: Record<CatalogKind, { eyebrow: string; title: string; description: string }> = {
  programs: { eyebrow: "Formal study", title: "Explore programs", description: "Compare representative programs by stage, destination, delivery mode and published requirements." },
  institutions: { eyebrow: "Education providers", title: "Explore institutions", description: "Research universities, applied-science institutions and schools with visible source status." },
  schools: { eyebrow: "For families", title: "Explore schools", description: "Compare representative early-years, primary and secondary routes without treating fit or availability as guaranteed." },
  scholarships: { eyebrow: "Funding routes", title: "Explore scholarships", description: "Connect published award conditions and deadlines to the education plans you are considering." },
  courses: { eyebrow: "Short learning", title: "Explore courses", description: "Compare focused online and hybrid learning options separately from formal degree programs." },
  careers: { eyebrow: "What comes next", title: "Explore careers", description: "Understand different education and portfolio routes toward evolving fields of work." },
  curricula: { eyebrow: "School pathways", title: "Explore curricula", description: "Understand curriculum structures and the questions to ask when moving between education systems." },
};

export function CatalogPage({ kind }: { kind: CatalogKind }) {
  const meta = copy[kind];
  const visibleInstitutions = kind === "schools" ? institutions.filter((item) => item.stages.includes("Secondary")) : institutions;
  const visiblePrograms = kind === "schools" ? programs.filter((item) => item.stage === "Secondary") : programs;
  return <><SiteHeader /><main className="page"><section className="page-hero"><div className="shell"><Breadcrumbs items={[{ label: "Home", href: "/" }, { label: meta.title }]} /><div className="page-hero-row"><div><Eyebrow>{meta.eyebrow}</Eyebrow><h1>{meta.title}</h1></div><p className="lead">{meta.description}</p></div><form className="filters"><input name="q" aria-label="Search" placeholder={`Search ${kind}...`} /><select aria-label="Stage" defaultValue=""><option value="">All stages</option><option>School</option><option>Undergraduate</option><option>Postgraduate</option></select><select aria-label="Country" defaultValue=""><option value="">All countries</option><option>Germany</option><option>United Kingdom</option><option>Netherlands</option><option>Canada</option></select><select aria-label="Sort" defaultValue="relevance"><option value="relevance">Most relevant</option><option value="reviewed">Recently reviewed</option></select><button className="button button-dark button-small"><Search size={15} /> Search</button></form></div></section><section className="section-tight"><div className="shell"><div className="results-head"><h2 style={{ fontSize: 28, margin: 0 }}>Representative results</h2><span>Coverage is intentionally limited while records are reviewed.</span></div>
  {kind === "programs" && <div className="program-grid">{visiblePrograms.map((item) => <ProgramCard program={item} key={item.slug} />)}</div>}
  {(kind === "institutions" || kind === "schools") && <div className="institution-grid">{visibleInstitutions.map((item) => <InstitutionCard institution={item} key={item.slug} />)}</div>}
  {kind === "scholarships" && <div className="grid grid-3">{scholarships.map((item) => <article className="simple-card" key={item.slug}><div className="program-card-top"><span className="stage-tag">{item.level}</span><StatusBadge status={item.status} /></div><h3 style={{ marginTop: 28 }}><Link href={`/scholarships/${item.slug}`}>{item.title}</Link></h3><p>{item.summary}</p><div className="fact-list"><div><small>Provider</small><strong>{item.provider}</strong></div><div><small>Published value</small><strong>{item.amount}</strong></div><div><small>Deadline</small><strong>{item.deadline}</strong></div></div></article>)}</div>}
  {kind === "courses" && <div className="grid grid-3">{courses.map((item) => <article className="simple-card" key={item.slug}><span className="stage-tag">{item.level}</span><h3 style={{ marginTop: 25 }}><Link href={`/courses/${item.slug}`}>{item.title}</Link></h3><p>{item.summary}</p><div className="fact-list"><div><small>Provider</small><strong>{item.provider}</strong></div><div><small>Format</small><strong>{item.mode} · {item.duration}</strong></div><div><small>Published price</small><strong>{item.price}</strong></div></div></article>)}</div>}
  {kind === "careers" && <div className="grid grid-3">{careers.map((item) => <article className="simple-card" key={item.slug}><span className="stage-tag">{item.family}</span><h3 style={{ marginTop: 25 }}><Link href={`/careers/${item.slug}`}>{item.title}</Link></h3><p>{item.summary}</p><div className="badge-row">{item.skills.map((skill) => <span className="status status-reviewed" key={skill}>{skill}</span>)}</div><Link href={`/careers/${item.slug}`} className="text-arrow" style={{ marginTop: 25 }}>Explore routes <ArrowRight size={14} /></Link></article>)}</div>}
  {kind === "curricula" && <div className="grid grid-3">{curricula.map((item) => <article className="simple-card" key={item.slug}><span className="stage-tag">{item.stages}</span><h3 style={{ marginTop: 25 }}><Link href={`/curricula/${item.slug}`}>{item.title}</Link></h3><p>{item.summary}</p><div className="fact-list"><div><small>Common locations</small><strong>{item.countries}</strong></div></div></article>)}</div>}
  </div></section></main><SiteFooter /></>;
}

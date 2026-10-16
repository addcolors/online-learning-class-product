import Link from "next/link";
import { ArrowUpRight, BookOpen, Check, Clock3, MapPin, ShieldCheck, TriangleAlert } from "lucide-react";
import type { Institution, Program, ReviewStatus } from "@/lib/data";

export function StatusBadge({ status }: { status: ReviewStatus }) {
  const config = {
    verified: { label: "Source verified", icon: Check },
    reviewed: { label: "Editorially reviewed", icon: ShieldCheck },
    "needs-review": { label: "Confirmation needed", icon: TriangleAlert },
  }[status];
  const Icon = config.icon;
  return <span className={`status status-${status}`}><Icon size={12} />{config.label}</span>;
}

export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <div className={`eyebrow ${light ? "eyebrow-light" : ""}`}><span />{children}</div>;
}

export function ProgramCard({ program }: { program: Program }) {
  return <article className="program-card">
    <div className="program-card-top"><span className="stage-tag">{program.stage}</span><StatusBadge status={program.status} /></div>
    <div><p className="card-kicker">{program.institution}</p><h3><Link href={`/programs/${program.slug}`}>{program.title}</Link></h3><p className="card-summary">{program.summary}</p></div>
    <div className="card-facts"><span><MapPin size={15} />{program.city}, {program.country}</span><span><Clock3 size={15} />{program.duration}</span><span><BookOpen size={15} />{program.mode}</span></div>
    <div className="program-card-footer"><div><small>Published tuition</small><strong>{program.tuition}</strong></div><Link href={`/programs/${program.slug}`} aria-label={`View ${program.title}`}><ArrowUpRight size={20} /></Link></div>
  </article>;
}

export function InstitutionCard({ institution }: { institution: Institution }) {
  return <article className="institution-card" style={{ "--institution-accent": institution.accent } as React.CSSProperties}>
    <div className="institution-monogram">{institution.name.split(" ").slice(0, 2).map((word) => word[0]).join("")}</div>
    <div><p className="card-kicker">{institution.type}</p><h3><Link href={`/institutions/${institution.slug}`}>{institution.name}</Link></h3><p>{institution.city}, {institution.country}</p></div>
    <div className="institution-meta"><span>{institution.stages.join(" · ")}</span><StatusBadge status={institution.status} /></div>
  </article>;
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return <nav aria-label="Breadcrumb" className="breadcrumbs">{items.map((item, index) => <span key={item.label}>{index > 0 && <b>/</b>}{item.href ? <Link href={item.href}>{item.label}</Link> : item.label}</span>)}</nav>;
}

export function DataNote({ checked, status }: { checked: string; status: ReviewStatus }) {
  return <div className="data-note"><ShieldCheck size={18} /><div><strong>Information you can inspect</strong><p>Checked {checked}. Important fields are linked to their source and review status.</p></div><StatusBadge status={status} /></div>;
}

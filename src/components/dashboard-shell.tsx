import Link from "next/link";
import { Bell, BookOpen, Building2, ClipboardCheck, FileSearch, LayoutDashboard, Settings, ShieldCheck, Users } from "lucide-react";

type Role = "counselor" | "learner" | "institution" | "reviewer";
const config = {
  counselor: { name: "Alex Morgan", role: "Senior counselor", links: [["Overview", "/counselor", LayoutDashboard], ["Students", "/counselor/students", Users], ["Research", "/counselor/research", FileSearch], ["Changes", "/counselor/changes", Bell], ["Reports", "/counselor/reports", ClipboardCheck]] },
  learner: { name: "Maria Kimani", role: "Pathway planner", links: [["My overview", "/workspace", LayoutDashboard], ["Pathways", "/workspace/pathways", BookOpen], ["Saved options", "/workspace/saved", FileSearch], ["Tasks", "/workspace/tasks", ClipboardCheck], ["Settings", "/workspace/settings", Settings]] },
  institution: { name: "Taylor Reed", role: "Institution editor", links: [["Overview", "/institution", LayoutDashboard], ["Institution", "/institution/profile", Building2], ["Submissions", "/institution/submissions", ClipboardCheck], ["Sources", "/institution/sources", FileSearch], ["Settings", "/institution/settings", Settings]] },
  reviewer: { name: "Jamie Chen", role: "Editorial reviewer", links: [["Review queue", "/review", ShieldCheck], ["Institutions", "/review/institutions", Building2], ["Changes", "/review/changes", Bell], ["Sources", "/review/sources", FileSearch], ["Audit", "/review/audit", ClipboardCheck]] },
} as const;

export function DashboardShell({ role, active, children }: { role: Role; active: string; children: React.ReactNode }) {
  const item = config[role];
  return <main className="dashboard-layout"><aside className="dashboard-sidebar"><Link href="/" className="brand"><span className="brand-mark">OLC</span><span className="brand-copy"><strong>Online Learning</strong><em>Class</em></span></Link><nav className="dashboard-nav">{item.links.map(([label, href, Icon]) => <Link href={href} key={href} className={active === label ? "active" : ""}><Icon size={17} /><span>{label}</span></Link>)}</nav><div className="dashboard-user"><div className="avatar">{item.name.split(" ").map((word) => word[0]).join("")}</div><div><strong>{item.name}</strong><span>{item.role}</span></div></div></aside><section className="dashboard-main"><header className="dashboard-topbar"><p>Demo workspace · Representative data</p><div className="dashboard-actions"><Link href="/" className="button button-outline button-small">View public site</Link><button className="button button-dark button-small">Create new</button></div></header>{children}</section></main>;
}

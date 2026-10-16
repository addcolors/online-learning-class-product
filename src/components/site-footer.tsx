import Link from "next/link";

const columns = [
  { title: "Explore", links: [["Programs", "/programs"], ["Institutions", "/institutions"], ["Schools", "/schools"], ["Scholarships", "/scholarships"], ["Countries", "/countries"]] },
  { title: "Plan", links: [["Build a pathway", "/plan"], ["Compare programs", "/compare"], ["Study abroad", "/study-abroad"], ["Careers", "/careers"], ["Courses", "/courses"]] },
  { title: "Partners", links: [["For counselors", "/for-counselors"], ["Counselor workspace", "/counselor"], ["For institutions", "/for-institutions"], ["Institution portal", "/institution"], ["Editorial review", "/review"]] },
  { title: "Trust", links: [["Our methodology", "/methodology"], ["Coverage", "/coverage"], ["Data sources", "/trust"], ["Corrections", "/trust#corrections"], ["Privacy", "/privacy"]] },
];

export function SiteFooter() {
  return <footer className="site-footer"><div className="shell footer-top"><div className="footer-intro"><Link href="/" className="brand brand-light"><span className="brand-mark">OLC</span><span className="brand-copy"><strong>Online Learning</strong><em>Class</em></span></Link><p>Clearer education decisions, from first school to future career.</p><span className="coverage-pill">Representative global coverage · expanding carefully</span></div><div className="footer-columns">{columns.map((column) => <div key={column.title}><h3>{column.title}</h3>{column.links.map(([label, href]) => <Link href={href} key={href}>{label}</Link>)}</div>)}</div></div><div className="shell footer-bottom"><p>© 2026 Online Learning Class. Guidance, not an admission decision.</p><div><Link href="/terms">Terms</Link><Link href="/privacy">Privacy</Link><Link href="/trust#disclosures">Disclosures</Link></div></div></footer>;
}

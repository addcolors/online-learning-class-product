import Link from "next/link";
import { ArrowRight, BriefcaseBusiness, Building2, Check, Compass, GraduationCap, Landmark, Search, ShieldCheck, Sparkles, WalletCards } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Eyebrow, ProgramCard } from "@/components/ui";
import { LeadForm } from "@/components/lead-form";
import { countries, programs } from "@/lib/data";

const intents = [
  { icon: Search, title: "Find a program", text: "Explore formal study by level, subject, place and delivery mode.", href: "/programs" },
  { icon: Compass, title: "Study abroad", text: "Understand routes, published requirements, costs and deadlines.", href: "/study-abroad" },
  { icon: WalletCards, title: "Find funding", text: "Connect scholarship conditions to the plans you are considering.", href: "/scholarships" },
  { icon: Building2, title: "Choose a school", text: "Compare curricula, age ranges and questions families should confirm.", href: "/schools" },
  { icon: BriefcaseBusiness, title: "Change career", text: "Compare degree, short-course and portfolio pathways toward a role.", href: "/careers" },
  { icon: GraduationCap, title: "Work with a counselor", text: "Share a source-backed plan and resolve questions together.", href: "/for-counselors" },
];

const steps = [
  ["01", "Tell us where you are now", "Add only the education, qualification, budget and preference details relevant to your decision."],
  ["02", "Compare possible routes", "See programs, published requirements, costs, alternatives and questions that still need confirmation."],
  ["03", "Create an action plan", "Turn decisions into document tasks, deadlines, funding scenarios and counselor questions."],
  ["04", "Monitor what changes", "Saved plans can surface reviewed changes to requirements, fees and application dates."],
];

export default function Home() {
  return <>
    <SiteHeader />
    <main className="page">
      <section className="hero"><div className="shell hero-grid">
        <div><Eyebrow>Education decisions, made clearer</Eyebrow><h1>Find your next <em>education path.</em></h1><p className="lead">Discover programs, understand published requirements, estimate costs, and build a source-backed plan for what comes next.</p><div className="hero-actions"><Link href="/plan" className="button button-dark">Build my pathway <ArrowRight size={16} /></Link><Link href="/explore" className="button button-outline">Explore options</Link></div><div className="trust-line"><span><Check size={13} /> Sources you can inspect</span><span><Check size={13} /> Clear review dates</span><span><Check size={13} /> No admission promises</span></div></div>
        <form className="search-panel" action="/programs"><h2>Start with your goal</h2><p>Search representative programs or create a personalized pathway.</p><div className="search-fields"><div className="field"><label htmlFor="q">What would you like to study?</label><input id="q" name="q" placeholder="e.g. Artificial intelligence" /></div><div className="field-row"><div className="field"><label htmlFor="stage">Current stage</label><select id="stage" name="stage" defaultValue=""><option value="" disabled>Select stage</option><option>Secondary</option><option>Undergraduate</option><option>Postgraduate</option><option>Professional</option></select></div><div className="field"><label htmlFor="country">Destination</label><select id="country" name="country" defaultValue=""><option value="">Any country</option>{countries.map((country) => <option key={country.slug}>{country.name}</option>)}</select></div></div><button className="button button-teal">Explore matching options <ArrowRight size={15} /></button></div><p className="micro-note"><ShieldCheck size={14} /> Results are planning guidance based on published information—not an admission decision.</p></form>
      </div></section>

      <section className="section"><div className="shell"><div className="section-head"><div><Eyebrow>Begin with the decision</Eyebrow><h2>What are you trying to do?</h2></div><p>Every route starts differently. Choose the question closest to yours and we will organize the next steps around it.</p></div><div className="intent-grid">{intents.map((intent, index) => { const Icon = intent.icon; return <Link className="intent-card" href={intent.href} key={intent.title}><span className="intent-number">0{index + 1}</span><Icon size={31} strokeWidth={1.5} /><h3>{intent.title}</h3><p>{intent.text}</p><span className="text-arrow">Start here <ArrowRight size={14} /></span></Link>; })}</div></div></section>

      <section className="section section-white"><div className="shell"><div className="section-head"><div><Eyebrow>From possibility to plan</Eyebrow><h2>A pathway, not another list of links.</h2></div><p>We separate what is published, what appears compatible, and what still requires confirmation.</p></div><div className="steps">{steps.map(([number, title, text]) => <div className="step" key={number}><div className="step-number">{number}</div><h3>{title}</h3><p>{text}</p></div>)}</div><div className="hero-actions"><Link className="button button-dark" href="/plan">Create a free pathway <ArrowRight size={15} /></Link></div></div></section>

      <section className="section"><div className="shell"><div className="section-head"><div><Eyebrow>Representative opportunities</Eyebrow><h2>Explore programs across stages.</h2></div><Link className="text-arrow" href="/programs">View all programs <ArrowRight size={14} /></Link></div><div className="program-grid">{programs.slice(0, 3).map((program) => <ProgramCard program={program} key={program.slug} />)}</div></div></section>

      <section className="section section-mint"><div className="shell"><div className="section-head"><div><Eyebrow>Destination context</Eyebrow><h2>Education systems are not interchangeable.</h2></div><p>Explore representative destination information alongside costs, institutions and the questions your qualification may raise.</p></div><div className="grid grid-4">{countries.map((country) => <Link className="country-card" style={{ background: country.color }} href={`/countries/${country.slug}`} key={country.slug}><div className="country-code"><span>{country.code}</span><ArrowRight size={20} /></div><h3>{country.name}</h3><p>{country.note}</p><footer><span>{country.programs} covered programs</span><span>{country.cost}</span></footer></Link>)}</div></div></section>

      <section className="section section-white"><div className="shell"><div className="section-head"><div><Eyebrow>Compare the whole decision</Eyebrow><h2>Tuition is only one part of fit.</h2></div><Link href="/compare" className="text-arrow">Open comparison <ArrowRight size={14} /></Link></div><div className="comparison-wrap"><table className="comparison"><thead><tr><th>Decision factor</th>{programs.slice(0, 3).map((p) => <th key={p.slug}>{p.title}</th>)}</tr></thead><tbody><tr><td>Destination</td>{programs.slice(0, 3).map((p) => <td key={p.slug}>{p.city}, {p.country}</td>)}</tr><tr><td>Published tuition</td>{programs.slice(0, 3).map((p) => <td key={p.slug}>{p.tuition}</td>)}</tr><tr><td>Duration</td>{programs.slice(0, 3).map((p) => <td key={p.slug}>{p.duration}</td>)}</tr><tr><td>Requirement signal</td><td>Review degree relevance</td><td>Module evidence needed</td><td>Portfolio required</td></tr><tr><td>Last checked</td>{programs.slice(0, 3).map((p) => <td key={p.slug}>{p.checked}</td>)}</tr></tbody></table></div></div></section>

      <section className="section section-dark"><div className="shell banner"><div><Eyebrow light>For counselors and schools</Eyebrow><h2>Research once. Explain every recommendation.</h2><p className="lead" style={{ color: "#b7cac5" }}>Manage student pathways, collect official evidence and see when a published change may affect an active plan.</p><div className="hero-actions"><Link href="/for-counselors" className="button button-light">Explore the workspace</Link><Link href="/counselor" className="button button-outline" style={{ color: "white", borderColor: "#54706b" }}>View demo dashboard</Link></div></div><div className="banner-panel"><Landmark size={32} strokeWidth={1.4} /><div className="metric-row"><div className="metric"><strong>124</strong><span>Active plans</span></div><div className="metric"><strong>08</strong><span>Changes to review</span></div><div className="metric"><strong>96%</strong><span>Source coverage</span></div></div><p className="micro-note" style={{ color: "#9fb3ae" }}><Sparkles size={14} /> Demonstration metrics illustrate the proposed workflow.</p></div></div></section>

      <section className="section"><div className="shell banner"><div><Eyebrow>Trust is a product feature</Eyebrow><h2>Know what we know—and what we do not.</h2><p className="lead">Consequential information carries a source, applicable intake, last-checked date and review state. Unknown information stays unknown until it can be confirmed.</p><Link href="/methodology" className="text-arrow">Read our methodology <ArrowRight size={14} /></Link></div><div className="simple-card"><ShieldCheck size={34} color="var(--teal)" /><h3 style={{ marginTop: 24 }}>Information you can inspect</h3><p>Official facts, platform interpretation and counselor notes are labeled separately. Commercial relationships do not change organic eligibility guidance.</p><div className="badge-row"><span className="status status-verified">Source verified</span><span className="status status-reviewed">Editorially reviewed</span><span className="status status-needs-review">Confirmation needed</span></div></div></div></section>

      <section className="section section-white"><div className="shell banner"><div><Eyebrow>Be first when your route opens</Eyebrow><h2>We are building the global education navigator.</h2><p className="lead">Coverage is opening in stages. Join the waitlist and we will tell you when your stage, subject and destination are ready.</p></div><LeadForm type="waitlist" /></div></section>
    </main>
    <SiteFooter />
  </>;
}

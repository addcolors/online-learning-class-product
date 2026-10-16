export type ReviewStatus = "verified" | "reviewed" | "needs-review";

export type Program = {
  slug: string;
  title: string;
  institution: string;
  institutionSlug: string;
  country: string;
  countrySlug: string;
  city: string;
  stage: string;
  subject: string;
  credential: string;
  mode: string;
  duration: string;
  tuition: string;
  tuitionValue: number;
  currency: string;
  intake: string;
  deadline: string;
  language: string;
  status: ReviewStatus;
  checked: string;
  summary: string;
  requirements: { label: string; value: string; state: "met" | "review" | "unknown" }[];
};

export type Institution = {
  slug: string;
  name: string;
  type: string;
  country: string;
  countrySlug: string;
  city: string;
  founded: string;
  summary: string;
  stages: string[];
  programs: number;
  status: ReviewStatus;
  checked: string;
  accent: string;
};

export const countries = [
  { slug: "germany", name: "Germany", code: "DE", programs: 18, note: "Public universities, applied sciences and research-led routes", cost: "€11k–€18k living estimate", color: "#d8e7df" },
  { slug: "united-kingdom", name: "United Kingdom", code: "GB", programs: 24, note: "Focused one-year master’s and broad undergraduate options", cost: "£22k–£39k total estimate", color: "#e6ddca" },
  { slug: "netherlands", name: "Netherlands", code: "NL", programs: 12, note: "English-taught programs and applied learning pathways", cost: "€20k–€34k total estimate", color: "#d9e5ed" },
  { slug: "canada", name: "Canada", code: "CA", programs: 15, note: "College, university and career-connected pathways", cost: "C$28k–C$48k total estimate", color: "#ead9d3" },
];

export const institutions: Institution[] = [
  { slug: "northbridge-university", name: "Northbridge University", type: "Public research university", country: "United Kingdom", countrySlug: "united-kingdom", city: "Manchester", founded: "1904", summary: "A research-led university with interdisciplinary programs in technology, society and public policy.", stages: ["Undergraduate", "Postgraduate", "Doctoral"], programs: 14, status: "verified", checked: "12 Oct 2026", accent: "#c86f4a" },
  { slug: "rheinland-institute-of-technology", name: "Rheinland Institute of Technology", type: "Public technical university", country: "Germany", countrySlug: "germany", city: "Cologne", founded: "1967", summary: "Technology and applied research programs with close links to regional industry and research institutes.", stages: ["Undergraduate", "Postgraduate"], programs: 11, status: "reviewed", checked: "09 Oct 2026", accent: "#176d68" },
  { slug: "amstel-school-of-applied-sciences", name: "Amstel School of Applied Sciences", type: "University of applied sciences", country: "Netherlands", countrySlug: "netherlands", city: "Amsterdam", founded: "1988", summary: "Practice-oriented education built around live briefs, project studios and international classrooms.", stages: ["Undergraduate", "Postgraduate"], programs: 8, status: "reviewed", checked: "04 Oct 2026", accent: "#305a7a" },
  { slug: "cedar-grove-international-school", name: "Cedar Grove International School", type: "Independent international school", country: "Canada", countrySlug: "canada", city: "Toronto", founded: "2001", summary: "An international school serving early years through secondary learners with inquiry-led teaching.", stages: ["Nursery", "Primary", "Secondary"], programs: 3, status: "needs-review", checked: "22 Sep 2026", accent: "#9a6a2e" },
];

export const programs: Program[] = [
  { slug: "msc-artificial-intelligence-northbridge", title: "MSc Artificial Intelligence", institution: "Northbridge University", institutionSlug: "northbridge-university", country: "United Kingdom", countrySlug: "united-kingdom", city: "Manchester", stage: "Postgraduate", subject: "Artificial Intelligence", credential: "MSc", mode: "On campus", duration: "12 months", tuition: "£24,800 / year", tuitionValue: 24800, currency: "GBP", intake: "September 2027", deadline: "30 June 2027", language: "English", status: "verified", checked: "12 Oct 2026", summary: "A project-led master’s covering responsible machine learning, intelligent systems and applied AI delivery.", requirements: [{ label: "Academic", value: "Relevant bachelor’s degree or equivalent", state: "review" }, { label: "English", value: "IELTS 7.0 with no component below 6.5", state: "met" }, { label: "Mathematics", value: "Prior quantitative study expected", state: "review" }] },
  { slug: "msc-data-science-rheinland", title: "MSc Data Science & Society", institution: "Rheinland Institute of Technology", institutionSlug: "rheinland-institute-of-technology", country: "Germany", countrySlug: "germany", city: "Cologne", stage: "Postgraduate", subject: "Data Science", credential: "MSc", mode: "On campus", duration: "24 months", tuition: "€680 / semester", tuitionValue: 1360, currency: "EUR", intake: "October 2027", deadline: "15 May 2027", language: "English", status: "reviewed", checked: "09 Oct 2026", summary: "Combines statistical computing with policy, ethics and the social consequences of data-intensive systems.", requirements: [{ label: "Academic", value: "Bachelor’s with 30 ECTS in quantitative modules", state: "review" }, { label: "English", value: "IELTS 6.5 or accepted equivalent", state: "met" }, { label: "Documents", value: "Module descriptions required", state: "unknown" }] },
  { slug: "bsc-digital-product-design-amstel", title: "BSc Digital Product Design", institution: "Amstel School of Applied Sciences", institutionSlug: "amstel-school-of-applied-sciences", country: "Netherlands", countrySlug: "netherlands", city: "Amsterdam", stage: "Undergraduate", subject: "Design", credential: "BSc", mode: "On campus", duration: "4 years", tuition: "€11,400 / year", tuitionValue: 11400, currency: "EUR", intake: "September 2027", deadline: "01 May 2027", language: "English", status: "reviewed", checked: "04 Oct 2026", summary: "A studio-based degree spanning product strategy, interaction design and responsible digital innovation.", requirements: [{ label: "Academic", value: "Recognized upper-secondary qualification", state: "review" }, { label: "English", value: "IELTS 6.0 or accepted equivalent", state: "met" }, { label: "Portfolio", value: "Digital portfolio and motivation task", state: "review" }] },
  { slug: "ib-middle-years-cedar-grove", title: "International Middle Years Pathway", institution: "Cedar Grove International School", institutionSlug: "cedar-grove-international-school", country: "Canada", countrySlug: "canada", city: "Toronto", stage: "Secondary", subject: "International curriculum", credential: "School pathway", mode: "On campus", duration: "5 years", tuition: "C$28,500 / year", tuitionValue: 28500, currency: "CAD", intake: "August 2027", deadline: "Rolling; confirm availability", language: "English", status: "needs-review", checked: "22 Sep 2026", summary: "Interdisciplinary secondary study with language, sciences, humanities, arts and community projects.", requirements: [{ label: "Age", value: "Age placement reviewed by admissions", state: "review" }, { label: "Records", value: "Two years of school reports", state: "review" }, { label: "Availability", value: "Seat availability must be confirmed", state: "unknown" }] },
];

export const scholarships = [
  { slug: "future-systems-scholarship", title: "Future Systems Scholarship", provider: "Northbridge University", amount: "£7,500", level: "Postgraduate", deadline: "01 May 2027", summary: "Merit-based tuition support for selected computing and engineering master’s applicants.", status: "verified" as ReviewStatus },
  { slug: "global-applied-learning-award", title: "Global Applied Learning Award", provider: "Amstel School of Applied Sciences", amount: "€5,000", level: "Undergraduate", deadline: "15 April 2027", summary: "Partial first-year support for international applicants with strong community or project work.", status: "reviewed" as ReviewStatus },
  { slug: "rheinland-access-grant", title: "Rheinland Access Grant", provider: "Regional Education Foundation", amount: "€4,800", level: "Postgraduate", deadline: "20 March 2027", summary: "Living-cost contribution for eligible international students entering quantitative programs.", status: "needs-review" as ReviewStatus },
];

export const courses = [
  { slug: "ai-product-foundations", title: "AI Product Foundations", provider: "Open Systems Studio", duration: "6 weeks", mode: "Online", level: "Professional", price: "$240", summary: "Build evaluation habits, map user risks and prototype an AI-assisted product workflow." },
  { slug: "academic-english-bridge", title: "Academic English Bridge", provider: "Global Language Collective", duration: "8 weeks", mode: "Online", level: "Pre-university", price: "$180", summary: "Structured writing, seminar participation and source use for international study." },
  { slug: "portfolio-for-digital-design", title: "Portfolio for Digital Design", provider: "Amstel Open Studio", duration: "4 weeks", mode: "Hybrid", level: "Undergraduate preparation", price: "€320", summary: "Develop and explain a small body of design work for portfolio-based applications." },
];

export const careers = [
  { slug: "ai-product-manager", title: "AI Product Manager", family: "Technology & product", outlook: "Growing", education: "Multiple routes", summary: "Coordinates user needs, model capabilities, evaluation, safety and product delivery.", skills: ["Product discovery", "AI evaluation", "Data literacy"] },
  { slug: "learning-experience-designer", title: "Learning Experience Designer", family: "Education & design", outlook: "Evolving", education: "Degree or portfolio route", summary: "Designs learning systems, simulations and evidence-rich digital experiences.", skills: ["Learning design", "Research", "Prototyping"] },
  { slug: "data-policy-analyst", title: "Data Policy Analyst", family: "Policy & research", outlook: "Growing", education: "Bachelor’s or postgraduate", summary: "Evaluates how data and automated systems affect institutions, regulation and society.", skills: ["Policy research", "Statistics", "Communication"] },
];

export const curricula = [
  { slug: "international-baccalaureate", title: "International Baccalaureate", stages: "Primary to diploma", countries: "Global", summary: "Inquiry-led international curricula with distinct primary, middle and diploma pathways." },
  { slug: "cambridge-international", title: "Cambridge International", stages: "Primary to advanced", countries: "Global", summary: "International subject pathways leading through lower secondary, IGCSE and advanced study." },
  { slug: "british-national-curriculum", title: "British National Curriculum", stages: "Early years to secondary", countries: "United Kingdom and international schools", summary: "Stage-based curriculum framework with national assessments and qualification routes." },
];

export const changeEvents = [
  { id: "chg-101", severity: "High", program: "MSc Artificial Intelligence", institution: "Northbridge University", field: "English requirement", previous: "IELTS 6.5", current: "IELTS 7.0", affected: 5, checked: "15 Oct 2026" },
  { id: "chg-102", severity: "Medium", program: "BSc Digital Product Design", institution: "Amstel School of Applied Sciences", field: "Annual tuition", previous: "€10,900", current: "€11,400", affected: 2, checked: "13 Oct 2026" },
  { id: "chg-103", severity: "High", program: "MSc Data Science & Society", institution: "Rheinland Institute of Technology", field: "Application deadline", previous: "31 May 2027", current: "15 May 2027", affected: 4, checked: "11 Oct 2026" },
];

export const learners = [
  { name: "Maria Kimani", initials: "MK", goal: "MSc Psychology", destinations: "UK · Ireland", progress: 84, issue: "Language score", deadline: "12 Nov", tone: "coral" },
  { name: "Samuel Adeyemi", initials: "SA", goal: "BSc Engineering", destinations: "Germany · Netherlands", progress: 72, issue: "Transcript review", deadline: "18 Nov", tone: "teal" },
  { name: "Lina Petrov", initials: "LP", goal: "MBA", destinations: "Canada · UK", progress: 91, issue: "Requirement changed", deadline: "21 Nov", tone: "blue" },
  { name: "Omar Rahman", initials: "OR", goal: "MSc Data Science", destinations: "Germany", progress: 63, issue: "Module evidence", deadline: "26 Nov", tone: "gold" },
];

export function getProgram(slug: string) { return programs.find((item) => item.slug === slug); }
export function getInstitution(slug: string) { return institutions.find((item) => item.slug === slug); }
export function getCountry(slug: string) { return countries.find((item) => item.slug === slug); }

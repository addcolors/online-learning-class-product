import { notFound } from "next/navigation";
import { SimpleDetail } from "@/components/simple-detail";
import { careers } from "@/lib/data";
export const instant = false;
export function generateStaticParams() { return careers.map((item) => ({ slug: item.slug })); }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const item = careers.find((x) => x.slug === slug); if (!item) notFound(); return <SimpleDetail type="Careers" back="/careers" title={item.title} kicker={item.family} summary={item.summary} facts={[["Outlook signal", item.outlook], ["Education routes", item.education], ["Representative skills", item.skills.join(", ")], ["Important", "Career outcomes and salaries are not guaranteed"]]} />; }

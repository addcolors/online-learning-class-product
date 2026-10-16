import { notFound } from "next/navigation";
import { SimpleDetail } from "@/components/simple-detail";
import { scholarships } from "@/lib/data";
export const instant = false;
export function generateStaticParams() { return scholarships.map((item) => ({ slug: item.slug })); }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const item = scholarships.find((x) => x.slug === slug); if (!item) notFound(); return <SimpleDetail type="Scholarships" back="/scholarships" title={item.title} kicker={`${item.level} funding`} summary={item.summary} facts={[["Provider", item.provider], ["Published value", item.amount], ["Published deadline", item.deadline], ["Important", "Eligibility and award are not guaranteed"]]} />; }

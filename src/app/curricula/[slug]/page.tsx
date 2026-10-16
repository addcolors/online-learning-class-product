import { notFound } from "next/navigation";
import { SimpleDetail } from "@/components/simple-detail";
import { curricula } from "@/lib/data";
export const instant = false;
export function generateStaticParams() { return curricula.map((item) => ({ slug: item.slug })); }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const item = curricula.find((x) => x.slug === slug); if (!item) notFound(); return <SimpleDetail type="Curricula" back="/curricula" title={item.title} kicker={item.stages} summary={item.summary} facts={[["Stages", item.stages], ["Common locations", item.countries], ["Transition guidance", "Compare subject depth, assessment and receiving-school requirements"], ["Important", "Similar subject names do not prove equivalence"]]} />; }

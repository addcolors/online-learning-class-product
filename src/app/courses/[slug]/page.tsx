import { notFound } from "next/navigation";
import { SimpleDetail } from "@/components/simple-detail";
import { courses } from "@/lib/data";
export const instant = false;
export function generateStaticParams() { return courses.map((item) => ({ slug: item.slug })); }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const item = courses.find((x) => x.slug === slug); if (!item) notFound(); return <SimpleDetail type="Courses" back="/courses" title={item.title} kicker={item.level} summary={item.summary} facts={[["Provider", item.provider], ["Duration", item.duration], ["Delivery", item.mode], ["Published price", item.price]]} />; }

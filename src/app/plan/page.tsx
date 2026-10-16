import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { PathwayPlanner } from "@/components/pathway-planner";
export const metadata: Metadata = { title: "Build your education pathway", description: "Create a preliminary source-backed education pathway based on your current stage, goals and preferences.", robots: { index: false, follow: true } };
export default function Page() { return <><SiteHeader /><PathwayPlanner /></>; }

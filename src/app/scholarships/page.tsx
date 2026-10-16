import type { Metadata } from "next";
import { CatalogPage } from "@/components/catalog-page";
export const metadata: Metadata = { title: "Explore scholarships", description: "Discover representative scholarship opportunities and their published conditions." };
export default function Page() { return <CatalogPage kind="scholarships" />; }

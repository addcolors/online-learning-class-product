import type { Metadata } from "next";
import { CatalogPage } from "@/components/catalog-page";
export const metadata: Metadata = { title: "Explore schools", description: "Compare representative school curricula, age ranges and family planning questions." };
export default function Page() { return <CatalogPage kind="schools" />; }

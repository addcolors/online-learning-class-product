import type { Metadata } from "next";
import { CatalogPage } from "@/components/catalog-page";
export const metadata: Metadata = { title: "Explore career pathways", description: "Compare education and portfolio routes toward evolving careers." };
export default function Page() { return <CatalogPage kind="careers" />; }

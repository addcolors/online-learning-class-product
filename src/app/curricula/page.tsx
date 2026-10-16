import type { Metadata } from "next";
import { CatalogPage } from "@/components/catalog-page";
export const metadata: Metadata = { title: "Explore curricula", description: "Understand representative school curriculum structures and transition questions." };
export default function Page() { return <CatalogPage kind="curricula" />; }

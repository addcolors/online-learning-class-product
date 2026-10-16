import type { Metadata } from "next";
import { CatalogPage } from "@/components/catalog-page";
export const metadata: Metadata = { title: "Explore education programs", description: "Compare representative global programs by stage, subject, destination and published requirements." };
export default function Page() { return <CatalogPage kind="programs" />; }

import type { Metadata } from "next";
import { CatalogPage } from "@/components/catalog-page";
export const metadata: Metadata = { title: "Explore short courses", description: "Compare representative online and hybrid courses separately from formal degree programs." };
export default function Page() { return <CatalogPage kind="courses" />; }

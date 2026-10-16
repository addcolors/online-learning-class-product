import type { Metadata } from "next";
import { CatalogPage } from "@/components/catalog-page";
export const metadata: Metadata = { title: "Explore institutions", description: "Research representative universities, colleges and education providers with transparent review status." };
export default function Page() { return <CatalogPage kind="institutions" />; }

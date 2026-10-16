import type { MetadataRoute } from "next";
export default function robots(): MetadataRoute.Robots { const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://onlinelearningclass.com"; return { rules: [{ userAgent: "*", allow: "/", disallow: ["/workspace/", "/counselor/", "/institution/", "/review/", "/login"] }], sitemap: `${base}/sitemap.xml`, host: base }; }

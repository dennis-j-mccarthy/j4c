import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/dashboard", "/punchlist", "/api/"],
    },
    sitemap: "https://jfc-tau.vercel.app/sitemap.xml",
  };
}

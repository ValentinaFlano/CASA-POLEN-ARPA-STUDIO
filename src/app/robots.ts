import type { MetadataRoute } from "next";
import { getAjustes } from "@/lib/content";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const { url } = await getAjustes();
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${url.replace(/\/$/, "")}/sitemap.xml`,
  };
}

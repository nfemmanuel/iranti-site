import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://iranti.dev";

  return [
    { url: base,                  lastModified: new Date("2026-04-05"), changeFrequency: "weekly",  priority: 1   },
    { url: `${base}/product`,     lastModified: new Date("2026-04-05"), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/benchmarks`,    lastModified: new Date("2026-04-05"), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/integrations`,lastModified: new Date("2026-04-05"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/docs`,        lastModified: new Date("2026-04-05"), changeFrequency: "weekly",  priority: 0.8 },
    // Competitive benchmark deep-dives
    { url: `${base}/benchmarks/competitive-recall`,    lastModified: new Date("2026-04-05"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/benchmarks/pool-efficiency`,        lastModified: new Date("2026-04-05"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/benchmarks/conflict-resolution`,   lastModified: new Date("2026-04-05"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/benchmarks/cross-session`,         lastModified: new Date("2026-04-05"), changeFrequency: "monthly", priority: 0.8 },
    // Internal benchmarks B1–B14
    { url: `${base}/benchmarks/b1`,  lastModified: new Date("2026-04-06"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/benchmarks/b2`,  lastModified: new Date("2026-04-06"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/benchmarks/b3`,  lastModified: new Date("2026-04-06"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/benchmarks/b4`,  lastModified: new Date("2026-04-06"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/benchmarks/b5`,  lastModified: new Date("2026-04-06"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/benchmarks/b6`,  lastModified: new Date("2026-04-06"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/benchmarks/b7`,  lastModified: new Date("2026-04-06"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/benchmarks/b8`,  lastModified: new Date("2026-04-06"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/benchmarks/b9`,  lastModified: new Date("2026-04-06"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/benchmarks/b10`, lastModified: new Date("2026-04-06"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/benchmarks/b11`, lastModified: new Date("2026-04-06"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/benchmarks/b12`, lastModified: new Date("2026-04-06"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/benchmarks/b13`, lastModified: new Date("2026-04-06"), changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/benchmarks/b14`, lastModified: new Date("2026-04-06"), changeFrequency: "monthly", priority: 0.7 },
    // Blog
    { url: `${base}/blog`,                          lastModified: new Date("2026-04-06"), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/blog/context-economy`,          lastModified: new Date("2026-04-06"), changeFrequency: "monthly", priority: 0.7 },
  ];
}

import type { MetadataRoute } from 'next'
import { SITE_URL as siteUrl } from '../../lib/site'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/editor`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: "2025-09-18",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/faq`,
      lastModified: "2025-09-18",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/blog/how-to-edit-a-fanfiction`,
      lastModified: "2025-09-26",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/blog/dialogue-rules-for-fanfiction`,
      lastModified: "2025-10-26",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/blog/dialogue-rules-for-books`,
      lastModified: "2025-11-14",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/blog/how-to-edit-a-book-or-novel`,
      lastModified: "2025-12-22",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/blog/write-better-fanfiction-dialogue`,
      lastModified: "2026-02-01",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/blog/how-to-punctuate-and-format-dialogue-in-your-novel`,
      lastModified: "2026-03-01",
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ]
}
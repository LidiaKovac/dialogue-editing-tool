import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://editingthing.com/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://editingthing.com/editor",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://editingthing.com/blog",
      lastModified: "2025-09-18",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://editingthing.com/faq",
      lastModified: "2025-09-18",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://editingthing.com/blog/how-to-edit-a-fanfiction",
      lastModified: "2025-09-26",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://editingthing.com/blog/dialogue-rules-for-fanfiction",
      lastModified: "2025-10-26",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://editingthing.com/blog/dialogue-rules-for-books",
      lastModified: "2025-11-14",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://editingthing.com/blog/how-to-edit-a-book-or-novel",
      lastModified: "2025-12-22",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://editingthing.com/blog/write-better-fanfiction-dialogue",
      lastModified: "2026-02-01",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: "https://editingthing.com/blog/how-to-punctuate-and-format-dialogue-in-your-novel",
      lastModified: "2026-03-01",
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ]
}
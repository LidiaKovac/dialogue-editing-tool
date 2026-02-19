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
      priority: 1,
    },
    {
      url: "https://editingthing.com/blog",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://editingthing.com/faq",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://editingthing.com/blog/how-to-edit-a-fanfiction",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://editingthing.com/blog/dialogue-rules-for-fanfiction",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://editingthing.com/blog/dialogue-rules-for-books",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://editingthing.com/blog/how-to-edit-a-book-or-novel",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://editingthing.com/blog/write-better-fanfiction-dialogue",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: "https://editingthing.com/blog/how-to-punctuate-and-format-dialogue-in-your-novel",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ]
}
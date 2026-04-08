import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/blog/*'],
      disallow: '/api',
    },
    sitemap: 'https://editingthing.com/sitemap.xml',
  }
}
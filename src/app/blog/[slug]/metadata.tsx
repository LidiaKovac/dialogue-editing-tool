import Script from "next/script";

type Author = { name: string; image?: string }

export const metadata = (
  title: string,
  categories: string[],
  date: string,
  slug: string,
  author: Author
) => ({
  title: `${title} | The Editing Blog`,
  description: `Read "${title}" by ${author.name}. Categories: ${categories?.join(", ") || "Uncategorized"
    }.`,
  alternates: {
    canonical: `https://editingthing.com/blog/${slug}`,
  },
  openGraph: {
    title: title,
    description: `A blog post by ${author.name
      } in categories: ${categories?.join(", ")}`,
    url: `https://editingthing.com/blog/${slug}`,
    type: "article",
    publishedTime: date,
    authors: "Lidia Kovac",
    tags: categories || [],
    images: author.image ? [{ url: author.image }] : [],
  },
  keywords: [
    ...(categories || []),
    ...title.toLowerCase().split(/\s+/).filter(w => w.length > 3),
    title.toLowerCase(),
  ],
  twitter: {
    card: "summary_large_image",
    title: title,
    description: `Read "${title}" by ${author.name}`,
    images: author.image ? [author.image] : undefined,
  },
})

export const JsonLD = ({ title, description, categories, date, author, url }: { title: string, description?: string, categories?: string[], date: string, author: Author, url: string }) => {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: description || `Read "${title}" – a blog post on dialogue editing by ${author.name}.`,
    datePublished: date,
    dateModified: date,
    author: {
      "@type": "Person",
      name: author.name,
    },
    publisher: {
      "@type": "Organization",
      name: "The Dialogue Thing",
      url: "https://editingthing.com",
    },
    articleSection: categories?.join(", ") || "Editing",
    image: author.image ? [author.image] : undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://editingthing.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://editingthing.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: url,
      },
    ],
  }
  return (
    <>
      <Script
        id="article-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Script
        id="breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </>
  )
}
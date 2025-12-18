import { sanity } from "../../lib/sanity/sanity.config"
import { PortableText } from "@portabletext/react"
import { Metadata } from "next"
import Link from "next/link"
import Script from "next/script"
import "../blog.scss"

type Props = { params: { slug: string } }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [post] =
    await sanity.fetch(`*[_type=="post" && slug.current=="${params.slug}"]
    {
      "date": publishedAt,
      title,
      slug,
      "categories": categories[]->{title}.title,
      "author": author->{name, "image": image.asset.url}
    } | order(date desc)`)

  if (!post) {
    return {
      title: "Post Not Found | The Editing Blog",
      description: "This blog post does not exist.",
    }
  }

  return {
    title: {
      template: `%s | The Editing Blog`,
      default: "The Editing Blog",
    },
    description: `Read "${post.title}" by ${post.author.name}. Categories: ${
      post.categories?.join(", ") || "Uncategorized"
    }.`,
    openGraph: {
      title: post.title,
      description: `A blog post by ${
        post.author.name
      } in categories: ${post.categories?.join(", ")}`,
      url: `https://editingthing.com/blog/${post.slug.current}`,
      type: "article",
      publishedTime: post.date,
      authors: "Lidia Kovac",
      tags: post.categories || [],
      images: post.author.image ? [{ url: post.author.image }] : [],
    },
    keywords: post.categories || [],
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: `Read "${post.title}" by ${post.author.name}`,
      images: post.author.image ? [post.author.image] : undefined,
    },
  }
}
export default async function BlogPost({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>
}>) {
  const { slug } = await params
  const [post] = await sanity.fetch(`*[_type=="post" && slug.current=="${slug}"]
    {
      "date":publishedAt,
      _id, 
      title, slug,
      "blocks": body[],

      "categories": categories[]->{title}.title, 
      "author": author->{"image": image{asset->{url}}.asset.url, name, bio[]{listItem, children[]{text, marks}, markDefs[]}}
    } | order(date desc)`)
  //breadcrumbs
  const url = `https://editingthing.com/blog/${post.slug.current}`

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author.name,
    },
    image: post.author.image ? [post.author.image] : undefined,
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
        name: post.title,
        item: url,
      },
    ],
  }
  if (!post)
    return (
      <div className="blog">
        This blog post doesn't exist. <br />
        <Link href={"/"}>Return to home </Link>
      </div>
    )
  return (
    <div className="blog">
      {/* JSON‑LD for SEO */}
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
      {/* <h2>The Editing Blog</h2> */}
      <h1>{post.title}</h1>

      <article>
        <PortableText value={post.blocks} />
      </article>
    </div>
  )
}

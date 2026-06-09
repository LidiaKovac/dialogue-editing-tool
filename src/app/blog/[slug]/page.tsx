import { PortableText } from "@portabletext/react"
import { Metadata } from "next"
import Link from "next/link"
import "../blog.scss"
import {
  getSingleBlogMetadataBySlug,
  getSingleBlogPost,
} from "@/app/lib/sanity/sanity.fn"
import { JsonLD , metadata} from "./metadata"
import { SITE_URL as siteUrl } from "../../../lib/site"

type Props = { params: { slug: string } }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getSingleBlogMetadataBySlug(params.slug)

  if (!post) {
    return {
      title: "Post Not Found | The Editing Blog",
      description: "This blog post does not exist.",
    }
  }

  return metadata(
    post.title,
    post.categories,
    post.date,
    post.slug.current,
    post.author
  )
}
export default async function BlogPost({
  params,
}: Readonly<{
  params: Promise<{ slug: string }>
}>) {
  const { slug } = await params
  const post = await getSingleBlogPost(slug)

  if (!post)
    return (
      <div className="blog">
        This blog post doesn&apos;t exist. <br />
        <Link href={"/"}>Return to home </Link>
      </div>
    )
  return (
    <div className="blog blog-article-page">
      <JsonLD
        title={post.title}
        categories={post.categories}
        date={post.date}
        author={post.author}
        url={`${siteUrl}/blog/${post.slug.current}`}
      />

      <div className="blog-article-layout">
        <aside className="blog-article-meta">
          <Link href="/blog" className="blog-back-link">
            Back to the blog
          </Link>
          <h1>{post.title}</h1>
          <p className="blog-meta-copy">
            By {post.author.name}
            <br />
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <div className="blog-tags blog-tags--stacked">
            {post.categories?.map((category: string) => (
              <span key={category} className="blog-tag">
                {category}
              </span>
            ))}
          </div>
        </aside>

        <article className="blog-article ">
          <PortableText value={post.blocks} />
        </article>
      </div>
    </div>
  )
}

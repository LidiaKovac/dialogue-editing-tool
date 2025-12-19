import { PortableText } from "@portabletext/react"
import { Metadata } from "next"
import Link from "next/link"
import "../blog.scss"
import {
  getSingleBlogMetadataBySlug,
  getSingleBlogPost,
} from "@/app/lib/sanity/sanity.fn"
import { JsonLD , metadata} from "./metadata"

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
        This blog post doesn't exist. <br />
        <Link href={"/"}>Return to home </Link>
      </div>
    )
  return (
    <div className="blog">
      <JsonLD
        title={post.title}
        date={post.date}
        author={post.author}
        url={`https://editingthing.com/blog/${post.slug.current}`}
      />

      {/* <h2>The Editing Blog</h2> */}
      <h1>{post.title}</h1>

      <article>
        <PortableText value={post.blocks} />
      </article>
    </div>
  )
}

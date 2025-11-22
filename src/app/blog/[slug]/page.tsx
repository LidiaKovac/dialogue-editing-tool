import Link from "next/link"
import { sanity } from "../../lib/sanity/sanity.config"
import { PortableText } from "@portabletext/react"


export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    console.log(slug)
    const [post] = await sanity.fetch(`*[_type=="post" && slug.current=="${slug}"]
    {
      "date":publishedAt,
      _id, 
      title, slug,
      "blocks": body[],

      "categories": categories[]->{title}.title, 
      "author": author->{"image": image{asset->{url}}.asset.url, name, bio[]{listItem, children[]{text, marks}, markDefs[]}}
    } | order(date desc)`)
    return <>
        <div className="blog">
            <h2>The Editing Blog</h2>
            <h3>{post.title}</h3>

            <article>
                <PortableText value={post.blocks} />
            </article>
        </div>
    </>
}
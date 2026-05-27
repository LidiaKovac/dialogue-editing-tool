import { Metadata } from "next"
import { SITE_URL as siteUrl } from "../../lib/site"
import "./blog.scss"
import { fontBlog } from "../lib/fonts"
import metadata from "./metadata"
import { getAllBlogPosts, getBlogMetadata } from "../lib/sanity/sanity.fn"
import BlogIndex from "./BlogIndex.client"

export async function generateMetadata(): Promise<Metadata> {
  const posts = await getBlogMetadata()

  const categories = posts.flatMap(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (post: Record<string, any>) => post.categories || [],
  )
  const uniqueCategories: string[] = Array.from(new Set(categories))

  const categoryString =
    uniqueCategories.length > 0
      ? uniqueCategories.join(", ")
      : "editing, dialogue, and fanfiction writing"

  const url = `${siteUrl}/blog`

  return metadata(categoryString, url, uniqueCategories)
}

export default async function BlogLanding() {
  const posts = await getAllBlogPosts()

  return (
    <div className={`blog ${fontBlog.variable}`}>
      <BlogIndex posts={posts} />
    </div>
  )
}

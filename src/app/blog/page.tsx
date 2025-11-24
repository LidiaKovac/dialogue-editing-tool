import Link from "next/link"
import { sanity } from "../lib/sanity/sanity.config"
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const posts = await sanity.fetch(`*[_type=="post" && dateTime(publishedAt) < dateTime(now())]
    {
      title,
      slug,
      "categories": categories[]->{title}.title,
      "author": author->{name}
    } | order(publishedAt desc)`);

  const categories = posts.flatMap((post:Record<string, any>) => post.categories || []);
  const uniqueCategories = Array.from(new Set(categories));

  return {
    title: "The Editing Blog",
    description: "Latest blog posts covering various categories including " + (uniqueCategories.join(", ") || "no categories"),
    openGraph: {
      title: "The Editing Blog - Latest Posts",
      description: "Read the latest blog posts across categories: " + (uniqueCategories.join(", ") || "no categories"),
      url: "https://editingthing.com/blog",
      type: "website",
      images: posts[0]?.author.image ? [{ url: posts[0].author.image, alt: posts[0].author.name }] : [],
    },
    keywords: uniqueCategories as string[],
    twitter: {
      card: "summary_large_image",
      title: "The Editing Blog - Latest Posts",
      description: "Stay updated with the latest posts on The Editing Blog.",
    },
  };
}
export default async function BlogLanding() {
  const posts = await sanity.fetch(`*[_type=="post" && dateTime(publishedAt) < dateTime(now())]
    {
      "date":publishedAt,
      _id, 
      title, slug,
      "categories": categories[]->{title}.title, 
      "author": author->{"image": image{asset->{url}}.asset.url, name, bio[]{listItem, children[]{text, marks}, markDefs[]}}
    } | order(date desc)`)
  //      "blocks": body[]{listItem, children[]{text, marks},asset->{url}, markDefs[], },
  /* 
    La fetch da indietro .result, ma la variabile e' SOLO i risultati, 
    non quello che si vede in network tab
    */
  console.log(posts)
  return <>
    <div className="blog">
  <h1>The Editing Blog</h1> {/* Use h1 for main page title */}
  <p>Explore the latest articles on editing, fanfiction tips, and writing advice.</p> {/* Add a descriptive intro paragraph */}

  <section aria-label="Blog posts" className="flex gap-2">
    {posts.map((post: Record<string, any>) => (
      <article key={post._id} className="card">
        <h2>{post.title}</h2> {/* Change to h2 for individual post titles */}
        <p>By {post.author.name}</p> {/* More natural text */}
        <Link href={"/blog/" + post.slug.current} aria-label={`Read full article: ${post.title}`}>
          <span>Read</span>
          <div className="decoration"></div>
        </Link>
      </article>
    ))}
  </section>
</div>
  </>
}
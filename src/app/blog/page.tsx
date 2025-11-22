import Link from "next/link"
import { sanity } from "../lib/sanity/sanity.config"


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
      <h2>The Editing Blog</h2>
      <div className="flex gap-2">
        {posts.map(post => <div className="card">
          <h3>{post.title}</h3>
          <p>{post.author.name}</p>
          <Link href={"/blog/" + post.slug.current}>
            <span>Read</span>
            <div className="decoration"></div>
          </Link>
        </div>)}
      </div>
    </div>
  </>
}
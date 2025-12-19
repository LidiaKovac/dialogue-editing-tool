import { sanity } from "./sanity.config"

export const getBlogMetadata = async () =>
  await sanity.fetch(
    `*[_type=="post" && dateTime(publishedAt) < dateTime(now())]{
          title,
          slug,
          "categories": categories[]->{title}.title,
          "author": author->{name}
        } | order(publishedAt desc)`
  )

export const getAllBlogPosts = async () =>
  await sanity.fetch(`*[_type=="post" && dateTime(publishedAt) < dateTime(now())]
      {
        "date":publishedAt,
        _id, 
        title, slug,
        "categories": categories[]->{title}.title, 
        "author": author->{"image": image{asset->{url}}.asset.url, name, bio[]{listItem, children[]{text, marks}, markDefs[]}}
      } | order(date desc)`)

export const getSingleBlogMetadataBySlug = async (slug:string) => {
  const [post] =
    await sanity.fetch(`*[_type=="post" && slug.current=="${slug}"]
    {
      "date": publishedAt,
      title,
      slug,
      "categories": categories[]->{title}.title,
      "author": author->{name, "image": image.asset.url}
    } | order(date desc)`)
  return post
}


export const getSingleBlogPost = async(slug:string) => {
    const [post] =
      await sanity.fetch(`*[_type=="post" && slug.current=="${slug}"]
    {
      "date":publishedAt,
      _id, 
      title, slug,
      "blocks": body[],

      "categories": categories[]->{title}.title, 
      "author": author->{"image": image{asset->{url}}.asset.url, name, bio[]{listItem, children[]{text, marks}, markDefs[]}}
    } | order(date desc)`)
     return post
}
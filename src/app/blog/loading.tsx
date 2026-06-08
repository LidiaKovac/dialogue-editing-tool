import { fontBlog } from "../lib/fonts"
import { LoadingState } from "../components/LoadingState/LoadingState"

export default function Loading() {
  return (
    <div className={`blog ${fontBlog.variable}`}>
      <LoadingState
        eyebrow="Blog"
        title="Loading articles"
        description="Fetching posts, categories, and related metadata."
      />
    </div>
  )
}
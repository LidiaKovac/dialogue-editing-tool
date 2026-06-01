"use client"

import Link from "next/link"
import { useEffect, useState } from "react"

type BlogPost = {
  _id: string
  title: string
  slug: { current: string }
  categories?: string[]
  author?: { name?: string }
  date?: string
}

type BlogIndexProps = {
  posts: BlogPost[]
}

const POSTS_PER_PAGE = 6

export default function BlogIndex({ posts }: BlogIndexProps) {
  const [query, setQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setCurrentPage(1)
  }, [query])

  const normalizedQuery = query.trim().toLowerCase()
  const filteredPosts = posts.filter((post) => {
    const haystack = [
      post.title,
      post.author?.name || "",
      ...(post.categories || []),
    ]
      .join(" ")
      .toLowerCase()

    return haystack.includes(normalizedQuery)
  })

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE))
  const safePage = Math.min(currentPage, totalPages)
  const visiblePosts = filteredPosts.slice(
    (safePage - 1) * POSTS_PER_PAGE,
    safePage * POSTS_PER_PAGE,
  )

  return (
    <div className="blog-shell">
      <header className="blog-hero">
        <div>
          <p className="blog-kicker">Writing guides and editing advice</p>
          <h1>The Editing Blog</h1>
          <p className="blog-intro">
            Practical articles on dialogue, fanfiction, novel editing, and the
            mechanics of writing better scenes.
          </p>
        </div>

        <div className="blog-search-card">
          <label className="blog-search-label" htmlFor="blog-search">
            Search articles
          </label>
          <input
            id="blog-search"
            className="blog-search"
            type="search"
            placeholder="Search by title, author, or category"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <div className="blog-search-meta">
            <span>{filteredPosts.length} article{filteredPosts.length === 1 ? "" : "s"}</span>
            <span>Privacy-first, no clutter</span>
          </div>
        </div>
      </header>

      <section className="blog-grid" aria-label="Blog posts">
        {visiblePosts.map((post) => (
          <article key={post._id} className="blog-card">
            <div className="blog-card-top">
              <p className="blog-card-meta">
                {post.author?.name || "The Dialogue Thing"}
                {post.date ? ` • ${new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}` : ""}
              </p>
              <h2>{post.title}</h2>
            </div>

            <div className="blog-tags">
              {(post.categories || []).slice(0, 3).map((category) => (
                <span key={category} className="blog-tag">
                  {category}
                </span>
              ))}
            </div>

            <Link
              href={`/blog/${post.slug.current}`}
              aria-label={`Read full article: ${post.title}`}
              className="blog-read-link"
            >
              Read article
            </Link>
          </article>
        ))}

        {visiblePosts.length === 0 && (
          <div className="blog-empty">
            <h2>No articles match that search.</h2>
            <p>Try a broader term like dialogue, novel editing, or fanfiction.</p>
          </div>
        )}
      </section>

      <nav className="blog-pagination" aria-label="Blog pagination">
        <button
          type="button"
          className="blog-page-button"
          onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
          disabled={safePage === 1}
        >
          Previous
        </button>

        <div className="blog-page-numbers">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button
              key={page}
              type="button"
              className={`blog-page-number${page === safePage ? " is-active" : ""}`}
              onClick={() => setCurrentPage(page)}
              aria-current={page === safePage ? "page" : undefined}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="blog-page-button"
          onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
          disabled={safePage === totalPages}
        >
          Next
        </button>
      </nav>
    </div>
  )
}
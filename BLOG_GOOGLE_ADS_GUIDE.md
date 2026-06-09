# Google Ads on Blog Pages Only (Non-Invasive Sidebar Setup)

This guide shows how to add Google AdSense to **blog pages only** in this project, with ads placed in side areas (not inline inside article text).

The approach below keeps the site lightweight and avoids invasive placements.

## Goal

- Show ads only on:
  - `/blog`
  - `/blog/[slug]`
- Keep ads in side placements only.
- Do not show ads in the editor or other marketing pages.
- Keep mobile experience clean by hiding side ads on small screens.

---

## 1) Create a Google AdSense account and ad units

1. In AdSense, copy your publisher ID (format: `ca-pub-xxxxxxxxxxxxxxxx`).
2. Create at least one ad unit for side placements.
3. Note each ad slot ID (numeric value).

Recommended side formats:

- 300x600 (desktop side rail)
- 300x250 (fallback or secondary side card)

---

## 2) Add environment variables

Create or update `.env.local`:

```bash
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxxxxxx
NEXT_PUBLIC_ADSENSE_SLOT_BLOG_INDEX=1234567890
NEXT_PUBLIC_ADSENSE_SLOT_BLOG_ARTICLE=2345678901
```

Notes:

- Use `NEXT_PUBLIC_` because the values are needed in client-rendered ad markup.
- AdSense IDs are not secrets, but keep environment values managed consistently.

---

## 3) Load the AdSense script globally once

Edit `src/app/layout.tsx` and add `next/script`.

```tsx
import Script from "next/script"
```

Inside `<head>`, add:

```tsx
<Script
  async
  src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
  crossOrigin="anonymous"
  strategy="afterInteractive"
/>
```

Why here:

- It loads once for the whole app.
- Ads can render only where ad components are mounted (blog pages).

---

## 4) Add a reusable AdSense sidebar component

Create: `src/app/blog/components/BlogSidebarAd.tsx`

```tsx
"use client"

import { useEffect } from "react"

declare global {
  interface Window {
    adsbygoogle?: unknown[]
  }
}

type BlogSidebarAdProps = {
  slot: string
  className?: string
}

export default function BlogSidebarAd({ slot, className }: BlogSidebarAdProps) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT

  useEffect(() => {
    try {
      ;(window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch {
      // Ignore duplicate/blocked ad init errors.
    }
  }, [])

  if (!client || !slot) return null

  return (
    <aside className={className} aria-label="Sponsored">
      <ins
        className="adsbygoogle"
        style={{ display: "block", minWidth: "300px", minHeight: "250px" }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="false"
      />
    </aside>
  )
}
```

This keeps all ad logic in one place and allows easy enable/disable later.

---

## 5) Place ads only on blog pages

### 5a) Blog index page (`/blog`)

In `src/app/blog/BlogIndex.client.tsx`:

1. Import the component.
2. Add one side ad in the hero/search column or a right-side rail wrapper.

Example import:

```tsx
import BlogSidebarAd from "./components/BlogSidebarAd"
```

Example placement near the search card column:

```tsx
<BlogSidebarAd
  className="blog-sidebar-ad"
  slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_INDEX || ""}
/>
```

### 5b) Blog article page (`/blog/[slug]`)

In `src/app/blog/[slug]/page.tsx`, place the ad in the existing side column (`.blog-article-meta`) or as a sibling in `.blog-article-layout`.

Example placement:

```tsx
<BlogSidebarAd
  className="blog-sidebar-ad"
  slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_BLOG_ARTICLE || ""}
/>
```

This page already has a side meta area, which is ideal for non-invasive ad placement.

---

## 6) Style as a side-only unit and hide on small screens

Edit `src/app/blog/blog.scss` and add:

```scss
.blog-sidebar-ad {
  width: 100%;
  max-width: 320px;
  margin-top: 16px;

  @media screen and (max-width: 900px) {
    display: none;
  }
}
```

Why hide on mobile:

- Keeps reading flow clean.
- Avoids side ad collapsing into intrusive in-content behavior.

---

## 7) Keep ads out of non-blog routes

Do not import `BlogSidebarAd` into:

- `src/app/page.tsx`
- `src/app/editor/**`
- `src/app/(marketing)/**`

Because ads are only mounted in blog components, all other pages remain ad-free.

---

## 8) Optional privacy and consent recommendations

For best compliance and user trust:

- Gate ad rendering until cookie consent is accepted.
- Add an "Advertising" section to policy pages describing ad providers and cookies.
- Consider disabling personalized ads for users who decline marketing consent.

---

## 9) Validation checklist

- Ad script loads once in app layout.
- `/blog` shows one side ad on desktop.
- `/blog/[slug]` shows one side ad on desktop.
- Mobile view hides side ads.
- No ads on homepage, editor, or marketing routes.
- No layout shift or content overlap.

---

## 10) Rollback plan

If ad UX feels too heavy:

1. Remove the `BlogSidebarAd` usage from blog files.
2. Keep script in layout (harmless), or remove it from `src/app/layout.tsx`.
3. Re-deploy.

This lets you quickly disable ads without touching article content.

const siteUrl = "https://editingthing.com"

const metadata = (categoryString: string, url: string, uniqueCategories: string[]) => ({
  metadataBase: new URL(siteUrl),
  title: "The Editing Blog - Dialogue, Fanfiction, and Novel Editing Tips",
  description:
    "Read practical articles on editing dialogue, fixing punctuation, and polishing fanfiction and novels. Recent topics include: " +
    categoryString +
    ".",
  alternates: {
    canonical: url,
  },
  openGraph: {
    title: "The Editing Blog - Latest Articles",
    description:
      "Explore the latest posts on dialogue editing, fanfiction tips, and novel self-editing, including categories like " +
      categoryString +
      ".",
    url,
    type: "website",
    siteName: "The Dialogue Thing",
    images: [
      {
        url: `${siteUrl}/ogimage.jpg`,
        width: 1200,
        height: 630,
        alt: "The Dialogue Thing - Editing blog",
        type: "image/jpeg",
      },
    ],
  },
  keywords: [
    "editing blog",
    "dialogue editing tips",
    "fanfiction editing",
    "how to edit a book",
    "novel self‑editing",
    "writing advice",
    ...uniqueCategories,
  ],
  twitter: {
    card: "summary_large_image",
    title: "The Editing Blog - Latest Posts",
    description:
      "Stay updated with new articles on dialogue, fanfiction, and novel editing from The Dialogue Thing blog.",
    images: [`${siteUrl}/ogimage.jpg`],
  },
})
export default metadata
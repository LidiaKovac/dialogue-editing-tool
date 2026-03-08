import Link from "next/link"

export const Footer = () => {
  return (
    <footer>
      <nav aria-label="Footer navigation">
        <ul>
          <li>
            <Link href="/editor">
              Editor
            </Link>
          </li>
          <li>
            <Link href="/blog">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/faq">
              FAQ
            </Link>
          </li>
          <li>
            <Link target="_blank" href="https://lidiakovac.it">
              Developed with 💖 by Lidia Kovac
            </Link>
          </li>
        </ul>
      </nav>
      <small>
        &copy; {new Date().getFullYear()} The Editing Thing. All rights
        reserved.
      </small>
    </footer>
  )
}

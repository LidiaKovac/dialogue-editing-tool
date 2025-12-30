import Link from "next/link"

export const Navbar = () => {
    return <nav className="flex gap-5">
        <Link href="/">
            <h1 className="nav__item">The Dialogue Thing</h1>
        </Link>

        <div className="nav__item">
            <Link href="/editor">Editor</Link>
        </div>
        <div className="nav__item">
            <Link href="/blog">
                Blog</Link>
        </div>
    </nav>
}
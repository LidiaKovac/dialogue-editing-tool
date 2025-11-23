import Link from "next/link"

export const Navbar = () => {
    return <nav className="flex gap-5">
        <div className="nav__item">
            <Link href="/">
                Home
            </Link>
        </div>
        <div className="nav__item">
            <Link href="/editor">Editor</Link>
        </div>
        <div className="nav__item">
            <Link href="/blog">
                Blog</Link>
        </div>
    </nav>
}
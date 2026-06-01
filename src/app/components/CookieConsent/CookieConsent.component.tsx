"use client"
import Link from "next/link"
import Script from "next/script"
import { useEffect, useState } from "react"

declare global {
    interface Window {
        _uxa?: unknown[]
    }
}

export const CookieConsent = () => {
    const [consent, setConsent] = useState<boolean | null>(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem("tet_consent")
        if (saved === "true") {
            setConsent(true)
            setIsVisible(false)
            return
        }

        if (saved === "false") {
            setConsent(false)
            setIsVisible(false)
            return
        }

        setConsent(null)
        setIsVisible(saved === null)

        document.cookie = "_cs_optout=true; Max-Age=31536000; path=/"
        document.cookie = "_cs_id=; Max-Age=0; path=/"
        document.cookie = "_cs_s=; Max-Age=0; path=/"
        document.cookie = "_cs_c=; Max-Age=0; path=/"
        document.cookie = "_cs_s_ctx=; Max-Age=0; path=/"
        document.cookie = "_cs_i=; Max-Age=0; path=/"
        document.cookie = "_cs_cvars=; Max-Age=0; path=/"
        document.cookie = "_cs_ep=; Max-Age=0; path=/"
        document.cookie = "_cs_ex=; Max-Age=0; path=/"
        document.cookie = "_cs_t=; Max-Age=0; path=/"
        document.cookie = "_cs_same_site=; Max-Age=0; path=/"
        document.cookie = "_cs_root-domain=; Max-Age=0; path=/"
        document.cookie = "_cs_debug=; Max-Age=0; path=/"
    }, [])

    useEffect(() => {
        if (consent !== true) {
            return
        }

        document.cookie = "_cs_optout=; Max-Age=0; path=/"

    }, [consent])

    const handleAccept = () => {
        localStorage.setItem("tet_consent", "true")
        setConsent(true)
        setIsVisible(false)
        document.cookie = "_cs_optout=; Max-Age=0; path=/"
    }

    const handleReject = () => {
        localStorage.setItem("tet_consent", "false")
        setConsent(false)
        setIsVisible(false)
        document.cookie = "_cs_optout=true; Max-Age=31536000; path=/"
        document.cookie = "_cs_id=; Max-Age=0; path=/"
        document.cookie = "_cs_s=; Max-Age=0; path=/"
        document.cookie = "_cs_c=; Max-Age=0; path=/"
        document.cookie = "_cs_s_ctx=; Max-Age=0; path=/"
        document.cookie = "_cs_i=; Max-Age=0; path=/"
        document.cookie = "_cs_cvars=; Max-Age=0; path=/"
        document.cookie = "_cs_ep=; Max-Age=0; path=/"
        document.cookie = "_cs_ex=; Max-Age=0; path=/"
        document.cookie = "_cs_t=; Max-Age=0; path=/"
        document.cookie = "_cs_same_site=; Max-Age=0; path=/"
        document.cookie = "_cs_root-domain=; Max-Age=0; path=/"
        document.cookie = "_cs_debug=; Max-Age=0; path=/"
    }

    return (
        <>
            {isVisible && <section
                aria-label="Cookie consent"
                className="fixed inset-x-0 bottom-0 z-50 border-t-2 border-black bg-[#f6f0e7] px-4 py-4 shadow-[0_-12px_30px_rgba(0,0,0,0.12)]"
            >
                <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="max-w-3xl space-y-2">
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-black">
                            Cookie preferences
                        </p>
                        <p className="text-sm leading-6 text-black/80">
                            You can choose which non-essential cookies and similar technologies you
                            want to allow. Until you accept, optional cookies stay blocked.
                        </p>
                        <p className="text-xs leading-5 text-black/70">
                            Read the <Link className="underline" href="/cookie-policy">Cookie Policy</Link> or <Link className="underline" href="/privacy-policy">Privacy Policy</Link>.
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <button
                            className="rounded-full border-2 border-black bg-black px-4 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
                            onClick={handleAccept}
                            type="button"
                        >
                            Accept all optional cookies
                        </button>
                        <button
                            className="rounded-full border-2 border-black bg-transparent px-4 py-2 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
                            onClick={handleReject}
                            type="button"
                        >
                            Reject optional cookies
                        </button>
                    </div>
                </div>
            </section>}
            {consent === true && process.env.NEXT_PUBLIC_CONTENTSQUARE_TAG_ID && (
                <Script
                    id="contentsquare"
                    strategy="afterInteractive"
                    src={`https://t.contentsquare.net/uxa/${process.env.NEXT_PUBLIC_CONTENTSQUARE_TAG_ID}.js`}
                />
            )}
        </>
    )
}
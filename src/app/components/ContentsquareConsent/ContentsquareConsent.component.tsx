"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { useEffect, useMemo, useState } from "react"
import {
  CONTENTSQUARE_CONSENT_STORAGE_KEY,
  CONTENTSQUARE_TAG_ID,
} from "@/app/lib/contentsquare/contentsquare.config"

type ConsentStatus = "accepted" | "rejected" | null

declare global {
  interface Window {
    _uxa?: Array<Array<unknown>>
  }
}

const getCurrentPath = () => {
  if (typeof window === "undefined") {
    return "/"
  }

  return `${window.location.pathname}${window.location.hash.replace("#", "?__")}`
}

export const ContentsquareConsent = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [consent, setConsent] = useState<ConsentStatus>(null)
  const [bannerVisible, setBannerVisible] = useState(false)
  const [scriptLoaded, setScriptLoaded] = useState(false)

  useEffect(() => {
    const storedConsent = window.localStorage.getItem(
      CONTENTSQUARE_CONSENT_STORAGE_KEY,
    )

    if (storedConsent === "accepted" || storedConsent === "rejected") {
      setConsent(storedConsent)
      setBannerVisible(false)
      return
    }

    setConsent(null)
    setBannerVisible(true)
  }, [])

  useEffect(() => {
    if (consent !== "accepted" || !CONTENTSQUARE_TAG_ID) {
      return
    }

    if (document.getElementById("contentsquare-main-tag")) {
      setScriptLoaded(true)
      return
    }

    window._uxa = window._uxa || []

    const script = document.createElement("script")
    script.id = "contentsquare-main-tag"
    script.async = true
    script.src = `https://t.contentsquare.net/uxa/${CONTENTSQUARE_TAG_ID}.js`
    script.onload = () => {
      setScriptLoaded(true)
    }

    document.head.appendChild(script)
  }, [consent])

  useEffect(() => {
    if (consent !== "accepted" || !scriptLoaded) {
      return
    }

    window._uxa = window._uxa || []
    window._uxa.push(["setPath", getCurrentPath()])
    window._uxa.push(["trackPageview"])
  }, [consent, pathname, searchParams, scriptLoaded])

  const statusCopy = useMemo(() => {
    if (CONTENTSQUARE_TAG_ID) {
      return "Optional cookies are waiting for your choice."
    }

    return "Optional cookies are not configured yet. Add NEXT_PUBLIC_CONTENTSQUARE_TAG_ID when you are ready to enable Contentsquare after consent."
  }, [])

  const handleAccept = () => {
    window.localStorage.setItem(CONTENTSQUARE_CONSENT_STORAGE_KEY, "accepted")
    setConsent("accepted")
    setBannerVisible(false)
  }

  const handleReject = () => {
    window.localStorage.setItem(CONTENTSQUARE_CONSENT_STORAGE_KEY, "rejected")

    if (window._uxa) {
      window._uxa.push(["optout"])
    }

    setConsent("rejected")
    setBannerVisible(false)
  }

  if (!bannerVisible) {
    return (
      <button
        aria-label="Open cookie preferences"
        className="fixed bottom-4 right-4 z-40 rounded-full border-2 border-black bg-[#f6f0e7] px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-black shadow-[0_8px_20px_rgba(0,0,0,0.12)] transition hover:bg-black hover:text-white"
        onClick={() => setBannerVisible(true)}
        type="button"
      >
        Cookie preferences
      </button>
    )
  }

  return (
    <section
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
          <p className="text-xs leading-5 text-black/70">{statusCopy}</p>
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
    </section>
  )
}
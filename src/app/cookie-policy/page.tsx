import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Cookie Policy | The Dialogue Thing",
  description:
    "Cookie policy for The Dialogue Thing, including Contentsquare cookies and consent behavior.",
}

const contentsquareCookies = [
  ["_cs_id", "13 months", "Stores technical user data."],
  ["_cs_s", "30 minutes", "Stores session data."],
  [
    "_cs_c",
    "13 months",
    "Stores replay masking and consent state for session data use within replays.",
  ],
  ["_cs_s_ctx", "30 minutes", "Stores session context data."],
  [
    "_cs_i",
    "3 days",
    "Stores the encrypted user identity string when identify is used.",
  ],
  ["_cs_cvars", "Session length", "Stores URL-encoded session custom variables."],
  [
    "_cs_ep",
    "13 months",
    "Stores visit-level custom properties as a JSON object.",
  ],
  ["_cs_ex", "30 days", "Stores sample exclusion state when sampling is enabled."],
  ["_cs_optout", "13 months", "Stores the opt-out state when a visitor refuses tracking."],
  ["_cs_t", "Immediately removed", "Checks whether the browser supports cookies."],
  [
    "_cs_same_site",
    "Immediately removed",
    "Checks whether the browser supports the SameSite flag.",
  ],
  ["_cs_root-domain", "Immediately removed", "Stores the URI-encoded main domain name."],
  ["_cs_debug", "Session length", "Enables debugging behavior for inspection."],
]

export default function CookiePolicyPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-24 md:px-8">
      <header className="mb-10 space-y-4">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-black/70">
          Updated for the 2026 Contentsquare rollout
        </p>
        <h1 className="text-4xl font-black uppercase tracking-tight md:text-6xl">
          Cookie Policy
        </h1>
        <p className="max-w-3xl text-base leading-7 text-black/75">
          This page explains how The Dialogue Thing uses its own consent banner and
          how Contentsquare cookies are handled. The Contentsquare tag is not loaded
          until a visitor has accepted analytics cookies.
        </p>
      </header>

      <section className="mb-10 space-y-4">
        <h2 className="text-2xl font-bold uppercase">Consent flow</h2>
        <p className="leading-7 text-black/75">
          Before consent, the site should only use essential browser storage needed
          for the consent banner itself. After consent is granted, the Contentsquare
          tag can be loaded and its cookies may be created.
        </p>
        <p className="leading-7 text-black/75">
          If consent is refused, The Dialogue Thing keeps Contentsquare disabled and
          does not load the tracking script. Contentsquare&apos;s documented opt-out
          command is available for users who withdraw consent after the tag has been
          enabled.
        </p>
      </section>

      <section className="mb-10 space-y-4">
        <h2 className="text-2xl font-bold uppercase">Contentsquare cookies</h2>
        <p className="leading-7 text-black/75">
          The list below reflects Contentsquare&apos;s public 2026 cookie
          documentation. No other analytics or replay integrations are connected on
          this site.
        </p>

        <div className="overflow-x-auto border-2 border-black">
          <table className="w-full border-collapse text-left text-sm">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-4 py-3">Cookie</th>
                <th className="px-4 py-3">Lifetime</th>
                <th className="px-4 py-3">Purpose</th>
              </tr>
            </thead>
            <tbody>
              {contentsquareCookies.map(([name, lifetime, purpose]) => (
                <tr
                  key={name}
                  className="border-t border-black/20 odd:bg-white even:bg-[#f8f3eb]"
                >
                  <td className="px-4 py-3 font-semibold">{name}</td>
                  <td className="px-4 py-3">{lifetime}</td>
                  <td className="px-4 py-3 leading-6">{purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold uppercase">Managing preferences</h2>
        <p className="leading-7 text-black/75">
          Visitors can reject analytics in the banner, and the Contentsquare opt-out
          command can be used if consent is withdrawn later. You can also change your
          browser cookie settings at any time.
        </p>
        <p className="leading-7 text-black/75">
          If you want to delete cookies manually, these browser guides explain how:
        </p>
        <ul className="space-y-2 text-black/75">
          <li>
            <Link className="underline" href="https://support.google.com/chrome/answer/95647?hl=en" target="_blank" rel="noreferrer">
              Chrome: delete, allow, and manage cookies
            </Link>
          </li>
          <li>
            <Link className="underline" href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noreferrer">
              Edge: manage cookies and delete site data
            </Link>
          </li>
          <li>
            <Link className="underline" href="https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored" target="_blank" rel="noreferrer">
              Firefox: clear cookies and site data
            </Link>
          </li>
          <li>
            <Link className="underline" href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noreferrer">
              Safari on Mac: clear cache and cookies
            </Link>
          </li>
        </ul>
        <p className="leading-7 text-black/75">
          For the companion privacy details, see the <Link className="underline" href="/privacy-policy">Privacy Policy</Link>.
        </p>
      </section>
    </main>
  )
}

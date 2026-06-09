import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy | The Dialogue Thing",
  description:
    "Privacy policy for The Dialogue Thing, including Contentsquare consent handling and GDPR-oriented rights information.",
}

const contentsquareCookieNames = [
  "_cs_id",
  "_cs_s",
  "_cs_c",
  "_cs_s_ctx",
  "_cs_i",
  "_cs_cvars",
  "_cs_ep",
  "_cs_ex",
  "_cs_optout",
  "_cs_t",
  "_cs_same_site",
  "_cs_root-domain",
  "_cs_debug",
]

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-24 md:px-8">
      <header className="mb-10 space-y-4">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-black/70">
          Updated for the 2026 Contentsquare rollout
        </p>
        <h1 className="text-4xl font-black uppercase tracking-tight md:text-6xl">
          Privacy Policy
        </h1>
        <p className="max-w-3xl text-base leading-7 text-black/75">
          This page describes the privacy behavior of The Dialogue Thing and the
          Contentsquare analytics scaffold. The tracking script is only loaded after
          consent is given.
        </p>
      </header>

      <section className="mb-10 space-y-4">
        <h2 className="text-2xl font-bold uppercase">Controller and contact</h2>
        <p className="leading-7 text-black/75">
          Controller: Lidia Kovac
        </p>
        <p className="leading-7 text-black/75">
          Contact email: lidiakovacdev@gmail.com
        </p>
      </section>

      <section className="mb-10 space-y-4">
        <h2 className="text-2xl font-bold uppercase">Processor and recipient</h2>
        <p className="leading-7 text-black/75">
          We use Contentsquare as a third-party analytics provider. When consent is
          given, the Contentsquare tag may send browsing and interaction data to
          Contentsquare so we can understand how the site is used.
        </p>
        <p className="leading-7 text-black/75">
          Contentsquare&apos;s own documentation describes automatic redaction and
          masking features, but data you intentionally send through identity strings,
          custom properties, or custom events is not automatically masked. We do not
          intentionally send those values on this site.
        </p>
      </section>

      <section className="mb-10 space-y-4">
        <h2 className="text-2xl font-bold uppercase">What changes after consent</h2>
        <p className="leading-7 text-black/75">
          Before consent, Contentsquare is blocked and no Contentsquare script should
          be loaded. After consent, the site may load the Contentsquare tag and send
          pageview and interaction data to Contentsquare for analytics.
        </p>
        <p className="leading-7 text-black/75">
          If a visitor later withdraws consent, the Contentsquare opt-out command can
          be used to stop tracking and remove existing Contentsquare cookies.
        </p>
      </section>

      <section className="mb-10 space-y-4">
        <h2 className="text-2xl font-bold uppercase">Legal basis</h2>
        <p className="leading-7 text-black/75">
          The legal basis for loading Contentsquare cookies and sending analytics data
          is consent. You can withdraw consent at any time through the cookie banner
          or by using the Contentsquare opt-out command.
        </p>
      </section>

      <section className="mb-10 space-y-4">
        <h2 className="text-2xl font-bold uppercase">Data that may be collected</h2>
        <p className="leading-7 text-black/75">
          Based on Contentsquare&apos;s published documentation, the tag may collect
          user agent, screen resolution, URL, referrer, clicked element data, hovers,
          scroll activity, focus events, transaction details, and related session
          cookies. Contentsquare also states that it automatically redacts common
          patterns such as email addresses, JWTs, OAuth tokens, and credit card
          numbers in supported channels.
        </p>
        <ul className="space-y-3 text-black/75">
          <li>Page URLs and path changes, including SPA navigation.</li>
          <li>Session identifiers and technical cookie values created by Contentsquare.</li>
          <li>Replay and consent state needed for analytics and masking behavior.</li>
          <li>Local storage or similar browser storage used to remember your cookie choice.</li>
          <li>Browser and device data such as user agent and screen resolution.</li>
        </ul>
      </section>

      <section className="mb-10 space-y-4">
        <h2 className="text-2xl font-bold uppercase">Cookies and storage</h2>
        <p className="leading-7 text-black/75">
          The cookie list for this site is limited to the Contentsquare cookies
          documented by Contentsquare itself. The consent banner also stores your
          choice in local browser storage so the site can remember whether analytics
          should stay blocked or may be enabled.
        </p>
        <p className="leading-7 text-black/75">
          Contentsquare cookies currently documented by the vendor include: {contentsquareCookieNames.join(", ")}.
        </p>
      </section>

      <section className="mb-10 space-y-4">
        <h2 className="text-2xl font-bold uppercase">Minimisation</h2>
        <p className="leading-7 text-black/75">
          We try to limit the data sent to Contentsquare by keeping the tag blocked
          until consent is given and by avoiding intentional transmission of direct
          identifiers, custom property values, or form-field content.
        </p>
      </section>

      <section className="mb-10 space-y-4">
        <h2 className="text-2xl font-bold uppercase">Retention</h2>
        <p className="leading-7 text-black/75">
          Contentsquare cookies are kept for the durations published in Contentsquare&apos;s
          cookie documentation. Browser storage used for the banner preference remains
          until you clear it or change your consent choice.
        </p>
      </section>

      <section className="mb-10 space-y-4">
        <h2 className="text-2xl font-bold uppercase">International transfers</h2>
        <p className="leading-7 text-black/75">
          Depending on how Contentsquare processes analytics data, information may be
          transferred outside your country or outside the EEA. Those transfers are
          subject to the safeguards offered by Contentsquare and the legal framework
          that applies to the service.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold uppercase">Your rights</h2>
        <p className="leading-7 text-black/75">
          Under GDPR, visitors can ask to access, rectify, erase, restrict, or object
          to the processing of their personal data, and can withdraw consent at any
          time without affecting the lawfulness of processing that happened before
          withdrawal.
        </p>
        <p className="leading-7 text-black/75">
          If you need to exercise those rights, contact the person or entity listed in
          the controller section above.
        </p>
        <p className="leading-7 text-black/75">
          You also have the right to lodge a complaint with your local supervisory
          authority if you believe our processing of your personal data is unlawful.
        </p>
        <p className="leading-7 text-black/75">
          See the <Link className="underline" href="/cookie-policy">Cookie Policy</Link> for the cookie list and consent details.
        </p>
      </section>
    </main>
  )
}

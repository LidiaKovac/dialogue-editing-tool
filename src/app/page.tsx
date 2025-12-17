import Link from "next/link";
import { Typewriter } from "./components/Typewriter/Typewriter.component";

export default function Landing() {
  return (
    <div
      className="flex gap-4 m-auto items-center justify-center flex-wrap flex-col md:flex-row"
      id="landing"
    >
      <div className="md:flex-2 relative">
        <h1>
          <div className="badge absolute">
            <div>beta</div>
          </div>
          The dialogue thing
        </h1>
        <h2 className="text-gray-500">
          Where writers edit their <br /> <Typewriter />
        </h2>
        <Link
          className="inline-block mt-5 text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
          href={"/editor"}
        >
          Get started for free
        </Link>
      </div>
      <p className="md:flex-1 text-sm/6">
        Looking for an <b> AI-free editing tool </b>? Look no further. <br />
        The Dialogue Thing can help you edit your dialogue <b> for free </b>, no
        word limit, no AI. <br /> <b> Recognize </b> and fix
        <b> incorrect dialogue patterns</b>, formatting and adverbs. <br />{" "}
        <br />
        Get started for free and see how editing should feel.
      </p>
    </div>
  )
}

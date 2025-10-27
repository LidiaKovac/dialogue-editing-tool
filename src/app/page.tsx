import Link from "next/link";
import { Typewriter } from "./components/Typewriter/Typewriter.component";

export default function Landing() {
  return (
    <div className="flex gap-2 m-auto items-center" id="landing">
      <div className="flex-2 relative">
        <h1>
          <div className="badge absolute">
            <div>beta</div>
          </div>
          The dialogue thing
        </h1>
        <h2 className="text-gray-500">
          Where writers edit <br /> their <Typewriter />
        </h2>
        <Link
          className="inline-block mt-5 text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          href={"/editor"}
        >
          Get started for free
        </Link>
      </div>
      <p className="flex-1">
        Edit smarter, not harder. Discover a powerful suite for writers: track
        your characters and edit your story’s dialogue. Unlock insights that
        help you find your voice, clean up your draft, and publish confidently.
        Get started for free and see how editing should feel.
      </p>
    </div>
  );
}

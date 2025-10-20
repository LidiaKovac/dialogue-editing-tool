import { Typewriter } from "./components/Typewriter/Typewriter.component";

export default function Landing() {
  
  return (
    <>
    <div className="flex gap-2 m-auto items-center" id="landing">
      <div className="flex-2 relative">

      <h1>
        <div className="badge absolute">
          <div>
          beta
          </div>
          </div>
        The dialogue thing</h1>
      <h2 className="text-gray-500">
        
        Where writers edit <br /> their <Typewriter/>
      </h2>
      </div>
      <p className="flex-1">
        Edit smarter, not harder. 
        Discover a powerful suite for writers: track your characters and edit your story’s dialogue. 
        Unlock insights that help you find your voice, clean up your draft, and publish confidently. 
        Get started for free and see how editing should feel.
      </p>
    </div>
    </>
  );
}

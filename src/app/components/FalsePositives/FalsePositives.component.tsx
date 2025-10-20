"use client";
import { useEffect, useRef, useState } from "react";
import { Details } from "../Details/Details.component";

export const FalsePositives = () => {
  return (
    <Details title="On false positives">
      <div className="callout">
        This is an AI-free tool. It&apos;s based on pattern recognition and it
        is not infallible. This means it can create false positives. <br /> For
        example, this phrase would be marked like this:
        <blockquote>
          “Emily,” Dean said, “can you cut it out with the bitch act{" "}
          <span>?” She turned </span>towards Dean, a hint of surprise in her
          eyes.
        </blockquote>
        This is a false positive. The phrase is said by Dean, so the word
        &quot;she&quot; is <i>supposed</i> to be capitalized.
        <br />
        Remember: you know your work better than a bunch of computerized rules!
        💕
      </div>
    </Details>
  );
};

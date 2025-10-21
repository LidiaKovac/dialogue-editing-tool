"use client"
import { ReactNode, useEffect, useRef, useState } from "react";

/**
 * Details component to render expandable details section with a title and content.
 *
 * This component wraps its children inside a native HTML <details> element,
 * synchronizes the `aria-expanded` attribute on the summary based on expansion state,
 * and maintains controlled open state using React hooks.
 *
 * @param {object} props - Component props.
 * @param {string} props.title - The title content for the summary element.
 * @param {ReactNode} props.children - Nested content to render inside the details section.
 *
 * @returns {JSX.Element} Rendered Details component.
 *
 * @example
 * ```
 * <Details title="More info">
 *   <li>Detail 1</li>
 *   <li>Detail 2</li>
 * </Details>
 * ```
 */
export const Details = ({title, children}: {title: string, children: ReactNode}) => {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    ref.current?.setAttribute("aria-expanded", open ? "true" : "false");
  }, [open]);
  return (
    <details onToggle={(e) => setOpen(e.currentTarget.open)}>
      <summary ref={ref}>{title}</summary>
      <ul>
        {children}
      </ul>
    </details>
  );
};

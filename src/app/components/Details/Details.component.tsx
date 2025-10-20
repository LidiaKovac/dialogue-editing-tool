import { ReactNode, useEffect, useRef, useState } from "react";

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

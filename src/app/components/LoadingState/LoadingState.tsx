type LoadingStateProps = {
  eyebrow: string
  title: string
  description: string
  className?: string
}

export function LoadingState({
  eyebrow,
  title,
  description,
  className = "",
}: Readonly<LoadingStateProps>) {
  return (
    <main
      aria-busy="true"
      className={`flex min-h-[60vh] items-center justify-center px-6 py-16 ${className}`}
    >
      <div className="w-full max-w-xl border-2 border-[color:var(--primary)] bg-[var(--bg)] p-8 shadow-[8px_8px_0_var(--primary)] sm:p-10">
        <div className="flex flex-col items-center gap-6 text-center">
          <div className="relative h-16 w-16" aria-hidden="true">
            <span className="absolute inset-0 rounded-full border-4 border-[color:color-mix(in_srgb,var(--primary)_18%,transparent)]" />
            <span className="absolute inset-0 rounded-full border-4 border-[color:var(--primary)] border-t-transparent animate-spin" />
          </div>
          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.35em] opacity-70">
              {eyebrow}
            </p>
            <h1 className="m-0 text-3xl font-bold tracking-tight sm:text-4xl">
              {title}
            </h1>
            <p className="mx-auto max-w-prose text-sm leading-7 opacity-80 sm:text-base">
              {description}
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
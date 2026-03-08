import type { Metadata } from "next"
import metadataObj from "./metadata"

export const metadata: Metadata = metadataObj

export default function EditorLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <>{children}</>
}

import { LoadingState } from "../components/LoadingState/LoadingState"

export default function Loading() {
  return (
    <LoadingState
      eyebrow="Editor"
      title="Loading editor"
      description="Initializing the dialogue editor and its analysis tools."
      className="mt-10"
    />
  )
}
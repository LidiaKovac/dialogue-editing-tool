import { LoadingState } from "../components/LoadingState/LoadingState"

export default function Loading() {
  return (
    <LoadingState
      eyebrow="Character Sheet Builder"
      title="Loading builder"
      description="Restoring the builder interface and saved session state."
    />
  )
}
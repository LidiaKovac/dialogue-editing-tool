import { createClient } from "@sanity/client"
export const sanity = createClient({
    projectId: "a141ls6j",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,

    useCdn: true,
    apiVersion: "2025-02-06",
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
})

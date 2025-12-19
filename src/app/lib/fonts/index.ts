import { Roboto, Roboto_Mono } from "next/font/google";

export const fontBlog = Roboto({
  subsets: ["latin"],
  variable: "--roboto-font",
})

export const font = Roboto_Mono({
  variable: "--roboto_mono-font",
})
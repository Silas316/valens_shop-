import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ValensNotFound } from "@/components/valens-not-found"
import "./(frontend)/styles.css"

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Page introuvable — Valens Studios",
}

export default function GlobalNotFound() {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="min-h-screen antialiased">
        <ValensNotFound />
      </body>
    </html>
  )
}

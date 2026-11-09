import type { Metadata } from "next"
import { ValensNotFound } from "@/components/valens-not-found"

export const metadata: Metadata = {
  title: "Page introuvable — Valens Studios",
}

export default function NotFound() {
  return <ValensNotFound />
}

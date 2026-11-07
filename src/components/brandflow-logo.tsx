import Link from 'next/link'

export function BrandflowMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="brand-mark" aria-label="BrandFlow AI — Accueil">
      <span className="brand-symbol" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      {!compact && (
        <span className="brand-word">
          BrandFlow <b>AI</b>
        </span>
      )}
    </Link>
  )
}

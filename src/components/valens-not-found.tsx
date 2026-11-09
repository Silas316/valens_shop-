import Image from "next/image"
import Link from "next/link"

export function ValensNotFound() {
  return (
    <main className="relative min-h-svh overflow-hidden bg-neutral-950 text-stone-100">
      <Image
        className="absolute inset-0 h-full w-full object-cover md:hidden"
        src="/brand/web/hero-mobile.webp"
        alt=""
        width={1200}
        height={1600}
        unoptimized
      />
      <Image
        className="absolute inset-0 hidden h-full w-full object-cover md:block"
        src="/brand/web/hero-desktop.webp"
        alt=""
        width={2400}
        height={1600}
        unoptimized
      />
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

      <div className="relative z-10 flex min-h-svh flex-col justify-between px-3 py-6 md:px-5">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center tracking-widest">
          <span className="text-xl md:text-3xl">404</span>
          <Link
            href="/"
            aria-label="Valens"
            className="block h-12 w-10 transition-opacity hover:opacity-50 md:h-15 md:w-12"
          >
            <Image
              className="h-full w-full object-contain brightness-0 invert"
              src="/brand/valens-logo.svg"
              alt=""
              width={64}
              height={79}
              unoptimized
            />
          </Link>
          <span />
        </div>

        <div className="flex flex-col items-start justify-between gap-6 pb-1 md:flex-row md:items-end">
          <div>
            <h1 className="max-w-lg text-4xl leading-none font-normal tracking-tighter md:text-6xl">
              Cette page est introuvable.
            </h1>
            <p className="mt-4 text-xs tracking-widest text-stone-100/70 uppercase">
              Page not found · Valens Studios
            </p>
          </div>
          <Link
            href="/"
            className="border-b border-current pb-1 text-xs transition-opacity hover:opacity-50"
          >
            Retour à l&apos;accueil <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>
    </main>
  )
}

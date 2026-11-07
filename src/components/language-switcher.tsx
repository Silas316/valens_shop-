'use client'

import { useEffect, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Languages } from 'lucide-react'
import { setLocaleAction } from '@/app/(frontend)/locale-actions'

export function LanguageSwitcher({
  initialLocale = 'fr',
  compact = false,
}: {
  initialLocale?: 'fr' | 'en'
  compact?: boolean
}) {
  const [locale, setLocale] = useState<'fr' | 'en'>(initialLocale)
  const [pending, startTransition] = useTransition()
  const router = useRouter()

  useEffect(() => {
    const saved = window.localStorage.getItem('brandflow-locale')
    const active = saved === 'en' ? 'en' : initialLocale
    setLocale(active)
    document.documentElement.lang = active
    document.body.dataset.locale = active
  }, [initialLocale])

  const changeLocale = (nextLocale: 'fr' | 'en') => {
    setLocale(nextLocale)
    document.documentElement.lang = nextLocale
    document.body.dataset.locale = nextLocale
    window.localStorage.setItem('brandflow-locale', nextLocale)
    startTransition(async () => {
      await setLocaleAction(nextLocale)
      router.refresh()
    })
  }

  return (
    <div className={`language-switcher ${compact ? 'compact' : ''}`} aria-label="Language">
      {!compact && <Languages size={14} />}
      <button type="button" className={locale === 'fr' ? 'active' : ''} onClick={() => changeLocale('fr')} disabled={pending}>FR</button>
      <i />
      <button type="button" className={locale === 'en' ? 'active' : ''} onClick={() => changeLocale('en')} disabled={pending}>EN</button>
    </div>
  )
}

export function TranslatedText({ fr, en }: { fr: string; en: string }) {
  return (
    <>
      <span className="lang-fr">{fr}</span>
      <span className="lang-en">{en}</span>
    </>
  )
}

'use server'

import { cookies } from 'next/headers'
import { getCurrentUser } from '@/lib/app-auth'
import { getPayloadClient } from '@/lib/payload'

export async function setLocaleAction(locale: 'fr' | 'en') {
  const safeLocale = locale === 'en' ? 'en' : 'fr'
  const store = await cookies()
  store.set('brandflow-locale', safeLocale, {
    httpOnly: false,
    maxAge: 60 * 60 * 24 * 365,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })

  const user = await getCurrentUser()
  if (user) {
    const payload = await getPayloadClient()
    await payload.update({
      collection: 'users',
      id: user.id,
      data: { locale: safeLocale },
      user,
      overrideAccess: false,
    })
  }

  return { locale: safeLocale }
}

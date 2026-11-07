import 'server-only'

import { cookies } from 'next/headers'
import { getPayloadClient } from '@/lib/payload'
import type { User } from '@/payload-types'

const SESSION_COOKIE = 'app-session'

const sessionOptions = {
  httpOnly: true,
  path: '/',
  sameSite: 'lax' as const,
  secure: process.env.NODE_ENV === 'production',
}

export async function getCurrentUser(): Promise<User | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value
  if (!token) return null

  const payload = await getPayloadClient()
  const headers = new Headers({ Authorization: `JWT ${token}` })
  const { user } = await payload.auth({ headers })

  if (!user || user.collection !== 'users') return null
  return user as User
}

export async function startAppSession(token: string, expiresAt?: number) {
  const store = await cookies()
  store.set(SESSION_COOKIE, token, {
    ...sessionOptions,
    expires: expiresAt ? new Date(expiresAt * 1000) : undefined,
  })
}

export async function endAppSession() {
  const store = await cookies()
  store.delete(SESSION_COOKIE)
}

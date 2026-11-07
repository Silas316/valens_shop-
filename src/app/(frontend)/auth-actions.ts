'use server'

import { redirect } from 'next/navigation'
import { getPayloadClient } from '@/lib/payload'
import { endAppSession, startAppSession } from '@/lib/app-auth'

export type AuthState = { error?: string }

const value = (formData: FormData, key: string) =>
  String(formData.get(key) ?? '').trim()

export async function loginAction(
  _state: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = value(formData, 'email').toLowerCase()
  const password = value(formData, 'password')

  if (!email || !password) return { error: 'Renseignez votre e-mail et votre mot de passe.' }

  try {
    const payload = await getPayloadClient()
    const result = await payload.login({
      collection: 'users',
      data: { email, password },
      overrideAccess: false,
    })
    if (!result.token) return { error: 'Connexion impossible. Réessayez.' }
    await startAppSession(result.token, result.exp)
  } catch {
    return { error: 'E-mail ou mot de passe incorrect.' }
  }

  redirect('/dashboard')
}

export async function signupAction(
  _state: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const firstName = value(formData, 'firstName')
  const email = value(formData, 'email').toLowerCase()
  const password = value(formData, 'password')

  if (firstName.length < 2) return { error: 'Indiquez votre prénom.' }
  if (!email.includes('@')) return { error: 'Utilisez une adresse e-mail valide.' }
  if (password.length < 8) return { error: 'Le mot de passe doit contenir au moins 8 caractères.' }

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'users',
      data: { firstName, email, password, onboardingComplete: false },
      overrideAccess: false,
    })
    const result = await payload.login({
      collection: 'users',
      data: { email, password },
      overrideAccess: false,
    })
    if (!result.token) return { error: 'Compte créé, mais la connexion a échoué.' }
    await startAppSession(result.token, result.exp)
  } catch {
    return { error: 'Un compte existe déjà avec cet e-mail, ou les données sont invalides.' }
  }

  redirect('/onboarding')
}

export async function logoutAction() {
  await endAppSession()
  redirect('/')
}

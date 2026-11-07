'use server'

import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/app-auth'
import { getPayloadClient } from '@/lib/payload'

export type OnboardingState = { error?: string }

const text = (formData: FormData, key: string) =>
  String(formData.get(key) ?? '').trim()
const list = (formData: FormData, key: string) =>
  formData.getAll(key).map(String).filter(Boolean)
const currency = (input: string): 'XOF' | 'EUR' | 'USD' =>
  input === 'EUR' || input === 'USD' ? input : 'XOF'
const locale = (input: string): 'fr' | 'en' => input === 'en' ? 'en' : 'fr'

export async function completeOnboarding(
  _state: OnboardingState,
  formData: FormData,
): Promise<OnboardingState> {
  const user = await getCurrentUser()
  if (!user) return { error: 'Votre session a expiré. Reconnectez-vous.' }

  const brandName = text(formData, 'brandName')
  const industry = text(formData, 'industry')
  const country = text(formData, 'country')
  if (!brandName || !industry || !country) {
    return { error: 'Le nom, le secteur et le pays sont obligatoires.' }
  }

  try {
    const payload = await getPayloadClient()
    const organization = await payload.create({
      collection: 'organizations',
      data: { name: brandName, currency: currency(text(formData, 'currency')), owner: user.id },
      user,
      overrideAccess: false,
    })
    const brand = await payload.create({
      collection: 'brands',
      data: {
        name: brandName,
        website: text(formData, 'website'),
        industry,
        country,
        primaryLanguage: locale(text(formData, 'primaryLanguage')),
        businessType: text(formData, 'businessType'),
        organization: organization.id,
        owner: user.id,
      },
      user,
      overrideAccess: false,
    })
    await payload.create({
      collection: 'brand-profiles',
      data: {
        brand: brand.id,
        owner: user.id,
        description: text(formData, 'description'),
        mission: text(formData, 'mission'),
        positioning: text(formData, 'positioning'),
        valueProposition: text(formData, 'valueProposition'),
        targetAudience: text(formData, 'targetAudience'),
        audienceNeeds: text(formData, 'audienceNeeds'),
        values: text(formData, 'values').split(',').map((item) => item.trim()).filter(Boolean),
        tone: list(formData, 'tone'),
        marketingGoals: list(formData, 'goals'),
        platforms: list(formData, 'platforms'),
        completionScore: 78,
      },
      user,
      overrideAccess: false,
    })
    await payload.update({
      collection: 'users',
      id: user.id,
      data: { onboardingComplete: true },
      user,
      overrideAccess: false,
    })
  } catch {
    return { error: 'Le profil de marque n’a pas pu être enregistré. Réessayez.' }
  }

  redirect('/dashboard')
}

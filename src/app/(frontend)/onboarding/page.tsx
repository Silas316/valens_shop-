import { redirect } from 'next/navigation'
import { BrandflowMark } from '@/components/brandflow-logo'
import { OnboardingForm } from '@/components/onboarding-form'
import { getCurrentUser } from '@/lib/app-auth'
import { LanguageSwitcher } from '@/components/language-switcher'

export default async function OnboardingPage() {
  const user = await getCurrentUser()
  if (!user) redirect('/login')
  if (user.onboardingComplete) redirect('/dashboard')

  return (
    <main className="onboarding-page">
      <header><BrandflowMark /><span>Construisons l’intelligence de votre marque</span><LanguageSwitcher initialLocale={user.locale === 'en' ? 'en' : 'fr'} compact /></header>
      <OnboardingForm />
      <p className="onboarding-foot">Vos informations sont privées et isolées dans votre espace.</p>
    </main>
  )
}

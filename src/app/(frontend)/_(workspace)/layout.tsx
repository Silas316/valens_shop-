import { redirect } from 'next/navigation'
import { AppShell } from '@/components/app-shell'
import { getCurrentUser } from '@/lib/app-auth'
import { getPayloadClient } from '@/lib/payload'

export default async function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()
  if (!user) redirect('/login')
  if (!user.onboardingComplete) redirect('/onboarding')

  const payload = await getPayloadClient()
  const brands = await payload.find({
    collection: 'brands',
    where: { owner: { equals: user.id } },
    limit: 1,
    user,
    overrideAccess: false,
  })
  const brand = brands.docs[0]

  return (
    <AppShell
      firstName={user.firstName}
      email={user.email}
      brandName={brand?.name ?? 'Ma marque'}
      locale={user.locale === 'en' ? 'en' : 'fr'}
    >
      {children}
    </AppShell>
  )
}

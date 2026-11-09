import Link from 'next/link'
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDashed,
  FileText,
  Megaphone,
  Sparkles,
  TrendingUp,
} from 'lucide-react'
import { getCurrentUser } from '@/lib/app-auth'
import { getPayloadClient } from '@/lib/payload'

export default async function DashboardPage() {
  const user = await getCurrentUser()
  if (!user) return null
  const payload = await getPayloadClient()
  const [brands, contents, campaigns, usage] = await Promise.all([
    payload.find({ collection: 'brands', where: { owner: { equals: user.id } }, limit: 1, user, overrideAccess: false }),
    payload.count({ collection: 'contents', where: { owner: { equals: user.id } }, user, overrideAccess: false }),
    payload.count({ collection: 'campaigns', where: { and: [{ owner: { equals: user.id } }, { status: { equals: 'active' } }] }, user, overrideAccess: false }),
    payload.count({ collection: 'usage-records', where: { owner: { equals: user.id } }, user, overrideAccess: false }),
  ])
  const brand = brands.docs[0]

  return (
    <main className="dashboard-page app-page">
      <div className="page-title-row">
        <div><p className="eyebrow">VOTRE WORKSPACE MARKETING</p><h1>Bonjour, {user.firstName}.</h1><p>Voici l’état actuel de <strong>{brand?.name ?? 'votre marque'}</strong>.</p></div>
        <Link href="/content-studio" className="button button-primary">Créer un contenu <ArrowRight size={16} /></Link>
      </div>

      <section className="metric-grid">
        <article><span><CalendarDays size={17} /></span><small>Publications programmées</small><strong>0</strong><p>Aucune intégration sociale</p></article>
        <article><span><FileText size={17} /></span><small>Contenus créés</small><strong>{contents.totalDocs}</strong><p>Dans votre workspace</p></article>
        <article><span><Megaphone size={17} /></span><small>Campagnes actives</small><strong>{campaigns.totalDocs}</strong><p>Statut actif uniquement</p></article>
        <article><span><TrendingUp size={17} /></span><small>Engagement global</small><strong>—</strong><p>Connectez une source de données</p></article>
      </section>

      <section className="dashboard-grid">
        <article className="panel performance-panel">
          <div className="panel-head"><div><small>PERFORMANCE OVERVIEW</small><h2>Croissance de l’audience</h2></div><span className="period-label">30 derniers jours <ChevronRight size={14} /></span></div>
          <div className="empty-chart">
            <div className="chart-lines"><i /><i /><i /><i /></div>
            <CircleDashed size={27} />
            <strong>Aucune donnée de performance</strong>
            <p>Connectez un compte social pour afficher des statistiques réelles.</p>
            <Link href="/settings">Configurer une intégration</Link>
          </div>
        </article>

        <article className="panel insights-panel">
          <div className="panel-head"><div><small>BRANDFLOW INTELLIGENCE</small><h2>Your AI Marketing Insights</h2></div><Sparkles size={18} /></div>
          <div className="insight-item">
            <span><CheckCircle2 size={17} /></span>
            <div><strong>Votre Brand DNA est opérationnel</strong><p>Le contexte de {brand?.name ?? 'votre marque'} sera utilisé pour chaque future génération.</p></div>
          </div>
          <div className="insight-item muted">
            <span><CircleDashed size={17} /></span>
            <div><strong>Connectez l’IA pour obtenir des recommandations</strong><p>Ajoutez votre clé OpenAI dans les secrets Make lorsque vous serez prêt.</p></div>
          </div>
          <Link href="/brand-hub" className="panel-link">Enrichir le Brand DNA <ArrowRight size={14} /></Link>
        </article>
      </section>

      <section className="dashboard-grid bottom">
        <article className="panel recent-panel">
          <div className="panel-head"><div><small>RECENT ACTIVITY</small><h2>Activité récente</h2></div></div>
          <div className="empty-row"><FileText size={20} /><div><strong>Votre activité apparaîtra ici</strong><p>Créez un contenu ou une campagne pour commencer.</p></div></div>
        </article>
        <article className="panel quick-panel">
          <div className="panel-head"><div><small>QUICK START</small><h2>Prochaine meilleure action</h2></div></div>
          <Link href="/brand-hub"><span>01</span><div><strong>Compléter votre profil de marque</strong><p>Ajoutez vos différenciateurs et expressions.</p></div><ChevronRight size={15} /></Link>
          <Link href="/content-studio"><span>02</span><div><strong>Préparer votre premier contenu</strong><p>Le studio est prêt dès que l’IA est connectée.</p></div><ChevronRight size={15} /></Link>
        </article>
      </section>

      <p className="data-disclaimer">Les statistiques affichées utilisent uniquement vos données enregistrées. Aucune performance n’est simulée. Générations utilisées : {usage.totalDocs}.</p>
    </main>
  )
}

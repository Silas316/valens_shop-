import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowRight,
  BarChart3,
  BrainCircuit,
  CalendarDays,
  Check,
  CircleAlert,
  CircleDollarSign,
  FileImage,
  FolderOpen,
  Megaphone,
  Package,
  Settings,
  Sparkles,
  Users,
  WandSparkles,
} from 'lucide-react'
import { PaymentMethods } from '@/components/payment-methods'

const modules = {
  'brand-hub': { title: 'Brand Hub', kicker: 'LE CERVEAU DE VOTRE MARQUE', icon: BrainCircuit, description: 'Centralisez votre identité, votre audience, votre voix et vos objectifs dans un Brand DNA unique.', action: 'Mettre à jour le Brand DNA', connected: true },
  assistant: { title: 'AI Marketing Assistant', kicker: 'STRATÉGIE CONTEXTUELLE', icon: Sparkles, description: 'Construisez des stratégies, campagnes et calendriers avec un assistant qui connaît votre marque.', action: 'Connecter OpenAI', connected: false },
  'content-studio': { title: 'Content Studio', kicker: 'CRÉATION MULTICANAL', icon: WandSparkles, description: 'Créez des publications, scripts, newsletters et publicités fidèles à votre Brand DNA.', action: 'Connecter OpenAI', connected: false },
  planner: { title: 'Social Media Planner', kicker: 'PLANIFIER & COLLABORER', icon: CalendarDays, description: 'Organisez votre calendrier éditorial, les validations et les publications de chaque plateforme.', action: 'Créer un brouillon', connected: true },
  'visual-studio': { title: 'Visual Studio', kicker: 'CRÉATION VISUELLE IA', icon: FileImage, description: 'Générez des visuels de marque dans les formats adaptés à chaque canal.', action: 'Connecter le fournisseur IA', connected: false },
  campaigns: { title: 'Campaign Manager', kicker: 'DE L’IDÉE À L’EXÉCUTION', icon: Megaphone, description: 'Cadrez vos objectifs, messages, canaux, budgets et KPI dans un espace partagé.', action: 'Créer une campagne', connected: true },
  products: { title: 'Product Studio', kicker: 'VOTRE CATALOGUE INTELLIGENT', icon: Package, description: 'Transformez chaque produit en argumentaire, fiche, campagne et déclinaisons de contenu.', action: 'Ajouter un produit', connected: true },
  analytics: { title: 'Analytics', kicker: 'PERFORMANCE RÉELLE', icon: BarChart3, description: 'Rassemblez les données vérifiées de vos plateformes et transformez-les en recommandations.', action: 'Connecter une source', connected: false },
  media: { title: 'Media Library', kicker: 'TOUS VOS ACTIFS', icon: FolderOpen, description: 'Organisez logos, photos, vidéos, documents et créations dans une bibliothèque centralisée.', action: 'Importer un fichier', connected: true },
  team: { title: 'Team Workspace', kicker: 'COLLABORATION', icon: Users, description: 'Invitez votre équipe, attribuez les rôles et fluidifiez la validation des contenus.', action: 'Inviter un membre', connected: true },
  billing: { title: 'Billing & Subscription', kicker: 'PLAN & CONSOMMATION', icon: CircleDollarSign, description: 'Suivez votre abonnement, vos crédits, factures et moyens de paiement.', action: 'Comparer les plans', connected: false },
  settings: { title: 'Settings', kicker: 'CONFIGURATION', icon: Settings, description: 'Gérez votre compte, vos préférences et les connexions externes de votre organisation.', action: 'Gérer les intégrations', connected: true },
} as const

export default async function ModulePage({ params }: { params: Promise<{ module: string }> }) {
  const { module } = await params
  const config = modules[module as keyof typeof modules]
  if (!config) notFound()
  const Icon = config.icon

  return (
    <main className="module-page app-page">
      <div className="page-title-row">
        <div><p className="eyebrow">{config.kicker}</p><h1>{config.title}</h1><p>{config.description}</p></div>
        <Link className="button button-primary" href={config.connected ? '#workspace' : '/settings'}>{config.action} <ArrowRight size={15} /></Link>
      </div>

      {!config.connected && (
        <div className="connection-banner">
          <span><CircleAlert size={18} /></span>
          <div><strong>Intégration non connectée</strong><p>Cette fonctionnalité ne simulera aucune action. Connectez le fournisseur requis pour l’activer.</p></div>
          <Link href="/settings">Voir la configuration</Link>
        </div>
      )}

      {module === 'billing' && <PaymentMethods />}

      <section className="module-hero-card">
        <div className="module-icon"><Icon size={28} /></div>
        <div><small>BRANDFLOW MODULE</small><h2>{config.connected ? 'Votre espace est prêt.' : 'Prêt dès que votre intégration l’est.'}</h2><p>{config.connected ? 'Commencez avec une base vide et des données qui vous appartiennent.' : 'L’interface et le modèle de données sont en place. Aucune donnée de démonstration ne sera présentée comme réelle.'}</p></div>
      </section>

      <section className="module-grid">
        <article className="panel" id="workspace">
          <div className="panel-head"><div><small>WORKSPACE</small><h2>Commencer ici</h2></div></div>
          <div className="module-empty"><Icon size={24} /><strong>Aucun élément pour le moment</strong><p>Les éléments créés dans ce module apparaîtront ici.</p><Link className="button button-soft" href={config.connected ? '/dashboard' : '/settings'}>{config.connected ? 'Retour au dashboard' : config.action}</Link></div>
        </article>
        <article className="panel checklist-panel">
          <div className="panel-head"><div><small>READINESS</small><h2>État du module</h2></div></div>
          <p><Check size={15} /> Données isolées par utilisateur</p>
          <p><Check size={15} /> Navigation et interface responsive</p>
          <p className={config.connected ? '' : 'pending'}>{config.connected ? <Check size={15} /> : <CircleAlert size={15} />} {config.connected ? 'Prêt à recevoir vos données' : 'Fournisseur externe à connecter'}</p>
        </article>
      </section>
    </main>
  )
}

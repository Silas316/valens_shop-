import Link from 'next/link'
import { BrandflowMark } from '@/components/brandflow-logo'

export default function TermsPage() {
  return (
    <main className="legal-page">
      <header><BrandflowMark /><Link href="/">Retour à l’accueil</Link></header>
      <article>
        <p className="eyebrow">LEGAL</p>
        <h1>Conditions d’utilisation</h1>
        <p className="legal-date">Version de travail — 12 mai 2026</p>
        <h2>1. Objet du service</h2>
        <p>BrandFlow AI fournit un espace de travail marketing permettant d’organiser les informations de marque, les contenus et les campagnes. Les fonctionnalités dépendant de fournisseurs externes restent indisponibles tant que ces services ne sont pas connectés.</p>
        <h2>2. Responsabilité de l’utilisateur</h2>
        <p>Vous êtes responsable des informations, fichiers et instructions transmis au service, ainsi que de la vérification des contenus avant publication.</p>
        <h2>3. Intelligence artificielle</h2>
        <p>Les résultats générés par IA doivent être relus. BrandFlow AI ne présente pas une génération non confirmée, une publication sociale ou un paiement comme finalisé.</p>
        <h2>4. Données et comptes</h2>
        <p>Les données de chaque compte sont isolées. Vous devez protéger vos identifiants et signaler tout accès non autorisé.</p>
        <div className="legal-notice">Ce texte constitue une base produit et doit être validé par un conseil juridique avant commercialisation.</div>
      </article>
    </main>
  )
}

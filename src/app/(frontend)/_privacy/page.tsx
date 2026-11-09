import Link from 'next/link'
import { BrandflowMark } from '@/components/brandflow-logo'

export default function PrivacyPage() {
  return (
    <main className="legal-page">
      <header><BrandflowMark /><Link href="/">Retour à l’accueil</Link></header>
      <article>
        <p className="eyebrow">PRIVACY</p>
        <h1>Politique de confidentialité</h1>
        <p className="legal-date">Version de travail — 12 mai 2026</p>
        <h2>1. Données collectées</h2>
        <p>Nous traitons les informations de compte, les profils de marque, contenus et préférences nécessaires au fonctionnement du workspace.</p>
        <h2>2. Finalités</h2>
        <p>Ces données servent à fournir le service, sécuriser les comptes, mesurer la consommation et contextualiser les fonctionnalités marketing demandées.</p>
        <h2>3. Fournisseurs externes</h2>
        <p>Les données ne sont transmises à un fournisseur IA, social ou de paiement qu’après connexion explicite de l’intégration correspondante et selon sa finalité.</p>
        <h2>4. Vos droits</h2>
        <p>Vous pouvez demander l’accès, la correction ou la suppression de vos données, sous réserve des obligations légales applicables.</p>
        <div className="legal-notice">Ce texte constitue une base produit et doit être adapté aux juridictions ciblées, notamment au RGPD et aux lois locales applicables.</div>
      </article>
    </main>
  )
}

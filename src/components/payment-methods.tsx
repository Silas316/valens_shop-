import Link from 'next/link'
import {
  ArrowRight,
  CreditCard,
  Radio,
  ShieldCheck,
  Smartphone,
  WalletCards,
} from 'lucide-react'

const methods = [
  {
    name: 'Mobile Money',
    description: 'Paiement mobile local via un agrégateur compatible avec votre pays.',
    icon: Smartphone,
    markets: 'Afrique francophone',
  },
  {
    name: 'MTN MoMo',
    description: 'Paiement et renouvellement via l’écosystème officiel MTN Mobile Money.',
    icon: Radio,
    markets: 'Marchés MTN compatibles',
  },
  {
    name: 'Moov Money',
    description: 'Encaissement mobile pour les marchés couverts par Moov Africa.',
    icon: WalletCards,
    markets: 'Marchés Moov compatibles',
  },
  {
    name: 'Carte bancaire',
    description: 'Visa, Mastercard et cartes compatibles via Stripe.',
    icon: CreditCard,
    markets: 'Europe et marchés Stripe',
  },
]

export function PaymentMethods() {
  return (
    <section className="payment-section">
      <div className="payment-heading">
        <div>
          <p className="eyebrow">PAYMENT METHODS</p>
          <h2><span className="lang-fr">Choisissez votre moyen de paiement</span><span className="lang-en">Choose your payment method</span></h2>
          <p><span className="lang-fr">Les options disponibles dépendront de votre pays et de la devise sélectionnée.</span><span className="lang-en">Available options depend on your country and selected currency.</span></p>
        </div>
        <span className="secure-payment"><ShieldCheck size={16} /> Vérification serveur</span>
      </div>
      <div className="payment-grid">
        {methods.map(({ name, description, icon: Icon, markets }) => (
          <article key={name}>
            <div className="payment-icon"><Icon size={21} /></div>
            <span className="connection-status"><i /> À connecter</span>
            <h3>{name}</h3>
            <p>{description}</p>
            <small>{markets}</small>
            <Link href="/settings">Configurer <ArrowRight size={14} /></Link>
          </article>
        ))}
      </div>
      <div className="payment-safety">
        <ShieldCheck size={18} />
        <p><strong>Aucun paiement n’est encore actif.</strong> Une transaction ne sera considérée comme payée qu’après confirmation du fournisseur et validation d’un webhook côté serveur.</p>
      </div>
    </section>
  )
}

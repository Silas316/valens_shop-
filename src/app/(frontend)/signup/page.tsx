import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { BrandflowMark } from '@/components/brandflow-logo'
import { AuthForm } from '@/components/auth-form'

export default function SignupPage() {
  return (
    <main className="auth-page">
      <Link href="/" className="auth-logo"><BrandflowMark /></Link>
      <section className="auth-panel">
        <p className="eyebrow">START FOR FREE</p>
        <h1>Construisez un marketing<br />qui vous ressemble.</h1>
        <p className="auth-intro">Créez votre espace et donnez à votre IA le contexte dont elle a besoin.</p>
        <AuthForm mode="signup" />
        <small className="legal-note">En créant un compte, vous acceptez nos <Link href="/terms">conditions</Link> et notre <Link href="/privacy">politique de confidentialité</Link>.</small>
      </section>
      <aside className="auth-aside signup-aside">
        <div className="signup-benefit"><Sparkles size={20} /><p>Votre Brand DNA guide chaque stratégie, contenu et campagne.</p></div>
        <div className="mini-dna"><span>Brand DNA</span><strong>Built around you.</strong><div>{['Voice', 'Audience', 'Goals', 'Positioning'].map((item) => <i key={item}>{item}</i>)}</div></div>
      </aside>
    </main>
  )
}

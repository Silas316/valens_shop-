import Link from 'next/link'
import { BrandflowMark } from '@/components/brandflow-logo'
import { AuthForm } from '@/components/auth-form'

export default function LoginPage() {
  return (
    <main className="auth-page">
      <Link href="/" className="auth-logo"><BrandflowMark /></Link>
      <section className="auth-panel">
        <p className="eyebrow">WELCOME BACK</p>
        <h1>Retrouvez votre<br />marketing workspace.</h1>
        <p className="auth-intro">Connectez-vous pour poursuivre avec vos marques, contenus et campagnes.</p>
        <AuthForm mode="login" />
      </section>
      <aside className="auth-aside">
        <div className="auth-quote"><span>“</span><p>BrandFlow ne génère pas seulement du contenu. Il comprend pourquoi notre marque existe.</p><small>TÉMOIGNAGE DE DÉMONSTRATION</small></div>
      </aside>
    </main>
  )
}

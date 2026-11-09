import Link from 'next/link'
import { Mail } from 'lucide-react'
import { BrandflowMark } from '@/components/brandflow-logo'

export default function ForgotPasswordPage() {
  return (
    <main className="simple-page">
      <BrandflowMark />
      <section className="simple-card">
        <span className="simple-icon"><Mail size={22} /></span>
        <h1>Mot de passe oublié</h1>
        <p>La réinitialisation par e-mail sera disponible dès que le service d’envoi transactionnel sera connecté.</p>
        <Link href="/login" className="button button-primary">Retour à la connexion</Link>
      </section>
    </main>
  )
}

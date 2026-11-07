'use client'

import { useActionState, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, LoaderCircle } from 'lucide-react'
import {
  completeOnboarding,
  type OnboardingState,
} from '@/app/(frontend)/onboarding/actions'

const steps = [
  'Entreprise',
  'Identité',
  'Audience',
  'Voix',
  'Objectifs',
  'Plateformes',
]

const tones = ['Professionnel', 'Premium', 'Amical', 'Audacieux', 'Éducatif', 'Humoristique', 'Institutionnel']
const goals = ['Notoriété', 'Engagement', 'Génération de prospects', 'Ventes', 'Fidélisation', 'Lancement de produits']
const platforms = ['Instagram', 'Facebook', 'LinkedIn', 'TikTok', 'X', 'Pinterest']

function Choices({ name, items }: { name: string; items: string[] }) {
  return (
    <div className="choice-grid">
      {items.map((item) => (
        <label className="choice" key={item}>
          <input type="checkbox" name={name} value={item} />
          <span><Check size={14} />{item}</span>
        </label>
      ))}
    </div>
  )
}

export function OnboardingForm() {
  const [step, setStep] = useState(0)
  const [state, formAction, pending] = useActionState<OnboardingState, FormData>(
    completeOnboarding,
    {},
  )

  return (
    <form action={formAction} className="onboarding-card">
      <div className="onboarding-progress" aria-label={`Étape ${step + 1} sur 6`}>
        <span style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
      </div>
      <div className="onboarding-head">
        <div>
          <p className="eyebrow">Étape {step + 1} sur {steps.length}</p>
          <h1>{steps[step]}</h1>
        </div>
        <span className="step-count">{String(step + 1).padStart(2, '0')} / 06</span>
      </div>

      <div className="onboarding-fields">
        <section hidden={step !== 0}>
          <p className="step-intro">Commençons par les fondations de votre marque.</p>
          <div className="form-grid">
            <label><span>Nom de la marque *</span><input name="brandName" required placeholder="Ex. Kora Studio" /></label>
            <label><span>Site internet</span><input name="website" type="url" placeholder="https://" /></label>
            <label><span>Secteur d’activité *</span><input name="industry" required placeholder="Mode, Fintech, Conseil…" /></label>
            <label><span>Pays *</span><input name="country" required placeholder="Sénégal" /></label>
            <label><span>Type d’entreprise</span><select name="businessType"><option>PME</option><option>Agence</option><option>Startup</option><option>Indépendant</option><option>Commerce</option></select></label>
            <label><span>Langue principale</span><select name="primaryLanguage"><option value="fr">Français</option><option value="en">English</option></select></label>
            <label><span>Devise</span><select name="currency"><option>XOF</option><option>EUR</option><option>USD</option></select></label>
          </div>
        </section>
        <section hidden={step !== 1}>
          <p className="step-intro">Donnez à l’IA le contexte qui rend votre marque unique.</p>
          <div className="form-stack">
            <label><span>Décrivez votre marque</span><textarea name="description" rows={3} placeholder="Ce que vous faites, pour qui et pourquoi…" /></label>
            <label><span>Mission</span><textarea name="mission" rows={2} placeholder="La raison d’être de votre entreprise" /></label>
            <label><span>Valeurs</span><input name="values" placeholder="Innovation, proximité, excellence" /></label>
            <label><span>Positionnement</span><textarea name="positioning" rows={2} placeholder="La place que vous souhaitez occuper sur votre marché" /></label>
            <label><span>Proposition de valeur</span><textarea name="valueProposition" rows={2} placeholder="La promesse centrale faite à vos clients" /></label>
          </div>
        </section>
        <section hidden={step !== 2}>
          <p className="step-intro">Une stratégie pertinente commence par une audience précise.</p>
          <div className="form-stack">
            <label><span>Cible principale</span><textarea name="targetAudience" rows={4} placeholder="Profil, âge, localisation, rôle…" /></label>
            <label><span>Problèmes et besoins</span><textarea name="audienceNeeds" rows={4} placeholder="Quels problèmes cherchent-ils à résoudre ?" /></label>
          </div>
        </section>
        <section hidden={step !== 3}>
          <p className="step-intro">Sélectionnez les tonalités qui doivent guider chaque contenu.</p>
          <Choices name="tone" items={tones} />
        </section>
        <section hidden={step !== 4}>
          <p className="step-intro">Choisissez vos priorités marketing actuelles.</p>
          <Choices name="goals" items={goals} />
        </section>
        <section hidden={step !== 5}>
          <p className="step-intro">Où votre marque prend-elle la parole ?</p>
          <Choices name="platforms" items={platforms} />
          <div className="dna-ready">
            <span><Check size={18} /></span>
            <div><strong>Votre Brand DNA est prêt à prendre forme.</strong><p>Vous pourrez l’enrichir à tout moment depuis le Brand Hub.</p></div>
          </div>
        </section>
      </div>

      {state.error && <p className="form-error" role="alert">{state.error}</p>}
      <div className="onboarding-actions">
        <button type="button" className="button button-ghost" onClick={() => setStep((value) => Math.max(0, value - 1))} disabled={step === 0 || pending}>
          <ArrowLeft size={16} /> Retour
        </button>
        {step < steps.length - 1 ? (
          <button type="button" className="button button-primary" onClick={() => setStep((value) => Math.min(steps.length - 1, value + 1))}>
            Continuer <ArrowRight size={16} />
          </button>
        ) : (
          <button type="submit" className="button button-primary" disabled={pending}>
            {pending ? <LoaderCircle className="spin" size={16} /> : <Check size={16} />}
            Créer mon Brand DNA
          </button>
        )}
      </div>
    </form>
  )
}

'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { ArrowRight, LoaderCircle } from 'lucide-react'
import {
  loginAction,
  signupAction,
  type AuthState,
} from '@/app/(frontend)/auth-actions'

const initialState: AuthState = {}

export function AuthForm({ mode }: { mode: 'login' | 'signup' }) {
  const action = mode === 'login' ? loginAction : signupAction
  const [state, formAction, pending] = useActionState(action, initialState)

  return (
    <form action={formAction} className="auth-form">
      {mode === 'signup' && (
        <label>
          <span>Prénom</span>
          <input name="firstName" autoComplete="given-name" placeholder="Aminata" required />
        </label>
      )}
      <label>
        <span>Adresse e-mail</span>
        <input name="email" type="email" autoComplete="email" placeholder="vous@entreprise.com" required />
      </label>
      <label>
        <span>Mot de passe</span>
        <input
          name="password"
          type="password"
          autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
          placeholder="8 caractères minimum"
          minLength={8}
          required
        />
      </label>
      {mode === 'login' && (
        <Link className="forgot-link" href="/forgot-password">Mot de passe oublié ?</Link>
      )}
      {state.error && <p className="form-error" role="alert">{state.error}</p>}
      <button className="button button-primary auth-submit" type="submit" disabled={pending}>
        {pending ? <LoaderCircle className="spin" size={17} /> : mode === 'login' ? 'Se connecter' : 'Créer mon espace'}
        {!pending && <ArrowRight size={17} />}
      </button>
      <p className="auth-switch">
        {mode === 'login' ? 'Nouveau sur BrandFlow ?' : 'Vous avez déjà un compte ?'}{' '}
        <Link href={mode === 'login' ? '/signup' : '/login'}>
          {mode === 'login' ? 'Créer un compte' : 'Se connecter'}
        </Link>
      </p>
    </form>
  )
}

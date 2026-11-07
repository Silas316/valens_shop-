import Link from 'next/link'
import {
  BarChart3,
  Bell,
  BrainCircuit,
  CalendarDays,
  ChevronDown,
  CircleDollarSign,
  Command,
  FileImage,
  FolderOpen,
  Gauge,
  LayoutDashboard,
  Megaphone,
  Package,
  Plus,
  Search,
  Settings,
  Sparkles,
  Users,
  WandSparkles,
} from 'lucide-react'
import { BrandflowMark } from '@/components/brandflow-logo'
import { logoutAction } from '@/app/(frontend)/auth-actions'
import { LanguageSwitcher } from '@/components/language-switcher'

const navigation = [
  { href: '/dashboard', fr: 'Tableau de bord', en: 'Dashboard', icon: LayoutDashboard },
  { href: '/brand-hub', fr: 'Brand Hub', en: 'Brand Hub', icon: BrainCircuit },
  { href: '/assistant', fr: 'Assistant IA', en: 'AI Assistant', icon: Sparkles },
  { href: '/content-studio', fr: 'Content Studio', en: 'Content Studio', icon: WandSparkles },
  { href: '/planner', fr: 'Planning social', en: 'Social Planner', icon: CalendarDays },
  { href: '/visual-studio', fr: 'Visual Studio', en: 'Visual Studio', icon: FileImage },
  { href: '/campaigns', fr: 'Campagnes', en: 'Campaigns', icon: Megaphone },
  { href: '/products', fr: 'Produits', en: 'Products', icon: Package },
  { href: '/analytics', fr: 'Analytics', en: 'Analytics', icon: BarChart3 },
  { href: '/media', fr: 'Médiathèque', en: 'Media Library', icon: FolderOpen },
]

export function AppShell({
  children,
  firstName,
  email,
  brandName,
  locale,
}: {
  children: React.ReactNode
  firstName: string
  email: string
  brandName: string
  locale: 'fr' | 'en'
}) {
  const initials = (firstName || email).slice(0, 2).toUpperCase()
  const t = locale === 'en'
    ? {
        activeBrand: 'ACTIVE BRAND',
        workspace: 'WORKSPACE',
        organization: 'ORGANIZATION',
        team: 'Team Workspace',
        billing: 'Billing & usage',
        settings: 'Settings',
        search: 'Search your workspace…',
        create: 'Create',
        generations: 'AI generations used',
        upgrade: 'Upgrade plan',
      }
    : {
        activeBrand: 'MARQUE ACTIVE',
        workspace: 'ESPACE DE TRAVAIL',
        organization: 'ORGANISATION',
        team: 'Espace équipe',
        billing: 'Facturation & usage',
        settings: 'Paramètres',
        search: 'Rechercher dans votre espace…',
        create: 'Créer',
        generations: 'Générations IA utilisées',
        upgrade: 'Changer de plan',
      }

  return (
    <div className="workspace">
      <aside className="app-sidebar">
        <div className="sidebar-logo"><BrandflowMark /></div>
        <button className="brand-switcher" type="button" disabled title="Une seule marque disponible avec le plan Free">
          <span>{brandName.slice(0, 1).toUpperCase()}</span>
          <div><small>{t.activeBrand}</small><strong>{brandName}</strong></div>
          <ChevronDown size={15} />
        </button>
        <nav aria-label="Navigation de l’application">
          <small>{t.workspace}</small>
          {navigation.map(({ href, fr, en, icon: Icon }, index) => (
            <Link href={href} key={href} className={index === 0 ? 'active' : ''}>
              <Icon size={17} /><span>{locale === 'en' ? en : fr}</span>
              {href === '/assistant' && <i>AI</i>}
            </Link>
          ))}
          <small>{t.organization}</small>
          <Link href="/team"><Users size={17} /><span>{t.team}</span></Link>
          <Link href="/billing"><CircleDollarSign size={17} /><span>{t.billing}</span></Link>
          <Link href="/settings"><Settings size={17} /><span>{t.settings}</span></Link>
        </nav>
        <div className="usage-card">
          <div><span><Gauge size={15} /></span><small>FREE PLAN</small></div>
          <strong>0 / 10</strong><p>{t.generations}</p>
          <i><b style={{ width: '0%' }} /></i>
          <Link href="/billing">{t.upgrade}</Link>
        </div>
        <form action={logoutAction} className="sidebar-profile">
          <span>{initials}</span>
          <div><strong>{firstName || 'Mon compte'}</strong><small>{email}</small></div>
          <button type="submit" aria-label="Se déconnecter"><ChevronDown size={14} /></button>
        </form>
      </aside>

      <div className="app-main">
        <header className="app-topbar">
          <div className="global-search"><Search size={16} /><span>{t.search}</span><kbd><Command size={11} /> K</kbd></div>
          <LanguageSwitcher initialLocale={locale} />
          <Link className="topbar-icon" href="/settings" aria-label="Notifications"><Bell size={18} /></Link>
          <Link href="/content-studio" className="button button-primary"><Plus size={15} /> {t.create}</Link>
        </header>
        {children}
      </div>
    </div>
  )
}

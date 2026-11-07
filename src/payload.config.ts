import path from 'path'
import { buildFigmaConfig } from '@payloadcms/figma'
import { mcpPlugin } from '@payloadcms/plugin-mcp'
import { fr as adminLanguage } from '@payloadcms/translations/languages/fr'
import { fileURLToPath } from 'url'
import { Admins } from './collections/Admins'
import { Media } from './collections/Media'
import { Folders } from './collections/Folders'
import { Tags } from './collections/Tags'
import { Posts } from './collections/Posts'
import { Users } from './collections/Users'
import { Organizations } from './collections/Organizations'
import { Brands } from './collections/Brands'
import { BrandProfiles } from './collections/BrandProfiles'
import { Contents } from './collections/Contents'
import { Campaigns } from './collections/Campaigns'
import { UsageRecords } from './collections/UsageRecords'
import { Subscriptions } from './collections/Subscriptions'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildFigmaConfig({
  admin: {
    user: Admins.slug,
    constrainWidth: true,
    dashboard: {
      widgets: [],
      defaultLayout: [
        { widgetSlug: 'activity', width: 'full' },
        { widgetSlug: 'collections', width: 'full' },
      ],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  i18n: {
    fallbackLanguage: 'fr',
    supportedLanguages: { 'fr': adminLanguage },
  },
  collections: [
    Admins,
    Users,
    Organizations,
    Brands,
    BrandProfiles,
    Contents,
    Campaigns,
    UsageRecords,
    Subscriptions,
    Media,
    Folders,
    Tags,
    Posts,
  ],
  localization: {
    locales: [{ code: 'en', label: 'English' }],
    fallback: true,
    defaultLocale: 'en',
  },
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  plugins: [mcpPlugin({})],
  figma: {},
})

import type { CollectionConfig } from 'payload'
import { appUsersOnly, ownDocuments, setOwner } from './access'

export const UsageRecords: CollectionConfig = {
  slug: 'usage-records',
  admin: { group: 'BrandFlow', useAsTitle: 'kind' },
  access: {
    create: appUsersOnly,
    delete: () => false,
    read: ownDocuments,
    update: () => false,
  },
  fields: [
    { name: 'kind', type: 'select', required: true, options: ['text-generation', 'image-generation'] },
    { name: 'credits', type: 'number', required: true, min: 1 },
    { name: 'brand', type: 'relationship', relationTo: 'brands', required: true },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hooks: { beforeValidate: [setOwner] },
      admin: { position: 'sidebar', readOnly: true },
    },
  ],
}

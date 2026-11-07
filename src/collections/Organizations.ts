import type { CollectionConfig } from 'payload'
import { appUsersOnly, ownDocuments, setOwner } from './access'

export const Organizations: CollectionConfig = {
  slug: 'organizations',
  admin: {
    group: 'BrandFlow',
    useAsTitle: 'name',
  },
  access: {
    create: appUsersOnly,
    delete: ownDocuments,
    read: ownDocuments,
    update: ownDocuments,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      index: true,
      hooks: { beforeValidate: [setOwner] },
      admin: { position: 'sidebar', readOnly: true },
    },
    {
      name: 'plan',
      type: 'select',
      defaultValue: 'free',
      options: ['free', 'starter', 'pro', 'agency'],
      admin: { position: 'sidebar' },
    },
    {
      name: 'currency',
      type: 'select',
      defaultValue: 'XOF',
      options: ['XOF', 'EUR', 'USD'],
    },
  ],
}

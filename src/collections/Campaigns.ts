import type { CollectionConfig } from 'payload'
import { appUsersOnly, ownDocuments, setOwner } from './access'

export const Campaigns: CollectionConfig = {
  slug: 'campaigns',
  admin: { group: 'BrandFlow', useAsTitle: 'name' },
  access: {
    create: appUsersOnly,
    delete: ownDocuments,
    read: ownDocuments,
    update: ownDocuments,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'objective', type: 'text', required: true },
    { name: 'audience', type: 'textarea' },
    { name: 'budget', type: 'number', min: 0 },
    { name: 'startsAt', type: 'date' },
    { name: 'endsAt', type: 'date' },
    { name: 'channels', type: 'text', hasMany: true },
    { name: 'keyMessages', type: 'textarea' },
    { name: 'kpis', type: 'text', hasMany: true },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: ['draft', 'active', 'paused', 'completed'],
    },
    { name: 'brand', type: 'relationship', relationTo: 'brands', required: true, index: true },
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

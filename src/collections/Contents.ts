import type { CollectionConfig } from 'payload'
import { appUsersOnly, ownDocuments, setOwner } from './access'

export const Contents: CollectionConfig = {
  slug: 'contents',
  admin: { group: 'BrandFlow', useAsTitle: 'title' },
  access: {
    create: appUsersOnly,
    delete: ownDocuments,
    read: ownDocuments,
    update: ownDocuments,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'body', type: 'textarea', required: true },
    { name: 'contentType', type: 'text', required: true },
    { name: 'platform', type: 'text' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: ['draft', 'in-review', 'approved', 'scheduled', 'published'],
    },
    { name: 'scheduledAt', type: 'date' },
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

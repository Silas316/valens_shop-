import type { CollectionConfig } from 'payload'
import { appUsersOnly, ownDocuments, setOwner } from './access'

export const Brands: CollectionConfig = {
  slug: 'brands',
  admin: { group: 'BrandFlow', useAsTitle: 'name' },
  access: {
    create: appUsersOnly,
    delete: ownDocuments,
    read: ownDocuments,
    update: ownDocuments,
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'website', type: 'text' },
    { name: 'industry', type: 'text', required: true },
    { name: 'country', type: 'text', required: true },
    {
      name: 'primaryLanguage',
      type: 'select',
      defaultValue: 'fr',
      options: [
        { label: 'Français', value: 'fr' },
        { label: 'English', value: 'en' },
      ],
    },
    { name: 'businessType', type: 'text' },
    { name: 'logo', type: 'upload', relationTo: 'media' },
    {
      name: 'organization',
      type: 'relationship',
      relationTo: 'organizations',
      required: true,
      index: true,
    },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      index: true,
      hooks: { beforeValidate: [setOwner] },
      admin: { position: 'sidebar', readOnly: true },
    },
  ],
}

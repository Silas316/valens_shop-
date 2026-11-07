import type { CollectionConfig } from 'payload'
import { appUsersOnly, ownDocuments, setOwner } from './access'

export const BrandProfiles: CollectionConfig = {
  slug: 'brand-profiles',
  labels: { plural: 'Brand DNA', singular: 'Brand DNA' },
  admin: { group: 'BrandFlow', useAsTitle: 'brand' },
  access: {
    create: appUsersOnly,
    delete: ownDocuments,
    read: ownDocuments,
    update: ownDocuments,
  },
  fields: [
    {
      name: 'brand',
      type: 'relationship',
      relationTo: 'brands',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'owner',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hooks: { beforeValidate: [setOwner] },
      admin: { position: 'sidebar', readOnly: true },
    },
    { name: 'description', type: 'textarea' },
    { name: 'mission', type: 'textarea' },
    { name: 'vision', type: 'textarea' },
    { name: 'values', type: 'text', hasMany: true },
    { name: 'positioning', type: 'textarea' },
    { name: 'valueProposition', type: 'textarea' },
    { name: 'differentiators', type: 'textarea' },
    { name: 'targetAudience', type: 'textarea' },
    { name: 'audienceNeeds', type: 'textarea' },
    { name: 'tone', type: 'text', hasMany: true },
    { name: 'preferredExpressions', type: 'text', hasMany: true },
    { name: 'forbiddenExpressions', type: 'text', hasMany: true },
    { name: 'marketingGoals', type: 'text', hasMany: true },
    { name: 'platforms', type: 'text', hasMany: true },
    { name: 'completionScore', type: 'number', defaultValue: 70, min: 0, max: 100 },
  ],
}

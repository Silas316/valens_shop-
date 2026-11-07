import type { CollectionConfig } from 'payload'
import { ownDocuments } from './access'

export const Subscriptions: CollectionConfig = {
  slug: 'subscriptions',
  admin: { group: 'BrandFlow', useAsTitle: 'providerReference' },
  access: {
    create: () => false,
    delete: () => false,
    read: ownDocuments,
    update: () => false,
  },
  fields: [
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
      admin: { position: 'sidebar', readOnly: true },
    },
    {
      name: 'plan',
      type: 'select',
      required: true,
      options: ['starter', 'pro', 'agency'],
    },
    {
      name: 'paymentMethod',
      type: 'select',
      required: true,
      options: ['mobile-money', 'mtn-momo', 'moov-money', 'card-stripe'],
    },
    {
      name: 'provider',
      type: 'select',
      required: true,
      options: ['not-connected', 'stripe', 'mtn-momo', 'moov-money', 'aggregator'],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: ['pending', 'active', 'past-due', 'cancelled'],
    },
    { name: 'providerReference', type: 'text', index: true },
    { name: 'currentPeriodEnd', type: 'date' },
  ],
}

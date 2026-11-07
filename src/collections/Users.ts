import type { CollectionConfig } from 'payload'
import { isAppUser } from './access'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    hidden: true,
    useAsTitle: 'email',
  },
  access: {
    admin: () => false,
    create: () => true,
    delete: ({ req }) => isAppUser(req.user),
    read: ({ req }) =>
      isAppUser(req.user) ? { id: { equals: req.user.id } } : false,
    update: ({ req }) =>
      isAppUser(req.user) ? { id: { equals: req.user.id } } : false,
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
    },
    {
      name: 'lastName',
      type: 'text',
    },
    {
      name: 'locale',
      type: 'select',
      defaultValue: 'fr',
      options: [
        { label: 'Français', value: 'fr' },
        { label: 'English', value: 'en' },
      ],
    },
    {
      name: 'onboardingComplete',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}

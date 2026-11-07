import type { Access, FieldHook } from 'payload'

export const isAppUser = (user: unknown): user is { id: string | number; collection: 'users' } =>
  Boolean(
    user &&
      typeof user === 'object' &&
      'collection' in user &&
      user.collection === 'users' &&
      'id' in user,
  )

export const ownDocuments: Access = ({ req }) => {
  if (!isAppUser(req.user)) return false
  return { owner: { equals: req.user.id } }
}

export const appUsersOnly: Access = ({ req }) => isAppUser(req.user)

export const setOwner: FieldHook = ({ req, value }) =>
  isAppUser(req.user) ? req.user.id : value

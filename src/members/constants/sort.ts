export const MemberSortField = {
  FirstName: 'firstName',
  LastName: 'lastName',
  Email: 'email',
} as const

export type MemberSortField =
  (typeof MemberSortField)[keyof typeof MemberSortField]

export const MemberMenuAction = {
  Edit: 'edit',
  Delete: 'delete',
} as const

export type MemberMenuAction =
  (typeof MemberMenuAction)[keyof typeof MemberMenuAction]

export const MemberSortField = {
  FirstName: 'firstName',
  LastName: 'lastName',
  Email: 'email',
  ActiveLoans: 'activeLoans',
} as const

export type MemberSortField =
  (typeof MemberSortField)[keyof typeof MemberSortField]

export const MemberMenuAction = {
  Edit: 'edit',
  Return: 'return',
  Delete: 'delete',
} as const

export type MemberMenuAction =
  (typeof MemberMenuAction)[keyof typeof MemberMenuAction]

export const MemberSelectEmptyValue = {
  None: '',
} as const

export type MemberSelectEmptyValue =
  (typeof MemberSelectEmptyValue)[keyof typeof MemberSelectEmptyValue]

export const BookSortField = {
  Title: 'title',
  Author: 'author',
  Copies: 'copies',
  Availability: 'availability',
} as const

export type BookSortField = (typeof BookSortField)[keyof typeof BookSortField]

export const BookMenuAction = {
  Edit: 'edit',
  AdjustCopies: 'adjust-copies',
  Loan: 'loan',
  Return: 'return',
  Delete: 'delete',
} as const

export type BookMenuAction = (typeof BookMenuAction)[keyof typeof BookMenuAction]

export const BookSelectEmptyValue = {
  None: '',
} as const

export type BookSelectEmptyValue =
  (typeof BookSelectEmptyValue)[keyof typeof BookSelectEmptyValue]

export const BookSortField = {
  Title: 'title',
  Author: 'author',
  Copies: 'copies',
} as const

export type BookSortField = (typeof BookSortField)[keyof typeof BookSortField]

export const BookMenuAction = {
  Edit: 'edit',
  AdjustCopies: 'adjust-copies',
  Loan: 'loan',
  Delete: 'delete',
} as const

export type BookMenuAction = (typeof BookMenuAction)[keyof typeof BookMenuAction]

export const BookSelectEmptyValue = {
  None: '',
} as const

export type BookSelectEmptyValue =
  (typeof BookSelectEmptyValue)[keyof typeof BookSelectEmptyValue]

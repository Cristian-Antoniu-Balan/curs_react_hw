export const LoanSortField = {
  Book: 'book',
  Member: 'member',
  LoanedAt: 'loanedAt',
} as const

export type LoanSortField = (typeof LoanSortField)[keyof typeof LoanSortField]

export const LoanMenuAction = {
  Return: 'return',
} as const

export type LoanMenuAction = (typeof LoanMenuAction)[keyof typeof LoanMenuAction]

export const LoanSelectEmptyValue = {
  None: '',
} as const

export type LoanSelectEmptyValue =
  (typeof LoanSelectEmptyValue)[keyof typeof LoanSelectEmptyValue]

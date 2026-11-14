export const LoanActiveFilter = {
  All: 'all',
  Active: 'true',
  Inactive: 'false',
} as const

export type LoanActiveFilter =
  (typeof LoanActiveFilter)[keyof typeof LoanActiveFilter]

export const LoanEntityFilter = {
  All: 'all',
} as const

export type LoanEntityFilter =
  (typeof LoanEntityFilter)[keyof typeof LoanEntityFilter]

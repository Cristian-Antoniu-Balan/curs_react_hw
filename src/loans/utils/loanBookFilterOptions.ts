import type { Loan } from '@/loans/types/loan'

export type LoanBookFilterOption = {
  id: string
  title: string
}

export function loanBookFilterOptions(loans: Loan[]): LoanBookFilterOption[] {
  const byId = new Map<string, LoanBookFilterOption>()

  for (const loan of loans) {
    if (byId.has(loan.book.id)) {
      continue
    }

    byId.set(loan.book.id, {
      id: loan.book.id,
      title: loan.book.title,
    })
  }

  return [...byId.values()].sort((left, right) =>
    left.title.localeCompare(right.title, undefined, { sensitivity: 'base' }),
  )
}

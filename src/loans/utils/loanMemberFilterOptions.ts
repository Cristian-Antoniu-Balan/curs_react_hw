import type { Loan } from '@/loans/types/loan'
import { formatLoanMemberName } from '@/loans/utils/formatMemberName'

export type LoanMemberFilterOption = {
  id: string
  label: string
}

export function loanMemberFilterOptions(
  loans: Loan[],
): LoanMemberFilterOption[] {
  const byId = new Map<string, LoanMemberFilterOption>()

  for (const loan of loans) {
    if (byId.has(loan.member.id)) {
      continue
    }

    byId.set(loan.member.id, {
      id: loan.member.id,
      label: formatLoanMemberName(loan.member),
    })
  }

  return [...byId.values()].sort((left, right) =>
    left.label.localeCompare(right.label, undefined, { sensitivity: 'base' }),
  )
}

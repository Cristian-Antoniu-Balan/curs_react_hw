import {
  LoanEntityFilter,
  type LoanEntityFilter as LoanEntityFilterValue,
} from '@/loans/constants/entityFilter'
import type { Loan } from '@/loans/types/loan'

export function filterLoansByMember(
  loans: Loan[],
  memberFilter: LoanEntityFilterValue | string,
): Loan[] {
  if (memberFilter === LoanEntityFilter.All) {
    return loans
  }

  return loans.filter((loan) => loan.member.id === memberFilter)
}

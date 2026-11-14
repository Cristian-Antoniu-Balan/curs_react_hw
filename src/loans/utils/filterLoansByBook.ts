import {
  LoanEntityFilter,
  type LoanEntityFilter as LoanEntityFilterValue,
} from '@/loans/constants/entityFilter'
import type { Loan } from '@/loans/types/loan'

export function filterLoansByBook(
  loans: Loan[],
  bookFilter: LoanEntityFilterValue | string,
): Loan[] {
  if (bookFilter === LoanEntityFilter.All) {
    return loans
  }

  return loans.filter((loan) => loan.book.id === bookFilter)
}

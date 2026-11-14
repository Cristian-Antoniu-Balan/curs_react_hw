import {
  LoanSortField,
  type LoanSortField as LoanSortFieldValue,
} from '@/loans/constants/sort'
import type { Loan } from '@/loans/types/loan'
import { formatPersonName } from '@/shared/utils/formatPersonName'
import {
  UiSortDirection,
  type UiSortDirection as UiSortDirectionValue,
} from '@/shared/constants/ui'

function compareText(left: string, right: string): number {
  return left.localeCompare(right, undefined, { sensitivity: 'base' })
}

function loanSortValue(loan: Loan, field: LoanSortFieldValue): string {
  if (field === LoanSortField.Book) {
    return loan.book.title
  }

  if (field === LoanSortField.Member) {
    return formatPersonName(loan.member)
  }

  return loan.loanedAt
}

export function sortLoans(
  loans: Loan[],
  field: LoanSortFieldValue,
  direction: UiSortDirectionValue,
): Loan[] {
  const sorted = [...loans].sort((left, right) => {
    return compareText(loanSortValue(left, field), loanSortValue(right, field))
  })

  if (direction === UiSortDirection.Desc) {
    sorted.reverse()
  }

  return sorted
}

import type { Book } from '@/books/types/book'
import { memberStrings } from '@/members/constants/strings'
import { formatDateTime } from '@/shared/utils/formatDateTime'

export function formatLoanBookOptionLabel(loan: {
  book: Book
  loanedAt: string
}): string {
  return [
    loan.book.title,
    memberStrings.loanedAtPrefix,
    formatDateTime(loan.loanedAt),
  ].join('')
}

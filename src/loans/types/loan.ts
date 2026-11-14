import type { Book } from '@/books/types/book'
import type { Member } from '@/members/types/member'

export type Loan = {
  id: string
  book: Book
  member: Member
  loanedAt: string
  returnedAt: string | null
  isActive: boolean
}

export type LoanRequest = {
  bookId: string
  memberId: string
}

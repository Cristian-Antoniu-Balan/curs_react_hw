import { bookStrings } from '@/books/constants/strings'
import type { Book } from '@/books/types/book'

type AvailabilitySource = Pick<Book, 'isAvailable' | 'copies' | 'loanedCopies'>

export function availableCopies(book: Pick<Book, 'copies' | 'loanedCopies'>): number {
  return book.copies - book.loanedCopies
}

export function availabilityLabel(book: AvailabilitySource): string {
  if (!book.isAvailable) {
    return bookStrings.unavailable
  }

  return (
    bookStrings.available +
    bookStrings.availableCountOpen +
    String(availableCopies(book)) +
    bookStrings.availableCountClose
  )
}

import { BookSortField, type BookSortField as BookSortFieldValue } from '@/books/constants/sort'
import type { Book } from '@/books/types/book'
import { UiSortDirection, type UiSortDirection as UiSortDirectionValue } from '@/shared/constants/ui'

function compareText(left: string, right: string): number {
  return left.localeCompare(right, undefined, { sensitivity: 'base' })
}

function compareNumber(left: number, right: number): number {
  return left - right
}

function compareBoolean(left: boolean, right: boolean): number {
  if (left === right) {
    return 0
  }

  if (left) {
    return -1
  }

  return 1
}

export function sortBooks(
  books: Book[],
  field: BookSortFieldValue,
  direction: UiSortDirectionValue,
): Book[] {
  const sorted = [...books].sort((left, right) => {
    if (field === BookSortField.Title) {
      return compareText(left.title, right.title)
    }

    if (field === BookSortField.Author) {
      return compareText(left.author, right.author)
    }

    if (field === BookSortField.Copies) {
      return compareNumber(left.copies, right.copies)
    }

    if (field === BookSortField.Availability) {
      return compareBoolean(left.isAvailable, right.isAvailable)
    }

    return 0
  })

  if (direction === UiSortDirection.Desc) {
    sorted.reverse()
  }

  return sorted
}

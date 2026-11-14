import { bookStrings } from '@/books/constants/strings'

export function availabilityLabel(isAvailable: boolean): string {
  if (isAvailable) {
    return bookStrings.available
  }

  return bookStrings.unavailable
}

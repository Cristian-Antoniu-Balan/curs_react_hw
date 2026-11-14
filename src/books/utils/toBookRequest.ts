import type { BookRequest } from '@/books/types/book'

export type BookFormValues = {
  title: string
  author: string
  copies: string
}

export function emptyBookFormValues(): BookFormValues {
  return {
    title: '',
    author: '',
    copies: '1',
  }
}

export function bookToFormValues(book: {
  title: string
  author: string
  copies: number
}): BookFormValues {
  return {
    title: book.title,
    author: book.author,
    copies: String(book.copies),
  }
}

export function toBookRequest(values: BookFormValues): BookRequest {
  return {
    title: values.title.trim(),
    author: values.author.trim(),
    copies: Number(values.copies),
  }
}

export function toCopiesPatch(copies: string): { copies: number } {
  return {
    copies: Number(copies),
  }
}

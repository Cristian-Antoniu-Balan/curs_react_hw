import type { Book } from '@/books/types/book'

export function filterBooksBySearch(books: Book[], search: string): Book[] {
  const query = search.trim().toLowerCase()
  if (query.length === 0) {
    return books
  }

  return books.filter((book) => {
    const titleMatch = book.title.toLowerCase().includes(query)
    const authorMatch = book.author.toLowerCase().includes(query)
    return titleMatch || authorMatch
  })
}

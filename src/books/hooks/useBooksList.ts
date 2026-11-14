import { useCallback, useEffect, useState } from 'react'
import { listBooks } from '@/books/api/booksApi'
import {
  BookAvailabilityFilter,
  type BookAvailabilityFilter as BookAvailabilityFilterValue,
} from '@/books/constants/availabilityFilter'
import { bookStrings } from '@/books/constants/strings'
import { resolveErrorMessage } from '@/books/utils/resolveErrorMessage'
import type { Book } from '@/books/types/book'

function availableQueryFromFilter(
  filter: BookAvailabilityFilterValue,
): boolean | undefined {
  if (filter === BookAvailabilityFilter.Available) {
    return true
  }

  if (filter === BookAvailabilityFilter.Unavailable) {
    return false
  }

  return undefined
}

export function useBooksList(filter: BookAvailabilityFilterValue) {
  const [books, setBooks] = useState<Book[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const reload = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await listBooks(availableQueryFromFilter(filter))
      setBooks(result)
    } catch (caught) {
      setError(resolveErrorMessage(caught, bookStrings.loadFailed))
      setBooks(null)
    } finally {
      setLoading(false)
    }
  }, [filter])

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const result = await listBooks(availableQueryFromFilter(filter))
        if (!cancelled) {
          setBooks(result)
        }
      } catch (caught) {
        if (!cancelled) {
          setError(resolveErrorMessage(caught, bookStrings.loadFailed))
          setBooks(null)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void load()

    return () => {
      cancelled = true
    }
  }, [filter])

  return {
    books,
    error,
    loading,
    reload,
  }
}

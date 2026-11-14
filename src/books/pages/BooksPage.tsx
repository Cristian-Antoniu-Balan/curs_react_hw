import { useEffect, useState } from 'react'
import { Box, Spinner, Stack, Text } from '@chakra-ui/react'
import { listBooks } from '@/books/api/booksApi'
import type { Book } from '@/books/types/book'
import { ResourcePage } from '@/shared/components/ResourcePage'
import { strings } from '@/shared/constants/strings'
import {
  UiColor,
  UiGap,
  UiHtmlElement,
  UiListStyle,
} from '@/shared/constants/ui'
import { ApiError } from '@/shared/types/apiError'

function resolveLoadErrorMessage(caught: unknown): string {
  if (caught instanceof ApiError) {
    return caught.message
  }

  if (caught instanceof Error) {
    return caught.message
  }

  return strings.books.loadFailed
}

type BookAvailabilityLabel =
  | typeof strings.books.available
  | typeof strings.books.unavailable

function formatBookLine(book: Book): string {
  let availabilityLabel: BookAvailabilityLabel = strings.books.unavailable
  if (book.isAvailable) {
    availabilityLabel = strings.books.available
  }

  return [
    book.title,
    strings.books.titleAuthorSeparator,
    book.author,
    strings.books.copiesOpen,
    String(book.copies),
    strings.books.copiesLabel,
    strings.books.availabilityPrefix,
    availabilityLabel,
    strings.books.copiesClose,
  ].join('')
}

export function BooksPage() {
  const [books, setBooks] = useState<Book[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false

    async function loadBooks() {
      setLoading(true)
      setError(null)

      try {
        const result = await listBooks()
        if (!cancelled) {
          setBooks(result)
        }
      } catch (caught) {
        if (!cancelled) {
          setError(resolveLoadErrorMessage(caught))
          setBooks(null)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void loadBooks()

    return () => {
      cancelled = true
    }
  }, [])

  if (loading) {
    return (
      <ResourcePage title={strings.books.title}>
        <Spinner />
      </ResourcePage>
    )
  }

  if (error) {
    return (
      <ResourcePage title={strings.books.title}>
        <Text color={UiColor.Error}>{error}</Text>
      </ResourcePage>
    )
  }

  if (books === null || books.length === 0) {
    return (
      <ResourcePage title={strings.books.title}>
        <Text color={UiColor.Muted}>{strings.books.empty}</Text>
      </ResourcePage>
    )
  }

  return (
    <ResourcePage title={strings.books.title}>
      <Stack
        as={UiHtmlElement.UnorderedList}
        gap={UiGap.Two}
        listStyleType={UiListStyle.None}
        p={UiGap.None}
        m={UiGap.None}
      >
        {books.map((book) => (
          <Box as={UiHtmlElement.ListItem} key={book.id}>
            <Text>{formatBookLine(book)}</Text>
          </Box>
        ))}
      </Stack>
    </ResourcePage>
  )
}

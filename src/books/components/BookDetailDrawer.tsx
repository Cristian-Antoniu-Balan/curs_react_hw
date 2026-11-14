import { useEffect, useState } from 'react'
import {
  Alert,
  Drawer,
  Portal,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react'
import { getBook } from '@/books/api/booksApi'
import { bookStrings } from '@/books/constants/strings'
import type { Book } from '@/books/types/book'
import { availabilityLabel } from '@/books/utils/availabilityLabel'
import { resolveErrorMessage } from '@/books/utils/resolveErrorMessage'
import {
  UiAlertStatus,
  UiColor,
  UiDrawerPlacement,
  UiGap,
} from '@/shared/constants/ui'

type BookDetailDrawerProps = {
  open: boolean
  bookId: string | null
  onOpenChange: (open: boolean) => void
}

export function BookDetailDrawer({
  open,
  bookId,
  onOpenChange,
}: BookDetailDrawerProps) {
  const [book, setBook] = useState<Book | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open || !bookId) {
      return
    }

    let cancelled = false

    async function loadDetail(id: string) {
      setLoading(true)
      setError(null)
      setBook(null)

      try {
        const result = await getBook(id)
        if (!cancelled) {
          setBook(result)
        }
      } catch (caught) {
        if (!cancelled) {
          setError(resolveErrorMessage(caught, bookStrings.detailLoadFailed))
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void loadDetail(bookId)

    return () => {
      cancelled = true
    }
  }, [open, bookId])

  let body = null

  if (loading) {
    body = <Spinner />
  }

  if (!loading && error) {
    body = (
      <Alert.Root status={UiAlertStatus.Error}>
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Description>{error}</Alert.Description>
        </Alert.Content>
      </Alert.Root>
    )
  }

  if (!loading && !error && book) {
    body = (
      <Stack gap={UiGap.Two}>
        <Text>
          {bookStrings.fieldId}: {book.id}
        </Text>
        <Text>
          {bookStrings.fieldTitle}: {book.title}
        </Text>
        <Text>
          {bookStrings.fieldAuthor}: {book.author}
        </Text>
        <Text>
          {bookStrings.fieldCopies}: {book.copies}
        </Text>
        <Text>
          {bookStrings.fieldAvailability}: {availabilityLabel(book.isAvailable)}
        </Text>
      </Stack>
    )
  }

  if (!loading && !error && !book) {
    body = <Text color={UiColor.Muted}>{bookStrings.detailLoadFailed}</Text>
  }

  return (
    <Drawer.Root
      open={open}
      placement={UiDrawerPlacement.End}
      onOpenChange={(details) => {
        onOpenChange(details.open)
      }}
    >
      <Portal>
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content>
            <Drawer.Header>
              <Drawer.Title>{bookStrings.detailDrawerTitle}</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>{body}</Drawer.Body>
            <Drawer.CloseTrigger />
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}

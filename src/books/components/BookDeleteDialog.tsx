import { useState } from 'react'
import {
  Button,
  Stack,
  Text,
} from '@chakra-ui/react'
import { deleteBook } from '@/books/api/booksApi'
import { bookStrings } from '@/books/constants/strings'
import type { Book } from '@/books/types/book'
import { resolveErrorMessage } from '@/shared/utils/resolveErrorMessage'
import { AppDialogShell } from '@/shared/components/AppDialogShell'
import { InlineErrorAlert } from '@/shared/components/InlineErrorAlert'
import {
  UiButtonColorPalette,
  UiButtonVariant,
  UiGap,
} from '@/shared/constants/ui'

type BookDeleteDialogProps = {
  open: boolean
  book: Book | null
  onOpenChange: (open: boolean) => void
  onDeleted: () => Promise<void> | void
}

export function BookDeleteDialog({
  open,
  book,
  onOpenChange,
  onDeleted,
}: BookDeleteDialogProps) {
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleDelete() {
    if (!book) {
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      await deleteBook(book.id)
      onOpenChange(false)
      await onDeleted()
    } catch (caught) {
      setError(resolveErrorMessage(caught, bookStrings.deleteFailed))
    } finally {
      setSubmitting(false)
    }
  }

  let confirmText = null
  if (book) {
    confirmText = (
      <Text>
        {bookStrings.deleteConfirmPrefix}
        {book.title}
        {bookStrings.deleteConfirmSuffix}
      </Text>
    )
  }

  return (
    <AppDialogShell
      open={open}
      title={bookStrings.deleteDialogTitle}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          setError(null)
        }
        onOpenChange(nextOpen)
      }}
      body={
        <Stack gap={UiGap.Three}>
          <InlineErrorAlert message={error} />
          {confirmText}
        </Stack>
      }
      footer={
        <>
          <Button
            variant={UiButtonVariant.Outline}
            disabled={submitting}
            onClick={() => {
              onOpenChange(false)
            }}
          >
            {bookStrings.cancelButton}
          </Button>
          <Button
            colorPalette={UiButtonColorPalette.Red}
            loading={submitting}
            onClick={() => {
              void handleDelete()
            }}
          >
            {bookStrings.confirmDeleteButton}
          </Button>
        </>
      }
    />
  )
}

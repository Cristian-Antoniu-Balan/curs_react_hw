import { useState } from 'react'
import {
  Alert,
  Button,
  Dialog,
  Portal,
  Stack,
  Text,
} from '@chakra-ui/react'
import { deleteBook } from '@/books/api/booksApi'
import { bookStrings } from '@/books/constants/strings'
import type { Book } from '@/books/types/book'
import { resolveErrorMessage } from '@/books/utils/resolveErrorMessage'
import {
  UiAlertStatus,
  UiButtonColorPalette,
  UiButtonVariant,
  UiDialogPlacement,
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

  let errorAlert = null
  if (error) {
    errorAlert = (
      <Alert.Root status={UiAlertStatus.Error}>
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Description>{error}</Alert.Description>
        </Alert.Content>
      </Alert.Root>
    )
  }

  return (
    <Dialog.Root
      open={open}
      placement={UiDialogPlacement.Center}
      onOpenChange={(details) => {
        if (!details.open) {
          setError(null)
        }
        onOpenChange(details.open)
      }}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{bookStrings.deleteDialogTitle}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Stack gap={UiGap.Three}>
                {errorAlert}
                {confirmText}
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
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
            </Dialog.Footer>
            <Dialog.CloseTrigger />
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

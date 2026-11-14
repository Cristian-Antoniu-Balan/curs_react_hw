import { useState } from 'react'
import {
  Alert,
  Button,
  Dialog,
  Portal,
  Stack,
} from '@chakra-ui/react'
import { patchBook } from '@/books/api/booksApi'
import { BookFormFields } from '@/books/components/BookFormFields'
import { bookStrings } from '@/books/constants/strings'
import type { Book } from '@/books/types/book'
import {
  bookToFormValues,
  emptyBookFormValues,
  toCopiesPatch,
  type BookFormValues,
} from '@/books/utils/toBookRequest'
import { resolveErrorMessage } from '@/books/utils/resolveErrorMessage'
import {
  UiAlertStatus,
  UiButtonColorPalette,
  UiButtonVariant,
  UiDialogPlacement,
  UiGap,
} from '@/shared/constants/ui'

type BookAdjustCopiesDialogProps = {
  open: boolean
  book: Book | null
  onOpenChange: (open: boolean) => void
  onUpdated: () => Promise<void> | void
}

function initialValues(book: Book | null): BookFormValues {
  if (!book) {
    return emptyBookFormValues()
  }

  return bookToFormValues(book)
}

export function BookAdjustCopiesDialog({
  open,
  book,
  onOpenChange,
  onUpdated,
}: BookAdjustCopiesDialogProps) {
  const [values, setValues] = useState<BookFormValues>(() => initialValues(book))
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit() {
    if (!book) {
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      await patchBook(book.id, toCopiesPatch(values.copies))
      onOpenChange(false)
      await onUpdated()
    } catch (caught) {
      setError(resolveErrorMessage(caught, bookStrings.patchFailed))
    } finally {
      setSubmitting(false)
    }
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
              <Dialog.Title>{bookStrings.adjustCopiesDialogTitle}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Stack gap={UiGap.Three}>
                {errorAlert}
                <BookFormFields
                  values={values}
                  onChange={setValues}
                  disabled={submitting}
                  copiesOnly
                />
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
                colorPalette={UiButtonColorPalette.Blue}
                loading={submitting}
                onClick={() => {
                  void handleSubmit()
                }}
              >
                {bookStrings.saveButton}
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger />
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

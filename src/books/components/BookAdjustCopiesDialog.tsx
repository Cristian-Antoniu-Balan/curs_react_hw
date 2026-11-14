import { useState } from 'react'
import {
  Alert,
  Button,
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
import { AppDialogShell } from '@/shared/components/AppDialogShell'
import {
  UiAlertStatus,
  UiButtonColorPalette,
  UiButtonVariant,
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
    <AppDialogShell
      open={open}
      title={bookStrings.adjustCopiesDialogTitle}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          setError(null)
        }
        onOpenChange(nextOpen)
      }}
      body={
        <Stack gap={UiGap.Three}>
          {errorAlert}
          <BookFormFields
            values={values}
            onChange={setValues}
            disabled={submitting}
            copiesOnly
          />
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
            colorPalette={UiButtonColorPalette.Brand}
            loading={submitting}
            onClick={() => {
              void handleSubmit()
            }}
          >
            {bookStrings.saveButton}
          </Button>
        </>
      }
    />
  )
}

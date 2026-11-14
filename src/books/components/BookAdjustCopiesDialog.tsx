import { useState } from 'react'
import {
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
import { resolveErrorMessage } from '@/shared/utils/resolveErrorMessage'
import { AppDialogShell } from '@/shared/components/AppDialogShell'
import { InlineErrorAlert } from '@/shared/components/InlineErrorAlert'
import {
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
          <InlineErrorAlert message={error} />
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

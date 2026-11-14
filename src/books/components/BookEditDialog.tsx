import { useState } from 'react'
import {
  Button,
  Stack,
} from '@chakra-ui/react'
import { replaceBook } from '@/books/api/booksApi'
import { BookFormFields } from '@/books/components/BookFormFields'
import { bookStrings } from '@/books/constants/strings'
import type { Book } from '@/books/types/book'
import {
  bookToFormValues,
  emptyBookFormValues,
  toBookRequest,
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

type BookEditDialogProps = {
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

export function BookEditDialog({
  open,
  book,
  onOpenChange,
  onUpdated,
}: BookEditDialogProps) {
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
      await replaceBook(book.id, toBookRequest(values))
      onOpenChange(false)
      await onUpdated()
    } catch (caught) {
      setError(resolveErrorMessage(caught, bookStrings.updateFailed))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AppDialogShell
      open={open}
      title={bookStrings.editDialogTitle}
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

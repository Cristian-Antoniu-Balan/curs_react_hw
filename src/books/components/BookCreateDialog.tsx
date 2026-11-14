import { useState } from 'react'
import {
  Button,
  Stack,
} from '@chakra-ui/react'
import { createBook } from '@/books/api/booksApi'
import { BookFormFields } from '@/books/components/BookFormFields'
import { bookStrings } from '@/books/constants/strings'
import {
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

type BookCreateDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreated: () => Promise<void> | void
}

export function BookCreateDialog({
  open,
  onOpenChange,
  onCreated,
}: BookCreateDialogProps) {
  const [values, setValues] = useState<BookFormValues>(emptyBookFormValues)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit() {
    setSubmitting(true)
    setError(null)

    try {
      await createBook(toBookRequest(values))
      setValues(emptyBookFormValues())
      onOpenChange(false)
      await onCreated()
    } catch (caught) {
      setError(resolveErrorMessage(caught, bookStrings.createFailed))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AppDialogShell
      open={open}
      title={bookStrings.createDialogTitle}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          setError(null)
          setValues(emptyBookFormValues())
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

import { useState } from 'react'
import {
  Alert,
  Button,
  Dialog,
  Portal,
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
import { resolveErrorMessage } from '@/books/utils/resolveErrorMessage'
import {
  UiAlertStatus,
  UiButtonColorPalette,
  UiButtonVariant,
  UiDialogPlacement,
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
          setValues(emptyBookFormValues())
        }
        onOpenChange(details.open)
      }}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{bookStrings.createDialogTitle}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Stack gap={UiGap.Three}>
                {errorAlert}
                <BookFormFields
                  values={values}
                  onChange={setValues}
                  disabled={submitting}
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

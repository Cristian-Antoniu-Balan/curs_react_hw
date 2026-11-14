import { useEffect, useState } from 'react'
import {
  Alert,
  Button,
  Dialog,
  Field,
  NativeSelect,
  Portal,
  Stack,
  Spinner,
} from '@chakra-ui/react'
import { createLoan } from '@/loans/api/loansApi'
import { listMembers } from '@/members/api/membersApi'
import type { Member } from '@/members/types/member'
import { BookSelectEmptyValue } from '@/books/constants/sort'
import { bookStrings } from '@/books/constants/strings'
import type { Book } from '@/books/types/book'
import { formatMemberLabel } from '@/books/utils/formatMemberLabel'
import { resolveErrorMessage } from '@/books/utils/resolveErrorMessage'
import {
  UiAlertStatus,
  UiButtonColorPalette,
  UiButtonVariant,
  UiDialogPlacement,
  UiGap,
  UiNativeSelectSize,
  UiWidth,
} from '@/shared/constants/ui'

type BookLoanDialogProps = {
  open: boolean
  book: Book | null
  onOpenChange: (open: boolean) => void
  onLoaned: () => Promise<void> | void
}

export function BookLoanDialog({
  open,
  book,
  onOpenChange,
  onLoaned,
}: BookLoanDialogProps) {
  const [members, setMembers] = useState<Member[]>([])
  const [memberId, setMemberId] = useState<string>(BookSelectEmptyValue.None)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loadingMembers, setLoadingMembers] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!open) {
      return
    }

    let cancelled = false

    async function loadMembers() {
      setLoadingMembers(true)
      setLoadError(null)
      setError(null)
      setMemberId(BookSelectEmptyValue.None)

      try {
        const result = await listMembers()
        if (!cancelled) {
          setMembers(result)
        }
      } catch (caught) {
        if (!cancelled) {
          setLoadError(resolveErrorMessage(caught, bookStrings.loanFailed))
          setMembers([])
        }
      } finally {
        if (!cancelled) {
          setLoadingMembers(false)
        }
      }
    }

    void loadMembers()

    return () => {
      cancelled = true
    }
  }, [open])

  async function handleSubmit() {
    if (!book || memberId.length === 0) {
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      await createLoan({
        bookId: book.id,
        memberId,
      })
      onOpenChange(false)
      await onLoaned()
    } catch (caught) {
      setError(resolveErrorMessage(caught, bookStrings.loanFailed))
    } finally {
      setSubmitting(false)
    }
  }

  let bodyContent = null

  if (loadingMembers) {
    bodyContent = <Spinner />
  }

  if (!loadingMembers && loadError) {
    bodyContent = (
      <Alert.Root status={UiAlertStatus.Error}>
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Description>{loadError}</Alert.Description>
        </Alert.Content>
      </Alert.Root>
    )
  }

  if (!loadingMembers && !loadError) {
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

    bodyContent = (
      <Stack gap={UiGap.Three}>
        {errorAlert}
        <Field.Root>
          <Field.Label>{bookStrings.loanMemberLabel}</Field.Label>
          <NativeSelect.Root
            size={UiNativeSelectSize.Md}
            w={UiWidth.Full}
            disabled={submitting}
          >
            <NativeSelect.Field
              value={memberId}
              onChange={(event) => {
                setMemberId(event.target.value)
              }}
            >
              <option value={BookSelectEmptyValue.None}>
                {bookStrings.loanMemberPlaceholder}
              </option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {formatMemberLabel(member)}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>
      </Stack>
    )
  }

  return (
    <Dialog.Root
      open={open}
      placement={UiDialogPlacement.Center}
      onOpenChange={(details) => {
        if (!details.open) {
          setError(null)
          setLoadError(null)
          setMemberId(BookSelectEmptyValue.None)
        }
        onOpenChange(details.open)
      }}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{bookStrings.loanDialogTitle}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>{bodyContent}</Dialog.Body>
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
                disabled={loadingMembers || memberId.length === 0}
                onClick={() => {
                  void handleSubmit()
                }}
              >
                {bookStrings.confirmLoanButton}
              </Button>
            </Dialog.Footer>
            <Dialog.CloseTrigger />
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

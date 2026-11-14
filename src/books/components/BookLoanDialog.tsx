import { useEffect, useState } from 'react'
import {
  Button,
  Field,
  NativeSelect,
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
import { resolveErrorMessage } from '@/shared/utils/resolveErrorMessage'
import { AppDialogShell } from '@/shared/components/AppDialogShell'
import { InlineErrorAlert } from '@/shared/components/InlineErrorAlert'
import {
  UiButtonColorPalette,
  UiButtonVariant,
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
    bodyContent = <InlineErrorAlert message={loadError} />
  }

  if (!loadingMembers && !loadError) {

    bodyContent = (
      <Stack gap={UiGap.Three}>
        <InlineErrorAlert message={error} />
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
    <AppDialogShell
      open={open}
      title={bookStrings.loanDialogTitle}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          setError(null)
          setLoadError(null)
          setMemberId(BookSelectEmptyValue.None)
        }
        onOpenChange(nextOpen)
      }}
      body={bodyContent}
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
            disabled={loadingMembers || memberId.length === 0}
            onClick={() => {
              void handleSubmit()
            }}
          >
            {bookStrings.confirmLoanButton}
          </Button>
        </>
      }
    />
  )
}

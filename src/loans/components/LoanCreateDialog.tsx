import { useEffect, useState } from 'react'
import {
  Button,
  Field,
  NativeSelect,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react'
import { listBooks } from '@/books/api/booksApi'
import type { Book } from '@/books/types/book'
import { createLoan } from '@/loans/api/loansApi'
import { LoanSelectEmptyValue } from '@/loans/constants/sort'
import { loanStrings } from '@/loans/constants/strings'
import { formatBookOptionLabel } from '@/loans/utils/formatBookOptionLabel'
import { formatMemberOptionLabel } from '@/loans/utils/formatMemberOptionLabel'
import { resolveErrorMessage } from '@/shared/utils/resolveErrorMessage'
import { listMembers } from '@/members/api/membersApi'
import type { Member } from '@/members/types/member'
import { AppDialogShell } from '@/shared/components/AppDialogShell'
import { InlineErrorAlert } from '@/shared/components/InlineErrorAlert'
import {
  UiButtonColorPalette,
  UiButtonVariant,
  UiColor,
  UiGap,
  UiNativeSelectSize,
  UiWidth,
} from '@/shared/constants/ui'

type LoanCreateDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreated: () => Promise<void> | void
}

export function LoanCreateDialog({
  open,
  onOpenChange,
  onCreated,
}: LoanCreateDialogProps) {
  const [books, setBooks] = useState<Book[]>([])
  const [members, setMembers] = useState<Member[]>([])
  const [bookId, setBookId] = useState<string>(LoanSelectEmptyValue.None)
  const [memberId, setMemberId] = useState<string>(LoanSelectEmptyValue.None)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loadingOptions, setLoadingOptions] = useState(false)
  const [hasFetchedOptions, setHasFetchedOptions] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  function resetLocalState() {
    setError(null)
    setLoadError(null)
    setBookId(LoanSelectEmptyValue.None)
    setMemberId(LoanSelectEmptyValue.None)
    setBooks([])
    setMembers([])
    setLoadingOptions(false)
    setHasFetchedOptions(false)
    setSubmitting(false)
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      resetLocalState()
    }
    onOpenChange(nextOpen)
  }

  useEffect(() => {
    if (!open) {
      return
    }

    let cancelled = false

    async function loadOptions() {
      setLoadingOptions(true)
      setHasFetchedOptions(false)
      setLoadError(null)
      setError(null)
      setBookId(LoanSelectEmptyValue.None)
      setMemberId(LoanSelectEmptyValue.None)
      setBooks([])
      setMembers([])

      try {
        const [availableBooks, allMembers] = await Promise.all([
          listBooks(true),
          listMembers(),
        ])
        if (!cancelled) {
          setBooks(availableBooks)
          setMembers(allMembers)
        }
      } catch (caught) {
        if (!cancelled) {
          setLoadError(
            resolveErrorMessage(caught, loanStrings.createFailed),
          )
          setBooks([])
          setMembers([])
        }
      } finally {
        if (!cancelled) {
          setLoadingOptions(false)
          setHasFetchedOptions(true)
        }
      }
    }

    void loadOptions()

    return () => {
      cancelled = true
    }
  }, [open])

  async function handleSubmit() {
    if (bookId.length === 0 || memberId.length === 0) {
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      await createLoan({
        bookId,
        memberId,
      })
      handleOpenChange(false)
      await onCreated()
    } catch (caught) {
      setError(resolveErrorMessage(caught, loanStrings.createFailed))
    } finally {
      setSubmitting(false)
    }
  }

  let bodyContent = null

  if (loadingOptions || !hasFetchedOptions) {
    bodyContent = <Spinner />
  }

  if (hasFetchedOptions && !loadingOptions && loadError) {
    bodyContent = <InlineErrorAlert message={loadError} />
  }

  if (hasFetchedOptions && !loadingOptions && !loadError) {

    let booksField = null
    if (books.length === 0) {
      booksField = (
        <Text color={UiColor.Muted}>{loanStrings.createNoBooks}</Text>
      )
    }

    if (books.length > 0) {
      booksField = (
        <Field.Root>
          <Field.Label>{loanStrings.createBookLabel}</Field.Label>
          <NativeSelect.Root
            size={UiNativeSelectSize.Md}
            w={UiWidth.Full}
            disabled={submitting}
          >
            <NativeSelect.Field
              value={bookId}
              onChange={(event) => {
                setBookId(event.target.value)
              }}
            >
              <option value={LoanSelectEmptyValue.None}>
                {loanStrings.createBookPlaceholder}
              </option>
              {books.map((book) => (
                <option key={book.id} value={book.id}>
                  {formatBookOptionLabel(book)}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>
      )
    }

    let membersField = null
    if (members.length === 0) {
      membersField = (
        <Text color={UiColor.Muted}>{loanStrings.createNoMembers}</Text>
      )
    }

    if (members.length > 0) {
      membersField = (
        <Field.Root>
          <Field.Label>{loanStrings.createMemberLabel}</Field.Label>
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
              <option value={LoanSelectEmptyValue.None}>
                {loanStrings.createMemberPlaceholder}
              </option>
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {formatMemberOptionLabel(member)}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>
      )
    }

    bodyContent = (
      <Stack gap={UiGap.Three}>
        <InlineErrorAlert message={error} />
        {booksField}
        {membersField}
      </Stack>
    )
  }

  const canSubmit =
    hasFetchedOptions &&
    !loadingOptions &&
    books.length > 0 &&
    members.length > 0 &&
    bookId.length > 0 &&
    memberId.length > 0

  return (
    <AppDialogShell
      open={open}
      title={loanStrings.createDialogTitle}
      onOpenChange={handleOpenChange}
      body={bodyContent}
      footer={
        <>
          <Button
            variant={UiButtonVariant.Outline}
            disabled={submitting}
            onClick={() => {
              handleOpenChange(false)
            }}
          >
            {loanStrings.cancelButton}
          </Button>
          <Button
            colorPalette={UiButtonColorPalette.Brand}
            loading={submitting}
            disabled={!canSubmit}
            onClick={() => {
              void handleSubmit()
            }}
          >
            {loanStrings.confirmCreateButton}
          </Button>
        </>
      }
    />
  )
}

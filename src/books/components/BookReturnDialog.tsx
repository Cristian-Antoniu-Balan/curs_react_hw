import { useEffect, useState } from 'react'
import {
  Alert,
  Button,
  Field,
  NativeSelect,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react'
import { listLoans, returnLoan } from '@/loans/api/loansApi'
import type { Loan } from '@/loans/types/loan'
import { BookSelectEmptyValue } from '@/books/constants/sort'
import { bookStrings } from '@/books/constants/strings'
import type { Book } from '@/books/types/book'
import { formatLoanOptionLabel } from '@/books/utils/formatMemberLabel'
import { resolveErrorMessage } from '@/books/utils/resolveErrorMessage'
import { AppDialogShell } from '@/shared/components/AppDialogShell'
import {
  UiAlertStatus,
  UiButtonColorPalette,
  UiButtonVariant,
  UiColor,
  UiGap,
  UiNativeSelectSize,
  UiWidth,
} from '@/shared/constants/ui'

type BookReturnDialogProps = {
  open: boolean
  book: Book | null
  onOpenChange: (open: boolean) => void
  onReturned: () => Promise<void> | void
}

export function BookReturnDialog({
  open,
  book,
  onOpenChange,
  onReturned,
}: BookReturnDialogProps) {
  const [loans, setLoans] = useState<Loan[]>([])
  const [loanId, setLoanId] = useState<string>(BookSelectEmptyValue.None)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loadingLoans, setLoadingLoans] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!open || !book) {
      return
    }

    let cancelled = false
    const bookId = book.id

    async function loadActiveLoans() {
      setLoadingLoans(true)
      setLoadError(null)
      setError(null)
      setLoanId(BookSelectEmptyValue.None)

      try {
        const activeLoans = await listLoans(true)
        const forBook = activeLoans.filter((loan) => loan.book.id === bookId)
        if (!cancelled) {
          setLoans(forBook)
          if (forBook.length === 1) {
            setLoanId(forBook[0].id)
          }
        }
      } catch (caught) {
        if (!cancelled) {
          setLoadError(resolveErrorMessage(caught, bookStrings.returnFailed))
          setLoans([])
        }
      } finally {
        if (!cancelled) {
          setLoadingLoans(false)
        }
      }
    }

    void loadActiveLoans()

    return () => {
      cancelled = true
    }
  }, [open, book])

  async function handleSubmit() {
    if (loanId.length === 0) {
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      await returnLoan(loanId)
      onOpenChange(false)
      await onReturned()
    } catch (caught) {
      setError(resolveErrorMessage(caught, bookStrings.returnFailed))
    } finally {
      setSubmitting(false)
    }
  }

  let bodyContent = null

  if (loadingLoans) {
    bodyContent = <Spinner />
  }

  if (!loadingLoans && loadError) {
    bodyContent = (
      <Alert.Root status={UiAlertStatus.Error}>
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Description>{loadError}</Alert.Description>
        </Alert.Content>
      </Alert.Root>
    )
  }

  if (!loadingLoans && !loadError && loans.length === 0) {
    bodyContent = (
      <Text color={UiColor.Muted}>{bookStrings.noActiveLoan}</Text>
    )
  }

  if (!loadingLoans && !loadError && loans.length > 0) {
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

    let loanPicker = null
    if (loans.length > 1) {
      loanPicker = (
        <Field.Root>
          <Field.Label>{bookStrings.returnLoanLabel}</Field.Label>
          <NativeSelect.Root
            size={UiNativeSelectSize.Md}
            w={UiWidth.Full}
            disabled={submitting}
          >
            <NativeSelect.Field
              value={loanId}
              onChange={(event) => {
                setLoanId(event.target.value)
              }}
            >
              <option value={BookSelectEmptyValue.None}>
                {bookStrings.returnLoanPlaceholder}
              </option>
              {loans.map((loan) => (
                <option key={loan.id} value={loan.id}>
                  {formatLoanOptionLabel(loan)}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>
      )
    }

    if (loans.length === 1) {
      loanPicker = <Text>{formatLoanOptionLabel(loans[0])}</Text>
    }

    bodyContent = (
      <Stack gap={UiGap.Three}>
        {errorAlert}
        {loanPicker}
      </Stack>
    )
  }

  return (
    <AppDialogShell
      open={open}
      title={bookStrings.returnDialogTitle}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) {
          setError(null)
          setLoadError(null)
          setLoanId(BookSelectEmptyValue.None)
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
            disabled={loadingLoans || loanId.length === 0}
            onClick={() => {
              void handleSubmit()
            }}
          >
            {bookStrings.confirmReturnButton}
          </Button>
        </>
      }
    />
  )
}

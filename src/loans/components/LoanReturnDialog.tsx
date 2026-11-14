import { useState } from 'react'
import {
  Box,
  Button,
  Stack,
} from '@chakra-ui/react'
import { returnLoan } from '@/loans/api/loansApi'
import { loanStrings } from '@/loans/constants/strings'
import type { Loan } from '@/loans/types/loan'
import { formatPersonName } from '@/shared/utils/formatPersonName'
import { resolveErrorMessage } from '@/shared/utils/resolveErrorMessage'
import { AppDialogShell } from '@/shared/components/AppDialogShell'
import { SummaryRow } from '@/shared/components/SummaryRow'
import {
  UiBgToken,
  UiBorderColor,
  UiBorderWidth,
  UiButtonColorPalette,
  UiButtonVariant,
  UiGap,
  UiRadius,
  UiSpace,
} from '@/shared/constants/ui'
import { formatDateTime } from '@/shared/utils/formatDateTime'
import { InlineErrorAlert } from '@/shared/components/InlineErrorAlert'

type LoanReturnDialogProps = {
  open: boolean
  loan: Loan | null
  onOpenChange: (open: boolean) => void
  onReturned: () => Promise<void> | void
}

export function LoanReturnDialog({
  open,
  loan,
  onOpenChange,
  onReturned,
}: LoanReturnDialogProps) {
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  function resetLocalState() {
    setError(null)
    setSubmitting(false)
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      resetLocalState()
    }
    onOpenChange(nextOpen)
  }

  async function handleSubmit() {
    if (!loan) {
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      await returnLoan(loan.id)
      handleOpenChange(false)
      await onReturned()
    } catch (caught) {
      setError(resolveErrorMessage(caught, loanStrings.returnFailed))
    } finally {
      setSubmitting(false)
    }
  }

  let bodyContent = null

  if (loan) {

    bodyContent = (
      <Stack gap={UiGap.Four}>
        <InlineErrorAlert message={error} />
        <Box
          borderWidth={UiBorderWidth.OnePx}
          borderColor={UiBorderColor.Panel}
          borderRadius={UiRadius.Control}
          bg={UiBgToken.AppCanvas}
          px={UiSpace.Four}
        >
          <SummaryRow
            label={loanStrings.returnBookLabel}
            value={loan.book.title}
          />
          <SummaryRow
            label={loanStrings.returnAuthorLabel}
            value={loan.book.author}
          />
          <SummaryRow
            label={loanStrings.returnMemberLabel}
            value={formatPersonName(loan.member)}
          />
          <SummaryRow
            label={loanStrings.returnLoanedAtLabel}
            value={formatDateTime(loan.loanedAt)}
          />
        </Box>
      </Stack>
    )
  }

  return (
    <AppDialogShell
      open={open}
      title={loanStrings.returnDialogTitle}
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
            disabled={!loan}
            onClick={() => {
              void handleSubmit()
            }}
          >
            {loanStrings.confirmReturnButton}
          </Button>
        </>
      }
    />
  )
}

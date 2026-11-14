import { useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Stack,
  Text,
} from '@chakra-ui/react'
import { returnLoan } from '@/loans/api/loansApi'
import { loanStrings } from '@/loans/constants/strings'
import type { Loan } from '@/loans/types/loan'
import { formatLoanMemberName } from '@/loans/utils/formatMemberName'
import { resolveErrorMessage } from '@/loans/utils/resolveErrorMessage'
import { AppDialogShell } from '@/shared/components/AppDialogShell'
import {
  UiAlertStatus,
  UiBgToken,
  UiBorderColor,
  UiBorderWidth,
  UiButtonColorPalette,
  UiButtonVariant,
  UiColor,
  UiFontSize,
  UiFontWeight,
  UiGap,
  UiLetterSpacing,
  UiRadius,
  UiSpace,
  UiTextTransform,
} from '@/shared/constants/ui'
import { formatDateTime } from '@/shared/utils/formatDateTime'

type LoanReturnDialogProps = {
  open: boolean
  loan: Loan | null
  onOpenChange: (open: boolean) => void
  onReturned: () => Promise<void> | void
}

type SummaryRowProps = {
  label: string
  value: string
}

function SummaryRow({ label, value }: SummaryRowProps) {
  return (
    <Box
      py={UiSpace.Three}
      borderBottomWidth={UiBorderWidth.OnePx}
      borderColor={UiBorderColor.Panel}
      _last={{ borderBottomWidth: UiBorderWidth.None }}
    >
      <Text
        fontSize={UiFontSize.Xs}
        color={UiColor.Muted}
        textTransform={UiTextTransform.Uppercase}
        letterSpacing={UiLetterSpacing.Wide}
        fontWeight={UiFontWeight.Semibold}
        mb={UiSpace.One}
      >
        {label}
      </Text>
      <Text fontSize={UiFontSize.Md} fontWeight={UiFontWeight.Medium}>
        {value}
      </Text>
    </Box>
  )
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
      <Stack gap={UiGap.Four}>
        {errorAlert}
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
            value={formatLoanMemberName(loan.member)}
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

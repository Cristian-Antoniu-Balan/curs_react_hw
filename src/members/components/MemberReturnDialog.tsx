import { useEffect, useState } from 'react'
import {
  Alert,
  Box,
  Button,
  Field,
  NativeSelect,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react'
import { listLoans, returnLoan } from '@/loans/api/loansApi'
import type { Loan } from '@/loans/types/loan'
import { MemberSelectEmptyValue } from '@/members/constants/sort'
import { memberStrings } from '@/members/constants/strings'
import type { Member } from '@/members/types/member'
import { formatLoanBookOptionLabel } from '@/members/utils/formatLoanBookLabel'
import { resolveErrorMessage } from '@/members/utils/resolveErrorMessage'
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
  UiNativeSelectSize,
  UiRadius,
  UiSpace,
  UiTextTransform,
  UiWidth,
} from '@/shared/constants/ui'
import { formatDateTime } from '@/shared/utils/formatDateTime'

type MemberReturnDialogProps = {
  open: boolean
  member: Member | null
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

type LoanSummaryProps = {
  loan: Loan
}

function LoanSummary({ loan }: LoanSummaryProps) {
  return (
    <Box
      borderWidth={UiBorderWidth.OnePx}
      borderColor={UiBorderColor.Panel}
      borderRadius={UiRadius.Control}
      bg={UiBgToken.AppCanvas}
      px={UiSpace.Four}
    >
      <SummaryRow
        label={memberStrings.returnBookLabel}
        value={loan.book.title}
      />
      <SummaryRow
        label={memberStrings.returnAuthorLabel}
        value={loan.book.author}
      />
      <SummaryRow
        label={memberStrings.returnLoanedAtLabel}
        value={formatDateTime(loan.loanedAt)}
      />
    </Box>
  )
}

export function MemberReturnDialog({
  open,
  member,
  onOpenChange,
  onReturned,
}: MemberReturnDialogProps) {
  const [loans, setLoans] = useState<Loan[]>([])
  const [loanId, setLoanId] = useState<string>(MemberSelectEmptyValue.None)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loadingLoans, setLoadingLoans] = useState(false)
  const [hasFetchedLoans, setHasFetchedLoans] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  function resetLocalState() {
    setError(null)
    setLoadError(null)
    setLoanId(MemberSelectEmptyValue.None)
    setLoans([])
    setLoadingLoans(false)
    setHasFetchedLoans(false)
    setSubmitting(false)
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      resetLocalState()
    }
    onOpenChange(nextOpen)
  }

  useEffect(() => {
    if (!open || !member) {
      return
    }

    let cancelled = false
    const memberId = member.id

    async function loadActiveLoans() {
      setLoadingLoans(true)
      setHasFetchedLoans(false)
      setLoadError(null)
      setError(null)
      setLoanId(MemberSelectEmptyValue.None)
      setLoans([])

      try {
        const activeLoans = await listLoans(true)
        const forMember = activeLoans.filter(
          (loan) => loan.member.id === memberId,
        )
        if (!cancelled) {
          setLoans(forMember)
          if (forMember.length === 1) {
            setLoanId(forMember[0].id)
          }
        }
      } catch (caught) {
        if (!cancelled) {
          setLoadError(resolveErrorMessage(caught, memberStrings.returnFailed))
          setLoans([])
        }
      } finally {
        if (!cancelled) {
          setLoadingLoans(false)
          setHasFetchedLoans(true)
        }
      }
    }

    void loadActiveLoans()

    return () => {
      cancelled = true
    }
  }, [open, member])

  async function handleSubmit() {
    if (loanId.length === 0) {
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      await returnLoan(loanId)
      handleOpenChange(false)
      await onReturned()
    } catch (caught) {
      setError(resolveErrorMessage(caught, memberStrings.returnFailed))
    } finally {
      setSubmitting(false)
    }
  }

  const selectedLoan = loans.find((loan) => loan.id === loanId) ?? null

  let bodyContent = null

  if (loadingLoans || !hasFetchedLoans) {
    bodyContent = <Spinner />
  }

  if (hasFetchedLoans && !loadingLoans && loadError) {
    bodyContent = (
      <Alert.Root status={UiAlertStatus.Error}>
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Description>{loadError}</Alert.Description>
        </Alert.Content>
      </Alert.Root>
    )
  }

  if (hasFetchedLoans && !loadingLoans && !loadError && loans.length === 0) {
    bodyContent = (
      <Text color={UiColor.Muted}>{memberStrings.noActiveLoan}</Text>
    )
  }

  if (hasFetchedLoans && !loadingLoans && !loadError && loans.length > 0) {
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
          <Field.Label>{memberStrings.returnLoanLabel}</Field.Label>
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
              <option value={MemberSelectEmptyValue.None}>
                {memberStrings.returnLoanPlaceholder}
              </option>
              {loans.map((loan) => (
                <option key={loan.id} value={loan.id}>
                  {formatLoanBookOptionLabel(loan)}
                </option>
              ))}
            </NativeSelect.Field>
            <NativeSelect.Indicator />
          </NativeSelect.Root>
        </Field.Root>
      )
    }

    let loanSummary = null
    if (selectedLoan) {
      loanSummary = <LoanSummary loan={selectedLoan} />
    }

    bodyContent = (
      <Stack gap={UiGap.Four}>
        {errorAlert}
        {loanPicker}
        {loanSummary}
      </Stack>
    )
  }

  return (
    <AppDialogShell
      open={open}
      title={memberStrings.returnDialogTitle}
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
            {memberStrings.cancelButton}
          </Button>
          <Button
            colorPalette={UiButtonColorPalette.Brand}
            loading={submitting}
            disabled={loadingLoans || !hasFetchedLoans || loanId.length === 0}
            onClick={() => {
              void handleSubmit()
            }}
          >
            {memberStrings.confirmReturnButton}
          </Button>
        </>
      }
    />
  )
}

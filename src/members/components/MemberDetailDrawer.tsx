import { useEffect, useState } from 'react'
import {
  Alert,
  Box,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react'
import { listLoans } from '@/loans/api/loansApi'
import { LoanDetailDrawer } from '@/loans/components/LoanDetailDrawer'
import type { Loan } from '@/loans/types/loan'
import { getMember } from '@/members/api/membersApi'
import { memberStrings } from '@/members/constants/strings'
import type { Member } from '@/members/types/member'
import { formatMemberName } from '@/members/utils/formatMemberName'
import { resolveErrorMessage } from '@/members/utils/resolveErrorMessage'
import { AppDrawerShell } from '@/shared/components/AppDrawerShell'
import {
  UiAlertStatus,
  UiBgToken,
  UiBorderColor,
  UiBorderWidth,
  UiColor,
  UiCursor,
  UiFontSize,
  UiFontWeight,
  UiGap,
  UiKeyboardKey,
  UiLetterSpacing,
  UiRadius,
  UiSpace,
  UiTextAlign,
  UiTextTransform,
  UiTransition,
  UiWidth,
} from '@/shared/constants/ui'
import { formatDateTime } from '@/shared/utils/formatDateTime'

type MemberDetailDrawerProps = {
  open: boolean
  memberId: string | null
  onOpenChange: (open: boolean) => void
}

type DetailRowProps = {
  label: string
  value: string
}

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <Box
      py={UiSpace.Three}
      borderBottomWidth={UiBorderWidth.OnePx}
      borderColor={UiBorderColor.Panel}
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

type ActiveLoanCardProps = {
  loan: Loan
  onOpenLoan: (loanId: string) => void
}

function ActiveLoanCard({ loan, onOpenLoan }: ActiveLoanCardProps) {
  return (
    <Box
      role="button"
      tabIndex={0}
      textAlign={UiTextAlign.Left}
      w={UiWidth.Full}
      borderWidth={UiBorderWidth.OnePx}
      borderColor={UiBorderColor.Panel}
      borderRadius={UiRadius.Control}
      borderLeftWidth={UiWidth.AccentBar}
      borderLeftColor={UiColor.BrandSolid}
      bg={UiBgToken.AppCanvas}
      px={UiSpace.Four}
      py={UiSpace.Three}
      cursor={UiCursor.Pointer}
      transition={UiTransition.Nav}
      aria-label={memberStrings.detailLoanCardAria}
      _hover={{ bg: UiBgToken.RowHover }}
      onClick={() => {
        onOpenLoan(loan.id)
      }}
      onKeyDown={(event) => {
        if (
          event.key === UiKeyboardKey.Enter ||
          event.key === UiKeyboardKey.Space
        ) {
          event.preventDefault()
          onOpenLoan(loan.id)
        }
      }}
    >
      <Text fontSize={UiFontSize.Md} fontWeight={UiFontWeight.Semibold}>
        {loan.book.title}
      </Text>
      <Text fontSize={UiFontSize.Sm} color={UiColor.Muted} mt={UiSpace.One}>
        {memberStrings.detailLoanedAtPrefix}
        {formatDateTime(loan.loanedAt)}
      </Text>
    </Box>
  )
}

export function MemberDetailDrawer({
  open,
  memberId,
  onOpenChange,
}: MemberDetailDrawerProps) {
  const [member, setMember] = useState<Member | null>(null)
  const [activeLoans, setActiveLoans] = useState<Loan[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loansError, setLoansError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [loanDrawerOpen, setLoanDrawerOpen] = useState(false)
  const [loanDetailId, setLoanDetailId] = useState<string | null>(null)

  useEffect(() => {
    if (!open || !memberId) {
      return
    }

    let cancelled = false

    async function loadDetail(id: string) {
      setLoading(true)
      setError(null)
      setLoansError(null)
      setMember(null)
      setActiveLoans([])

      try {
        const result = await getMember(id)
        if (!cancelled) {
          setMember(result)
        }
      } catch (caught) {
        if (!cancelled) {
          setError(resolveErrorMessage(caught, memberStrings.detailLoadFailed))
          setLoading(false)
        }
        return
      }

      try {
        const loans = await listLoans(true)
        if (!cancelled) {
          setActiveLoans(loans.filter((loan) => loan.member.id === id))
        }
      } catch (caught) {
        if (!cancelled) {
          setLoansError(
            resolveErrorMessage(caught, memberStrings.detailLoansLoadFailed),
          )
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void loadDetail(memberId)

    return () => {
      cancelled = true
    }
  }, [open, memberId])

  function handleOpenLoan(loanId: string) {
    setLoanDetailId(loanId)
    setLoanDrawerOpen(true)
  }

  let body = null

  if (loading) {
    body = <Spinner />
  }

  if (!loading && error) {
    body = (
      <Alert.Root status={UiAlertStatus.Error}>
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Description>{error}</Alert.Description>
        </Alert.Content>
      </Alert.Root>
    )
  }

  if (!loading && !error && member) {
    let loansSection = null

    if (loansError) {
      loansSection = (
        <Stack gap={UiGap.Two} mt={UiSpace.Five}>
          <Text
            fontSize={UiFontSize.Sm}
            fontWeight={UiFontWeight.Semibold}
            letterSpacing={UiLetterSpacing.Wide}
            textTransform={UiTextTransform.Uppercase}
            color={UiColor.Muted}
          >
            {memberStrings.detailActiveLoans}
          </Text>
          <Alert.Root status={UiAlertStatus.Error}>
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Description>{loansError}</Alert.Description>
            </Alert.Content>
          </Alert.Root>
        </Stack>
      )
    }

    if (!loansError && activeLoans.length > 0) {
      loansSection = (
        <Stack
          gap={UiGap.Three}
          mt={UiSpace.Five}
          pt={UiSpace.Five}
          borderTopWidth={UiBorderWidth.OnePx}
          borderColor={UiBorderColor.Panel}
        >
          <Text
            fontSize={UiFontSize.Sm}
            fontWeight={UiFontWeight.Semibold}
            letterSpacing={UiLetterSpacing.Wide}
            textTransform={UiTextTransform.Uppercase}
            color={UiColor.Muted}
          >
            {memberStrings.detailActiveLoans}
          </Text>
          <Stack gap={UiGap.Four}>
            {activeLoans.map((loan) => (
              <ActiveLoanCard
                key={loan.id}
                loan={loan}
                onOpenLoan={handleOpenLoan}
              />
            ))}
          </Stack>
        </Stack>
      )
    }

    body = (
      <Stack gap={UiGap.None}>
        <Text
          fontSize={UiFontSize.Xl}
          fontWeight={UiFontWeight.Bold}
          letterSpacing={UiLetterSpacing.Tight}
          mb={UiSpace.Four}
        >
          {formatMemberName(member)}
        </Text>
        <DetailRow
          label={memberStrings.fieldFirstName}
          value={member.firstName}
        />
        <DetailRow
          label={memberStrings.fieldLastName}
          value={member.lastName}
        />
        <DetailRow label={memberStrings.fieldEmail} value={member.email} />
        <DetailRow
          label={memberStrings.fieldActiveLoans}
          value={String(member.activeLoans)}
        />
        <DetailRow label={memberStrings.fieldId} value={member.id} />
        {loansSection}
      </Stack>
    )
  }

  if (!loading && !error && !member) {
    body = <Text color={UiColor.Muted}>{memberStrings.detailLoadFailed}</Text>
  }

  let nestedLoanDrawer = null
  if (loanDrawerOpen) {
    nestedLoanDrawer = (
      <LoanDetailDrawer
        open={loanDrawerOpen}
        loanId={loanDetailId}
        onOpenChange={setLoanDrawerOpen}
      />
    )
  }

  return (
    <>
      <AppDrawerShell
        open={open}
        title={memberStrings.detailDrawerTitle}
        onOpenChange={onOpenChange}
      >
        {body}
      </AppDrawerShell>

      {nestedLoanDrawer}
    </>
  )
}

import { lazy, Suspense, useEffect, useState } from 'react'
import {
  Badge,
  Button,
  Flex,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react'
import { getLoan } from '@/loans/api/loansApi'
import { LoanReturnDialog } from '@/loans/components/LoanReturnDialog'
import { LoanDialogKey, loanStrings } from '@/loans/constants/strings'
import type { Loan } from '@/loans/types/loan'
import { booleanBadgePalette } from '@/shared/utils/booleanBadgePalette'
import { activeLabel } from '@/loans/utils/activeLabel'
import { formatPersonName } from '@/shared/utils/formatPersonName'
import { resolveErrorMessage } from '@/shared/utils/resolveErrorMessage'
import { AppDrawerShell } from '@/shared/components/AppDrawerShell'
import {
  UiBadgeVariant,
  UiButtonColorPalette,
  UiColor,
  UiFlexAlign,
  UiFlexJustify,
  UiFontSize,
  UiFontWeight,
  UiGap,
  UiLetterSpacing,
  UiSpace,
} from '@/shared/constants/ui'
import { formatDateTime } from '@/shared/utils/formatDateTime'
import { notifySuccess } from '@/shared/toast/notify'
import { InlineErrorAlert } from '@/shared/components/InlineErrorAlert'
import { DetailRow, LinkDetailRow } from '@/shared/components/DetailRow'

const BookDetailDrawer = lazy(async () => {
  const module = await import('@/books/components/BookDetailDrawer')
  return { default: module.BookDetailDrawer }
})

const MemberDetailDrawer = lazy(async () => {
  const module = await import('@/members/components/MemberDetailDrawer')
  return { default: module.MemberDetailDrawer }
})

type LoanDetailDrawerProps = {
  open: boolean
  loanId: string | null
  onOpenChange: (open: boolean) => void
  onLoanChanged?: () => Promise<void> | void
}

export function LoanDetailDrawer({
  open,
  loanId,
  onOpenChange,
  onLoanChanged,
}: LoanDetailDrawerProps) {
  const [loan, setLoan] = useState<Loan | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [returnOpen, setReturnOpen] = useState(false)
  const [bookDrawerOpen, setBookDrawerOpen] = useState(false)
  const [bookDetailId, setBookDetailId] = useState<string | null>(null)
  const [memberDrawerOpen, setMemberDrawerOpen] = useState(false)
  const [memberDetailId, setMemberDetailId] = useState<string | null>(null)

  async function loadDetail(id: string) {
    setLoading(true)
    setError(null)
    setLoan(null)

    try {
      const result = await getLoan(id)
      setLoan(result)
    } catch (caught) {
      setError(resolveErrorMessage(caught, loanStrings.detailLoadFailed))
      setLoan(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!open || !loanId) {
      return
    }

    let cancelled = false

    async function runLoad(id: string) {
      setLoading(true)
      setError(null)
      setLoan(null)

      try {
        const result = await getLoan(id)
        if (!cancelled) {
          setLoan(result)
        }
      } catch (caught) {
        if (!cancelled) {
          setError(resolveErrorMessage(caught, loanStrings.detailLoadFailed))
          setLoan(null)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void runLoad(loanId)

    return () => {
      cancelled = true
    }
  }, [open, loanId])

  async function handleRelatedChanged() {
    if (loanId) {
      await loadDetail(loanId)
    }
    if (onLoanChanged) {
      await onLoanChanged()
    }
  }

  async function handleReturned() {
    notifySuccess(loanStrings.toastSuccessTitle, loanStrings.returnSuccess)
    await handleRelatedChanged()
  }

  let body = null

  if (loading) {
    body = <Spinner />
  }

  if (!loading && error) {
    body = <InlineErrorAlert message={error} />
  }

  if (!loading && !error && loan) {
    const memberName = formatPersonName(loan.member)
    let returnedAtValue: string = loanStrings.notReturned
    if (loan.returnedAt) {
      returnedAtValue = formatDateTime(loan.returnedAt)
    }

    let returnAction = null
    if (loan.isActive) {
      returnAction = (
        <Button
          colorPalette={UiButtonColorPalette.Brand}
          mt={UiSpace.Five}
          onClick={() => {
            setReturnOpen(true)
          }}
        >
          {loanStrings.returnButton}
        </Button>
      )
    }

    body = (
      <Stack gap={UiGap.None}>
        <Flex
          align={UiFlexAlign.Center}
          justify={UiFlexJustify.SpaceBetween}
          gap={UiGap.Three}
          mb={UiSpace.Four}
        >
          <Text
            fontSize={UiFontSize.Xl}
            fontWeight={UiFontWeight.Bold}
            letterSpacing={UiLetterSpacing.Tight}
          >
            {loan.book.title}
          </Text>
          <Badge
            colorPalette={booleanBadgePalette(loan.isActive)}
            variant={UiBadgeVariant.Subtle}
          >
            {activeLabel(loan.isActive)}
          </Badge>
        </Flex>
        <LinkDetailRow
          label={loanStrings.fieldBook}
          value={loan.book.title}
          ariaLabel={`${loanStrings.detailBookLinkAriaPrefix}${loan.book.title}`}
          onOpen={() => {
            setBookDetailId(loan.book.id)
            setBookDrawerOpen(true)
          }}
        />
        <DetailRow label={loanStrings.fieldAuthor} value={loan.book.author} />
        <LinkDetailRow
          label={loanStrings.fieldMember}
          value={memberName}
          ariaLabel={`${loanStrings.detailMemberLinkAriaPrefix}${memberName}`}
          onOpen={() => {
            setMemberDetailId(loan.member.id)
            setMemberDrawerOpen(true)
          }}
        />
        <DetailRow
          label={loanStrings.fieldEmail}
          value={loan.member.email}
        />
        <DetailRow
          label={loanStrings.fieldStatus}
          value={activeLabel(loan.isActive)}
        />
        <DetailRow
          label={loanStrings.fieldLoanedAt}
          value={formatDateTime(loan.loanedAt)}
        />
        <DetailRow
          label={loanStrings.fieldReturnedAt}
          value={returnedAtValue}
        />
        {returnAction}
      </Stack>
    )
  }

  if (!loading && !error && !loan) {
    body = <Text color={UiColor.Muted}>{loanStrings.detailLoadFailed}</Text>
  }

  let returnDialog = null
  if (returnOpen) {
    returnDialog = (
      <LoanReturnDialog
        key={
          loan
            ? `${loan.id}${LoanDialogKey.ReturnSuffix}`
            : LoanDialogKey.ReturnIdle
        }
        open={returnOpen}
        loan={loan}
        onOpenChange={setReturnOpen}
        onReturned={handleReturned}
      />
    )
  }

  let nestedBookDrawer = null
  if (bookDrawerOpen) {
    nestedBookDrawer = (
      <BookDetailDrawer
        open={bookDrawerOpen}
        bookId={bookDetailId}
        onOpenChange={setBookDrawerOpen}
        onBookChanged={handleRelatedChanged}
      />
    )
  }

  let nestedMemberDrawer = null
  if (memberDrawerOpen) {
    nestedMemberDrawer = (
      <MemberDetailDrawer
        open={memberDrawerOpen}
        memberId={memberDetailId}
        onOpenChange={setMemberDrawerOpen}
        onMemberChanged={handleRelatedChanged}
      />
    )
  }

  return (
    <>
      <AppDrawerShell
        open={open}
        title={loanStrings.detailDrawerTitle}
        onOpenChange={onOpenChange}
      >
        {body}
      </AppDrawerShell>

      {returnDialog}

      <Suspense fallback={null}>
        {nestedBookDrawer}
        {nestedMemberDrawer}
      </Suspense>
    </>
  )
}

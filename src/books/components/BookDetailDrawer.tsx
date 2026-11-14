import { useEffect, useState } from 'react'
import {
  Badge,
  Box,
  Flex,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react'
import { getBook } from '@/books/api/booksApi'
import { bookStrings } from '@/books/constants/strings'
import type { Book } from '@/books/types/book'
import { booleanBadgePalette } from '@/shared/utils/booleanBadgePalette'
import { availabilityLabel } from '@/books/utils/availabilityLabel'
import { formatPersonName } from '@/shared/utils/formatPersonName'
import { resolveErrorMessage } from '@/shared/utils/resolveErrorMessage'
import { LoanDetailDrawer } from '@/loans/components/LoanDetailDrawer'
import { listLoans } from '@/loans/api/loansApi'
import type { Loan } from '@/loans/types/loan'
import { MemberDetailDrawer } from '@/members/components/MemberDetailDrawer'
import { AppDrawerShell } from '@/shared/components/AppDrawerShell'
import { DetailRow } from '@/shared/components/DetailRow'
import {
  UiBadgeVariant,
  UiBgToken,
  UiBorderColor,
  UiBorderWidth,
  UiColor,
  UiCursor,
  UiFlexAlign,
  UiFlexJustify,
  UiFontSize,
  UiFontWeight,
  UiGap,
  UiKeyboardKey,
  UiLetterSpacing,
  UiRadius,
  UiSpace,
  UiTextAlign,
  UiTextDecoration,
  UiTextTransform,
  UiTransition,
  UiWidth,
} from '@/shared/constants/ui'
import { formatDateTime } from '@/shared/utils/formatDateTime'
import { InlineErrorAlert } from '@/shared/components/InlineErrorAlert'

type BookDetailDrawerProps = {
  open: boolean
  bookId: string | null
  onOpenChange: (open: boolean) => void
  onBookChanged?: () => Promise<void> | void
}

type ActiveLoanCardProps = {
  loan: Loan
  onOpenLoan: (loanId: string) => void
  onOpenMember: (memberId: string) => void
}

function ActiveLoanCard({
  loan,
  onOpenLoan,
  onOpenMember,
}: ActiveLoanCardProps) {
  const memberName = formatPersonName(loan.member)

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
      aria-label={bookStrings.detailLoanCardAria}
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
      <Box
        as="button"
        fontSize={UiFontSize.Md}
        fontWeight={UiFontWeight.Semibold}
        color={UiColor.BrandFg}
        textDecoration={UiTextDecoration.None}
        cursor={UiCursor.Pointer}
        bg={UiColor.Transparent}
        p={UiGap.None}
        borderWidth={UiBorderWidth.None}
        _hover={{ textDecoration: UiTextDecoration.Underline }}
        aria-label={`${bookStrings.detailMemberLinkAriaPrefix}${memberName}`}
        onClick={(event) => {
          event.stopPropagation()
          onOpenMember(loan.member.id)
        }}
      >
        {memberName}
      </Box>
      <Text fontSize={UiFontSize.Sm} color={UiColor.Muted} mt={UiSpace.One}>
        {bookStrings.detailLoanedAtPrefix}
        {formatDateTime(loan.loanedAt)}
      </Text>
    </Box>
  )
}

export function BookDetailDrawer({
  open,
  bookId,
  onOpenChange,
  onBookChanged,
}: BookDetailDrawerProps) {
  const [book, setBook] = useState<Book | null>(null)
  const [activeLoans, setActiveLoans] = useState<Loan[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loansError, setLoansError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [loanDrawerOpen, setLoanDrawerOpen] = useState(false)
  const [loanDetailId, setLoanDetailId] = useState<string | null>(null)
  const [memberDrawerOpen, setMemberDrawerOpen] = useState(false)
  const [memberDetailId, setMemberDetailId] = useState<string | null>(null)

  async function loadDetail(id: string) {
    setLoading(true)
    setError(null)
    setLoansError(null)
    setBook(null)
    setActiveLoans([])

    try {
      const result = await getBook(id)
      setBook(result)
    } catch (caught) {
      setError(resolveErrorMessage(caught, bookStrings.detailLoadFailed))
      setLoading(false)
      return
    }

    try {
      const loans = await listLoans(true)
      setActiveLoans(loans.filter((loan) => loan.book.id === id))
    } catch (caught) {
      setLoansError(
        resolveErrorMessage(caught, bookStrings.detailLoansLoadFailed),
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!open || !bookId) {
      return
    }

    let cancelled = false

    async function runLoad(id: string) {
      setLoading(true)
      setError(null)
      setLoansError(null)
      setBook(null)
      setActiveLoans([])

      try {
        const result = await getBook(id)
        if (!cancelled) {
          setBook(result)
        }
      } catch (caught) {
        if (!cancelled) {
          setError(resolveErrorMessage(caught, bookStrings.detailLoadFailed))
          setLoading(false)
        }
        return
      }

      try {
        const loans = await listLoans(true)
        if (!cancelled) {
          setActiveLoans(loans.filter((loan) => loan.book.id === id))
        }
      } catch (caught) {
        if (!cancelled) {
          setLoansError(
            resolveErrorMessage(caught, bookStrings.detailLoansLoadFailed),
          )
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void runLoad(bookId)

    return () => {
      cancelled = true
    }
  }, [open, bookId])

  function handleOpenLoan(loanId: string) {
    setLoanDetailId(loanId)
    setLoanDrawerOpen(true)
  }

  function handleOpenMember(memberId: string) {
    setMemberDetailId(memberId)
    setMemberDrawerOpen(true)
  }

  async function handleLoanChanged() {
    if (bookId) {
      await loadDetail(bookId)
    }
    if (onBookChanged) {
      await onBookChanged()
    }
  }

  let body = null

  if (loading) {
    body = <Spinner />
  }

  if (!loading && error) {
    body = <InlineErrorAlert message={error} />
  }

  if (!loading && !error && book) {
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
            {bookStrings.detailActiveLoans}
          </Text>
          <InlineErrorAlert message={loansError} />
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
            {bookStrings.detailActiveLoans}
          </Text>
          <Stack gap={UiGap.Four}>
            {activeLoans.map((loan) => (
              <ActiveLoanCard
                key={loan.id}
                loan={loan}
                onOpenLoan={handleOpenLoan}
                onOpenMember={handleOpenMember}
              />
            ))}
          </Stack>
        </Stack>
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
            {book.title}
          </Text>
          <Badge
            colorPalette={booleanBadgePalette(book.isAvailable)}
            variant={UiBadgeVariant.Subtle}
          >
            {availabilityLabel(book.isAvailable)}
          </Badge>
        </Flex>
        <DetailRow label={bookStrings.fieldAuthor} value={book.author} />
        <DetailRow
          label={bookStrings.fieldCopies}
          value={String(book.copies)}
        />
        <DetailRow label={bookStrings.fieldId} value={book.id} />
        {loansSection}
      </Stack>
    )
  }

  if (!loading && !error && !book) {
    body = <Text color={UiColor.Muted}>{bookStrings.detailLoadFailed}</Text>
  }

  let nestedLoanDrawer = null
  if (loanDrawerOpen) {
    nestedLoanDrawer = (
      <LoanDetailDrawer
        open={loanDrawerOpen}
        loanId={loanDetailId}
        onOpenChange={setLoanDrawerOpen}
        onLoanChanged={handleLoanChanged}
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
        onMemberChanged={handleLoanChanged}
      />
    )
  }

  return (
    <>
      <AppDrawerShell
        open={open}
        title={bookStrings.detailDrawerTitle}
        onOpenChange={onOpenChange}
      >
        {body}
      </AppDrawerShell>

      {nestedLoanDrawer}
      {nestedMemberDrawer}
    </>
  )
}

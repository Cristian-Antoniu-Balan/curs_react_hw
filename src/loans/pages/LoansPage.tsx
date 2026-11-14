import { useEffect, useMemo, useState } from 'react'
import { Button, Flex, Spinner, Stack, Text } from '@chakra-ui/react'
import { LoanCreateDialog } from '@/loans/components/LoanCreateDialog'
import { LoanDetailDrawer } from '@/loans/components/LoanDetailDrawer'
import { LoanReturnDialog } from '@/loans/components/LoanReturnDialog'
import { LoansTable } from '@/loans/components/LoansTable'
import {
  LoanActiveFilter,
  type LoanActiveFilter as LoanActiveFilterValue,
} from '@/loans/constants/activeFilter'
import { LoanEntityFilter } from '@/loans/constants/entityFilter'
import {
  LoanSortField,
  type LoanSortField as LoanSortFieldValue,
} from '@/loans/constants/sort'
import { LoanDialogKey, loanStrings } from '@/loans/constants/strings'
import { useLoansList } from '@/loans/hooks/useLoansList'
import type { Loan } from '@/loans/types/loan'
import { filterLoansByBook } from '@/loans/utils/filterLoansByBook'
import { filterLoansByMember } from '@/loans/utils/filterLoansByMember'
import { loanBookFilterOptions } from '@/loans/utils/loanBookFilterOptions'
import { loanMemberFilterOptions } from '@/loans/utils/loanMemberFilterOptions'
import { sortLoans } from '@/loans/utils/sortLoans'
import { ClearFiltersButton } from '@/shared/components/ClearFiltersButton'
import { ResourcePage } from '@/shared/components/ResourcePage'
import { SelectFilter } from '@/shared/components/SelectFilter'
import { SurfacePanel } from '@/shared/components/SurfacePanel'
import {
  UiButtonColorPalette,
  UiColor,
  UiFlexAlign,
  UiFlexGrow,
  UiFlexJustify,
  UiFlexShrink,
  UiFlexWrap,
  UiGap,
  UiMinWidth,
  UiSortDirection,
  UiSpace,
  type UiSortDirection as UiSortDirectionValue,
} from '@/shared/constants/ui'
import { notifySuccess } from '@/shared/toast/notify'

export function LoansPage() {
  const [activeFilter, setActiveFilter] = useState<LoanActiveFilterValue>(
    LoanActiveFilter.All,
  )
  const [bookFilter, setBookFilter] = useState<string>(LoanEntityFilter.All)
  const [memberFilter, setMemberFilter] = useState<string>(
    LoanEntityFilter.All,
  )
  const [sortField, setSortField] = useState<LoanSortFieldValue>(
    LoanSortField.LoanedAt,
  )
  const [sortDirection, setSortDirection] = useState<UiSortDirectionValue>(
    UiSortDirection.Desc,
  )
  const { loans, error, loading, reload } = useLoansList(activeFilter)

  const [createOpen, setCreateOpen] = useState(false)
  const [returnOpen, setReturnOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const [selectedLoan, setSelectedLoan] = useState<Loan | null>(null)
  const [detailLoanId, setDetailLoanId] = useState<string | null>(null)

  const bookOptions = useMemo(() => {
    if (!loans) {
      return []
    }

    return loanBookFilterOptions(loans)
  }, [loans])

  const memberOptions = useMemo(() => {
    if (!loans) {
      return []
    }

    return loanMemberFilterOptions(loans)
  }, [loans])

  useEffect(() => {
    if (bookFilter === LoanEntityFilter.All) {
      return
    }

    const bookStillPresent = bookOptions.some(
      (option) => option.id === bookFilter,
    )
    if (!bookStillPresent) {
      setBookFilter(LoanEntityFilter.All)
    }
  }, [bookFilter, bookOptions])

  useEffect(() => {
    if (memberFilter === LoanEntityFilter.All) {
      return
    }

    const memberStillPresent = memberOptions.some(
      (option) => option.id === memberFilter,
    )
    if (!memberStillPresent) {
      setMemberFilter(LoanEntityFilter.All)
    }
  }, [memberFilter, memberOptions])

  const visibleLoans = useMemo(() => {
    if (!loans) {
      return []
    }

    const byBook = filterLoansByBook(loans, bookFilter)
    const byMember = filterLoansByMember(byBook, memberFilter)
    return sortLoans(byMember, sortField, sortDirection)
  }, [loans, bookFilter, memberFilter, sortField, sortDirection])

  async function handleListChanged(successMessage: string) {
    notifySuccess(loanStrings.toastSuccessTitle, successMessage)
    await reload()
  }

  function handleSortChange(field: LoanSortFieldValue) {
    if (field === sortField) {
      if (sortDirection === UiSortDirection.Asc) {
        setSortDirection(UiSortDirection.Desc)
        return
      }

      setSortDirection(UiSortDirection.Asc)
      return
    }

    setSortField(field)
    setSortDirection(UiSortDirection.Asc)
  }

  const hasActiveFilters =
    activeFilter !== LoanActiveFilter.All ||
    bookFilter !== LoanEntityFilter.All ||
    memberFilter !== LoanEntityFilter.All

  function clearAllFilters() {
    setActiveFilter(LoanActiveFilter.All)
    setBookFilter(LoanEntityFilter.All)
    setMemberFilter(LoanEntityFilter.All)
  }

  const toolbar = (
    <SurfacePanel padding={UiSpace.Five}>
      <Flex
        align={UiFlexAlign.End}
        justify={UiFlexJustify.SpaceBetween}
        gap={UiGap.Three}
        wrap={UiFlexWrap.Wrap}
      >
        <Flex
          gap={UiGap.Three}
          align={UiFlexAlign.End}
          flex={UiFlexGrow.One}
          minW={UiMinWidth.None}
          wrap={UiFlexWrap.Wrap}
        >
          <SelectFilter
            label={loanStrings.filterLabel}
            placeholder={loanStrings.filterAll}
            value={activeFilter}
            emptyValue={LoanActiveFilter.All}
            onChange={setActiveFilter}
            options={[
              {
                value: LoanActiveFilter.Active,
                label: loanStrings.filterActive,
              },
              {
                value: LoanActiveFilter.Inactive,
                label: loanStrings.filterInactive,
              },
            ]}
          />
          <SelectFilter
            label={loanStrings.filterBookLabel}
            placeholder={loanStrings.filterBookAll}
            value={bookFilter}
            emptyValue={LoanEntityFilter.All}
            onChange={setBookFilter}
            options={bookOptions.map((option) => ({
              value: option.id,
              label: option.title,
            }))}
          />
          <SelectFilter
            label={loanStrings.filterMemberLabel}
            placeholder={loanStrings.filterMemberAll}
            value={memberFilter}
            emptyValue={LoanEntityFilter.All}
            onChange={setMemberFilter}
            options={memberOptions.map((option) => ({
              value: option.id,
              label: option.label,
            }))}
          />
          <ClearFiltersButton
            disabled={!hasActiveFilters}
            onClick={clearAllFilters}
          />
        </Flex>
        <Button
          colorPalette={UiButtonColorPalette.Brand}
          flexShrink={UiFlexShrink.None}
          onClick={() => {
            setCreateOpen(true)
          }}
        >
          {loanStrings.createButton}
        </Button>
      </Flex>
    </SurfacePanel>
  )

  const dialogs = (
    <>
      <LoanCreateDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreated={() => handleListChanged(loanStrings.createSuccess)}
      />
      <LoanReturnDialog
        key={
          selectedLoan
            ? `${selectedLoan.id}${LoanDialogKey.ReturnSuffix}`
            : LoanDialogKey.ReturnIdle
        }
        open={returnOpen}
        loan={selectedLoan}
        onOpenChange={setReturnOpen}
        onReturned={() => handleListChanged(loanStrings.returnSuccess)}
      />
      <LoanDetailDrawer
        open={detailOpen}
        loanId={detailLoanId}
        onOpenChange={setDetailOpen}
        onLoanChanged={reload}
      />
    </>
  )

  if (loading) {
    return (
      <ResourcePage
        title={loanStrings.title}
        description={loanStrings.description}
      >
        <Stack gap={UiGap.Four}>
          {toolbar}
          <SurfacePanel padding={UiSpace.Five}>
            <Spinner />
          </SurfacePanel>
        </Stack>
        {dialogs}
      </ResourcePage>
    )
  }

  if (error) {
    return (
      <ResourcePage
        title={loanStrings.title}
        description={loanStrings.description}
      >
        <Stack gap={UiGap.Four}>
          {toolbar}
          <SurfacePanel padding={UiSpace.Five}>
            <Text color={UiColor.Error}>{error}</Text>
          </SurfacePanel>
        </Stack>
        {dialogs}
      </ResourcePage>
    )
  }

  if (loans === null || loans.length === 0) {
    let emptyMessage: string = loanStrings.empty
    if (activeFilter !== LoanActiveFilter.All) {
      emptyMessage = loanStrings.emptyFilter
    }

    return (
      <ResourcePage
        title={loanStrings.title}
        description={loanStrings.description}
      >
        <Stack gap={UiGap.Four}>
          {toolbar}
          <SurfacePanel padding={UiSpace.Five}>
            <Text color={UiColor.Muted}>{emptyMessage}</Text>
          </SurfacePanel>
        </Stack>
        {dialogs}
      </ResourcePage>
    )
  }

  if (visibleLoans.length === 0) {
    return (
      <ResourcePage
        title={loanStrings.title}
        description={loanStrings.description}
      >
        <Stack gap={UiGap.Four}>
          {toolbar}
          <SurfacePanel padding={UiSpace.Five}>
            <Text color={UiColor.Muted}>{loanStrings.emptyFilter}</Text>
          </SurfacePanel>
        </Stack>
        {dialogs}
      </ResourcePage>
    )
  }

  return (
    <ResourcePage
      title={loanStrings.title}
      description={loanStrings.description}
    >
      <Stack gap={UiGap.Four}>
        {toolbar}
        <LoansTable
          loans={visibleLoans}
          sortField={sortField}
          sortDirection={sortDirection}
          onSortChange={handleSortChange}
          onRowOpen={(loan) => {
            setDetailLoanId(loan.id)
            setDetailOpen(true)
          }}
          onReturn={(loan) => {
            setSelectedLoan(loan)
            setReturnOpen(true)
          }}
        />
      </Stack>
      {dialogs}
    </ResourcePage>
  )
}

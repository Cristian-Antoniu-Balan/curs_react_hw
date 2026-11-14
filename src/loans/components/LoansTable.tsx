import { Badge, Table } from '@chakra-ui/react'
import {
  LoanMenuAction,
  LoanSortField,
  type LoanSortField as LoanSortFieldValue,
} from '@/loans/constants/sort'
import { loanStrings } from '@/loans/constants/strings'
import type { Loan } from '@/loans/types/loan'
import { booleanBadgePalette } from '@/shared/utils/booleanBadgePalette'
import { activeLabel } from '@/loans/utils/activeLabel'
import { formatReturnedAt } from '@/loans/utils/formatReturnedAt'
import {
  ClickableTableRow,
  ResourceTable,
} from '@/shared/components/ResourceTable'
import { RowActionsMenu } from '@/shared/components/RowActionsMenu'
import { SortableColumnHeader } from '@/shared/components/SortableColumnHeader'
import { StaticColumnHeader } from '@/shared/components/StaticColumnHeader'
import {
  UiBadgeVariant,
  UiFontWeight,
  type UiSortDirection as UiSortDirectionValue,
} from '@/shared/constants/ui'
import { formatDateTime } from '@/shared/utils/formatDateTime'
import { formatPersonName } from '@/shared/utils/formatPersonName'

type LoansTableProps = {
  loans: Loan[]
  sortField: LoanSortFieldValue
  sortDirection: UiSortDirectionValue
  onSortChange: (field: LoanSortFieldValue) => void
  onRowOpen: (loan: Loan) => void
  onReturn: (loan: Loan) => void
}

export function LoansTable({
  loans,
  sortField,
  sortDirection,
  onSortChange,
  onRowOpen,
  onReturn,
}: LoansTableProps) {
  const header = (
    <>
      <SortableColumnHeader
        label={loanStrings.columnBook}
        field={LoanSortField.Book}
        sortField={sortField}
        sortDirection={sortDirection}
        onSortChange={onSortChange}
      />
      <SortableColumnHeader
        label={loanStrings.columnMember}
        field={LoanSortField.Member}
        sortField={sortField}
        sortDirection={sortDirection}
        onSortChange={onSortChange}
      />
      <SortableColumnHeader
        label={loanStrings.columnLoanedAt}
        field={LoanSortField.LoanedAt}
        sortField={sortField}
        sortDirection={sortDirection}
        onSortChange={onSortChange}
      />
      <StaticColumnHeader label={loanStrings.columnReturnedAt} />
      <StaticColumnHeader label={loanStrings.columnStatus} />
      <StaticColumnHeader label={loanStrings.columnActions} />
    </>
  )

  const body = loans.map((loan) => {
    return (
      <ClickableTableRow
        key={loan.id}
        onOpen={() => {
          onRowOpen(loan)
        }}
      >
        <Table.Cell fontWeight={UiFontWeight.Medium}>
          {loan.book.title}
        </Table.Cell>
        <Table.Cell>{formatPersonName(loan.member)}</Table.Cell>
        <Table.Cell>{formatDateTime(loan.loanedAt)}</Table.Cell>
        <Table.Cell>
          {formatReturnedAt(loan.returnedAt, loan.isActive)}
        </Table.Cell>
        <Table.Cell>
          <Badge
            colorPalette={booleanBadgePalette(loan.isActive)}
            variant={UiBadgeVariant.Subtle}
          >
            {activeLabel(loan.isActive)}
          </Badge>
        </Table.Cell>
        <RowActionsMenu
          ariaLabel={loanStrings.actionsMenuAria}
          items={[
            {
              value: LoanMenuAction.Return,
              label: loanStrings.returnButton,
              disabled: !loan.isActive,
            },
          ]}
          onSelect={(value) => {
            if (value === LoanMenuAction.Return) {
              if (!loan.isActive) {
                return
              }
              onReturn(loan)
            }
          }}
        />
      </ClickableTableRow>
    )
  })

  return <ResourceTable header={header} body={body} />
}

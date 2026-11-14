import { Badge, Box, IconButton, Menu, Portal, Table } from '@chakra-ui/react'
import { LuEllipsis } from 'react-icons/lu'
import {
  LoanMenuAction,
  LoanSortField,
  type LoanSortField as LoanSortFieldValue,
} from '@/loans/constants/sort'
import { loanStrings } from '@/loans/constants/strings'
import type { Loan } from '@/loans/types/loan'
import { activeBadgePalette } from '@/loans/utils/activeBadgePalette'
import { activeLabel } from '@/loans/utils/activeLabel'
import { formatLoanMemberName } from '@/loans/utils/formatMemberName'
import { formatReturnedAt } from '@/loans/utils/formatReturnedAt'
import { SurfacePanel } from '@/shared/components/SurfacePanel'
import {
  UiBadgeVariant,
  UiBgToken,
  UiButtonSize,
  UiButtonVariant,
  UiCursor,
  UiDisplay,
  UiFlexJustify,
  UiFontWeight,
  UiSortDirection,
  UiSortIndicator,
  UiTableSize,
  UiTableStriped,
  UiTextAlign,
  UiVisibility,
  UiWhiteSpace,
  UiWidth,
  type UiSortDirection as UiSortDirectionValue,
} from '@/shared/constants/ui'
import { formatDateTime } from '@/shared/utils/formatDateTime'

type LoansTableProps = {
  loans: Loan[]
  sortField: LoanSortFieldValue
  sortDirection: UiSortDirectionValue
  onSortChange: (field: LoanSortFieldValue) => void
  onRowOpen: (loan: Loan) => void
  onReturn: (loan: Loan) => void
}

type SortMarkProps = {
  field: LoanSortFieldValue
  sortField: LoanSortFieldValue
  sortDirection: UiSortDirectionValue
}

function SortMark({ field, sortField, sortDirection }: SortMarkProps) {
  let symbol: string = UiSortIndicator.Asc
  let visibility: UiVisibility = UiVisibility.Hidden

  if (field === sortField) {
    visibility = UiVisibility.Visible
    if (sortDirection === UiSortDirection.Desc) {
      symbol = UiSortIndicator.Desc
    }
  }

  return (
    <Box
      as="span"
      display={UiDisplay.InlineFlex}
      w={UiWidth.SortIndicator}
      justifyContent={UiFlexJustify.Center}
      textAlign={UiTextAlign.Center}
      whiteSpace={UiWhiteSpace.NoWrap}
      visibility={visibility}
      aria-hidden
    >
      {symbol}
    </Box>
  )
}

export function LoansTable({
  loans,
  sortField,
  sortDirection,
  onSortChange,
  onRowOpen,
  onReturn,
}: LoansTableProps) {
  return (
    <SurfacePanel>
      <Table.ScrollArea>
        <Table.Root size={UiTableSize.Md} striped={UiTableStriped.True}>
          <Table.Header>
            <Table.Row bg={UiBgToken.TableHeader}>
              <Table.ColumnHeader
                cursor={UiCursor.Pointer}
                fontWeight={UiFontWeight.Semibold}
                whiteSpace={UiWhiteSpace.NoWrap}
                onClick={() => {
                  onSortChange(LoanSortField.Book)
                }}
              >
                {loanStrings.columnBook}
                <SortMark
                  field={LoanSortField.Book}
                  sortField={sortField}
                  sortDirection={sortDirection}
                />
              </Table.ColumnHeader>
              <Table.ColumnHeader
                cursor={UiCursor.Pointer}
                fontWeight={UiFontWeight.Semibold}
                whiteSpace={UiWhiteSpace.NoWrap}
                onClick={() => {
                  onSortChange(LoanSortField.Member)
                }}
              >
                {loanStrings.columnMember}
                <SortMark
                  field={LoanSortField.Member}
                  sortField={sortField}
                  sortDirection={sortDirection}
                />
              </Table.ColumnHeader>
              <Table.ColumnHeader
                cursor={UiCursor.Pointer}
                fontWeight={UiFontWeight.Semibold}
                whiteSpace={UiWhiteSpace.NoWrap}
                onClick={() => {
                  onSortChange(LoanSortField.LoanedAt)
                }}
              >
                {loanStrings.columnLoanedAt}
                <SortMark
                  field={LoanSortField.LoanedAt}
                  sortField={sortField}
                  sortDirection={sortDirection}
                />
              </Table.ColumnHeader>
              <Table.ColumnHeader
                fontWeight={UiFontWeight.Semibold}
                whiteSpace={UiWhiteSpace.NoWrap}
              >
                {loanStrings.columnReturnedAt}
              </Table.ColumnHeader>
              <Table.ColumnHeader fontWeight={UiFontWeight.Semibold}>
                {loanStrings.columnStatus}
              </Table.ColumnHeader>
              <Table.ColumnHeader fontWeight={UiFontWeight.Semibold}>
                {loanStrings.columnActions}
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {loans.map((loan) => {
              return (
                <Table.Row
                  key={loan.id}
                  cursor={UiCursor.Pointer}
                  _hover={{
                    '& td': {
                      bg: UiBgToken.RowHoverCell,
                    },
                  }}
                  onClick={() => {
                    onRowOpen(loan)
                  }}
                >
                  <Table.Cell fontWeight={UiFontWeight.Medium}>
                    {loan.book.title}
                  </Table.Cell>
                  <Table.Cell>{formatLoanMemberName(loan.member)}</Table.Cell>
                  <Table.Cell>{formatDateTime(loan.loanedAt)}</Table.Cell>
                  <Table.Cell>
                    {formatReturnedAt(loan.returnedAt, loan.isActive)}
                  </Table.Cell>
                  <Table.Cell>
                    <Badge
                      colorPalette={activeBadgePalette(loan.isActive)}
                      variant={UiBadgeVariant.Subtle}
                    >
                      {activeLabel(loan.isActive)}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell
                    onClick={(event) => {
                      event.stopPropagation()
                    }}
                  >
                    <Menu.Root
                      onSelect={(details) => {
                        if (details.value === LoanMenuAction.Return) {
                          if (!loan.isActive) {
                            return
                          }
                          onReturn(loan)
                        }
                      }}
                    >
                      <Menu.Trigger asChild>
                        <IconButton
                          aria-label={loanStrings.actionsMenuAria}
                          size={UiButtonSize.Sm}
                          variant={UiButtonVariant.Ghost}
                        >
                          <LuEllipsis />
                        </IconButton>
                      </Menu.Trigger>
                      <Portal>
                        <Menu.Positioner>
                          <Menu.Content>
                            <Menu.Item
                              value={LoanMenuAction.Return}
                              disabled={!loan.isActive}
                            >
                              {loanStrings.returnButton}
                            </Menu.Item>
                          </Menu.Content>
                        </Menu.Positioner>
                      </Portal>
                    </Menu.Root>
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </SurfacePanel>
  )
}

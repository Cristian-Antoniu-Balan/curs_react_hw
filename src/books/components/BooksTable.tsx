import { Badge, Table } from '@chakra-ui/react'
import {
  BookMenuAction,
  BookSortField,
  type BookSortField as BookSortFieldValue,
} from '@/books/constants/sort'
import { bookStrings } from '@/books/constants/strings'
import type { Book } from '@/books/types/book'
import { booleanBadgePalette } from '@/shared/utils/booleanBadgePalette'
import { availabilityLabel } from '@/books/utils/availabilityLabel'
import {
  ClickableTableRow,
  ResourceTable,
} from '@/shared/components/ResourceTable'
import { RowActionsMenu } from '@/shared/components/RowActionsMenu'
import { SortableColumnHeader } from '@/shared/components/SortableColumnHeader'
import { StaticColumnHeader } from '@/shared/components/StaticColumnHeader'
import {
  UiBadgeVariant,
  UiFontSize,
  UiFontWeight,
  type UiSortDirection as UiSortDirectionValue,
} from '@/shared/constants/ui'

type BooksTableProps = {
  books: Book[]
  sortField: BookSortFieldValue
  sortDirection: UiSortDirectionValue
  onSortChange: (field: BookSortFieldValue) => void
  onRowOpen: (book: Book) => void
  onEdit: (book: Book) => void
  onAdjustCopies: (book: Book) => void
  onLoan: (book: Book) => void
  onDelete: (book: Book) => void
}

export function BooksTable({
  books,
  sortField,
  sortDirection,
  onSortChange,
  onRowOpen,
  onEdit,
  onAdjustCopies,
  onLoan,
  onDelete,
}: BooksTableProps) {
  const header = (
    <>
      <SortableColumnHeader
        label={bookStrings.columnTitle}
        field={BookSortField.Title}
        sortField={sortField}
        sortDirection={sortDirection}
        onSortChange={onSortChange}
      />
      <SortableColumnHeader
        label={bookStrings.columnAuthor}
        field={BookSortField.Author}
        sortField={sortField}
        sortDirection={sortDirection}
        onSortChange={onSortChange}
      />
      <SortableColumnHeader
        label={bookStrings.columnCopies}
        field={BookSortField.Copies}
        sortField={sortField}
        sortDirection={sortDirection}
        onSortChange={onSortChange}
      />
      <StaticColumnHeader label={bookStrings.columnAvailability} />
      <StaticColumnHeader label={bookStrings.columnActions} />
    </>
  )

  const body = books.map((book) => {
    const canLoan = book.isAvailable

    return (
      <ClickableTableRow
        key={book.id}
        onOpen={() => {
          onRowOpen(book)
        }}
      >
        <Table.Cell fontWeight={UiFontWeight.Medium}>{book.title}</Table.Cell>
        <Table.Cell>{book.author}</Table.Cell>
        <Table.Cell>{book.copies}</Table.Cell>
        <Table.Cell>
          <Badge
            colorPalette={booleanBadgePalette(book.isAvailable)}
            variant={UiBadgeVariant.Subtle}
            fontSize={UiFontSize.Md}
          >
            {availabilityLabel(book)}
          </Badge>
        </Table.Cell>
        <RowActionsMenu
          ariaLabel={bookStrings.actionsMenuAria}
          items={[
            {
              value: BookMenuAction.Edit,
              label: bookStrings.editButton,
            },
            {
              value: BookMenuAction.AdjustCopies,
              label: bookStrings.adjustCopiesButton,
            },
            {
              value: BookMenuAction.Loan,
              label: bookStrings.loanButton,
              disabled: !canLoan,
            },
            {
              value: BookMenuAction.Delete,
              label: bookStrings.deleteButton,
              separatorBefore: true,
            },
          ]}
          onSelect={(value) => {
            if (value === BookMenuAction.Edit) {
              onEdit(book)
              return
            }

            if (value === BookMenuAction.AdjustCopies) {
              onAdjustCopies(book)
              return
            }

            if (value === BookMenuAction.Loan) {
              if (!canLoan) {
                return
              }
              onLoan(book)
              return
            }

            if (value === BookMenuAction.Delete) {
              onDelete(book)
            }
          }}
        />
      </ClickableTableRow>
    )
  })

  return <ResourceTable header={header} body={body} />
}

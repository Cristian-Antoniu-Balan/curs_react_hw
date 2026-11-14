import {
  IconButton,
  Menu,
  Portal,
  Table,
} from '@chakra-ui/react'
import { LuEllipsis } from 'react-icons/lu'
import {
  BookMenuAction,
  BookSortField,
  type BookSortField as BookSortFieldValue,
} from '@/books/constants/sort'
import { bookStrings } from '@/books/constants/strings'
import type { Book } from '@/books/types/book'
import { availabilityLabel } from '@/books/utils/availabilityLabel'
import {
  UiBgToken,
  UiButtonSize,
  UiButtonVariant,
  UiCursor,
  UiSortDirection,
  UiSortIndicator,
  UiTableSize,
  UiTableStriped,
  type UiSortDirection as UiSortDirectionValue,
} from '@/shared/constants/ui'

type BooksTableProps = {
  books: Book[]
  bookIdsWithActiveLoans: ReadonlySet<string>
  sortField: BookSortFieldValue
  sortDirection: UiSortDirectionValue
  onSortChange: (field: BookSortFieldValue) => void
  onRowOpen: (book: Book) => void
  onEdit: (book: Book) => void
  onAdjustCopies: (book: Book) => void
  onLoan: (book: Book) => void
  onReturn: (book: Book) => void
  onDelete: (book: Book) => void
}

function sortIndicator(
  field: BookSortFieldValue,
  sortField: BookSortFieldValue,
  sortDirection: UiSortDirectionValue,
): string {
  if (field !== sortField) {
    return ''
  }

  if (sortDirection === UiSortDirection.Asc) {
    return UiSortIndicator.Asc
  }

  return UiSortIndicator.Desc
}

export function BooksTable({
  books,
  bookIdsWithActiveLoans,
  sortField,
  sortDirection,
  onSortChange,
  onRowOpen,
  onEdit,
  onAdjustCopies,
  onLoan,
  onReturn,
  onDelete,
}: BooksTableProps) {
  return (
    <Table.ScrollArea>
      <Table.Root size={UiTableSize.Md} striped={UiTableStriped.True}>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader
              cursor={UiCursor.Pointer}
              onClick={() => {
                onSortChange(BookSortField.Title)
              }}
            >
              {bookStrings.columnTitle}
              {sortIndicator(BookSortField.Title, sortField, sortDirection)}
            </Table.ColumnHeader>
            <Table.ColumnHeader
              cursor={UiCursor.Pointer}
              onClick={() => {
                onSortChange(BookSortField.Author)
              }}
            >
              {bookStrings.columnAuthor}
              {sortIndicator(BookSortField.Author, sortField, sortDirection)}
            </Table.ColumnHeader>
            <Table.ColumnHeader
              cursor={UiCursor.Pointer}
              onClick={() => {
                onSortChange(BookSortField.Copies)
              }}
            >
              {bookStrings.columnCopies}
              {sortIndicator(BookSortField.Copies, sortField, sortDirection)}
            </Table.ColumnHeader>
            <Table.ColumnHeader
              cursor={UiCursor.Pointer}
              onClick={() => {
                onSortChange(BookSortField.Availability)
              }}
            >
              {bookStrings.columnAvailability}
              {sortIndicator(
                BookSortField.Availability,
                sortField,
                sortDirection,
              )}
            </Table.ColumnHeader>
            <Table.ColumnHeader>{bookStrings.columnActions}</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {books.map((book) => {
            const canLoan = book.isAvailable
            const canReturn = bookIdsWithActiveLoans.has(book.id)

            return (
              <Table.Row
                key={book.id}
                cursor={UiCursor.Pointer}
                _hover={{
                  '& td': {
                    bg: UiBgToken.RowHoverCell,
                  },
                }}
                onClick={() => {
                  onRowOpen(book)
                }}
              >
                <Table.Cell>{book.title}</Table.Cell>
                <Table.Cell>{book.author}</Table.Cell>
                <Table.Cell>{book.copies}</Table.Cell>
                <Table.Cell>{availabilityLabel(book.isAvailable)}</Table.Cell>
                <Table.Cell
                  onClick={(event) => {
                    event.stopPropagation()
                  }}
                >
                  <Menu.Root
                    onSelect={(details) => {
                      if (details.value === BookMenuAction.Edit) {
                        onEdit(book)
                        return
                      }

                      if (details.value === BookMenuAction.AdjustCopies) {
                        onAdjustCopies(book)
                        return
                      }

                      if (details.value === BookMenuAction.Loan) {
                        if (!canLoan) {
                          return
                        }
                        onLoan(book)
                        return
                      }

                      if (details.value === BookMenuAction.Return) {
                        if (!canReturn) {
                          return
                        }
                        onReturn(book)
                        return
                      }

                      if (details.value === BookMenuAction.Delete) {
                        onDelete(book)
                      }
                    }}
                  >
                    <Menu.Trigger asChild>
                      <IconButton
                        aria-label={bookStrings.actionsMenuAria}
                        size={UiButtonSize.Sm}
                        variant={UiButtonVariant.Ghost}
                      >
                        <LuEllipsis />
                      </IconButton>
                    </Menu.Trigger>
                    <Portal>
                      <Menu.Positioner>
                        <Menu.Content>
                          <Menu.Item value={BookMenuAction.Edit}>
                            {bookStrings.editButton}
                          </Menu.Item>
                          <Menu.Item value={BookMenuAction.AdjustCopies}>
                            {bookStrings.adjustCopiesButton}
                          </Menu.Item>
                          <Menu.Item
                            value={BookMenuAction.Loan}
                            disabled={!canLoan}
                          >
                            {bookStrings.loanButton}
                          </Menu.Item>
                          <Menu.Item
                            value={BookMenuAction.Return}
                            disabled={!canReturn}
                          >
                            {bookStrings.returnButton}
                          </Menu.Item>
                          <Menu.Separator />
                          <Menu.Item value={BookMenuAction.Delete}>
                            {bookStrings.deleteButton}
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
  )
}

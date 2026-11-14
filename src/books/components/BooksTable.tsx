import { Badge, Box, IconButton, Menu, Portal, Table } from '@chakra-ui/react';
import { LuEllipsis } from 'react-icons/lu';
import {
  BookMenuAction,
  BookSortField,
  type BookSortField as BookSortFieldValue,
} from '@/books/constants/sort';
import { bookStrings } from '@/books/constants/strings';
import type { Book } from '@/books/types/book';
import { availabilityBadgePalette } from '@/books/utils/availabilityBadgePalette';
import { availabilityLabel } from '@/books/utils/availabilityLabel';
import { SurfacePanel } from '@/shared/components/SurfacePanel';
import {
  UiBadgeVariant,
  UiBgToken,
  UiButtonSize,
  UiButtonVariant,
  UiCursor,
  UiDisplay,
  UiFlexJustify,
  UiFontSize,
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
} from '@/shared/constants/ui';

type BooksTableProps = {
  books: Book[];
  bookIdsWithActiveLoans: ReadonlySet<string>;
  sortField: BookSortFieldValue;
  sortDirection: UiSortDirectionValue;
  onSortChange: (field: BookSortFieldValue) => void;
  onRowOpen: (book: Book) => void;
  onEdit: (book: Book) => void;
  onAdjustCopies: (book: Book) => void;
  onLoan: (book: Book) => void;
  onReturn: (book: Book) => void;
  onDelete: (book: Book) => void;
};

type SortMarkProps = {
  field: BookSortFieldValue;
  sortField: BookSortFieldValue;
  sortDirection: UiSortDirectionValue;
};

function SortMark({ field, sortField, sortDirection }: SortMarkProps) {
  let symbol: string = UiSortIndicator.Asc;
  let visibility: UiVisibility = UiVisibility.Hidden;

  if (field === sortField) {
    visibility = UiVisibility.Visible;
    if (sortDirection === UiSortDirection.Desc) {
      symbol = UiSortIndicator.Desc;
    }
  }

  return (
    <Box
      as='span'
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
  );
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
                  onSortChange(BookSortField.Title);
                }}
              >
                {bookStrings.columnTitle}
                <SortMark
                  field={BookSortField.Title}
                  sortField={sortField}
                  sortDirection={sortDirection}
                />
              </Table.ColumnHeader>
              <Table.ColumnHeader
                cursor={UiCursor.Pointer}
                fontWeight={UiFontWeight.Semibold}
                whiteSpace={UiWhiteSpace.NoWrap}
                onClick={() => {
                  onSortChange(BookSortField.Author);
                }}
              >
                {bookStrings.columnAuthor}
                <SortMark
                  field={BookSortField.Author}
                  sortField={sortField}
                  sortDirection={sortDirection}
                />
              </Table.ColumnHeader>
              <Table.ColumnHeader
                cursor={UiCursor.Pointer}
                fontWeight={UiFontWeight.Semibold}
                whiteSpace={UiWhiteSpace.NoWrap}
                onClick={() => {
                  onSortChange(BookSortField.Copies);
                }}
              >
                {bookStrings.columnCopies}
                <SortMark
                  field={BookSortField.Copies}
                  sortField={sortField}
                  sortDirection={sortDirection}
                />
              </Table.ColumnHeader>
              <Table.ColumnHeader fontWeight={UiFontWeight.Semibold}>
                {bookStrings.columnAvailability}
              </Table.ColumnHeader>
              <Table.ColumnHeader fontWeight={UiFontWeight.Semibold}>
                {bookStrings.columnActions}
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {books.map((book) => {
              const canLoan = book.isAvailable;
              const canReturn = bookIdsWithActiveLoans.has(book.id);

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
                    onRowOpen(book);
                  }}
                >
                  <Table.Cell fontWeight={UiFontWeight.Medium}>
                    {book.title}
                  </Table.Cell>
                  <Table.Cell>{book.author}</Table.Cell>
                  <Table.Cell>{book.copies}</Table.Cell>
                  <Table.Cell>
                    <Badge
                      colorPalette={availabilityBadgePalette(book.isAvailable)}
                      variant={UiBadgeVariant.Subtle}
                      fontSize={UiFontSize.Md}
                    >
                      {availabilityLabel(book.isAvailable)}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                  >
                    <Menu.Root
                      onSelect={(details) => {
                        if (details.value === BookMenuAction.Edit) {
                          onEdit(book);
                          return;
                        }

                        if (details.value === BookMenuAction.AdjustCopies) {
                          onAdjustCopies(book);
                          return;
                        }

                        if (details.value === BookMenuAction.Loan) {
                          if (!canLoan) {
                            return;
                          }
                          onLoan(book);
                          return;
                        }

                        if (details.value === BookMenuAction.Return) {
                          if (!canReturn) {
                            return;
                          }
                          onReturn(book);
                          return;
                        }

                        if (details.value === BookMenuAction.Delete) {
                          onDelete(book);
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
              );
            })}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </SurfacePanel>
  );
}

import { useMemo, useState } from 'react'
import { Button, Flex, Spinner, Stack, Text } from '@chakra-ui/react'
import { BookAdjustCopiesDialog } from '@/books/components/BookAdjustCopiesDialog'
import { BookCreateDialog } from '@/books/components/BookCreateDialog'
import { BookDeleteDialog } from '@/books/components/BookDeleteDialog'
import { BookDetailDrawer } from '@/books/components/BookDetailDrawer'
import { BookEditDialog } from '@/books/components/BookEditDialog'
import { BookLoanDialog } from '@/books/components/BookLoanDialog'
import { BookReturnDialog } from '@/books/components/BookReturnDialog'
import { BooksAvailabilityFilter } from '@/books/components/BooksAvailabilityFilter'
import { BooksSearchField } from '@/books/components/BooksSearchField'
import { BooksTable } from '@/books/components/BooksTable'
import {
  BookAvailabilityFilter,
  type BookAvailabilityFilter as BookAvailabilityFilterValue,
} from '@/books/constants/availabilityFilter'
import { BookSortField, type BookSortField as BookSortFieldValue } from '@/books/constants/sort'
import { BookDialogKey, bookStrings } from '@/books/constants/strings'
import { useActiveLoanBookIds } from '@/books/hooks/useActiveLoanBookIds'
import { useBooksList } from '@/books/hooks/useBooksList'
import type { Book } from '@/books/types/book'
import { filterBooksBySearch } from '@/books/utils/filterBooksBySearch'
import { sortBooks } from '@/books/utils/sortBooks'
import { ResourcePage } from '@/shared/components/ResourcePage'
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
  type UiSortDirection as UiSortDirectionValue,
} from '@/shared/constants/ui'
import { notifySuccess } from '@/shared/toast/notify'

export function BooksPage() {
  const [filter, setFilter] = useState<BookAvailabilityFilterValue>(
    BookAvailabilityFilter.All,
  )
  const [search, setSearch] = useState('')
  const [sortField, setSortField] = useState<BookSortFieldValue>(
    BookSortField.Title,
  )
  const [sortDirection, setSortDirection] = useState<UiSortDirectionValue>(
    UiSortDirection.Asc,
  )
  const { books, error, loading, reload } = useBooksList(filter)
  const { bookIdsWithActiveLoans, reloadActiveLoanBookIds } =
    useActiveLoanBookIds()

  const [createOpen, setCreateOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [adjustOpen, setAdjustOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [loanOpen, setLoanOpen] = useState(false)
  const [returnOpen, setReturnOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const [selectedBook, setSelectedBook] = useState<Book | null>(null)
  const [detailBookId, setDetailBookId] = useState<string | null>(null)

  const visibleBooks = useMemo(() => {
    if (!books) {
      return []
    }

    const filtered = filterBooksBySearch(books, search)
    return sortBooks(filtered, sortField, sortDirection)
  }, [books, search, sortField, sortDirection])

  async function handleListChanged(successMessage: string) {
    notifySuccess(bookStrings.toastSuccessTitle, successMessage)
    await Promise.all([reload(), reloadActiveLoanBookIds()])
  }

  function handleSortChange(field: BookSortFieldValue) {
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

  const toolbar = (
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
      >
        <BooksSearchField value={search} onChange={setSearch} />
        <BooksAvailabilityFilter value={filter} onChange={setFilter} />
      </Flex>
      <Button
        colorPalette={UiButtonColorPalette.Blue}
        flexShrink={UiFlexShrink.None}
        onClick={() => {
          setCreateOpen(true)
        }}
      >
        {bookStrings.createButton}
      </Button>
    </Flex>
  )

  const dialogs = (
    <>
      <BookCreateDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreated={() => handleListChanged(bookStrings.createSuccess)}
      />
      <BookEditDialog
        key={selectedBook ? selectedBook.id : BookDialogKey.EditIdle}
        open={editOpen}
        book={selectedBook}
        onOpenChange={setEditOpen}
        onUpdated={() => handleListChanged(bookStrings.updateSuccess)}
      />
      <BookAdjustCopiesDialog
        key={
          selectedBook
            ? `${selectedBook.id}${BookDialogKey.AdjustSuffix}`
            : BookDialogKey.AdjustIdle
        }
        open={adjustOpen}
        book={selectedBook}
        onOpenChange={setAdjustOpen}
        onUpdated={() => handleListChanged(bookStrings.patchSuccess)}
      />
      <BookDeleteDialog
        open={deleteOpen}
        book={selectedBook}
        onOpenChange={setDeleteOpen}
        onDeleted={() => handleListChanged(bookStrings.deleteSuccess)}
      />
      <BookLoanDialog
        key={
          selectedBook
            ? `${selectedBook.id}${BookDialogKey.LoanSuffix}`
            : BookDialogKey.LoanIdle
        }
        open={loanOpen}
        book={selectedBook}
        onOpenChange={setLoanOpen}
        onLoaned={() => handleListChanged(bookStrings.loanSuccess)}
      />
      <BookReturnDialog
        key={
          selectedBook
            ? `${selectedBook.id}${BookDialogKey.ReturnSuffix}`
            : BookDialogKey.ReturnIdle
        }
        open={returnOpen}
        book={selectedBook}
        onOpenChange={setReturnOpen}
        onReturned={() => handleListChanged(bookStrings.returnSuccess)}
      />
      <BookDetailDrawer
        open={detailOpen}
        bookId={detailBookId}
        onOpenChange={setDetailOpen}
      />
    </>
  )

  if (loading) {
    return (
      <ResourcePage title={bookStrings.title}>
        <Stack gap={UiGap.Four}>
          {toolbar}
          <Spinner />
        </Stack>
        {dialogs}
      </ResourcePage>
    )
  }

  if (error) {
    return (
      <ResourcePage title={bookStrings.title}>
        <Stack gap={UiGap.Four}>
          {toolbar}
          <Text color={UiColor.Error}>{error}</Text>
        </Stack>
        {dialogs}
      </ResourcePage>
    )
  }

  if (books === null || books.length === 0) {
    return (
      <ResourcePage title={bookStrings.title}>
        <Stack gap={UiGap.Four}>
          {toolbar}
          <Text color={UiColor.Muted}>{bookStrings.empty}</Text>
        </Stack>
        {dialogs}
      </ResourcePage>
    )
  }

  if (visibleBooks.length === 0) {
    return (
      <ResourcePage title={bookStrings.title}>
        <Stack gap={UiGap.Four}>
          {toolbar}
          <Text color={UiColor.Muted}>{bookStrings.emptySearch}</Text>
        </Stack>
        {dialogs}
      </ResourcePage>
    )
  }

  return (
    <ResourcePage title={bookStrings.title}>
      <Stack gap={UiGap.Four}>
        {toolbar}
        <BooksTable
          books={visibleBooks}
          bookIdsWithActiveLoans={bookIdsWithActiveLoans}
          sortField={sortField}
          sortDirection={sortDirection}
          onSortChange={handleSortChange}
          onRowOpen={(book) => {
            setDetailBookId(book.id)
            setDetailOpen(true)
          }}
          onEdit={(book) => {
            setSelectedBook(book)
            setEditOpen(true)
          }}
          onAdjustCopies={(book) => {
            setSelectedBook(book)
            setAdjustOpen(true)
          }}
          onLoan={(book) => {
            setSelectedBook(book)
            setLoanOpen(true)
          }}
          onReturn={(book) => {
            setSelectedBook(book)
            setReturnOpen(true)
          }}
          onDelete={(book) => {
            setSelectedBook(book)
            setDeleteOpen(true)
          }}
        />
      </Stack>
      {dialogs}
    </ResourcePage>
  )
}

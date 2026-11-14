import { useMemo, useState } from 'react'
import { Button, Flex, Spinner, Stack, Text } from '@chakra-ui/react'
import { BookAdjustCopiesDialog } from '@/books/components/BookAdjustCopiesDialog'
import { BookCreateDialog } from '@/books/components/BookCreateDialog'
import { BookDeleteDialog } from '@/books/components/BookDeleteDialog'
import { BookDetailDrawer } from '@/books/components/BookDetailDrawer'
import { BookEditDialog } from '@/books/components/BookEditDialog'
import { BookLoanDialog } from '@/books/components/BookLoanDialog'
import { BooksTable } from '@/books/components/BooksTable'
import {
  BookAvailabilityFilter,
  type BookAvailabilityFilter as BookAvailabilityFilterValue,
} from '@/books/constants/availabilityFilter'
import { BookSortField, type BookSortField as BookSortFieldValue } from '@/books/constants/sort'
import { BookDialogKey, bookStrings } from '@/books/constants/strings'
import { useBooksList } from '@/books/hooks/useBooksList'
import type { Book } from '@/books/types/book'
import { filterBooksBySearch } from '@/books/utils/filterBooksBySearch'
import { sortBooks } from '@/books/utils/sortBooks'
import { ResourcePage } from '@/shared/components/ResourcePage'
import { SearchField } from '@/shared/components/SearchField'
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

  const [createOpen, setCreateOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [adjustOpen, setAdjustOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [loanOpen, setLoanOpen] = useState(false)
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
    await reload()
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
        >
          <SearchField
            label={bookStrings.searchLabel}
            placeholder={bookStrings.searchPlaceholder}
            value={search}
            onChange={setSearch}
          />
          <SelectFilter
            label={bookStrings.filterLabel}
            value={filter}
            onChange={setFilter}
            options={[
              {
                value: BookAvailabilityFilter.All,
                label: bookStrings.filterAll,
              },
              {
                value: BookAvailabilityFilter.Available,
                label: bookStrings.filterAvailable,
              },
              {
                value: BookAvailabilityFilter.Unavailable,
                label: bookStrings.filterUnavailable,
              },
            ]}
          />
        </Flex>
        <Button
          colorPalette={UiButtonColorPalette.Brand}
          flexShrink={UiFlexShrink.None}
          onClick={() => {
            setCreateOpen(true)
          }}
        >
          {bookStrings.createButton}
        </Button>
      </Flex>
    </SurfacePanel>
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
      <BookDetailDrawer
        open={detailOpen}
        bookId={detailBookId}
        onOpenChange={setDetailOpen}
        onBookChanged={reload}
      />
    </>
  )

  if (loading) {
    return (
      <ResourcePage
        title={bookStrings.title}
        description={bookStrings.description}
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
        title={bookStrings.title}
        description={bookStrings.description}
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

  if (books === null || books.length === 0) {
    return (
      <ResourcePage
        title={bookStrings.title}
        description={bookStrings.description}
      >
        <Stack gap={UiGap.Four}>
          {toolbar}
          <SurfacePanel padding={UiSpace.Five}>
            <Text color={UiColor.Muted}>{bookStrings.empty}</Text>
          </SurfacePanel>
        </Stack>
        {dialogs}
      </ResourcePage>
    )
  }

  if (visibleBooks.length === 0) {
    return (
      <ResourcePage
        title={bookStrings.title}
        description={bookStrings.description}
      >
        <Stack gap={UiGap.Four}>
          {toolbar}
          <SurfacePanel padding={UiSpace.Five}>
            <Text color={UiColor.Muted}>{bookStrings.emptySearch}</Text>
          </SurfacePanel>
        </Stack>
        {dialogs}
      </ResourcePage>
    )
  }

  return (
    <ResourcePage
      title={bookStrings.title}
      description={bookStrings.description}
    >
      <Stack gap={UiGap.Four}>
        {toolbar}
        <BooksTable
          books={visibleBooks}
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

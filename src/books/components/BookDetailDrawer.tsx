import { useEffect, useState } from 'react'
import {
  Alert,
  Badge,
  Box,
  Drawer,
  Flex,
  Portal,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react'
import { getBook } from '@/books/api/booksApi'
import { bookStrings } from '@/books/constants/strings'
import type { Book } from '@/books/types/book'
import { availabilityBadgePalette } from '@/books/utils/availabilityBadgePalette'
import { availabilityLabel } from '@/books/utils/availabilityLabel'
import { resolveErrorMessage } from '@/books/utils/resolveErrorMessage'
import {
  UiAlertStatus,
  UiBadgeVariant,
  UiBgToken,
  UiBorderColor,
  UiBorderWidth,
  UiColor,
  UiDrawerPlacement,
  UiDrawerSize,
  UiFlexAlign,
  UiFlexJustify,
  UiFontSize,
  UiFontWeight,
  UiGap,
  UiInset,
  UiLetterSpacing,
  UiOverflow,
  UiPosition,
  UiShadow,
  UiSpace,
  UiTextTransform,
  UiWidth,
} from '@/shared/constants/ui'

type BookDetailDrawerProps = {
  open: boolean
  bookId: string | null
  onOpenChange: (open: boolean) => void
}

type DetailRowProps = {
  label: string
  value: string
}

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <Box
      py={UiSpace.Three}
      borderBottomWidth={UiBorderWidth.OnePx}
      borderColor={UiBorderColor.Panel}
    >
      <Text
        fontSize={UiFontSize.Xs}
        color={UiColor.Muted}
        textTransform={UiTextTransform.Uppercase}
        letterSpacing={UiLetterSpacing.Wide}
        fontWeight={UiFontWeight.Semibold}
        mb={UiSpace.One}
      >
        {label}
      </Text>
      <Text fontSize={UiFontSize.Md} fontWeight={UiFontWeight.Medium}>
        {value}
      </Text>
    </Box>
  )
}

export function BookDetailDrawer({
  open,
  bookId,
  onOpenChange,
}: BookDetailDrawerProps) {
  const [book, setBook] = useState<Book | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open || !bookId) {
      return
    }

    let cancelled = false

    async function loadDetail(id: string) {
      setLoading(true)
      setError(null)
      setBook(null)

      try {
        const result = await getBook(id)
        if (!cancelled) {
          setBook(result)
        }
      } catch (caught) {
        if (!cancelled) {
          setError(resolveErrorMessage(caught, bookStrings.detailLoadFailed))
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void loadDetail(bookId)

    return () => {
      cancelled = true
    }
  }, [open, bookId])

  let body = null

  if (loading) {
    body = <Spinner />
  }

  if (!loading && error) {
    body = (
      <Alert.Root status={UiAlertStatus.Error}>
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Description>{error}</Alert.Description>
        </Alert.Content>
      </Alert.Root>
    )
  }

  if (!loading && !error && book) {
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
            colorPalette={availabilityBadgePalette(book.isAvailable)}
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
      </Stack>
    )
  }

  if (!loading && !error && !book) {
    body = <Text color={UiColor.Muted}>{bookStrings.detailLoadFailed}</Text>
  }

  return (
    <Drawer.Root
      open={open}
      placement={UiDrawerPlacement.End}
      size={UiDrawerSize.Md}
      onOpenChange={(details) => {
        onOpenChange(details.open)
      }}
    >
      <Portal>
        <Drawer.Backdrop bg={UiBgToken.Overlay} />
        <Drawer.Positioner>
          <Drawer.Content
            bg={UiBgToken.AppPanel}
            borderLeftWidth={UiBorderWidth.OnePx}
            borderColor={UiBorderColor.Panel}
            boxShadow={UiShadow.Overlay}
            overflow={UiOverflow.Hidden}
          >
            <Box
              position={UiPosition.Absolute}
              left={UiInset.Zero}
              top={UiInset.Zero}
              bottom={UiInset.Zero}
              w={UiWidth.AccentBar}
              bg={UiColor.BrandSolid}
            />
            <Drawer.Header
              px={UiSpace.Six}
              pt={UiSpace.Six}
              pb={UiSpace.Three}
              borderBottomWidth={UiBorderWidth.OnePx}
              borderColor={UiBorderColor.Panel}
            >
              <Drawer.Title
                fontWeight={UiFontWeight.Bold}
                letterSpacing={UiLetterSpacing.Tight}
              >
                {bookStrings.detailDrawerTitle}
              </Drawer.Title>
            </Drawer.Header>
            <Drawer.Body px={UiSpace.Six} py={UiSpace.Five}>
              {body}
            </Drawer.Body>
            <Drawer.CloseTrigger />
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}

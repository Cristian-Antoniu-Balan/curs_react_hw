import { Box } from '@chakra-ui/react'
import {
  UiDisplay,
  UiFlexJustify,
  UiSortDirection,
  UiSortIndicator,
  UiTextAlign,
  UiVisibility,
  UiWhiteSpace,
  UiWidth,
  type UiSortDirection as UiSortDirectionValue,
} from '@/shared/constants/ui'

type SortMarkProps<TField extends string> = {
  field: TField
  sortField: TField
  sortDirection: UiSortDirectionValue
}

export function SortMark<TField extends string>({
  field,
  sortField,
  sortDirection,
}: SortMarkProps<TField>) {
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

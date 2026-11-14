import type { ReactNode } from 'react'
import { Table } from '@chakra-ui/react'
import { SortMark } from '@/shared/components/SortMark'
import {
  UiCursor,
  UiFontWeight,
  UiWhiteSpace,
  type UiSortDirection as UiSortDirectionValue,
} from '@/shared/constants/ui'

type SortableColumnHeaderProps<TField extends string> = {
  label: ReactNode
  field: TField
  sortField: TField
  sortDirection: UiSortDirectionValue
  onSortChange: (field: TField) => void
}

export function SortableColumnHeader<TField extends string>({
  label,
  field,
  sortField,
  sortDirection,
  onSortChange,
}: SortableColumnHeaderProps<TField>) {
  return (
    <Table.ColumnHeader
      cursor={UiCursor.Pointer}
      fontWeight={UiFontWeight.Semibold}
      whiteSpace={UiWhiteSpace.NoWrap}
      onClick={() => {
        onSortChange(field)
      }}
    >
      {label}
      <SortMark
        field={field}
        sortField={sortField}
        sortDirection={sortDirection}
      />
    </Table.ColumnHeader>
  )
}

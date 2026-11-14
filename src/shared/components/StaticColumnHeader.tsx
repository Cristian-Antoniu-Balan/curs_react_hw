import type { ReactNode } from 'react'
import { Table } from '@chakra-ui/react'
import { UiFontWeight, UiWhiteSpace } from '@/shared/constants/ui'

type StaticColumnHeaderProps = {
  label: ReactNode
}

export function StaticColumnHeader({ label }: StaticColumnHeaderProps) {
  return (
    <Table.ColumnHeader
      fontWeight={UiFontWeight.Semibold}
      whiteSpace={UiWhiteSpace.NoWrap}
    >
      {label}
    </Table.ColumnHeader>
  )
}

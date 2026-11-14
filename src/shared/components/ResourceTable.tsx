import type { ReactNode } from 'react'
import { Table } from '@chakra-ui/react'
import { SurfacePanel } from '@/shared/components/SurfacePanel'
import {
  UiBgToken,
  UiCursor,
  UiTableSize,
  UiTableStriped,
} from '@/shared/constants/ui'

type ResourceTableProps = {
  header: ReactNode
  body: ReactNode
}

export function ResourceTable({ header, body }: ResourceTableProps) {
  return (
    <SurfacePanel>
      <Table.ScrollArea>
        <Table.Root size={UiTableSize.Md} striped={UiTableStriped.True}>
          <Table.Header>
            <Table.Row bg={UiBgToken.TableHeader}>{header}</Table.Row>
          </Table.Header>
          <Table.Body>{body}</Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </SurfacePanel>
  )
}

type ClickableTableRowProps = {
  onOpen: () => void
  children: ReactNode
}

export function ClickableTableRow({
  onOpen,
  children,
}: ClickableTableRowProps) {
  return (
    <Table.Row
      cursor={UiCursor.Pointer}
      _hover={{
        '& td': {
          bg: UiBgToken.RowHoverCell,
        },
      }}
      onClick={onOpen}
    >
      {children}
    </Table.Row>
  )
}

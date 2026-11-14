import type { ReactNode } from 'react'
import { IconButton, Menu, Portal, Table } from '@chakra-ui/react'
import { LuEllipsis } from 'react-icons/lu'
import {
  UiButtonSize,
  UiButtonVariant,
} from '@/shared/constants/ui'

export type RowActionsMenuItem = {
  value: string
  label: ReactNode
  disabled?: boolean
  separatorBefore?: boolean
}

type RowActionsMenuProps = {
  ariaLabel: string
  items: RowActionsMenuItem[]
  onSelect: (value: string) => void
}

export function RowActionsMenu({
  ariaLabel,
  items,
  onSelect,
}: RowActionsMenuProps) {
  const menuNodes: ReactNode[] = []

  for (const item of items) {
    if (item.separatorBefore) {
      menuNodes.push(<Menu.Separator key={`${item.value}-separator`} />)
    }

    menuNodes.push(
      <Menu.Item
        key={item.value}
        value={item.value}
        disabled={item.disabled}
      >
        {item.label}
      </Menu.Item>,
    )
  }

  return (
    <Table.Cell
      onClick={(event) => {
        event.stopPropagation()
      }}
    >
      <Menu.Root
        onSelect={(details) => {
          onSelect(details.value)
        }}
      >
        <Menu.Trigger asChild>
          <IconButton
            aria-label={ariaLabel}
            size={UiButtonSize.Sm}
            variant={UiButtonVariant.Ghost}
          >
            <LuEllipsis />
          </IconButton>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>{menuNodes}</Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    </Table.Cell>
  )
}

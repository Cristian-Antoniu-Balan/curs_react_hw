import { Box, IconButton, Menu, Portal, Table } from '@chakra-ui/react'
import { LuEllipsis } from 'react-icons/lu'
import {
  MemberMenuAction,
  MemberSortField,
  type MemberSortField as MemberSortFieldValue,
} from '@/members/constants/sort'
import { memberStrings } from '@/members/constants/strings'
import type { Member } from '@/members/types/member'
import { SurfacePanel } from '@/shared/components/SurfacePanel'
import {
  UiBgToken,
  UiButtonSize,
  UiButtonVariant,
  UiCursor,
  UiDisplay,
  UiFlexJustify,
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
} from '@/shared/constants/ui'

type MembersTableProps = {
  members: Member[]
  sortField: MemberSortFieldValue
  sortDirection: UiSortDirectionValue
  onSortChange: (field: MemberSortFieldValue) => void
  onRowOpen: (member: Member) => void
  onEdit: (member: Member) => void
  onDelete: (member: Member) => void
}

type SortMarkProps = {
  field: MemberSortFieldValue
  sortField: MemberSortFieldValue
  sortDirection: UiSortDirectionValue
}

function SortMark({ field, sortField, sortDirection }: SortMarkProps) {
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

export function MembersTable({
  members,
  sortField,
  sortDirection,
  onSortChange,
  onRowOpen,
  onEdit,
  onDelete,
}: MembersTableProps) {
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
                  onSortChange(MemberSortField.FirstName)
                }}
              >
                {memberStrings.columnFirstName}
                <SortMark
                  field={MemberSortField.FirstName}
                  sortField={sortField}
                  sortDirection={sortDirection}
                />
              </Table.ColumnHeader>
              <Table.ColumnHeader
                cursor={UiCursor.Pointer}
                fontWeight={UiFontWeight.Semibold}
                whiteSpace={UiWhiteSpace.NoWrap}
                onClick={() => {
                  onSortChange(MemberSortField.LastName)
                }}
              >
                {memberStrings.columnLastName}
                <SortMark
                  field={MemberSortField.LastName}
                  sortField={sortField}
                  sortDirection={sortDirection}
                />
              </Table.ColumnHeader>
              <Table.ColumnHeader
                cursor={UiCursor.Pointer}
                fontWeight={UiFontWeight.Semibold}
                whiteSpace={UiWhiteSpace.NoWrap}
                onClick={() => {
                  onSortChange(MemberSortField.Email)
                }}
              >
                {memberStrings.columnEmail}
                <SortMark
                  field={MemberSortField.Email}
                  sortField={sortField}
                  sortDirection={sortDirection}
                />
              </Table.ColumnHeader>
              <Table.ColumnHeader fontWeight={UiFontWeight.Semibold}>
                {memberStrings.columnActions}
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {members.map((member) => (
              <Table.Row
                key={member.id}
                cursor={UiCursor.Pointer}
                _hover={{
                  '& td': {
                    bg: UiBgToken.RowHoverCell,
                  },
                }}
                onClick={() => {
                  onRowOpen(member)
                }}
              >
                <Table.Cell fontWeight={UiFontWeight.Medium}>
                  {member.firstName}
                </Table.Cell>
                <Table.Cell>{member.lastName}</Table.Cell>
                <Table.Cell>{member.email}</Table.Cell>
                <Table.Cell
                  onClick={(event) => {
                    event.stopPropagation()
                  }}
                >
                  <Menu.Root
                    onSelect={(details) => {
                      if (details.value === MemberMenuAction.Edit) {
                        onEdit(member)
                        return
                      }

                      if (details.value === MemberMenuAction.Delete) {
                        onDelete(member)
                      }
                    }}
                  >
                    <Menu.Trigger asChild>
                      <IconButton
                        aria-label={memberStrings.actionsMenuAria}
                        size={UiButtonSize.Sm}
                        variant={UiButtonVariant.Ghost}
                      >
                        <LuEllipsis />
                      </IconButton>
                    </Menu.Trigger>
                    <Portal>
                      <Menu.Positioner>
                        <Menu.Content>
                          <Menu.Item value={MemberMenuAction.Edit}>
                            {memberStrings.editButton}
                          </Menu.Item>
                          <Menu.Separator />
                          <Menu.Item value={MemberMenuAction.Delete}>
                            {memberStrings.deleteButton}
                          </Menu.Item>
                        </Menu.Content>
                      </Menu.Positioner>
                    </Portal>
                  </Menu.Root>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Table.ScrollArea>
    </SurfacePanel>
  )
}

import { Table } from '@chakra-ui/react'
import {
  MemberMenuAction,
  MemberSortField,
  type MemberSortField as MemberSortFieldValue,
} from '@/members/constants/sort'
import { memberStrings } from '@/members/constants/strings'
import type { Member } from '@/members/types/member'
import {
  ClickableTableRow,
  ResourceTable,
} from '@/shared/components/ResourceTable'
import { RowActionsMenu } from '@/shared/components/RowActionsMenu'
import { SortableColumnHeader } from '@/shared/components/SortableColumnHeader'
import { StaticColumnHeader } from '@/shared/components/StaticColumnHeader'
import {
  UiFontWeight,
  type UiSortDirection as UiSortDirectionValue,
} from '@/shared/constants/ui'

type MembersTableProps = {
  members: Member[]
  sortField: MemberSortFieldValue
  sortDirection: UiSortDirectionValue
  onSortChange: (field: MemberSortFieldValue) => void
  onRowOpen: (member: Member) => void
  onEdit: (member: Member) => void
  onReturn: (member: Member) => void
  onDelete: (member: Member) => void
}

export function MembersTable({
  members,
  sortField,
  sortDirection,
  onSortChange,
  onRowOpen,
  onEdit,
  onReturn,
  onDelete,
}: MembersTableProps) {
  const header = (
    <>
      <SortableColumnHeader
        label={memberStrings.columnFirstName}
        field={MemberSortField.FirstName}
        sortField={sortField}
        sortDirection={sortDirection}
        onSortChange={onSortChange}
      />
      <SortableColumnHeader
        label={memberStrings.columnLastName}
        field={MemberSortField.LastName}
        sortField={sortField}
        sortDirection={sortDirection}
        onSortChange={onSortChange}
      />
      <SortableColumnHeader
        label={memberStrings.columnEmail}
        field={MemberSortField.Email}
        sortField={sortField}
        sortDirection={sortDirection}
        onSortChange={onSortChange}
      />
      <SortableColumnHeader
        label={memberStrings.columnActiveLoans}
        field={MemberSortField.ActiveLoans}
        sortField={sortField}
        sortDirection={sortDirection}
        onSortChange={onSortChange}
      />
      <StaticColumnHeader label={memberStrings.columnActions} />
    </>
  )

  const body = members.map((member) => {
    const canReturn = member.activeLoans > 0

    return (
      <ClickableTableRow
        key={member.id}
        onOpen={() => {
          onRowOpen(member)
        }}
      >
        <Table.Cell fontWeight={UiFontWeight.Medium}>
          {member.firstName}
        </Table.Cell>
        <Table.Cell>{member.lastName}</Table.Cell>
        <Table.Cell>{member.email}</Table.Cell>
        <Table.Cell>{member.activeLoans}</Table.Cell>
        <RowActionsMenu
          ariaLabel={memberStrings.actionsMenuAria}
          items={[
            {
              value: MemberMenuAction.Edit,
              label: memberStrings.editButton,
            },
            {
              value: MemberMenuAction.Return,
              label: memberStrings.returnButton,
              disabled: !canReturn,
            },
            {
              value: MemberMenuAction.Delete,
              label: memberStrings.deleteButton,
              separatorBefore: true,
            },
          ]}
          onSelect={(value) => {
            if (value === MemberMenuAction.Edit) {
              onEdit(member)
              return
            }

            if (value === MemberMenuAction.Return) {
              if (!canReturn) {
                return
              }
              onReturn(member)
              return
            }

            if (value === MemberMenuAction.Delete) {
              onDelete(member)
            }
          }}
        />
      </ClickableTableRow>
    )
  })

  return <ResourceTable header={header} body={body} />
}

import { useMemo, useState } from 'react'
import { Button, Flex, Spinner, Stack, Text } from '@chakra-ui/react'
import { MemberCreateDialog } from '@/members/components/MemberCreateDialog'
import { MemberDeleteDialog } from '@/members/components/MemberDeleteDialog'
import { MemberDetailDrawer } from '@/members/components/MemberDetailDrawer'
import { MemberEditDialog } from '@/members/components/MemberEditDialog'
import { MemberReturnDialog } from '@/members/components/MemberReturnDialog'
import { MembersTable } from '@/members/components/MembersTable'
import {
  MemberActiveLoansFilter,
  type MemberActiveLoansFilter as MemberActiveLoansFilterValue,
} from '@/members/constants/activeLoansFilter'
import {
  MemberSortField,
  type MemberSortField as MemberSortFieldValue,
} from '@/members/constants/sort'
import { MemberDialogKey, memberStrings } from '@/members/constants/strings'
import { useMembersList } from '@/members/hooks/useMembersList'
import type { Member } from '@/members/types/member'
import { filterMembersByActiveLoans } from '@/members/utils/filterMembersByActiveLoans'
import { filterMembersBySearch } from '@/members/utils/filterMembersBySearch'
import { sortMembers } from '@/members/utils/sortMembers'
import { ClearFiltersButton } from '@/shared/components/ClearFiltersButton'
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

export function MembersPage() {
  const [search, setSearch] = useState('')
  const [activeLoansFilter, setActiveLoansFilter] =
    useState<MemberActiveLoansFilterValue>(MemberActiveLoansFilter.All)
  const [sortField, setSortField] = useState<MemberSortFieldValue>(
    MemberSortField.FirstName,
  )
  const [sortDirection, setSortDirection] = useState<UiSortDirectionValue>(
    UiSortDirection.Asc,
  )
  const { members, error, loading, reload } = useMembersList()

  const [createOpen, setCreateOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [returnOpen, setReturnOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [detailOpen, setDetailOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [detailMemberId, setDetailMemberId] = useState<string | null>(null)

  const visibleMembers = useMemo(() => {
    if (!members) {
      return []
    }

    const byLoans = filterMembersByActiveLoans(members, activeLoansFilter)
    const filtered = filterMembersBySearch(byLoans, search)
    return sortMembers(filtered, sortField, sortDirection)
  }, [members, activeLoansFilter, search, sortField, sortDirection])

  async function handleListChanged(successMessage: string) {
    notifySuccess(memberStrings.toastSuccessTitle, successMessage)
    await reload()
  }

  function handleSortChange(field: MemberSortFieldValue) {
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

  const hasActiveFilters =
    search.length > 0 || activeLoansFilter !== MemberActiveLoansFilter.All

  function clearAllFilters() {
    setSearch('')
    setActiveLoansFilter(MemberActiveLoansFilter.All)
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
          wrap={UiFlexWrap.Wrap}
        >
          <SearchField
            label={memberStrings.searchLabel}
            placeholder={memberStrings.searchPlaceholder}
            value={search}
            onChange={setSearch}
          />
          <SelectFilter
            label={memberStrings.filterLabel}
            placeholder={memberStrings.filterAll}
            value={activeLoansFilter}
            emptyValue={MemberActiveLoansFilter.All}
            onChange={setActiveLoansFilter}
            options={[
              {
                value: MemberActiveLoansFilter.Active,
                label: memberStrings.filterActive,
              },
              {
                value: MemberActiveLoansFilter.Inactive,
                label: memberStrings.filterInactive,
              },
            ]}
          />
          <ClearFiltersButton
            disabled={!hasActiveFilters}
            onClick={clearAllFilters}
          />
        </Flex>
        <Button
          colorPalette={UiButtonColorPalette.Brand}
          flexShrink={UiFlexShrink.None}
          onClick={() => {
            setCreateOpen(true)
          }}
        >
          {memberStrings.createButton}
        </Button>
      </Flex>
    </SurfacePanel>
  )

  const dialogs = (
    <>
      <MemberCreateDialog
        open={createOpen}
        onOpenChange={setCreateOpen}
        onCreated={() => handleListChanged(memberStrings.createSuccess)}
      />
      <MemberEditDialog
        key={selectedMember ? selectedMember.id : MemberDialogKey.EditIdle}
        open={editOpen}
        member={selectedMember}
        onOpenChange={setEditOpen}
        onUpdated={() => handleListChanged(memberStrings.updateSuccess)}
      />
      <MemberReturnDialog
        key={
          selectedMember
            ? `${selectedMember.id}${MemberDialogKey.ReturnSuffix}`
            : MemberDialogKey.ReturnIdle
        }
        open={returnOpen}
        member={selectedMember}
        onOpenChange={setReturnOpen}
        onReturned={() => handleListChanged(memberStrings.returnSuccess)}
      />
      <MemberDeleteDialog
        open={deleteOpen}
        member={selectedMember}
        onOpenChange={setDeleteOpen}
        onDeleted={() => handleListChanged(memberStrings.deleteSuccess)}
      />
      <MemberDetailDrawer
        open={detailOpen}
        memberId={detailMemberId}
        onOpenChange={setDetailOpen}
        onMemberChanged={reload}
      />
    </>
  )

  if (loading) {
    return (
      <ResourcePage
        title={memberStrings.title}
        description={memberStrings.description}
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
        title={memberStrings.title}
        description={memberStrings.description}
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

  if (members === null || members.length === 0) {
    return (
      <ResourcePage
        title={memberStrings.title}
        description={memberStrings.description}
      >
        <Stack gap={UiGap.Four}>
          {toolbar}
          <SurfacePanel padding={UiSpace.Five}>
            <Text color={UiColor.Muted}>{memberStrings.empty}</Text>
          </SurfacePanel>
        </Stack>
        {dialogs}
      </ResourcePage>
    )
  }

  if (visibleMembers.length === 0) {
    return (
      <ResourcePage
        title={memberStrings.title}
        description={memberStrings.description}
      >
        <Stack gap={UiGap.Four}>
          {toolbar}
          <SurfacePanel padding={UiSpace.Five}>
            <Text color={UiColor.Muted}>{memberStrings.emptySearch}</Text>
          </SurfacePanel>
        </Stack>
        {dialogs}
      </ResourcePage>
    )
  }

  return (
    <ResourcePage
      title={memberStrings.title}
      description={memberStrings.description}
    >
      <Stack gap={UiGap.Four}>
        {toolbar}
        <MembersTable
          members={visibleMembers}
          sortField={sortField}
          sortDirection={sortDirection}
          onSortChange={handleSortChange}
          onRowOpen={(member) => {
            setDetailMemberId(member.id)
            setDetailOpen(true)
          }}
          onEdit={(member) => {
            setSelectedMember(member)
            setEditOpen(true)
          }}
          onReturn={(member) => {
            setSelectedMember(member)
            setReturnOpen(true)
          }}
          onDelete={(member) => {
            setSelectedMember(member)
            setDeleteOpen(true)
          }}
        />
      </Stack>
      {dialogs}
    </ResourcePage>
  )
}

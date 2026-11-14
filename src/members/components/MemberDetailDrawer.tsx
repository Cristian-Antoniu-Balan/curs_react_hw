import { Text } from '@chakra-ui/react'
import { memberStrings } from '@/members/constants/strings'
import { AppDrawerShell } from '@/shared/components/AppDrawerShell'
import { UiColor } from '@/shared/constants/ui'

type MemberDetailDrawerProps = {
  open: boolean
  memberId: string | null
  onOpenChange: (open: boolean) => void
}

// TODO: Load member by `memberId` and render real member detail content.
export function MemberDetailDrawer({
  open,
  memberId: _memberId,
  onOpenChange,
}: MemberDetailDrawerProps) {
  return (
    <AppDrawerShell
      open={open}
      title={memberStrings.detailDrawerTitle}
      onOpenChange={onOpenChange}
    >
      <Text color={UiColor.Muted}>{memberStrings.detailStub}</Text>
    </AppDrawerShell>
  )
}

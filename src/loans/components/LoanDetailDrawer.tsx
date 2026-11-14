import { Text } from '@chakra-ui/react'
import { loanStrings } from '@/loans/constants/strings'
import { AppDrawerShell } from '@/shared/components/AppDrawerShell'
import { UiColor } from '@/shared/constants/ui'

type LoanDetailDrawerProps = {
  open: boolean
  loanId: string | null
  onOpenChange: (open: boolean) => void
}

// TODO: Load loan by `loanId` and render real loan detail content (incl. return).
export function LoanDetailDrawer({
  open,
  loanId: _loanId,
  onOpenChange,
}: LoanDetailDrawerProps) {
  return (
    <AppDrawerShell
      open={open}
      title={loanStrings.detailDrawerTitle}
      onOpenChange={onOpenChange}
    >
      <Text color={UiColor.Muted}>{loanStrings.detailStub}</Text>
    </AppDrawerShell>
  )
}

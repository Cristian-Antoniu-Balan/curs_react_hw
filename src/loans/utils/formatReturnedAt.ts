import { loanStrings } from '@/loans/constants/strings'
import { formatDateTime } from '@/shared/utils/formatDateTime'

export function formatReturnedAt(
  returnedAt: string | null,
  isActive: boolean,
): string {
  if (isActive || returnedAt === null) {
    return loanStrings.returnedAtActivePlaceholder
  }

  return formatDateTime(returnedAt)
}

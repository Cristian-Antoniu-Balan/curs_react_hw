import { loanStrings } from '@/loans/constants/strings'

export function activeLabel(isActive: boolean): string {
  if (isActive) {
    return loanStrings.statusActive
  }

  return loanStrings.statusReturned
}

import { formatPersonName } from '@/shared/utils/formatPersonName'

export const LoanMemberOptionSeparator = {
  EmailOpen: ' (',
  EmailClose: ')',
} as const

export function formatMemberOptionLabel(member: {
  firstName: string
  lastName: string
  email: string
}): string {
  return [
    formatPersonName(member),
    LoanMemberOptionSeparator.EmailOpen,
    member.email,
    LoanMemberOptionSeparator.EmailClose,
  ].join('')
}

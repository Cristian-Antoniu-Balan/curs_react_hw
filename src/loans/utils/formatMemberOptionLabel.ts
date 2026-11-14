import { formatLoanMemberName } from '@/loans/utils/formatMemberName'

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
    formatLoanMemberName(member),
    LoanMemberOptionSeparator.EmailOpen,
    member.email,
    LoanMemberOptionSeparator.EmailClose,
  ].join('')
}

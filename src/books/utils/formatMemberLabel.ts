import type { Member } from '@/members/types/member'
import { bookStrings } from '@/books/constants/strings'
import { formatDateTime } from '@/shared/utils/formatDateTime'

export const MemberLabelSeparator = {
  Space: ' ',
  EmailOpen: ' (',
  EmailClose: ')',
} as const

export function formatMemberLabel(member: Member): string {
  return [
    member.firstName,
    MemberLabelSeparator.Space,
    member.lastName,
    MemberLabelSeparator.EmailOpen,
    member.email,
    MemberLabelSeparator.EmailClose,
  ].join('')
}

export function formatMemberName(member: Member): string {
  return [member.firstName, MemberLabelSeparator.Space, member.lastName].join('')
}

export function formatLoanOptionLabel(loan: {
  member: Member
  loanedAt: string
}): string {
  return [
    formatMemberLabel(loan.member),
    bookStrings.loanedAtPrefix,
    formatDateTime(loan.loanedAt),
  ].join('')
}

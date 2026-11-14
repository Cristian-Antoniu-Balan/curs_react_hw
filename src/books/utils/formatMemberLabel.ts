import type { Member } from '@/members/types/member'
import { formatPersonName } from '@/shared/utils/formatPersonName'

export const MemberLabelSeparator = {
  EmailOpen: ' (',
  EmailClose: ')',
} as const

export function formatMemberLabel(member: Member): string {
  return [
    formatPersonName(member),
    MemberLabelSeparator.EmailOpen,
    member.email,
    MemberLabelSeparator.EmailClose,
  ].join('')
}

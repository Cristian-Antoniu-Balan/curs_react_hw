import type { Member } from '@/members/types/member'

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
  return [member.firstName, MemberLabelSeparator.Space, member.lastName].join(
    '',
  )
}

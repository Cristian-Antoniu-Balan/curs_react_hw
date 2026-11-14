export const MemberNameSeparator = {
  Space: ' ',
} as const

export function formatMemberName(member: {
  firstName: string
  lastName: string
}): string {
  return [member.firstName, MemberNameSeparator.Space, member.lastName].join('')
}

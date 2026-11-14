export const LoanMemberNameSeparator = {
  Space: ' ',
} as const

export function formatLoanMemberName(member: {
  firstName: string
  lastName: string
}): string {
  return [
    member.firstName,
    LoanMemberNameSeparator.Space,
    member.lastName,
  ].join('')
}

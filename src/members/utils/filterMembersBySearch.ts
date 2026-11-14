import type { Member } from '@/members/types/member'
import { MemberNameSeparator } from '@/members/utils/formatMemberName'

export function filterMembersBySearch(
  members: Member[],
  search: string,
): Member[] {
  const query = search.trim().toLowerCase()
  if (query.length === 0) {
    return members
  }

  return members.filter((member) => {
    const firstNameMatch = member.firstName.toLowerCase().includes(query)
    const lastNameMatch = member.lastName.toLowerCase().includes(query)
    const emailMatch = member.email.toLowerCase().includes(query)
    const fullName = [
      member.firstName,
      MemberNameSeparator.Space,
      member.lastName,
    ]
      .join('')
      .toLowerCase()
    const fullNameMatch = fullName.includes(query)
    return firstNameMatch || lastNameMatch || emailMatch || fullNameMatch
  })
}

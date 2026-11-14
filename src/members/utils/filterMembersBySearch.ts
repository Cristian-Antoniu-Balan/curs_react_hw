import type { Member } from '@/members/types/member'
import { formatPersonName } from '@/shared/utils/formatPersonName'

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
    const fullName = formatPersonName(member).toLowerCase()
    const fullNameMatch = fullName.includes(query)
    return firstNameMatch || lastNameMatch || emailMatch || fullNameMatch
  })
}

import {
  MemberActiveLoansFilter,
  type MemberActiveLoansFilter as MemberActiveLoansFilterValue,
} from '@/members/constants/activeLoansFilter'
import type { Member } from '@/members/types/member'

export function filterMembersByActiveLoans(
  members: Member[],
  filter: MemberActiveLoansFilterValue,
): Member[] {
  if (filter === MemberActiveLoansFilter.Active) {
    return members.filter((member) => member.activeLoans > 0)
  }

  if (filter === MemberActiveLoansFilter.Inactive) {
    return members.filter((member) => member.activeLoans === 0)
  }

  return members
}

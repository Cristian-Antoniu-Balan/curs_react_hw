import {
  MemberSortField,
  type MemberSortField as MemberSortFieldValue,
} from '@/members/constants/sort'
import type { Member } from '@/members/types/member'
import {
  UiSortDirection,
  type UiSortDirection as UiSortDirectionValue,
} from '@/shared/constants/ui'

function compareText(left: string, right: string): number {
  return left.localeCompare(right, undefined, { sensitivity: 'base' })
}

function compareNumber(left: number, right: number): number {
  return left - right
}

export function sortMembers(
  members: Member[],
  field: MemberSortFieldValue,
  direction: UiSortDirectionValue,
): Member[] {
  const sorted = [...members].sort((left, right) => {
    if (field === MemberSortField.FirstName) {
      return compareText(left.firstName, right.firstName)
    }

    if (field === MemberSortField.LastName) {
      return compareText(left.lastName, right.lastName)
    }

    if (field === MemberSortField.Email) {
      return compareText(left.email, right.email)
    }

    if (field === MemberSortField.ActiveLoans) {
      return compareNumber(left.activeLoans, right.activeLoans)
    }

    return 0
  })

  if (direction === UiSortDirection.Desc) {
    sorted.reverse()
  }

  return sorted
}

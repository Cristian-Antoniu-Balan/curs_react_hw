export const MemberActiveLoansFilter = {
  All: 'all',
  Active: 'active',
  Inactive: 'inactive',
} as const

export type MemberActiveLoansFilter =
  (typeof MemberActiveLoansFilter)[keyof typeof MemberActiveLoansFilter]

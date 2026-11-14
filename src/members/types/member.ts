export type Member = {
  id: string
  firstName: string
  lastName: string
  email: string
  activeLoans: number
}

export type MemberRequest = {
  firstName: string
  lastName: string
  email: string
}

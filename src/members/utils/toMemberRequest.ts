import type { MemberRequest } from '@/members/types/member'

export type MemberFormValues = {
  firstName: string
  lastName: string
  email: string
}

export function emptyMemberFormValues(): MemberFormValues {
  return {
    firstName: '',
    lastName: '',
    email: '',
  }
}

export function memberToFormValues(member: {
  firstName: string
  lastName: string
  email: string
}): MemberFormValues {
  return {
    firstName: member.firstName,
    lastName: member.lastName,
    email: member.email,
  }
}

export function toMemberRequest(values: MemberFormValues): MemberRequest {
  return {
    firstName: values.firstName.trim(),
    lastName: values.lastName.trim(),
    email: values.email.trim(),
  }
}

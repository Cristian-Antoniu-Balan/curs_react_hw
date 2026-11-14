import { ApiPath, memberByIdPath } from '@/shared/constants/api'
import { HttpMethod } from '@/shared/constants/http'
import { apiRequest } from '@/shared/api/client'
import type { Member, MemberRequest } from '@/members/types/member'

export function listMembers(): Promise<Member[]> {
  return apiRequest<Member[]>(ApiPath.Members)
}

export function getMember(id: string): Promise<Member> {
  return apiRequest<Member>(memberByIdPath(id))
}

export function createMember(payload: MemberRequest): Promise<Member> {
  return apiRequest<Member>(ApiPath.Members, {
    method: HttpMethod.Post,
    body: payload,
  })
}

export function replaceMember(id: string, payload: MemberRequest): Promise<Member> {
  return apiRequest<Member>(memberByIdPath(id), {
    method: HttpMethod.Put,
    body: payload,
  })
}

export function deleteMember(id: string): Promise<void> {
  return apiRequest<void>(memberByIdPath(id), {
    method: HttpMethod.Delete,
  })
}

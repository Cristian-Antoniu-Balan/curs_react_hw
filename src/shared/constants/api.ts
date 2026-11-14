export const ApiPath = {
  Books: '/books',
  Members: '/members',
  Loans: '/loans',
} as const

export type ApiPath = (typeof ApiPath)[keyof typeof ApiPath]

export const ApiQueryParam = {
  Available: 'available',
  Active: 'active',
} as const

export type ApiQueryParam = (typeof ApiQueryParam)[keyof typeof ApiQueryParam]

export const ApiPathSegment = {
  Return: 'return',
} as const

export type ApiPathSegment = (typeof ApiPathSegment)[keyof typeof ApiPathSegment]

export const BackendOrigin = {
  Local: 'http://localhost:8080',
} as const

export type BackendOrigin = (typeof BackendOrigin)[keyof typeof BackendOrigin]

export const SpaAssetPath = {
  IndexHtml: '/index.html',
} as const

export type SpaAssetPath = (typeof SpaAssetPath)[keyof typeof SpaAssetPath]

export function bookByIdPath(id: string): string {
  return `${ApiPath.Books}/${id}`
}

export function memberByIdPath(id: string): string {
  return `${ApiPath.Members}/${id}`
}

export function loanByIdPath(id: string): string {
  return `${ApiPath.Loans}/${id}`
}

export function loanReturnPath(id: string): string {
  return `${ApiPath.Loans}/${id}/${ApiPathSegment.Return}`
}

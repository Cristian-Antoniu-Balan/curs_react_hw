export const AppRoute = {
  Books: '/books',
  Members: '/members',
  Loans: '/loans',
} as const

export type AppRoute = (typeof AppRoute)[keyof typeof AppRoute]

export const AppRouteSegment = {
  Books: 'books',
  Members: 'members',
  Loans: 'loans',
} as const

export type AppRouteSegment =
  (typeof AppRouteSegment)[keyof typeof AppRouteSegment]

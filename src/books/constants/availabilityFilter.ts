export const BookAvailabilityFilter = {
  All: 'all',
  Available: 'true',
  Unavailable: 'false',
} as const

export type BookAvailabilityFilter =
  (typeof BookAvailabilityFilter)[keyof typeof BookAvailabilityFilter]

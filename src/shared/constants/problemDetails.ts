export const ProblemDetailsField = {
  Title: 'title',
  Detail: 'detail',
  Status: 'status',
} as const

export type ProblemDetailsField =
  (typeof ProblemDetailsField)[keyof typeof ProblemDetailsField]

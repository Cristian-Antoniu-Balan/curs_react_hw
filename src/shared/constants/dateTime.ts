export const DateTimeStyle = {
  Medium: 'medium',
  Short: 'short',
} as const

export type DateTimeStyle = (typeof DateTimeStyle)[keyof typeof DateTimeStyle]

export const dateTimeFormatOptions = {
  dateStyle: DateTimeStyle.Medium,
  timeStyle: DateTimeStyle.Short,
} as const satisfies Intl.DateTimeFormatOptions

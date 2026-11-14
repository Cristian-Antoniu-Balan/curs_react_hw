import { dateTimeFormatOptions } from '@/shared/constants/dateTime'

export function formatDateTime(value: string): string {
  const parsed = new Date(value)

  if (Number.isNaN(parsed.getTime())) {
    return value
  }

  return new Intl.DateTimeFormat(undefined, dateTimeFormatOptions).format(parsed)
}

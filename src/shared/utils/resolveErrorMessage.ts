import { ApiError } from '@/shared/types/apiError'

export function resolveErrorMessage(
  caught: unknown,
  fallback: string,
): string {
  if (caught instanceof ApiError) {
    return caught.message
  }

  if (caught instanceof Error) {
    return caught.message
  }

  return fallback
}

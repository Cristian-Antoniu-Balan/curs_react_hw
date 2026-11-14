import { strings } from '@/shared/constants/strings'

export type ProblemDetails = {
  type?: string
  title?: string
  status?: number
  detail?: string
  instance?: string
  [key: string]: unknown
}

export class ApiError extends Error {
  readonly status: number
  readonly bodyText: string
  readonly problemDetails: ProblemDetails | null

  constructor(
    status: number,
    bodyText: string,
    problemDetails: ProblemDetails | null,
  ) {
    let message = `${strings.api.requestFailedPrefix}${status}`
    const trimmedBody = bodyText.trim()

    if (problemDetails?.detail) {
      message = problemDetails.detail
    } else if (problemDetails?.title) {
      message = problemDetails.title
    } else if (trimmedBody.length > 0) {
      message = trimmedBody
    }

    super(message)
    this.name = strings.error.className
    this.status = status
    this.bodyText = bodyText
    this.problemDetails = problemDetails
  }
}

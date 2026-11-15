import { strings } from '@/shared/constants/strings';
import { MediaType } from '../constants/http';

function isAllowlistedErrorBody(contentType: string | null): boolean {
  if (contentType === null) {
    return false;
  }

  const mediaType = contentType.split(';', 1)[0]?.trim().toLowerCase();
  return mediaType === MediaType.TextPlain;
}

export type ProblemDetails = {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  instance?: string;
  [key: string]: unknown;
};

export class ApiError extends Error {
  readonly status: number;
  readonly bodyText: string;
  readonly problemDetails: ProblemDetails | null;

  constructor(
    status: number,
    bodyText: string,
    problemDetails: ProblemDetails | null,
    contentType: string | null = null,
  ) {
    let message = `${strings.api.requestFailedPrefix}${status}`;
    const trimmedBody = bodyText.trim();

    if (problemDetails?.detail) {
      message = problemDetails.detail;
    } else if (problemDetails?.title) {
      message = problemDetails.title;
    } else if (trimmedBody.length > 0 && isAllowlistedErrorBody(contentType)) {
      message = trimmedBody;
    }

    super(message);
    this.name = strings.error.className;
    this.status = status;
    this.bodyText = bodyText;
    this.problemDetails = problemDetails;
  }
}

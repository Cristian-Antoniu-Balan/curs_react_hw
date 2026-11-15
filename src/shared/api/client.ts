import { HttpHeaderName, MediaType } from '@/shared/constants/http';
import { ProblemDetailsField } from '@/shared/constants/problemDetails';
import { ApiError, type ProblemDetails } from '@/shared/types/apiError';

export type ApiRequestOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
  query?: Record<string, string | number | boolean | null | undefined>;
};

function apiBaseUrl(): string {
  const value = import.meta.env.VITE_API_BASE_URL;
  if (typeof value !== 'string') {
    return '';
  }
  return value.replace(/\/$/, '');
}

function buildUrl(path: string, query?: ApiRequestOptions['query']): string {
  const base = apiBaseUrl();
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const withBase =
    base.length > 0 ? `${base}${normalizedPath}` : normalizedPath;

  if (!query) {
    return withBase;
  }

  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value === null || value === undefined) {
      continue;
    }
    params.set(key, String(value));
  }

  const queryString = params.toString();
  if (queryString.length === 0) {
    return withBase;
  }

  return `${withBase}?${queryString}`;
}

function parseProblemDetails(bodyText: string): ProblemDetails | null {
  if (bodyText.trim().length === 0) {
    return null;
  }

  try {
    const parsed: unknown = JSON.parse(bodyText);
    if (typeof parsed !== 'object' || parsed === null) {
      return null;
    }

    const hasTitle = ProblemDetailsField.Title in parsed;
    const hasDetail = ProblemDetailsField.Detail in parsed;
    const hasStatus = ProblemDetailsField.Status in parsed;
    if (!hasTitle && !hasDetail && !hasStatus) {
      return null;
    }

    return parsed as ProblemDetails;
  } catch {
    return null;
  }
}

export async function apiRequest<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const { body, query, headers, ...rest } = options;
  const url = buildUrl(path, query);

  const requestHeaders = new Headers(headers);
  if (!requestHeaders.has(HttpHeaderName.Accept)) {
    requestHeaders.set(HttpHeaderName.Accept, MediaType.ApplicationJson);
  }
  if (body !== undefined && !requestHeaders.has(HttpHeaderName.ContentType)) {
    requestHeaders.set(HttpHeaderName.ContentType, MediaType.ApplicationJson);
  }

  let requestBody: string | undefined;
  if (body !== undefined) {
    requestBody = JSON.stringify(body);
  }

  const response = await fetch(url, {
    ...rest,
    headers: requestHeaders,
    body: requestBody,
  });

  const bodyText = await response.text();

  if (!response.ok) {
    throw new ApiError(
      response.status,
      bodyText,
      parseProblemDetails(bodyText),
      response.headers.get(HttpHeaderName.ContentType),
    );
  }

  if (bodyText.trim().length === 0) {
    return undefined as T;
  }

  return JSON.parse(bodyText) as T;
}

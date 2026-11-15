export const HttpMethod = {
  Get: 'GET',
  Post: 'POST',
  Put: 'PUT',
  Patch: 'PATCH',
  Delete: 'DELETE',
} as const;

export type HttpMethod = (typeof HttpMethod)[keyof typeof HttpMethod];

export const HttpHeaderName = {
  Accept: 'Accept',
  ContentType: 'Content-Type',
} as const;

export type HttpHeaderName =
  (typeof HttpHeaderName)[keyof typeof HttpHeaderName];

export const MediaType = {
  ApplicationJson: 'application/json',
  TextHtml: 'text/html',
  TextPlain: 'text/plain',
} as const;

export type MediaType = (typeof MediaType)[keyof typeof MediaType];

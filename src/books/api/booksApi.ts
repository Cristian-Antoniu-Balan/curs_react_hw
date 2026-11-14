import {
  ApiPath,
  ApiQueryParam,
  bookByIdPath,
} from '@/shared/constants/api'
import { HttpMethod } from '@/shared/constants/http'
import { apiRequest } from '@/shared/api/client'
import type { Book, BookRequest, BookUpdateRequest } from '@/books/types/book'

export function listBooks(available?: boolean): Promise<Book[]> {
  if (available === undefined) {
    return apiRequest<Book[]>(ApiPath.Books)
  }

  return apiRequest<Book[]>(ApiPath.Books, {
    query: { [ApiQueryParam.Available]: available },
  })
}

export function getBook(id: string): Promise<Book> {
  return apiRequest<Book>(bookByIdPath(id))
}

export function createBook(payload: BookRequest): Promise<Book> {
  return apiRequest<Book>(ApiPath.Books, {
    method: HttpMethod.Post,
    body: payload,
  })
}

export function replaceBook(id: string, payload: BookRequest): Promise<Book> {
  return apiRequest<Book>(bookByIdPath(id), {
    method: HttpMethod.Put,
    body: payload,
  })
}

export function patchBook(id: string, payload: BookUpdateRequest): Promise<Book> {
  return apiRequest<Book>(bookByIdPath(id), {
    method: HttpMethod.Patch,
    body: payload,
  })
}

export function deleteBook(id: string): Promise<void> {
  return apiRequest<void>(bookByIdPath(id), {
    method: HttpMethod.Delete,
  })
}

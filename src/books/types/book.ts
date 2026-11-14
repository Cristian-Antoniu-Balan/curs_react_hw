export type Book = {
  id: string
  title: string
  author: string
  copies: number
  loanedCopies: number
  isAvailable: boolean
}

export type BookRequest = {
  title: string
  author: string
  copies: number
}

export type BookUpdateRequest = {
  title?: string
  author?: string
  copies?: number
}

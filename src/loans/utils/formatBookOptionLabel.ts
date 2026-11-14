export const LoanBookOptionSeparator = {
  AuthorOpen: ' — ',
} as const

export function formatBookOptionLabel(book: {
  title: string
  author: string
}): string {
  return [book.title, LoanBookOptionSeparator.AuthorOpen, book.author].join('')
}

export const strings = {
  app: {
    title: 'Library',
  },
  nav: {
    books: 'Books',
    members: 'Members',
    loans: 'Loans',
  },
  books: {
    title: 'Books',
    empty: 'No books found.',
    loadFailed: 'Failed to load books',
    titleAuthorSeparator: ' — ',
    copiesOpen: ' (',
    copiesLabel: ' copies',
    availabilityPrefix: ', ',
    available: 'available',
    unavailable: 'unavailable',
    copiesClose: ')',
  },
  members: {
    title: 'Members',
    placeholder: 'Members UI will be added next.',
  },
  loans: {
    title: 'Loans',
    placeholder: 'Loans UI will be added next.',
  },
  api: {
    requestFailedPrefix: 'Request failed with status ',
  },
  error: {
    className: 'ApiError',
  },
} as const

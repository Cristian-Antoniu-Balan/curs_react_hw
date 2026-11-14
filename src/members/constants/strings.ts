export const memberStrings = {
  title: 'Members',
  description: 'Manage library members and contact details.',
  empty: 'No members found.',
  emptySearch: 'No members match your search.',
  loadFailed: 'Failed to load members',
  detailLoadFailed: 'Failed to load member',
  createFailed: 'Failed to create member',
  updateFailed: 'Failed to update member',
  deleteFailed: 'Failed to delete member',
  createSuccess: 'Member created.',
  updateSuccess: 'Member updated.',
  deleteSuccess: 'Member deleted.',
  searchLabel: 'Search',
  searchPlaceholder: 'Search name or email',
  actionsMenuAria: 'Member actions',
  createButton: 'Add member',
  editButton: 'Edit',
  deleteButton: 'Delete',
  saveButton: 'Save',
  cancelButton: 'Cancel',
  confirmDeleteButton: 'Delete member',
  createDialogTitle: 'Add member',
  editDialogTitle: 'Edit member',
  deleteDialogTitle: 'Delete member',
  detailDrawerTitle: 'Member detail',
  detailActiveLoans: 'Active loans',
  detailLoansLoadFailed: 'Failed to load active loans',
  detailLoanedAtPrefix: 'Loaned at: ',
  detailLoanCardAria: 'Open loan detail',
  deleteConfirmPrefix: 'Delete "',
  deleteConfirmSuffix: '"? This cannot be undone.',
  fieldFirstName: 'First name',
  fieldLastName: 'Last name',
  fieldEmail: 'Email',
  fieldId: 'ID',
  columnFirstName: 'First name',
  columnLastName: 'Last name',
  columnEmail: 'Email',
  columnActions: 'Actions',
  toastSuccessTitle: 'Success',
} as const

export type MemberStrings = typeof memberStrings

export const MemberDialogKey = {
  EditIdle: 'member-edit-idle',
} as const

export type MemberDialogKey =
  (typeof MemberDialogKey)[keyof typeof MemberDialogKey]

export const PersonNameSeparator = {
  Space: ' ',
} as const

export function formatPersonName(person: {
  firstName: string
  lastName: string
}): string {
  return [person.firstName, PersonNameSeparator.Space, person.lastName].join('')
}

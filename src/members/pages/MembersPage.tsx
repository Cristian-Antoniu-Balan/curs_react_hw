import { Text } from '@chakra-ui/react'
import { ResourcePage } from '@/shared/components/ResourcePage'
import { strings } from '@/shared/constants/strings'
import { UiColor } from '@/shared/constants/ui'

export function MembersPage() {
  return (
    <ResourcePage title={strings.members.title}>
      <Text color={UiColor.Muted}>{strings.members.placeholder}</Text>
    </ResourcePage>
  )
}

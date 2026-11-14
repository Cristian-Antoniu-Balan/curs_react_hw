import { Text } from '@chakra-ui/react'
import { ResourcePage } from '@/shared/components/ResourcePage'
import { SurfacePanel } from '@/shared/components/SurfacePanel'
import { strings } from '@/shared/constants/strings'
import { UiColor, UiSpace } from '@/shared/constants/ui'

export function MembersPage() {
  return (
    <ResourcePage
      title={strings.members.title}
      description={strings.members.description}
    >
      <SurfacePanel padding={UiSpace.Five}>
        <Text color={UiColor.Muted}>{strings.members.placeholder}</Text>
      </SurfacePanel>
    </ResourcePage>
  )
}

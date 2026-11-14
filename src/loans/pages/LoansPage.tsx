import { Text } from '@chakra-ui/react'
import { ResourcePage } from '@/shared/components/ResourcePage'
import { SurfacePanel } from '@/shared/components/SurfacePanel'
import { strings } from '@/shared/constants/strings'
import { UiColor, UiSpace } from '@/shared/constants/ui'

export function LoansPage() {
  return (
    <ResourcePage
      title={strings.loans.title}
      description={strings.loans.description}
    >
      <SurfacePanel padding={UiSpace.Five}>
        <Text color={UiColor.Muted}>{strings.loans.placeholder}</Text>
      </SurfacePanel>
    </ResourcePage>
  )
}

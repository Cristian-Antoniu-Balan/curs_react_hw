import { Text } from '@chakra-ui/react'
import { ResourcePage } from '@/shared/components/ResourcePage'
import { strings } from '@/shared/constants/strings'
import { UiColor } from '@/shared/constants/ui'

export function LoansPage() {
  return (
    <ResourcePage title={strings.loans.title}>
      <Text color={UiColor.Muted}>{strings.loans.placeholder}</Text>
    </ResourcePage>
  )
}

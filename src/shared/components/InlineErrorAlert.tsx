import { Alert } from '@chakra-ui/react'
import { UiAlertStatus } from '@/shared/constants/ui'

type InlineErrorAlertProps = {
  message: string | null
}

export function InlineErrorAlert({ message }: InlineErrorAlertProps) {
  if (!message) {
    return null
  }

  return (
    <Alert.Root status={UiAlertStatus.Error}>
      <Alert.Indicator />
      <Alert.Content>
        <Alert.Description>{message}</Alert.Description>
      </Alert.Content>
    </Alert.Root>
  )
}

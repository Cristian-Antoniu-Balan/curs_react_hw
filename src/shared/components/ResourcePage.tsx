import type { ReactNode } from 'react'
import { Heading, Stack } from '@chakra-ui/react'
import { UiGap, UiHeadingSize, UiStackAlign } from '@/shared/constants/ui'

type ResourcePageProps = {
  title: string
  children: ReactNode
}

export function ResourcePage({ title, children }: ResourcePageProps) {
  return (
    <Stack gap={UiGap.Four} align={UiStackAlign.Stretch}>
      <Heading size={UiHeadingSize.Xl}>{title}</Heading>
      {children}
    </Stack>
  )
}

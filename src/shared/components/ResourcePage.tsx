import type { ReactNode } from 'react'
import { Heading, Stack, Text } from '@chakra-ui/react'
import { SurfacePanel } from '@/shared/components/SurfacePanel'
import {
  UiColor,
  UiFontSize,
  UiFontWeight,
  UiGap,
  UiHeadingSize,
  UiLetterSpacing,
  UiSpace,
  UiStackAlign,
} from '@/shared/constants/ui'

type ResourcePageProps = {
  title: string
  description?: string
  children: ReactNode
}

export function ResourcePage({
  title,
  description,
  children,
}: ResourcePageProps) {
  let descriptionNode = null
  if (description) {
    descriptionNode = (
      <Text color={UiColor.Muted} fontSize={UiFontSize.Md}>
        {description}
      </Text>
    )
  }

  return (
    <Stack gap={UiGap.Four} align={UiStackAlign.Stretch}>
      <SurfacePanel padding={UiSpace.Five}>
        <Stack gap={UiGap.One}>
          <Heading
            size={UiHeadingSize.TwoXl}
            letterSpacing={UiLetterSpacing.Tight}
            fontWeight={UiFontWeight.Bold}
          >
            {title}
          </Heading>
          {descriptionNode}
        </Stack>
      </SurfacePanel>
      {children}
    </Stack>
  )
}

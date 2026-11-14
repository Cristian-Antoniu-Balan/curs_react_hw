import type { ReactNode } from 'react'
import { Box, Text } from '@chakra-ui/react'
import {
  UiBorderColor,
  UiBorderWidth,
  UiColor,
  UiFontSize,
  UiFontWeight,
  UiLetterSpacing,
  UiSpace,
  UiTextTransform,
} from '@/shared/constants/ui'

type SummaryRowProps = {
  label: ReactNode
  value: ReactNode
}

export function SummaryRow({ label, value }: SummaryRowProps) {
  return (
    <Box
      py={UiSpace.Three}
      borderBottomWidth={UiBorderWidth.OnePx}
      borderColor={UiBorderColor.Panel}
      _last={{ borderBottomWidth: UiBorderWidth.None }}
    >
      <Text
        fontSize={UiFontSize.Xs}
        color={UiColor.Muted}
        textTransform={UiTextTransform.Uppercase}
        letterSpacing={UiLetterSpacing.Wide}
        fontWeight={UiFontWeight.Semibold}
        mb={UiSpace.One}
      >
        {label}
      </Text>
      <Text fontSize={UiFontSize.Md} fontWeight={UiFontWeight.Medium}>
        {value}
      </Text>
    </Box>
  )
}

import type { ReactNode } from 'react'
import { Box, Text } from '@chakra-ui/react'
import {
  UiBorderColor,
  UiBorderWidth,
  UiColor,
  UiCursor,
  UiFontSize,
  UiFontWeight,
  UiGap,
  UiLetterSpacing,
  UiSpace,
  UiTextDecoration,
  UiTextTransform,
} from '@/shared/constants/ui'

type DetailRowProps = {
  label: ReactNode
  value: ReactNode
}

export function DetailRow({ label, value }: DetailRowProps) {
  return (
    <Box
      py={UiSpace.Three}
      borderBottomWidth={UiBorderWidth.OnePx}
      borderColor={UiBorderColor.Panel}
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

type LinkDetailRowProps = {
  label: ReactNode
  value: ReactNode
  ariaLabel: string
  onOpen: () => void
}

export function LinkDetailRow({
  label,
  value,
  ariaLabel,
  onOpen,
}: LinkDetailRowProps) {
  return (
    <Box
      py={UiSpace.Three}
      borderBottomWidth={UiBorderWidth.OnePx}
      borderColor={UiBorderColor.Panel}
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
      <Box
        as="button"
        fontSize={UiFontSize.Md}
        fontWeight={UiFontWeight.Medium}
        color={UiColor.BrandFg}
        textDecoration={UiTextDecoration.None}
        cursor={UiCursor.Pointer}
        bg={UiColor.Transparent}
        p={UiGap.None}
        borderWidth={UiBorderWidth.None}
        _hover={{ textDecoration: UiTextDecoration.Underline }}
        aria-label={ariaLabel}
        onClick={onOpen}
      >
        {value}
      </Box>
    </Box>
  )
}

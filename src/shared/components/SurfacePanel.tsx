import type { ReactNode } from 'react'
import { Box } from '@chakra-ui/react'
import {
  UiBackdropFilter,
  UiBgToken,
  UiBorderColor,
  UiBorderWidth,
  UiOverflow,
  UiRadius,
  UiShadow,
  UiSpace,
} from '@/shared/constants/ui'

type SurfacePanelProps = {
  children: ReactNode
  padding?: UiSpace
}

export function SurfacePanel({
  children,
  padding = UiSpace.One,
}: SurfacePanelProps) {
  return (
    <Box
      bg={UiBgToken.AppPanelGlass}
      backdropFilter={UiBackdropFilter.Panel}
      borderWidth={UiBorderWidth.OnePx}
      borderColor={UiBorderColor.Panel}
      borderRadius={UiRadius.Panel}
      boxShadow={UiShadow.Panel}
      overflow={UiOverflow.Hidden}
      p={padding}
    >
      {children}
    </Box>
  )
}

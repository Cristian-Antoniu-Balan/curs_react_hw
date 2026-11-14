import type { ReactNode } from 'react'
import { Box, Button, Drawer, Portal } from '@chakra-ui/react'
import { LuArrowLeft } from 'react-icons/lu'
import { strings } from '@/shared/constants/strings'
import {
  UiBgToken,
  UiBorderColor,
  UiBorderWidth,
  UiButtonSize,
  UiButtonVariant,
  UiColor,
  UiDisplay,
  UiDrawerPlacement,
  UiDrawerSize,
  UiFlexDirection,
  UiFlexGrow,
  UiFlexJustify,
  UiFlexShrink,
  UiFontWeight,
  UiHeight,
  UiInset,
  UiLetterSpacing,
  UiMinHeight,
  UiOverflow,
  UiPosition,
  UiShadow,
  UiSpace,
  UiWidth,
} from '@/shared/constants/ui'

type AppDrawerShellProps = {
  open: boolean
  title: string
  onOpenChange: (open: boolean) => void
  children: ReactNode
}

export function AppDrawerShell({
  open,
  title,
  onOpenChange,
  children,
}: AppDrawerShellProps) {
  return (
    <Drawer.Root
      open={open}
      placement={UiDrawerPlacement.End}
      size={UiDrawerSize.Md}
      onOpenChange={(details) => {
        onOpenChange(details.open)
      }}
    >
      <Portal>
        <Drawer.Backdrop bg={UiBgToken.Overlay} />
        <Drawer.Positioner>
          <Drawer.Content
            display={UiDisplay.Flex}
            flexDirection={UiFlexDirection.Column}
            h={UiHeight.Full}
            maxH={UiHeight.Full}
            bg={UiBgToken.AppPanel}
            borderLeftWidth={UiBorderWidth.OnePx}
            borderColor={UiBorderColor.Panel}
            boxShadow={UiShadow.Overlay}
            overflow={UiOverflow.Hidden}
          >
            <Box
              position={UiPosition.Absolute}
              left={UiInset.Zero}
              top={UiInset.Zero}
              bottom={UiInset.Zero}
              w={UiWidth.AccentBar}
              bg={UiColor.BrandSolid}
            />
            <Drawer.Header
              flexShrink={UiFlexShrink.None}
              px={UiSpace.Six}
              pt={UiSpace.Five}
              pb={UiSpace.Three}
              borderBottomWidth={UiBorderWidth.OnePx}
              borderColor={UiBorderColor.Panel}
            >
              <Drawer.Title
                fontWeight={UiFontWeight.Bold}
                letterSpacing={UiLetterSpacing.Tight}
              >
                {title}
              </Drawer.Title>
            </Drawer.Header>
            <Drawer.Body
              flex={UiFlexGrow.One}
              minH={UiMinHeight.Zero}
              overflowY={UiOverflow.Auto}
              px={UiSpace.Six}
              py={UiSpace.Five}
            >
              {children}
            </Drawer.Body>
            <Drawer.Footer
              flexShrink={UiFlexShrink.None}
              px={UiSpace.Six}
              pt={UiSpace.Three}
              pb={UiSpace.Five}
              borderTopWidth={UiBorderWidth.OnePx}
              borderColor={UiBorderColor.Panel}
              justifyContent={UiFlexJustify.Start}
            >
              <Button
                size={UiButtonSize.Sm}
                variant={UiButtonVariant.Outline}
                aria-label={strings.drawer.backAria}
                onClick={() => {
                  onOpenChange(false)
                }}
              >
                <LuArrowLeft />
                {strings.drawer.back}
              </Button>
            </Drawer.Footer>
          </Drawer.Content>
        </Drawer.Positioner>
      </Portal>
    </Drawer.Root>
  )
}

import type { ReactNode } from 'react'
import { Dialog, Portal } from '@chakra-ui/react'
import {
  UiBgToken,
  UiBorderColor,
  UiBorderWidth,
  UiDialogPlacement,
  UiDialogSize,
  UiOverflow,
  UiRadius,
  UiShadow,
  UiSpace,
} from '@/shared/constants/ui'

type AppDialogShellProps = {
  open: boolean
  title: string
  onOpenChange: (open: boolean) => void
  body: ReactNode
  footer: ReactNode
}

export function AppDialogShell({
  open,
  title,
  onOpenChange,
  body,
  footer,
}: AppDialogShellProps) {
  return (
    <Dialog.Root
      open={open}
      placement={UiDialogPlacement.Center}
      size={UiDialogSize.Md}
      onOpenChange={(details) => {
        onOpenChange(details.open)
      }}
    >
      <Portal>
        <Dialog.Backdrop bg={UiBgToken.Overlay} />
        <Dialog.Positioner>
          <Dialog.Content
            bg={UiBgToken.AppPanel}
            borderWidth={UiBorderWidth.OnePx}
            borderColor={UiBorderColor.Panel}
            borderRadius={UiRadius.Panel}
            boxShadow={UiShadow.Overlay}
            overflow={UiOverflow.Hidden}
          >
            <Dialog.Header
              px={UiSpace.Six}
              pt={UiSpace.Five}
              pb={UiSpace.Three}
              borderBottomWidth={UiBorderWidth.OnePx}
              borderColor={UiBorderColor.Panel}
            >
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body px={UiSpace.Six} py={UiSpace.Five}>
              {body}
            </Dialog.Body>
            <Dialog.Footer
              px={UiSpace.Six}
              pt={UiSpace.Three}
              pb={UiSpace.Five}
              borderTopWidth={UiBorderWidth.OnePx}
              borderColor={UiBorderColor.Panel}
              gap={UiSpace.Three}
            >
              {footer}
            </Dialog.Footer>
            <Dialog.CloseTrigger />
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}

'use client'

import {
  Toaster as ChakraToaster,
  Portal,
  Spinner,
  Stack,
  Toast,
} from '@chakra-ui/react'
import { toaster } from '@/components/ui/toaster-instance'
import {
  ToastSpinnerSize,
  ToastType,
  UiFlexGrow,
  UiGap,
  UiWidth,
} from '@/shared/constants/ui'

export function Toaster() {
  return (
    <Portal>
      <ChakraToaster toaster={toaster} insetInline={{ mdDown: UiGap.Four }}>
        {(toast) => {
          let indicator = <Toast.Indicator />
          if (toast.type === ToastType.Loading) {
            indicator = <Spinner size={ToastSpinnerSize.Sm} />
          }

          let title = null
          if (toast.title) {
            title = <Toast.Title>{toast.title}</Toast.Title>
          }

          let description = null
          if (toast.description) {
            description = (
              <Toast.Description>{toast.description}</Toast.Description>
            )
          }

          let actionTrigger = null
          if (toast.action) {
            actionTrigger = (
              <Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
            )
          }

          let closeTrigger = null
          if (toast.closable) {
            closeTrigger = <Toast.CloseTrigger />
          }

          return (
            <Toast.Root width={{ md: UiWidth.ToastSm }}>
              {indicator}
              <Stack gap={UiGap.One} flex={UiFlexGrow.One} maxWidth={UiWidth.Full}>
                {title}
                {description}
              </Stack>
              {actionTrigger}
              {closeTrigger}
            </Toast.Root>
          )
        }}
      </ChakraToaster>
    </Portal>
  )
}

import { createToaster } from '@chakra-ui/react'
import { ToastPlacement } from '@/shared/constants/ui'

export const toaster = createToaster({
  placement: ToastPlacement.TopEnd,
  pauseOnPageIdle: true,
})

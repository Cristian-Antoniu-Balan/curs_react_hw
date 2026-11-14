import { toaster } from '@/components/ui/toaster-instance'
import { ToastType } from '@/shared/constants/ui'

export function notifySuccess(title: string, description?: string): void {
  toaster.create({
    type: ToastType.Success,
    title,
    description,
    closable: true,
  })
}

export function notifyError(title: string, description?: string): void {
  toaster.create({
    type: ToastType.Error,
    title,
    description,
    closable: true,
  })
}

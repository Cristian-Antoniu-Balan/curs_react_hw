import { useState } from 'react'
import { Alert, Button, Stack, Text } from '@chakra-ui/react'
import { deleteMember } from '@/members/api/membersApi'
import { memberStrings } from '@/members/constants/strings'
import type { Member } from '@/members/types/member'
import { formatMemberName } from '@/members/utils/formatMemberName'
import { resolveErrorMessage } from '@/members/utils/resolveErrorMessage'
import { AppDialogShell } from '@/shared/components/AppDialogShell'
import {
  UiAlertStatus,
  UiButtonColorPalette,
  UiButtonVariant,
  UiGap,
} from '@/shared/constants/ui'

type MemberDeleteDialogProps = {
  open: boolean
  member: Member | null
  onOpenChange: (open: boolean) => void
  onDeleted: () => Promise<void> | void
}

export function MemberDeleteDialog({
  open,
  member,
  onOpenChange,
  onDeleted,
}: MemberDeleteDialogProps) {
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  function resetLocalState() {
    setError(null)
    setSubmitting(false)
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      resetLocalState()
    }
    onOpenChange(nextOpen)
  }

  async function handleDelete() {
    if (!member) {
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      await deleteMember(member.id)
      handleOpenChange(false)
      await onDeleted()
    } catch (caught) {
      setError(resolveErrorMessage(caught, memberStrings.deleteFailed))
    } finally {
      setSubmitting(false)
    }
  }

  let confirmText = null
  if (member) {
    confirmText = (
      <Text>
        {memberStrings.deleteConfirmPrefix}
        {formatMemberName(member)}
        {memberStrings.deleteConfirmSuffix}
      </Text>
    )
  }

  let errorAlert = null
  if (error) {
    errorAlert = (
      <Alert.Root status={UiAlertStatus.Error}>
        <Alert.Indicator />
        <Alert.Content>
          <Alert.Description>{error}</Alert.Description>
        </Alert.Content>
      </Alert.Root>
    )
  }

  return (
    <AppDialogShell
      open={open}
      title={memberStrings.deleteDialogTitle}
      onOpenChange={handleOpenChange}
      body={
        <Stack gap={UiGap.Three}>
          {errorAlert}
          {confirmText}
        </Stack>
      }
      footer={
        <>
          <Button
            variant={UiButtonVariant.Outline}
            disabled={submitting}
            onClick={() => {
              handleOpenChange(false)
            }}
          >
            {memberStrings.cancelButton}
          </Button>
          <Button
            colorPalette={UiButtonColorPalette.Red}
            loading={submitting}
            onClick={() => {
              void handleDelete()
            }}
          >
            {memberStrings.confirmDeleteButton}
          </Button>
        </>
      }
    />
  )
}

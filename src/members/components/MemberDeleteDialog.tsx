import { useState } from 'react'
import { Button, Stack, Text } from '@chakra-ui/react'
import { deleteMember } from '@/members/api/membersApi'
import { memberStrings } from '@/members/constants/strings'
import type { Member } from '@/members/types/member'
import { formatPersonName } from '@/shared/utils/formatPersonName'
import { resolveErrorMessage } from '@/shared/utils/resolveErrorMessage'
import { AppDialogShell } from '@/shared/components/AppDialogShell'
import { InlineErrorAlert } from '@/shared/components/InlineErrorAlert'
import {
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
        {formatPersonName(member)}
        {memberStrings.deleteConfirmSuffix}
      </Text>
    )
  }

  return (
    <AppDialogShell
      open={open}
      title={memberStrings.deleteDialogTitle}
      onOpenChange={handleOpenChange}
      body={
        <Stack gap={UiGap.Three}>
          <InlineErrorAlert message={error} />
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

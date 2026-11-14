import { useState } from 'react'
import { Button, Stack } from '@chakra-ui/react'
import { createMember } from '@/members/api/membersApi'
import { MemberFormFields } from '@/members/components/MemberFormFields'
import { memberStrings } from '@/members/constants/strings'
import { resolveErrorMessage } from '@/shared/utils/resolveErrorMessage'
import {
  emptyMemberFormValues,
  toMemberRequest,
  type MemberFormValues,
} from '@/members/utils/toMemberRequest'
import { AppDialogShell } from '@/shared/components/AppDialogShell'
import { InlineErrorAlert } from '@/shared/components/InlineErrorAlert'
import {
  UiButtonColorPalette,
  UiButtonVariant,
  UiGap,
} from '@/shared/constants/ui'

type MemberCreateDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreated: () => Promise<void> | void
}

export function MemberCreateDialog({
  open,
  onOpenChange,
  onCreated,
}: MemberCreateDialogProps) {
  const [values, setValues] = useState<MemberFormValues>(emptyMemberFormValues)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  function resetLocalState() {
    setError(null)
    setValues(emptyMemberFormValues())
    setSubmitting(false)
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      resetLocalState()
    }
    onOpenChange(nextOpen)
  }

  async function handleSubmit() {
    setSubmitting(true)
    setError(null)

    try {
      await createMember(toMemberRequest(values))
      handleOpenChange(false)
      await onCreated()
    } catch (caught) {
      setError(resolveErrorMessage(caught, memberStrings.createFailed))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AppDialogShell
      open={open}
      title={memberStrings.createDialogTitle}
      onOpenChange={handleOpenChange}
      body={
        <Stack gap={UiGap.Three}>
          <InlineErrorAlert message={error} />
          <MemberFormFields
            values={values}
            onChange={setValues}
            disabled={submitting}
          />
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
            colorPalette={UiButtonColorPalette.Brand}
            loading={submitting}
            onClick={() => {
              void handleSubmit()
            }}
          >
            {memberStrings.saveButton}
          </Button>
        </>
      }
    />
  )
}

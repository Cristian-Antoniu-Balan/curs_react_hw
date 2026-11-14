import { useState } from 'react'
import { Alert, Button, Stack } from '@chakra-ui/react'
import { createMember } from '@/members/api/membersApi'
import { MemberFormFields } from '@/members/components/MemberFormFields'
import { memberStrings } from '@/members/constants/strings'
import { resolveErrorMessage } from '@/members/utils/resolveErrorMessage'
import {
  emptyMemberFormValues,
  toMemberRequest,
  type MemberFormValues,
} from '@/members/utils/toMemberRequest'
import { AppDialogShell } from '@/shared/components/AppDialogShell'
import {
  UiAlertStatus,
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
      title={memberStrings.createDialogTitle}
      onOpenChange={handleOpenChange}
      body={
        <Stack gap={UiGap.Three}>
          {errorAlert}
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

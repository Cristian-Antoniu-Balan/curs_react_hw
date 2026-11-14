import { useState } from 'react'
import { Alert, Button, Stack } from '@chakra-ui/react'
import { replaceMember } from '@/members/api/membersApi'
import { MemberFormFields } from '@/members/components/MemberFormFields'
import { memberStrings } from '@/members/constants/strings'
import type { Member } from '@/members/types/member'
import { resolveErrorMessage } from '@/members/utils/resolveErrorMessage'
import {
  emptyMemberFormValues,
  memberToFormValues,
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

type MemberEditDialogProps = {
  open: boolean
  member: Member | null
  onOpenChange: (open: boolean) => void
  onUpdated: () => Promise<void> | void
}

function initialValues(member: Member | null): MemberFormValues {
  if (!member) {
    return emptyMemberFormValues()
  }

  return memberToFormValues(member)
}

export function MemberEditDialog({
  open,
  member,
  onOpenChange,
  onUpdated,
}: MemberEditDialogProps) {
  const [values, setValues] = useState<MemberFormValues>(() =>
    initialValues(member),
  )
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  function resetLocalState() {
    setError(null)
    setValues(initialValues(member))
    setSubmitting(false)
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      resetLocalState()
    }
    onOpenChange(nextOpen)
  }

  async function handleSubmit() {
    if (!member) {
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      await replaceMember(member.id, toMemberRequest(values))
      handleOpenChange(false)
      await onUpdated()
    } catch (caught) {
      setError(resolveErrorMessage(caught, memberStrings.updateFailed))
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
      title={memberStrings.editDialogTitle}
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

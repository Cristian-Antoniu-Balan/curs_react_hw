import { Field, Input, Stack } from '@chakra-ui/react'
import { memberStrings } from '@/members/constants/strings'
import type { MemberFormValues } from '@/members/utils/toMemberRequest'
import { UiGap, UiInputType, UiWidth } from '@/shared/constants/ui'

type MemberFormFieldsProps = {
  values: MemberFormValues
  onChange: (values: MemberFormValues) => void
  disabled?: boolean
}

export function MemberFormFields({
  values,
  onChange,
  disabled = false,
}: MemberFormFieldsProps) {
  return (
    <Stack gap={UiGap.Three}>
      <Field.Root>
        <Field.Label>{memberStrings.fieldFirstName}</Field.Label>
        <Input
          type={UiInputType.Text}
          value={values.firstName}
          disabled={disabled}
          w={UiWidth.Full}
          onChange={(event) => {
            onChange({
              ...values,
              firstName: event.target.value,
            })
          }}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{memberStrings.fieldLastName}</Field.Label>
        <Input
          type={UiInputType.Text}
          value={values.lastName}
          disabled={disabled}
          w={UiWidth.Full}
          onChange={(event) => {
            onChange({
              ...values,
              lastName: event.target.value,
            })
          }}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{memberStrings.fieldEmail}</Field.Label>
        <Input
          type={UiInputType.Email}
          value={values.email}
          disabled={disabled}
          w={UiWidth.Full}
          onChange={(event) => {
            onChange({
              ...values,
              email: event.target.value,
            })
          }}
        />
      </Field.Root>
    </Stack>
  )
}

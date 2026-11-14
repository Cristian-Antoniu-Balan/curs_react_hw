import { Field, Input, Stack } from '@chakra-ui/react'
import { bookStrings } from '@/books/constants/strings'
import type { BookFormValues } from '@/books/utils/toBookRequest'
import {
  UiGap,
  UiInputType,
  UiMinCopies,
  UiWidth,
} from '@/shared/constants/ui'

type BookFormFieldsProps = {
  values: BookFormValues
  onChange: (values: BookFormValues) => void
  disabled?: boolean
  copiesOnly?: boolean
}

export function BookFormFields({
  values,
  onChange,
  disabled = false,
  copiesOnly = false,
}: BookFormFieldsProps) {
  if (copiesOnly) {
    return (
      <Field.Root>
        <Field.Label>{bookStrings.fieldCopies}</Field.Label>
        <Input
          type={UiInputType.Number}
          min={UiMinCopies.One}
          value={values.copies}
          disabled={disabled}
          w={UiWidth.Full}
          onChange={(event) => {
            onChange({
              ...values,
              copies: event.target.value,
            })
          }}
        />
      </Field.Root>
    )
  }

  return (
    <Stack gap={UiGap.Three}>
      <Field.Root>
        <Field.Label>{bookStrings.fieldTitle}</Field.Label>
        <Input
          type={UiInputType.Text}
          value={values.title}
          disabled={disabled}
          w={UiWidth.Full}
          onChange={(event) => {
            onChange({
              ...values,
              title: event.target.value,
            })
          }}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{bookStrings.fieldAuthor}</Field.Label>
        <Input
          type={UiInputType.Text}
          value={values.author}
          disabled={disabled}
          w={UiWidth.Full}
          onChange={(event) => {
            onChange({
              ...values,
              author: event.target.value,
            })
          }}
        />
      </Field.Root>
      <Field.Root>
        <Field.Label>{bookStrings.fieldCopies}</Field.Label>
        <Input
          type={UiInputType.Number}
          min={UiMinCopies.One}
          value={values.copies}
          disabled={disabled}
          w={UiWidth.Full}
          onChange={(event) => {
            onChange({
              ...values,
              copies: event.target.value,
            })
          }}
        />
      </Field.Root>
    </Stack>
  )
}

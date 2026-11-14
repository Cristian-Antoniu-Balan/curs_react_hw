import { Field, Input } from '@chakra-ui/react'
import { memberStrings } from '@/members/constants/strings'
import {
  UiFieldOrientation,
  UiInputType,
  UiWidth,
} from '@/shared/constants/ui'

type MembersSearchFieldProps = {
  value: string
  onChange: (value: string) => void
}

export function MembersSearchField({
  value,
  onChange,
}: MembersSearchFieldProps) {
  return (
    <Field.Root
      orientation={UiFieldOrientation.Vertical}
      maxW={UiWidth.SearchMd}
      w={UiWidth.Full}
    >
      <Field.Label>{memberStrings.searchLabel}</Field.Label>
      <Input
        type={UiInputType.Text}
        value={value}
        placeholder={memberStrings.searchPlaceholder}
        w={UiWidth.Full}
        onChange={(event) => {
          onChange(event.target.value)
        }}
      />
    </Field.Root>
  )
}

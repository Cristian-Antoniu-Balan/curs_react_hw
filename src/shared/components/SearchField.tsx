import type { ReactNode } from 'react'
import { Field, Input } from '@chakra-ui/react'
import {
  UiFieldOrientation,
  UiInputType,
  UiWidth,
} from '@/shared/constants/ui'

type SearchFieldProps = {
  label: ReactNode
  placeholder: string
  value: string
  onChange: (value: string) => void
}

export function SearchField({
  label,
  placeholder,
  value,
  onChange,
}: SearchFieldProps) {
  return (
    <Field.Root
      orientation={UiFieldOrientation.Vertical}
      maxW={UiWidth.SearchMd}
      w={UiWidth.Full}
    >
      <Field.Label>{label}</Field.Label>
      <Input
        type={UiInputType.Text}
        value={value}
        placeholder={placeholder}
        w={UiWidth.Full}
        onChange={(event) => {
          onChange(event.target.value)
        }}
      />
    </Field.Root>
  )
}

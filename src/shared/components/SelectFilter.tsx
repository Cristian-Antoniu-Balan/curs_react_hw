import type { ReactNode } from 'react'
import { Field, NativeSelect } from '@chakra-ui/react'
import {
  UiFieldOrientation,
  UiNativeSelectSize,
  UiWidth,
} from '@/shared/constants/ui'

export type SelectFilterOption<T extends string = string> = {
  value: T
  label: ReactNode
}

type SelectFilterProps<T extends string = string> = {
  label: ReactNode
  value: T
  options: SelectFilterOption<T>[]
  onChange: (value: T) => void
}

export function SelectFilter<T extends string = string>({
  label,
  value,
  options,
  onChange,
}: SelectFilterProps<T>) {
  return (
    <Field.Root
      orientation={UiFieldOrientation.Vertical}
      maxW={UiWidth.FilterSm}
      w={UiWidth.Full}
    >
      <Field.Label>{label}</Field.Label>
      <NativeSelect.Root size={UiNativeSelectSize.Md} w={UiWidth.Full}>
        <NativeSelect.Field
          value={value}
          onChange={(event) => {
            onChange(event.target.value as T)
          }}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </Field.Root>
  )
}

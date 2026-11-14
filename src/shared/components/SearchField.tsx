import { useRef, type ReactNode } from 'react'
import { CloseButton, Field, Input, InputGroup } from '@chakra-ui/react'
import { strings } from '@/shared/constants/strings'
import {
  UiCloseButtonMe,
  UiCloseButtonSize,
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
  const inputRef = useRef<HTMLInputElement>(null)

  const endElement = value && (
    <CloseButton
      size={UiCloseButtonSize.Xs}
      me={UiCloseButtonMe.Tight}
      aria-label={strings.filters.clearSearchAria}
      onClick={() => {
        onChange('')
        inputRef.current?.focus()
      }}
    />
  )

  return (
    <Field.Root
      orientation={UiFieldOrientation.Vertical}
      maxW={UiWidth.SearchMd}
      w={UiWidth.Full}
    >
      <Field.Label>{label}</Field.Label>
      <InputGroup endElement={endElement}>
        <Input
          ref={inputRef}
          type={UiInputType.Text}
          value={value}
          placeholder={placeholder}
          w={UiWidth.Full}
          onChange={(event) => {
            onChange(event.target.value)
          }}
        />
      </InputGroup>
    </Field.Root>
  )
}

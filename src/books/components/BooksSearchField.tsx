import { Field, Input } from '@chakra-ui/react'
import { bookStrings } from '@/books/constants/strings'
import {
  UiFieldOrientation,
  UiInputType,
  UiWidth,
} from '@/shared/constants/ui'

type BooksSearchFieldProps = {
  value: string
  onChange: (value: string) => void
}

export function BooksSearchField({ value, onChange }: BooksSearchFieldProps) {
  return (
    <Field.Root
      orientation={UiFieldOrientation.Vertical}
      maxW={UiWidth.SearchMd}
      w={UiWidth.Full}
    >
      <Field.Label>{bookStrings.searchLabel}</Field.Label>
      <Input
        type={UiInputType.Text}
        value={value}
        placeholder={bookStrings.searchPlaceholder}
        w={UiWidth.Full}
        onChange={(event) => {
          onChange(event.target.value)
        }}
      />
    </Field.Root>
  )
}

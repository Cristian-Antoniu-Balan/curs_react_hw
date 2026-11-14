import { Field, NativeSelect } from '@chakra-ui/react'
import {
  BookAvailabilityFilter,
  type BookAvailabilityFilter as BookAvailabilityFilterValue,
} from '@/books/constants/availabilityFilter'
import { bookStrings } from '@/books/constants/strings'
import {
  UiFieldOrientation,
  UiNativeSelectSize,
  UiWidth,
} from '@/shared/constants/ui'

type BooksAvailabilityFilterProps = {
  value: BookAvailabilityFilterValue
  onChange: (value: BookAvailabilityFilterValue) => void
}

export function BooksAvailabilityFilter({
  value,
  onChange,
}: BooksAvailabilityFilterProps) {
  return (
    <Field.Root
      orientation={UiFieldOrientation.Vertical}
      maxW={UiWidth.FilterSm}
      w={UiWidth.Full}
    >
      <Field.Label>{bookStrings.filterLabel}</Field.Label>
      <NativeSelect.Root size={UiNativeSelectSize.Md} w={UiWidth.Full}>
        <NativeSelect.Field
          value={value}
          onChange={(event) => {
            onChange(event.target.value as BookAvailabilityFilterValue)
          }}
        >
          <option value={BookAvailabilityFilter.All}>
            {bookStrings.filterAll}
          </option>
          <option value={BookAvailabilityFilter.Available}>
            {bookStrings.filterAvailable}
          </option>
          <option value={BookAvailabilityFilter.Unavailable}>
            {bookStrings.filterUnavailable}
          </option>
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </Field.Root>
  )
}

import { Field, NativeSelect } from '@chakra-ui/react'
import {
  LoanActiveFilter,
  type LoanActiveFilter as LoanActiveFilterValue,
} from '@/loans/constants/activeFilter'
import { loanStrings } from '@/loans/constants/strings'
import {
  UiFieldOrientation,
  UiNativeSelectSize,
  UiWidth,
} from '@/shared/constants/ui'

type LoansActiveFilterProps = {
  value: LoanActiveFilterValue
  onChange: (value: LoanActiveFilterValue) => void
}

export function LoansActiveFilter({
  value,
  onChange,
}: LoansActiveFilterProps) {
  return (
    <Field.Root
      orientation={UiFieldOrientation.Vertical}
      maxW={UiWidth.FilterSm}
      w={UiWidth.Full}
    >
      <Field.Label>{loanStrings.filterLabel}</Field.Label>
      <NativeSelect.Root size={UiNativeSelectSize.Md} w={UiWidth.Full}>
        <NativeSelect.Field
          value={value}
          onChange={(event) => {
            onChange(event.target.value as LoanActiveFilterValue)
          }}
        >
          <option value={LoanActiveFilter.All}>{loanStrings.filterAll}</option>
          <option value={LoanActiveFilter.Active}>
            {loanStrings.filterActive}
          </option>
          <option value={LoanActiveFilter.Inactive}>
            {loanStrings.filterInactive}
          </option>
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </Field.Root>
  )
}

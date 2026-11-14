import { Field, NativeSelect } from '@chakra-ui/react'
import { LoanEntityFilter } from '@/loans/constants/entityFilter'
import { loanStrings } from '@/loans/constants/strings'
import type { LoanBookFilterOption } from '@/loans/utils/loanBookFilterOptions'
import {
  UiFieldOrientation,
  UiNativeSelectSize,
  UiWidth,
} from '@/shared/constants/ui'

type LoansBookFilterProps = {
  value: string
  options: LoanBookFilterOption[]
  onChange: (value: string) => void
}

export function LoansBookFilter({
  value,
  options,
  onChange,
}: LoansBookFilterProps) {
  return (
    <Field.Root
      orientation={UiFieldOrientation.Vertical}
      maxW={UiWidth.FilterSm}
      w={UiWidth.Full}
    >
      <Field.Label>{loanStrings.filterBookLabel}</Field.Label>
      <NativeSelect.Root size={UiNativeSelectSize.Md} w={UiWidth.Full}>
        <NativeSelect.Field
          value={value}
          onChange={(event) => {
            onChange(event.target.value)
          }}
        >
          <option value={LoanEntityFilter.All}>
            {loanStrings.filterBookAll}
          </option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.title}
            </option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </Field.Root>
  )
}

import { Field, NativeSelect } from '@chakra-ui/react'
import { LoanEntityFilter } from '@/loans/constants/entityFilter'
import { loanStrings } from '@/loans/constants/strings'
import type { LoanMemberFilterOption } from '@/loans/utils/loanMemberFilterOptions'
import {
  UiFieldOrientation,
  UiNativeSelectSize,
  UiWidth,
} from '@/shared/constants/ui'

type LoansMemberFilterProps = {
  value: string
  options: LoanMemberFilterOption[]
  onChange: (value: string) => void
}

export function LoansMemberFilter({
  value,
  options,
  onChange,
}: LoansMemberFilterProps) {
  return (
    <Field.Root
      orientation={UiFieldOrientation.Vertical}
      maxW={UiWidth.FilterSm}
      w={UiWidth.Full}
    >
      <Field.Label>{loanStrings.filterMemberLabel}</Field.Label>
      <NativeSelect.Root size={UiNativeSelectSize.Md} w={UiWidth.Full}>
        <NativeSelect.Field
          value={value}
          onChange={(event) => {
            onChange(event.target.value)
          }}
        >
          <option value={LoanEntityFilter.All}>
            {loanStrings.filterMemberAll}
          </option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </Field.Root>
  )
}

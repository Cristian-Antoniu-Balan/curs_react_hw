import { Field, NativeSelect } from '@chakra-ui/react'
import {
  MemberActiveLoansFilter,
  type MemberActiveLoansFilter as MemberActiveLoansFilterValue,
} from '@/members/constants/activeLoansFilter'
import { memberStrings } from '@/members/constants/strings'
import {
  UiFieldOrientation,
  UiNativeSelectSize,
  UiWidth,
} from '@/shared/constants/ui'

type MembersActiveLoansFilterProps = {
  value: MemberActiveLoansFilterValue
  onChange: (value: MemberActiveLoansFilterValue) => void
}

export function MembersActiveLoansFilter({
  value,
  onChange,
}: MembersActiveLoansFilterProps) {
  return (
    <Field.Root
      orientation={UiFieldOrientation.Vertical}
      maxW={UiWidth.FilterSm}
      w={UiWidth.Full}
    >
      <Field.Label>{memberStrings.filterLabel}</Field.Label>
      <NativeSelect.Root size={UiNativeSelectSize.Md} w={UiWidth.Full}>
        <NativeSelect.Field
          value={value}
          onChange={(event) => {
            onChange(event.target.value as MemberActiveLoansFilterValue)
          }}
        >
          <option value={MemberActiveLoansFilter.All}>
            {memberStrings.filterAll}
          </option>
          <option value={MemberActiveLoansFilter.Active}>
            {memberStrings.filterActive}
          </option>
          <option value={MemberActiveLoansFilter.Inactive}>
            {memberStrings.filterInactive}
          </option>
        </NativeSelect.Field>
        <NativeSelect.Indicator />
      </NativeSelect.Root>
    </Field.Root>
  )
}

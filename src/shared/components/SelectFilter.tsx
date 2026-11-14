import { useMemo, type ReactNode } from 'react'
import { createListCollection, Field, Portal, Select } from '@chakra-ui/react'
import {
  UiFieldOrientation,
  UiFlexShrink,
  UiSelectSize,
  UiWidth,
} from '@/shared/constants/ui'

export type SelectFilterOption<T extends string = string> = {
  value: T
  label: string
}

type SelectFilterProps<T extends string = string> = {
  label: ReactNode
  placeholder: string
  value: T
  emptyValue: T
  options: SelectFilterOption<T>[]
  onChange: (value: T) => void
}

export function SelectFilter<T extends string = string>({
  label,
  placeholder,
  value,
  emptyValue,
  options,
  onChange,
}: SelectFilterProps<T>) {
  const collection = useMemo(
    () =>
      createListCollection({
        items: options.map((option) => ({
          label: option.label,
          value: option.value,
        })),
      }),
    [options],
  )

  const selectValue = value === emptyValue ? [] : [value]

  return (
    <Field.Root
      orientation={UiFieldOrientation.Vertical}
      w={UiWidth.FilterSm}
      flexShrink={UiFlexShrink.None}
    >
      <Field.Label>{label}</Field.Label>
      <Select.Root
        collection={collection}
        size={UiSelectSize.Md}
        width={UiWidth.Full}
        value={selectValue}
        onValueChange={(details) => {
          const next = details.value[0]
          if (next === undefined) {
            onChange(emptyValue)
            return
          }

          onChange(next as T)
        }}
      >
        <Select.HiddenSelect />
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder={placeholder} />
          </Select.Trigger>
          <Select.IndicatorGroup
            css={{
              '& [data-part="clear-trigger"][hidden]': {
                display: 'inline-flex',
                visibility: 'hidden',
                pointerEvents: 'none',
              },
            }}
          >
            <Select.ClearTrigger />
            <Select.Indicator />
          </Select.IndicatorGroup>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {collection.items.map((item) => (
                <Select.Item item={item} key={item.value}>
                  {item.label}
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </Field.Root>
  )
}

import { Button } from '@chakra-ui/react'
import { strings } from '@/shared/constants/strings'
import {
  UiButtonSize,
  UiButtonVariant,
  UiFlexShrink,
} from '@/shared/constants/ui'

type ClearFiltersButtonProps = {
  disabled?: boolean
  onClick: () => void
}

export function ClearFiltersButton({
  disabled = false,
  onClick,
}: ClearFiltersButtonProps) {
  return (
    <Button
      variant={UiButtonVariant.Outline}
      size={UiButtonSize.Md}
      flexShrink={UiFlexShrink.None}
      disabled={disabled}
      onClick={onClick}
    >
      {strings.filters.clearAll}
    </Button>
  )
}

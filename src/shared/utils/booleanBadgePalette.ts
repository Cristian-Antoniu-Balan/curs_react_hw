import { UiBadgeColorPalette } from '@/shared/constants/ui'

export function booleanBadgePalette(
  isPositive: boolean,
): UiBadgeColorPalette {
  if (isPositive) {
    return UiBadgeColorPalette.Green
  }

  return UiBadgeColorPalette.Orange
}

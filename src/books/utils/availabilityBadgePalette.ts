import { UiBadgeColorPalette } from '@/shared/constants/ui'

export function availabilityBadgePalette(
  isAvailable: boolean,
): UiBadgeColorPalette {
  if (isAvailable) {
    return UiBadgeColorPalette.Green
  }

  return UiBadgeColorPalette.Orange
}

import { UiBadgeColorPalette } from '@/shared/constants/ui'

export function activeBadgePalette(isActive: boolean): UiBadgeColorPalette {
  if (isActive) {
    return UiBadgeColorPalette.Green
  }

  return UiBadgeColorPalette.Orange
}

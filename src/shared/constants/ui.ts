export const UiHeadingSize = {
  Lg: 'lg',
  Xl: 'xl',
} as const

export type UiHeadingSize = (typeof UiHeadingSize)[keyof typeof UiHeadingSize]

export const UiColor = {
  Error: 'fg.error',
  Muted: 'fg.muted',
} as const

export type UiColor = (typeof UiColor)[keyof typeof UiColor]

export const UiStackAlign = {
  Stretch: 'stretch',
} as const

export type UiStackAlign = (typeof UiStackAlign)[keyof typeof UiStackAlign]

export const UiFlexAlign = {
  Center: 'center',
} as const

export type UiFlexAlign = (typeof UiFlexAlign)[keyof typeof UiFlexAlign]

export const UiFlexJustify = {
  SpaceBetween: 'space-between',
} as const

export type UiFlexJustify = (typeof UiFlexJustify)[keyof typeof UiFlexJustify]

export const UiFlexWrap = {
  Wrap: 'wrap',
} as const

export type UiFlexWrap = (typeof UiFlexWrap)[keyof typeof UiFlexWrap]

export const UiMaxWidth = {
  SixXl: '6xl',
} as const

export type UiMaxWidth = (typeof UiMaxWidth)[keyof typeof UiMaxWidth]

export const UiListStyle = {
  None: 'none',
} as const

export type UiListStyle = (typeof UiListStyle)[keyof typeof UiListStyle]

export const UiHtmlElement = {
  Header: 'header',
  Main: 'main',
  Nav: 'nav',
  UnorderedList: 'ul',
  ListItem: 'li',
} as const

export type UiHtmlElement = (typeof UiHtmlElement)[keyof typeof UiHtmlElement]

export const UiGap = {
  None: '0',
  Two: '2',
  Three: '3',
  Four: '4',
} as const

export type UiGap = (typeof UiGap)[keyof typeof UiGap]

export const UiSpace = {
  Three: '3',
  Four: '4',
  Six: '6',
} as const

export type UiSpace = (typeof UiSpace)[keyof typeof UiSpace]

export const UiMinHeight = {
  Viewport: '100vh',
} as const

export type UiMinHeight = (typeof UiMinHeight)[keyof typeof UiMinHeight]

export const UiBorderWidth = {
  OnePx: '1px',
} as const

export type UiBorderWidth = (typeof UiBorderWidth)[keyof typeof UiBorderWidth]

export const UiMargin = {
  Auto: 'auto',
} as const

export type UiMargin = (typeof UiMargin)[keyof typeof UiMargin]

export const UiFontWeight = {
  Medium: 500,
  Bold: 700,
} as const

export type UiFontWeight = (typeof UiFontWeight)[keyof typeof UiFontWeight]

export const UiTextDecoration = {
  None: 'none',
  Underline: 'underline',
} as const

export type UiTextDecoration =
  (typeof UiTextDecoration)[keyof typeof UiTextDecoration]

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
  End: 'end',
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
  One: '1',
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

export const UiButtonVariant = {
  Solid: 'solid',
  Outline: 'outline',
  Ghost: 'ghost',
  Subtle: 'subtle',
} as const

export type UiButtonVariant =
  (typeof UiButtonVariant)[keyof typeof UiButtonVariant]

export const UiButtonSize = {
  Sm: 'sm',
  Md: 'md',
} as const

export type UiButtonSize = (typeof UiButtonSize)[keyof typeof UiButtonSize]

export const UiButtonColorPalette = {
  Blue: 'blue',
  Red: 'red',
  Gray: 'gray',
} as const

export type UiButtonColorPalette =
  (typeof UiButtonColorPalette)[keyof typeof UiButtonColorPalette]

export const UiInputType = {
  Text: 'text',
  Number: 'number',
} as const

export type UiInputType = (typeof UiInputType)[keyof typeof UiInputType]

export const UiAlertStatus = {
  Error: 'error',
  Success: 'success',
  Info: 'info',
} as const

export type UiAlertStatus = (typeof UiAlertStatus)[keyof typeof UiAlertStatus]

export const UiDialogPlacement = {
  Center: 'center',
} as const

export type UiDialogPlacement =
  (typeof UiDialogPlacement)[keyof typeof UiDialogPlacement]

export const UiDrawerPlacement = {
  End: 'end',
} as const

export type UiDrawerPlacement =
  (typeof UiDrawerPlacement)[keyof typeof UiDrawerPlacement]

export const UiTableSize = {
  Sm: 'sm',
  Md: 'md',
} as const

export type UiTableSize = (typeof UiTableSize)[keyof typeof UiTableSize]

export const UiNativeSelectSize = {
  Sm: 'sm',
  Md: 'md',
} as const

export type UiNativeSelectSize =
  (typeof UiNativeSelectSize)[keyof typeof UiNativeSelectSize]

export const UiFlexDirection = {
  Row: 'row',
  Column: 'column',
} as const

export type UiFlexDirection =
  (typeof UiFlexDirection)[keyof typeof UiFlexDirection]

export const UiWidth = {
  Full: '100%',
  FilterSm: '240px',
  SearchMd: '280px',
  ToastSm: 'sm',
} as const

export type UiWidth = (typeof UiWidth)[keyof typeof UiWidth]

export const UiMinCopies = {
  One: 1,
} as const

export type UiMinCopies = (typeof UiMinCopies)[keyof typeof UiMinCopies]

export const ToastPlacement = {
  TopEnd: 'top-end',
} as const

export type ToastPlacement =
  (typeof ToastPlacement)[keyof typeof ToastPlacement]

export const ToastType = {
  Success: 'success',
  Error: 'error',
  Info: 'info',
  Loading: 'loading',
} as const

export type ToastType = (typeof ToastType)[keyof typeof ToastType]

export const ToastSpinnerSize = {
  Sm: 'sm',
} as const

export type ToastSpinnerSize =
  (typeof ToastSpinnerSize)[keyof typeof ToastSpinnerSize]

export const UiCursor = {
  Pointer: 'pointer',
} as const

export type UiCursor = (typeof UiCursor)[keyof typeof UiCursor]

export const UiBgToken = {
  RowHover: 'blue.subtle',
  RowHoverCell: 'blue.subtle',
} as const

export type UiBgToken = (typeof UiBgToken)[keyof typeof UiBgToken]


export const UiTableStriped = {
  True: true,
} as const

export type UiTableStriped = (typeof UiTableStriped)[keyof typeof UiTableStriped]

export const UiSortDirection = {
  Asc: 'asc',
  Desc: 'desc',
} as const

export type UiSortDirection =
  (typeof UiSortDirection)[keyof typeof UiSortDirection]

export const UiSortIndicator = {
  Asc: ' ▲',
  Desc: ' ▼',
} as const

export type UiSortIndicator =
  (typeof UiSortIndicator)[keyof typeof UiSortIndicator]

export const UiFlexGrow = {
  One: '1',
} as const

export type UiFlexGrow = (typeof UiFlexGrow)[keyof typeof UiFlexGrow]

export const UiFlexShrink = {
  None: 0,
} as const

export type UiFlexShrink = (typeof UiFlexShrink)[keyof typeof UiFlexShrink]

export const UiMinWidth = {
  None: '0',
} as const

export type UiMinWidth = (typeof UiMinWidth)[keyof typeof UiMinWidth]

export const UiFieldOrientation = {
  Horizontal: 'horizontal',
  Vertical: 'vertical',
} as const

export type UiFieldOrientation =
  (typeof UiFieldOrientation)[keyof typeof UiFieldOrientation]

export const UiWhiteSpace = {
  NoWrap: 'nowrap',
} as const

export type UiWhiteSpace = (typeof UiWhiteSpace)[keyof typeof UiWhiteSpace]

export const UiHeadingSize = {
  Md: 'md',
  Lg: 'lg',
  Xl: 'xl',
  TwoXl: '2xl',
} as const

export type UiHeadingSize = (typeof UiHeadingSize)[keyof typeof UiHeadingSize]

export const UiColor = {
  Error: 'fg.error',
  Muted: 'fg.muted',
  Fg: 'fg',
  BrandFg: 'brand.fg',
  BrandSolid: 'brand.solid',
  Transparent: 'transparent',
} as const

export type UiColor = (typeof UiColor)[keyof typeof UiColor]

export const UiDisplay = {
  Flex: 'flex',
  InlineFlex: 'inline-flex',
} as const

export type UiDisplay = (typeof UiDisplay)[keyof typeof UiDisplay]

export const UiTransition = {
  Nav: 'background 160ms ease, color 160ms ease',
} as const

export type UiTransition = (typeof UiTransition)[keyof typeof UiTransition]

export const UiOverflow = {
  Hidden: 'hidden',
  Auto: 'auto',
} as const

export type UiOverflow = (typeof UiOverflow)[keyof typeof UiOverflow]

export const UiScrollbarGutter = {
  Stable: 'stable',
} as const

export type UiScrollbarGutter =
  (typeof UiScrollbarGutter)[keyof typeof UiScrollbarGutter]

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
  Start: 'flex-start',
  Center: 'center',
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
  Footer: 'footer',
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
  Five: '5',
  Six: '6',
} as const

export type UiGap = (typeof UiGap)[keyof typeof UiGap]

export const UiSpace = {
  One: '1',
  Two: '2',
  Three: '3',
  Four: '4',
  Five: '5',
  Six: '6',
  Eight: '8',
} as const

export type UiSpace = (typeof UiSpace)[keyof typeof UiSpace]

export const UiMinHeight = {
  Viewport: '100dvh',
  BrandMark: '10px',
  Zero: '0',
} as const

export const UiHeight = {
  Full: '100%',
  Viewport: '100dvh',
} as const

export type UiHeight = (typeof UiHeight)[keyof typeof UiHeight]

export type UiMinHeight = (typeof UiMinHeight)[keyof typeof UiMinHeight]

export const UiBorderWidth = {
  None: '0',
  OnePx: '1px',
} as const

export type UiBorderWidth = (typeof UiBorderWidth)[keyof typeof UiBorderWidth]

export const UiMargin = {
  Auto: 'auto',
} as const

export type UiMargin = (typeof UiMargin)[keyof typeof UiMargin]

export const UiFontWeight = {
  Medium: 500,
  Semibold: 600,
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
  Brand: 'brand',
  Red: 'red',
  Gray: 'gray',
  Green: 'green',
} as const

export type UiButtonColorPalette =
  (typeof UiButtonColorPalette)[keyof typeof UiButtonColorPalette]

export const UiInputType = {
  Text: 'text',
  Number: 'number',
  Email: 'email',
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

export const UiSelectSize = {
  Sm: 'sm',
  Md: 'md',
} as const

export type UiSelectSize = (typeof UiSelectSize)[keyof typeof UiSelectSize]

export const UiCloseButtonSize = {
  Xs: 'xs',
} as const

export type UiCloseButtonSize =
  (typeof UiCloseButtonSize)[keyof typeof UiCloseButtonSize]

export const UiCloseButtonMe = {
  Tight: '-2',
} as const

export type UiCloseButtonMe =
  (typeof UiCloseButtonMe)[keyof typeof UiCloseButtonMe]

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
  BrandMark: '10px',
  AccentBar: '4px',
  SortIndicator: '1.25em',
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

export const UiKeyboardKey = {
  Enter: 'Enter',
  Space: ' ',
} as const

export type UiKeyboardKey =
  (typeof UiKeyboardKey)[keyof typeof UiKeyboardKey]

export type UiCursor = (typeof UiCursor)[keyof typeof UiCursor]

export const UiBgToken = {
  RowHover: 'brand.subtle',
  RowHoverCell: 'brand.subtle',
  AppCanvas: 'app.canvas',
  AppCanvasWash: 'app.canvasWash',
  AppHeader: 'app.header',
  AppPanel: 'app.panel',
  AppPanelGlass: 'app.panelGlass',
  AppNavActive: 'app.navActive',
  Overlay: 'app.overlay',
  TableHeader: 'brand.muted',
} as const

export type UiBgToken = (typeof UiBgToken)[keyof typeof UiBgToken]

export const UiBorderColor = {
  Panel: 'app.panelBorder',
} as const

export type UiBorderColor = (typeof UiBorderColor)[keyof typeof UiBorderColor]

export const UiShadow = {
  Panel: 'panel',
  Overlay: 'overlay',
} as const

export type UiShadow = (typeof UiShadow)[keyof typeof UiShadow]

export const UiRadius = {
  Panel: 'panel',
  Control: 'control',
  Full: 'full',
} as const

export type UiRadius = (typeof UiRadius)[keyof typeof UiRadius]

export const UiBackdropFilter = {
  Header: 'saturate(1.2) blur(12px)',
  Panel: 'saturate(1.15) blur(14px)',
} as const

export type UiBackdropFilter =
  (typeof UiBackdropFilter)[keyof typeof UiBackdropFilter]

export const UiPosition = {
  Sticky: 'sticky',
  Absolute: 'absolute',
  Relative: 'relative',
  Fixed: 'fixed',
} as const

export type UiPosition = (typeof UiPosition)[keyof typeof UiPosition]

export const UiInset = {
  Zero: '0',
} as const

export type UiInset = (typeof UiInset)[keyof typeof UiInset]

export const UiBgSize = {
  Cover: 'cover',
} as const

export type UiBgSize = (typeof UiBgSize)[keyof typeof UiBgSize]

export const UiBgPos = {
  Center: 'center',
} as const

export type UiBgPos = (typeof UiBgPos)[keyof typeof UiBgPos]

export const UiBgRepeat = {
  NoRepeat: 'no-repeat',
} as const

export type UiBgRepeat = (typeof UiBgRepeat)[keyof typeof UiBgRepeat]

export const UiBgAttachment = {
  Fixed: 'fixed',
} as const

export type UiBgAttachment =
  (typeof UiBgAttachment)[keyof typeof UiBgAttachment]

export const UiZIndex = {
  Header: 20,
  Content: 1,
  Background: 0,
} as const

export type UiZIndex = (typeof UiZIndex)[keyof typeof UiZIndex]

export const UiDialogSize = {
  Md: 'md',
} as const

export type UiDialogSize = (typeof UiDialogSize)[keyof typeof UiDialogSize]

export const UiDrawerSize = {
  Md: 'md',
  Lg: 'lg',
} as const

export type UiDrawerSize = (typeof UiDrawerSize)[keyof typeof UiDrawerSize]

export const UiBadgeColorPalette = {
  Green: 'green',
  Orange: 'orange',
  Gray: 'gray',
  Brand: 'brand',
} as const

export type UiBadgeColorPalette =
  (typeof UiBadgeColorPalette)[keyof typeof UiBadgeColorPalette]

export const UiBadgeVariant = {
  Subtle: 'subtle',
  Solid: 'solid',
} as const

export type UiBadgeVariant =
  (typeof UiBadgeVariant)[keyof typeof UiBadgeVariant]

export const UiFontSize = {
  Xs: 'xs',
  Sm: 'sm',
  Md: 'md',
  Lg: 'lg',
  Xl: 'xl',
  TwoXl: '2xl',
} as const

export type UiFontSize = (typeof UiFontSize)[keyof typeof UiFontSize]

export const UiLetterSpacing = {
  Tight: '-0.02em',
  Wide: '0.04em',
} as const

export type UiLetterSpacing =
  (typeof UiLetterSpacing)[keyof typeof UiLetterSpacing]

export const UiTextTransform = {
  Uppercase: 'uppercase',
} as const

export type UiTextTransform =
  (typeof UiTextTransform)[keyof typeof UiTextTransform]

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
  Asc: '▲',
  Desc: '▼',
} as const

export type UiSortIndicator =
  (typeof UiSortIndicator)[keyof typeof UiSortIndicator]

export const UiVisibility = {
  Visible: 'visible',
  Hidden: 'hidden',
} as const

export type UiVisibility = (typeof UiVisibility)[keyof typeof UiVisibility]

export const UiWhiteSpace = {
  NoWrap: 'nowrap',
} as const

export type UiWhiteSpace = (typeof UiWhiteSpace)[keyof typeof UiWhiteSpace]

export const UiTextAlign = {
  Left: 'left',
  Center: 'center',
} as const

export type UiTextAlign = (typeof UiTextAlign)[keyof typeof UiTextAlign]

export const UiFlexGrow = {
  One: 1,
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

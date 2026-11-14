import { NavLink, Outlet } from 'react-router-dom'
import { Box, Container, Flex, Heading, HStack, Stack } from '@chakra-ui/react'
import { ColorModeButton } from '@/components/ui/color-mode'
import { AppRoute } from '@/shared/constants/routes'
import { strings } from '@/shared/constants/strings'
import {
  UiBorderWidth,
  UiFlexAlign,
  UiFlexJustify,
  UiFlexWrap,
  UiFontWeight,
  UiGap,
  UiHeadingSize,
  UiHtmlElement,
  UiMargin,
  UiMaxWidth,
  UiMinHeight,
  UiSpace,
  UiTextDecoration,
} from '@/shared/constants/ui'

const navLinkStyle = ({ isActive }: { isActive: boolean }) => {
  let fontWeight: UiFontWeight = UiFontWeight.Medium
  let textDecoration: UiTextDecoration = UiTextDecoration.None

  if (isActive) {
    fontWeight = UiFontWeight.Bold
    textDecoration = UiTextDecoration.Underline
  }

  return {
    fontWeight,
    textDecoration,
  }
}

export function AppLayout() {
  const content = (
    <Stack gap={UiGap.None} minH={UiMinHeight.Viewport}>
      <Box
        as={UiHtmlElement.Header}
        borderBottomWidth={UiBorderWidth.OnePx}
        px={UiSpace.Four}
        py={UiSpace.Three}
      >
        <Flex
          maxW={UiMaxWidth.SixXl}
          mx={UiMargin.Auto}
          align={UiFlexAlign.Center}
          justify={UiFlexJustify.SpaceBetween}
          gap={UiGap.Four}
          wrap={UiFlexWrap.Wrap}
        >
          <Heading size={UiHeadingSize.Lg}>{strings.app.title}</Heading>
          <HStack as={UiHtmlElement.Nav} gap={UiGap.Four}>
            <NavLink to={AppRoute.Books} style={navLinkStyle}>
              {strings.nav.books}
            </NavLink>
            <NavLink to={AppRoute.Members} style={navLinkStyle}>
              {strings.nav.members}
            </NavLink>
            <NavLink to={AppRoute.Loans} style={navLinkStyle}>
              {strings.nav.loans}
            </NavLink>
          </HStack>
          <ColorModeButton />
        </Flex>
      </Box>

      <Container
        as={UiHtmlElement.Main}
        maxW={UiMaxWidth.SixXl}
        py={UiSpace.Six}
        px={UiSpace.Four}
      >
        <Outlet />
      </Container>
    </Stack>
  )

  return content
}

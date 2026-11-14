import { NavLink, Outlet } from 'react-router-dom';
import { Box, Container, Flex, Heading, HStack, Stack } from '@chakra-ui/react';
import backgroundImage from '@/assets/background.jpg';
import { ColorModeButton } from '@/components/ui/color-mode';
import { AppRoute } from '@/shared/constants/routes';
import { strings } from '@/shared/constants/strings';
import {
  UiBackdropFilter,
  UiBgAttachment,
  UiBgPos,
  UiBgRepeat,
  UiBgSize,
  UiBgToken,
  UiBorderColor,
  UiBorderWidth,
  UiColor,
  UiDisplay,
  UiFlexAlign,
  UiFlexJustify,
  UiFlexShrink,
  UiFlexWrap,
  UiFontWeight,
  UiGap,
  UiHeadingSize,
  UiHtmlElement,
  UiInset,
  UiLetterSpacing,
  UiMargin,
  UiMaxWidth,
  UiMinHeight,
  UiPosition,
  UiRadius,
  UiSpace,
  UiTextDecoration,
  UiTransition,
  UiWidth,
  UiZIndex,
} from '@/shared/constants/ui';
import { toCssUrl } from '@/shared/utils/toCssUrl';

type NavItemProps = {
  to: string;
  label: string;
};

function NavItem({ to, label }: NavItemProps) {
  return (
    <NavLink to={to} style={{ textDecoration: UiTextDecoration.None }}>
      {({ isActive }) => {
        let bg: string = UiColor.Transparent;
        let color: string = UiColor.Muted;
        let fontWeight: UiFontWeight = UiFontWeight.Medium;

        if (isActive) {
          bg = UiBgToken.AppNavActive;
          color = UiColor.BrandFg;
          fontWeight = UiFontWeight.Semibold;
        }

        return (
          <Box
            as='span'
            display={UiDisplay.InlineFlex}
            alignItems={UiFlexAlign.Center}
            px={UiSpace.Three}
            py={UiSpace.Two}
            borderRadius={UiRadius.Full}
            bg={bg}
            color={color}
            fontWeight={fontWeight}
            transition={UiTransition.Nav}
          >
            {label}
          </Box>
        );
      }}
    </NavLink>
  );
}

export function AppLayout() {
  const content = (
    <Box position={UiPosition.Relative} minH={UiMinHeight.Viewport}>
      <Box
        aria-hidden
        position={UiPosition.Fixed}
        inset={UiInset.Zero}
        zIndex={UiZIndex.Background}
        bgImage={toCssUrl(backgroundImage)}
        bgSize={UiBgSize.Cover}
        bgPos={UiBgPos.Center}
        bgRepeat={UiBgRepeat.NoRepeat}
        bgAttachment={UiBgAttachment.Fixed}
      />
      <Box
        aria-hidden
        position={UiPosition.Fixed}
        inset={UiInset.Zero}
        zIndex={UiZIndex.Background}
        bg={UiBgToken.AppCanvasWash}
      />
      <Stack
        gap={UiGap.None}
        minH={UiMinHeight.Viewport}
        position={UiPosition.Relative}
        zIndex={UiZIndex.Content}
      >
        <Box
          as={UiHtmlElement.Header}
          position={UiPosition.Sticky}
          top={UiInset.Zero}
          zIndex={UiZIndex.Header}
          bg={UiBgToken.AppHeader}
          backdropFilter={UiBackdropFilter.Header}
          borderBottomWidth={UiBorderWidth.OnePx}
          borderColor={UiBorderColor.Panel}
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
            <HStack gap={UiGap.Three}>
              <Box
                w={UiWidth.BrandMark}
                h={UiMinHeight.BrandMark}
                borderRadius={UiRadius.Full}
                bg={UiColor.BrandSolid}
                flexShrink={UiFlexShrink.None}
              />
              <Heading
                size={UiHeadingSize.Lg}
                letterSpacing={UiLetterSpacing.Tight}
                fontWeight={UiFontWeight.Bold}
              >
                {strings.app.title}
              </Heading>
            </HStack>
            <HStack as={UiHtmlElement.Nav} gap={UiGap.One}>
              <NavItem to={AppRoute.Books} label={strings.nav.books} />
              <NavItem to={AppRoute.Members} label={strings.nav.members} />
              <NavItem to={AppRoute.Loans} label={strings.nav.loans} />
            </HStack>
            <ColorModeButton />
          </Flex>
        </Box>

        <Container
          as={UiHtmlElement.Main}
          maxW={UiMaxWidth.SixXl}
          py={UiSpace.Eight}
          px={UiSpace.Four}
        >
          <Outlet />
        </Container>
      </Stack>
    </Box>
  );

  return content;
}

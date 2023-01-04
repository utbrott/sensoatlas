import { extendTheme, theme as base, ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

export const theme = extendTheme({
  config,
  fonts: {
    heading: `Inter, ${base.fonts.heading}`,
    body: `Inter, ${base.fonts.body}`,
  },
  components: {
    Heading: {
      baseStyle: { color: 'gray.100' },
      Text: {
        baseStyle: { color: 'gray.100' },
      },
    },
  },
});

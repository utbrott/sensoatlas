import {
  extendTheme,
  theme as base,
  ThemeConfig,
  withDefaultVariant,
  withDefaultColorScheme,
  withDefaultProps,
} from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

export const theme = extendTheme(
  {
    config,
    styles: {
      global: {
        body: {
          bg: 'gray.900',
          color: 'gray.100',
        },
      },
    },
    colors: {
      blue: {
        50: '#c6e6ff',
        100: '#96d0ff',
        200: '#6cb6ff',
        300: '#539bf5',
        400: '#4184e4',
        500: '#316dca',
        600: '#255ab2',
        700: '#1b4b91',
        800: '#143d79',
        900: '#0f2d5c',
      },
      gray: {
        50: '#FAFAFA',
        100: '#F4F4F5',
        200: '#E4E4E7',
        300: '#D4D4D8',
        400: '#A1A1AA',
        500: '#71717A',
        600: '#52525B',
        700: '#3F3F46',
        800: '#27272A',
        900: '#18181B',
      },
    },
    fonts: {
      heading: `Inter, ${base.fonts.heading}`,
      body: `Inter, ${base.fonts.body}`,
    },
    components: {
      Heading: {
        baseStyle: (props: any) => ({
          color: mode('gray.800', 'gray.100')(props),
        }),
      },
      Text: {
        baseStyle: (props: any) => ({
          color: mode('gray.800', 'gray.100')(props),
        }),
      },
    },
  },
  withDefaultVariant({
    components: ['Button', 'IconButton'],
    variant: 'solid',
  }),
  withDefaultColorScheme({
    components: ['Button', 'IconButton'],
    colorScheme: 'blue',
  })
);

import {
  extendTheme,
  theme as base,
  ThemeConfig,
  withDefaultVariant,
  withDefaultColorScheme,
  defineStyleConfig,
} from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
};

export const theme = extendTheme(
  {
    config,
    colors: {
      blue: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
        800: '#1e40af',
        900: '#1e3a8a',
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
      Button: {
        variants: {
          solid: {
            bg: 'blue.500',
            _hover: {
              bg: 'blue.400',
            },
          },
        },
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

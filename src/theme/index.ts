import {
  extendTheme,
  theme as base,
  ThemeConfig,
  withDefaultVariant,
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
        50: '#F9FAFB',
        100: '#F3F4F6',
        200: '#E5E7EB',
        300: '#D1D5DB',
        400: '#9CA3AF',
        500: '#6B7280',
        600: '#4B5563',
        700: '#374151',
        800: '#1F2937',
        900: '#111827',
      },
    },
    fonts: {
      heading: `Poppins, ${base.fonts.heading}`,
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
  })
);

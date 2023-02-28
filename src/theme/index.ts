import { Theme as ThemeBase, extendTheme, theme as themeBase, ColorHues } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const theme = extendTheme({
  fonts: {
    heading: '"DM Sans", cursive',
    body: '"Nunito Sans", sans-serif',
  },
  config: {
    initialColorMode: 'light'
  },
  colors: {
    brand: {
      50: '#F9FAFB',
      100: '#E5E7EB',
      200: '#f8c676',
      300: '#f7bd5f',
      400: '#f3a01b',
      500: '#D5B5FF',
      600: '#c28016',
      700: '#aa7013',
      800: '#926010',
      900: '#391b56'
    },
    rock: {
      50: '#F9FAFB',
      100: '#E5E7EB',
      200: '#9CA3AF',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#993FF4',
      600: '#c28016',
      700: '#aa7013',
      800: '#4B5563',
      900: '#374151'
    }
  },
  styles: {
    global: (props: any) => ({
      body: {
        backgroundColor: mode('white', 'brand.900')(props),
        color: mode('brand.500', 'white')(props)
      },
      heading: {
        color: mode('brand.500', 'white')(props)
      },
      h1: {
        color: mode('rock.900', 'gray.500')(props)
      },
      h2: {
        color: mode('rock.300', 'black')(props)
      },
      h3: {
        color: mode('rock.800', 'white')(props)
      },
      h5: {
        color: mode('rock.900', 'white')(props)
      },
      menu1: {
        color: mode('rock.300', 'white')(props)
      }
    })
  }
}) as (ThemeBase & {
  colors: (typeof themeBase.colors) & {
    brand: ColorHues,
    rock: ColorHues
  }
});

export default theme;

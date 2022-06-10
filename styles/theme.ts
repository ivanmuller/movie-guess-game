import { extendTheme } from '@chakra-ui/react'

const theme = {
  colors: {
    brand: {
      base: '#272042',
      baseLight: '#342E59',
      black: '#000',
      white: '#FFF'
    },
    rgbas: {
      white02: 'rgba(255,255,255,0.2)',
      white04: 'rgba(255,255,255,0.4)',
      black06: 'rgba(0,0,0,0.6)',
      black0: 'rgba(0,0,0,0)',
      black1: 'rgba(0,0,0,1)'
    }
  },
  styles: {
    global: (props) => ({
      body: {
        background: 'brand.base',
        color: 'brand.white',
        fontFamily: 'Inter, sans- serif',
        fontWeight: '300',
        minHeight: '100vh'
      },
      h1: {
        fontFamily: 'VT323, monospace !important'
      },
      h2: {
        fontFamily: 'VT323, monospace !important'
      },
      h3: {
        fontFamily: 'VT323, monospace !important'
      },
      '.chakra-popover__content': {
        maxHeight: '30vh !important',
        background: 'brand.baseLight !important',
        borderRadius: '22px !important',
        padding: '12px 30px !important',
        [`@media screen and (min-width: ${props.theme.breakpoints.lg})`]: {
          maxHeight: '20vh !important'
        }
      }
    })
  },
  layerStyles: {
    fullCenter: {
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh'
    },
    columnSeparated: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      minHeight: '100vh'
    },
    heading1: {
      fontSize: '40px',
      mb: 6,
      textAlign: 'center'
    },
    heading2: {
      fontSize: '30px',
      lineHeight: 1.2,
      mb: 4
    },
    lifeImg: {
      w: '40px',
      h: '32px',
      filter: 'drop-shadow(1px 1px 1px rgba(255, 255,255,0.5))'
    },
    modalBody: {
      borderY: '1px',
      py: 3,
      borderColor: 'rgba(255,255,255,0.2)',
      fontSize: '25px',
      mb: 8
    },
    modalBodyLighter: {
      fontSize: '18px',
      color: 'rgba(255,255,255,0.7)'
    },
    formInput: {
      paddingLeft: 7,
      paddingRight: 7,
      height: '81px',
      fontSize: '20px',
      backgroundColor: 'brand.baseLight'
    }
  },
  components: {
    Button: {
      baseStyle: {
        color: '#000'
      }
    }
  }
}

export default extendTheme(theme)

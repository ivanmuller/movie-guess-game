import { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import React, { useEffect } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import theme from 'styles/theme'

function MyApp ({ Component, pageProps }: AppProps) : JSX.Element {
  useEffect(() => {
    // const disableRightClick = (e) => { e.preventDefault(); alert('Sorry, you\'re not allowed to cheat 🤣') }
    // window.addEventListener('contextmenu', disableRightClick)
    // return () => window.removeEventListener('contextmenu', disableRightClick)
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <SWRConfig value={{
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
      }}
      >
        <Component {...pageProps} />
      </SWRConfig>
    </ChakraProvider>
  )
}

export default MyApp

import { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import React, { useEffect } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import Footer from 'components/Footer'
import 'styles/_globals.css'

function MyApp ({ Component, pageProps }: AppProps) : JSX.Element {
  useEffect(() => {
    const disableRightClick = (e) => { e.preventDefault(); alert('Sorry, you\'re not allowed to cheat 🤣') }
    window.addEventListener('contextmenu', disableRightClick)
    return () => window.removeEventListener('contextmenu', disableRightClick)
  }, [])

  return (
    <ChakraProvider>
      <SWRConfig value={{
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
      }}
      >
        <Component {...pageProps} />
        {/* <Footer /> */}
      </SWRConfig>
    </ChakraProvider>
  )
}

export default MyApp

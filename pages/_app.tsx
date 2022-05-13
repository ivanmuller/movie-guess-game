import { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { awaitFetcher as fetcher } from 'lib/fetcher'
import Footer from 'components/Footer'

function MyApp ({ Component, pageProps }: AppProps) : JSX.Element {
  return (
    <ChakraProvider>
      <SWRConfig value={{
        fetcher,
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

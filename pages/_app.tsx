import { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import React, { useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import { ChakraProvider } from '@chakra-ui/react'
import settings from 'settings'
import theme from 'styles/theme'

function MyApp ({ Component, pageProps }: AppProps) : JSX.Element {
  const { t } = useTranslation('common')

  useEffect(() => {
    const disableRightClick = (e) => { e.preventDefault(); alert(t('rightClickMessage')) }
    window.addEventListener('contextmenu', disableRightClick)
    const msg = t('consoleLogMessage')
    console.log(msg, settings.consoleLogStyles.join(';'))
    return () => {
      return window.removeEventListener('contextmenu', disableRightClick)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

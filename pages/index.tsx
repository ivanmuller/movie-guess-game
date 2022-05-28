import Head from 'next/head'
import useSWR from 'swr'
import React from 'react'
import { awaitFetcher } from 'lib/fetcher'
import useTranslation from 'next-translate/useTranslation'
import { Container, Flex, Box, Text } from '@chakra-ui/react'
import MovieSelector from 'components/MovieSelector'
import useStore from 'store/store'
import ScoreView from 'components/ScoreView'
import Timer from 'components/Timer'
import Lifes from 'components/Lifes'
import ModalResult from 'components/ModalResult'
import ImageVisor from 'components/ImageVisor'
import Footer from 'components/Footer'

export default function Home (): JSX.Element {
  const { t } = useTranslation('common')

  const resetTime = useStore(state => state.resetTime)
  const resetLifes = useStore(state => state.resetLifes)
  const resetScore = useStore(state => state.resetScore)
  const resetAnswer = useStore(state => state.resetAnswer)
  const lifes = useStore(state => state.lifes)
  const decreaseLifes = useStore(state => state.decreaseLifes)
  const history = useStore(state => state.history)
  const resetHistory = useStore(state => state.resetHistory)

  const finalRef = React.useRef<HTMLDivElement>(null)

  const { data, mutate, error } = useSWR('randomMovie', () => awaitFetcher('/api/getRandomMovie', { history }))
  const isLoading = !data && !error
  const isReady = !error && !isLoading

  const newMovie = () => {
    mutate().then(() => {
      resetTime()
      resetAnswer()
    })
  }

  const newGame = () => {
    resetHistory()
    newMovie()
    resetLifes()
    resetScore()
  }

  const loseLife = () => {
    decreaseLifes()
    if (lifes === 1) {
      newGame()
    }
  }

  return (
    <>
      <Head>
        <title>{t('title')}</title>
      </Head>

      <div className={isLoading ? t('loading') : ''}>
        {isLoading && <p>Loading...</p>}
        {error && <p>{t('errorPrefix')} {error.info}</p>}
        {isReady && (
          <Flex direction='column' justify='space-between' minHeight="100vh">
            <Box>
              <Box position='absolute' w='100%' zIndex={2} pt='24px'>
                <Container maxW='container.lg'>
                  <Flex justify='end'>
                    <Box>
                      <Lifes />
                      <ScoreView />
                    </Box>
                  </Flex>
                </Container>
              </Box>
              <ImageVisor {...data} />
              <Container maxW='container.sm' mt='-280px' position='relative'>
                <Box align='center' mb='15px'><Timer /></Box>
                <Text as='h1' fontSize='40px' mb='25px' align='center' textShadow='0 0 4px #000'>What the Flick?</Text>
                <Box flex='1'><MovieSelector ref={finalRef} /></Box>
              </Container>
              <ModalResult ref={finalRef} shaId={data.id} movieOrder={data.order} loseLife={loseLife} newMovie={newMovie} />
            </Box>
            <Box>
              <Footer />
            </Box>
          </Flex>
        )}
      </div>
    </>
  )
}

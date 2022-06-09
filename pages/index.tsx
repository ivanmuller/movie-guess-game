import Head from 'next/head'
import useSWR from 'swr'
import React, { useState, useEffect } from 'react'
import useTranslation from 'next-translate/useTranslation'
import settings from 'settings'
import { Container, Flex, Box, Text } from '@chakra-ui/react'
import { awaitFetcher } from 'lib/fetcher'
import useStore from 'store/store'

import MovieSelector from 'components/MovieSelector'
import ScoreView from 'components/ScoreView'
import Timer from 'components/Timer'
import Lifes from 'components/Lifes'
import ModalResult from 'components/ModalResult'
import ImageVisor from 'components/ImageVisor'
import Footer from 'components/Footer'

export default function Home (): JSX.Element {
  const { t } = useTranslation('common')

  const [forcedNoSignal, setForcedNoSignal] = useState(false)

  const resetTime = useStore(state => state.resetTime)
  const pauseTime = useStore(state => state.pauseTime)
  const playTime = useStore(state => state.playTime)
  const resetLifes = useStore(state => state.resetLifes)
  const resetScore = useStore(state => state.resetScore)
  const resetAnswer = useStore(state => state.resetAnswer)
  const lifes = useStore(state => state.lifes)
  const decreaseLifes = useStore(state => state.decreaseLifes)
  const history = useStore(state => state.history)
  const resetHistory = useStore(state => state.resetHistory)

  const finalRef = React.useRef<HTMLDivElement>(null)

  const { data, mutate, error } = useSWR('randomMovie', () => awaitFetcher('/api/getRandomMovie', history))
  const isLoading = !data && !error

  useEffect(() => {
    if (data) {
      playTime()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const newMovie = () => {
    resetTime()
    pauseTime()
    setForcedNoSignal(true)
    mutate().then(() => {
      setTimeout(() => {
        resetAnswer()
        setForcedNoSignal(false)
      }, settings.delayBetweenMovies)
    })
  }

  const newGame = () => {
    resetHistory()
    resetLifes()
    resetScore()
    newMovie()
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
        {error
          ? (
            <Flex layerStyle='fullCenter'>
              {error && <Text layerStyle='heading1' as='h1'>{t('errorPrefix')} {error.info}</Text>}
            </Flex>
            )
          : (
            <Flex layerStyle='columnSeparated'>
              <Box>
                <Box position='absolute' w='100%' zIndex={2} pt={6}>
                  <Container maxW='container.lg'>
                    <Flex justify='end'>
                      <Box>
                        <Lifes />
                        <ScoreView />
                      </Box>
                    </Flex>
                  </Container>
                </Box>
                <ImageVisor forcedNoSignal={forcedNoSignal} {...data} />
                <Container maxW='container.sm' mt={['-180px', null, '-240px', '-280px']} mb={8} position='relative'>
                  <Box textAlign='center' mb={4}>
                    <Timer />
                  </Box>
                  <Text layerStyle='heading1' as='h1'>{t('mainAnswer')}</Text>
                  <Box flex='1'><MovieSelector ref={finalRef} /></Box>
                </Container>
                {!isLoading &&
                  <ModalResult ref={finalRef} shaId={data.id} movieOrder={data.order} loseLife={loseLife} newMovie={newMovie} />
                }
              </Box>
              <Footer />
            </Flex>
            )}
      </div>
    </>
  )
}

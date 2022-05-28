import Head from 'next/head'
import useSWR from 'swr'
import React from 'react'
import { awaitFetcher } from 'lib/fetcher'
import useTranslation from 'next-translate/useTranslation'
import { Container, Flex, Spacer, Box } from '@chakra-ui/react'
import MovieSelector from 'components/MovieSelector'
import useStore from 'store/store'
import ScoreView from 'components/ScoreView'
import Timer from 'components/Timer'
import Lifes from 'components/Lifes'
import ModalResult from 'components/ModalResult'
import ImageVisor from 'components/ImageVisor'

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
          <>
            <ScoreView />
            <Lifes />
            <ImageVisor {...data} />
            <Container maxW='container.md'>
              <Flex>
                <Timer />
                <Box flex='1'><MovieSelector ref={finalRef} /></Box>
              </Flex>
            </Container>
            <ModalResult ref={finalRef} shaId={data.id} movieOrder={data.order} loseLife={loseLife} newMovie={newMovie} />
          </>
        )}
      </div>
    </>
  )
}

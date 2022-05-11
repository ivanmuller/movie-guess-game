import Head from 'next/head'
import useSWR from 'swr'
import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Container, Flex } from '@chakra-ui/react'
import MovieSelector from 'components/MovieSelector'
import useStore from 'store/store'
import Score from 'components/Score'
import Timer from 'components/Timer'
import Lifes from 'components/Lifes'
import ModalResult from 'components/ModalResult'
import ImageVisor from 'components/ImageVisor'

export default function Home (props) {
  const { t } = useTranslation('common')

  const resetTime = useStore(state => state.resetTime)
  const resetLifes = useStore(state => state.resetLifes)
  const resetScore = useStore(state => state.resetScore)
  const resetAnswer = useStore(state => state.resetAnswer)
  const lifes = useStore(state => state.lifes)
  const decreaseLifes = useStore(state => state.decreaseLifes)

  const finalRef = React.useRef()

  const { data, mutate, error } = useSWR('/api/getRandomMovie')
  const isLoading = !data && !error
  const isReady = !error && !isLoading

  const newMovie = () => {
    mutate().then(() => {
      resetTime()
      resetAnswer()
    })
  }

  const newGame = () => {
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
            <Container maxW='container.md'>
              <Flex align='center' justify='center'>
                <Score />
                <Lifes />
              </Flex>
            </Container>
            <ImageVisor {...data} />
            <Container maxW='container.md'>
              <MovieSelector ref={finalRef} />
              <Timer />
            </Container>
            <ModalResult ref={finalRef} shaId={data.id} loseLife={loseLife} newMovie={newMovie} />
          </>
        )}
      </div>
    </>
  )
}

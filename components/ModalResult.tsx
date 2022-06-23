import React, { useState, useEffect } from 'react'
import Confetti from 'react-confetti'
import useTranslation from 'next-translate/useTranslation'
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Text } from '@chakra-ui/react'
import useStore from 'store/store'
import { encrypt } from 'lib/encryption'
import MovieData from 'components/ModalResultMovieData'
import Lifes from 'components/Lifes'
import { IModalResults } from 'interfaces'
import useLoseLife from 'controllers/useLoseLife'

const ModalResult = React.forwardRef(({ shaId, movieOrder, newMovie }: IModalResults, ref): JSX.Element => {
  const { t } = useTranslation('common')

  const [status, setStatus] = useState<number>(0) // 0:incorrect | 1:correct | 2:lose
  const answer = useStore(state => state.answer)
  const encriptedAnswerId = encrypt(answer)
  const score = useStore(state => state.score)
  const time = useStore(state => state.time)
  const lifes = useStore(state => state.lifes)
  const scorePrev = useStore(state => state.score)
  const answerPopupOpened = useStore(state => state.answerPopupOpened)
  const addHistory = useStore(state => state.addHistory)
  const modifyScore = () => useStore.setState({ score: scorePrev + time })
  const closePopup = () => useStore.setState({ answerPopupOpened: false })

  const loseLife = useLoseLife()

  const onFinishRound = () => {
    closePopup()
    newMovie()
    if (encriptedAnswerId === shaId) {
      modifyScore()
    } else {
      loseLife()
    }
  }
  const onOpen = () => {
    addHistory(movieOrder)
    if (encriptedAnswerId === shaId) {
      setStatus(1)
    } else if (lifes === 1) {
      setStatus(2)
    } else {
      setStatus(0)
    }
  }

  useEffect(() => {
    if (answerPopupOpened) onOpen()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answerPopupOpened])

  const initialRef = React.useRef<HTMLButtonElement>(null)
  const finalRef : any = ref

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
        blockScrollOnMount={false}
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={answerPopupOpened}
        motionPreset='slideInBottom'
        isCentered
        size='xl'
        onClose={() => false}
      >
        {status === 1 && (
          <Confetti
            confettiSource={{ x: window.innerWidth / 4, y: window.innerHeight / 2, w: window.innerWidth / 2, h: 10 }}
            colors={['#272042', '#342E59', '#000', '#FFF']}
          />
        )}
        <ModalOverlay bg='rgbas.black06' />
        <ModalContent backgroundColor="brand.base">
          <ModalHeader><Text as='h2' fontSize='40px'>{status === 1 ? t('result.correct') : t('result.incorrect')}</Text></ModalHeader>
          <ModalBody>
            {status === 0 && (
              // Incorrect answer
              <Text as='div' layerStyle='modalBody'>
                <Lifes override={lifes - 1} />
                <Text as='span' mt={4} layerStyle='modalBodyLighter'>{lifes - 1} {lifes - 1 === 1 ? t('lifes.singular') : t('lifes.plural')} {t('lifes.append')}</Text>
              </Text>
            )}

            {status === 1 && (
              // Correct answer
              <>
                <Text as='div' layerStyle='modalBody'>
                  {t('score.new')} {score + time}
                  <Text as='span' layerStyle='modalBodyLighter'> (+{time})</Text>
                </Text>
                <MovieData />
              </>
            )}

            {status === 2 && (
              // Incorrect answer: Game Over
              <>
                <Text as='div' align='center' layerStyle='modalBody'>
                  {t('result.gameOver')}<br /><Text as='span' layerStyle='modalBodyLighter'>{t('score.final')} {score}</Text>
                </Text>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='gray' mt={4} onClick={onFinishRound} ref={initialRef}>
              {status === 2 ? t('actions.new') : t('actions.next')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
})

ModalResult.displayName = 'ModalResult'
export default ModalResult

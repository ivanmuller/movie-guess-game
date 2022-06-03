import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Text } from '@chakra-ui/react'
import useStore from 'store/store'
import { encrypt } from 'lib/encryption'
import MovieData from 'components/ModalResultMovieData'
import Lifes from 'components/Lifes'
import { IModalResults } from 'interfaces'

const ModalResult = React.forwardRef(({ shaId, movieOrder, loseLife, newMovie }: IModalResults, ref): JSX.Element => {
  const [status, setStatus] = useState<number>(0) // 0:incorrect | 1:correct | 2:lose
  const answer = useStore(state => state.answer)
  const encriptedAnswerId = encrypt(answer)
  const score = useStore(state => state.score)
  const time = useStore(state => state.time)
  const lifes = useStore(state => state.lifes)
  const triggerTime = useStore(state => state.triggerTime)
  const scorePrev = useStore(state => state.score)
  const answerPopupOpened = useStore(state => state.answerPopupOpened)
  const addHistory = useStore(state => state.addHistory)
  const modifyScore = () => useStore.setState({ score: scorePrev + time })
  const closePopup = () => useStore.setState({ answerPopupOpened: false })

  const onFinishRound = () => {
    closePopup()
    triggerTime()
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
        <ModalOverlay backdropFilter='blur(4px)' bg='rgbas.black06' />
        <ModalContent backgroundColor="brand.base">
          <ModalHeader><Text as='h2' fontSize='40px'>{status === 1 ? 'You\'re right!' : 'Fail!'}</Text></ModalHeader>
          <ModalBody>
            {status === 0 && (
              // Incorrect answer
              <Text as='div' layerStyle='modalBody'>
                <Lifes override={lifes - 1} />
                <Text as='span' mt={4} layerStyle='modalBodyLighter'>{lifes - 1} {lifes - 1 === 1 ? 'life' : 'lifes'} left</Text>
              </Text>
            )}

            {status === 1 && (
              // Correct answer
              <>
                <Text as='div' layerStyle='modalBody'>
                  New score: {score + time}
                  <Text as='span' layerStyle='modalBodyLighter'> (+{time})</Text>
                </Text>
                <MovieData />
              </>
            )}

            {status === 2 && (
              // Incorrect answer: Game Over
              <>
                <Text as='div' align='center' layerStyle='modalBody'>
                  Game Over <br /><Text as='span' layerStyle='modalBodyLighter'>Your final Score: {score}</Text>
                </Text>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='gray' mt={4} onClick={onFinishRound} ref={initialRef}>
              {status === 2 ? 'New Game' : 'Next Movie'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
})

ModalResult.displayName = 'ModalResult'
export default ModalResult

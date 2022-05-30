import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, Text } from '@chakra-ui/react'
import useStore from 'store/store'
import { encrypt } from 'lib/encryption'
import MovieData from 'components/ModalResultMovieData'
import Lifes from 'components/Lifes'
import { ModalResultsProps } from 'types'

const ModalResult = React.forwardRef(({ shaId, movieOrder, loseLife, newMovie }: ModalResultsProps, ref): JSX.Element => {
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
        <ModalOverlay backdropFilter='blur(4px)' bg='rgba(0,0,0,0.6)' />
        <ModalContent backgroundColor="#272042">
          <ModalHeader><Text as='h2' fontSize='40px'>{status === 1 ? 'You\'re right!' : 'Nope...'}</Text></ModalHeader>
          <ModalBody>
            {status === 0 && (
              <Text as='p' borderY='1px' py='12px' borderColor='rgba(255,255,255,0.2)' fontSize='25px' mb='25px'>
                <Lifes override={lifes - 1} />
                <Text fontSize='18px' mt='12px' color='rgba(255,255,255,0.7)'>{lifes - 1} {lifes - 1 === 1 ? 'life' : 'lifes'} left</Text>
              </Text>
            )}

            {status === 1 && (
              <>
                <Text as='p' borderY='1px' py='12px' borderColor='rgba(255,255,255,0.2)' fontSize='25px' mb='25px'>
                  New score: {score + time}
                  <Text as='span' fontSize='18px' color='rgba(255,255,255,0.7)'> (+{time})</Text>
                </Text>
                <MovieData />
              </>
            )}

            {status === 2 && (
              <>
                <Text as='p' align='center' borderY='1px' py='12px' borderColor='rgba(255,255,255,0.2)' fontSize='25px' mb='25px'>
                  Game Over <br /><Text as='span' fontSize='18px' color='rgba(255,255,255,0.7)'>Your final Score: {score}</Text>
                </Text>
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='gray' mt={3} onClick={onFinishRound} ref={initialRef}>
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

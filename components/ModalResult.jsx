import React, { useState, useEffect } from 'react'
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody } from '@chakra-ui/react'
import useStore from 'store/store'
import { encrypt } from 'lib/encryption'

// eslint-disable-next-line react/display-name
const ModalResult = React.forwardRef(({ shaId, loseLife, newMovie }, ref) => {
  const [status, setStatus] = useState(0) // 0:incorrect | 1:correct | 2:lose
  const answer = useStore(state => state.answer)
  const encriptedMovieId = encrypt(answer)
  const score = useStore(state => state.score)
  const time = useStore(state => state.time)
  const lifes = useStore(state => state.lifes)
  const triggerTime = useStore(state => state.triggerTime)
  const scorePrev = useStore(state => state.score)
  const answerPopupOpened = useStore(state => state.answerPopupOpened)
  const modifyScore = () => useStore.setState({ score: scorePrev + time })
  const closePopup = () => useStore.setState({ answerPopupOpened: false })

  const onFinishRound = () => {
    closePopup()
    triggerTime()
    newMovie()
    if (encriptedMovieId === shaId) {
      modifyScore()
    } else {
      loseLife()
    }
  }

  useEffect(() => {
    const onOpen = () => {
      if (encriptedMovieId === shaId) {
        setStatus(1)
        // call getMovie
      } else if (lifes === 1) {
        setStatus(2)
      } else {
        setStatus(0)
      }
    }
    onOpen()
  }, [answerPopupOpened])
  /* --- OJO QUE ESTO SE PUEDE ESTAR RENDERIZANDO CUANDO SE CIERRA TAMBIEN */

  const initialRef = React.useRef()
  const finalRef = ref

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
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{status === 1 ? 'Correct!' : 'Incorrect'}</ModalHeader>
          <ModalBody>
            {status === 0 && (
              <>You&apos;ve lost a life,  {lifes - 1} lifes left</>
            )}

            {status === 1 && (
              <>You earned: {time} points!</>
            )}

            {status === 2 && (
              <>
                <strong>You are Terminated!</strong><br />
                You&apos;ve earned {score} points
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onFinishRound} ref={initialRef}>
              {status === 2 ? 'New Game' : 'Ok, Next!'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
})

export default ModalResult

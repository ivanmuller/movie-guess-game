import React, { useState, useEffect, useCallback } from 'react'
import { CircularProgress, CircularProgressLabel, Box, Text } from '@chakra-ui/react'
import settings from 'settings'
import useStore from 'store/store'
import useInterval from 'lib/useInterval'

function Timer ({ isLoading }): JSX.Element {
  const time = useStore(state => state.time)
  const noSignal = useStore(state => state.noSignal)
  const timeRunning = useStore(state => state.timeRunning)
  const decreaseTime = useStore(state => state.decreaseTime)
  const loseTime = useStore(state => state.loseTime)
  const setAnswer = useStore(state => state.setAnswer)
  const pauseTime = useStore(state => state.pauseTime)
  const openPopup = () => useStore.setState({ answerPopupOpened: true })
  const [timeDecimal, setTimeDecimal] = useState(time)

  useInterval(() => {
    if (timeRunning && time !== 0) {
      decreaseTime()
    }
  }, 1000)

  useInterval(() => {
    if (timeRunning && time !== 0) {
      setTimeDecimal(timeDecimal - 0.2)
    }
  }, 200)

  useEffect(() => {
    setTimeDecimal(time)
    if (time <= 0) {
      openPopup()
      setAnswer(null)
      pauseTime()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time])

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      loseTime(settings.timeSkip)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', escFunction)
    return () => {
      document.removeEventListener('keydown', escFunction)
    }
  }, [escFunction])

  return (
    <Box>
      <CircularProgress
        isIndeterminate={noSignal || isLoading}
        value={timeDecimal}
        trackColor='rgbas.white04'
        color='brand.white'
        // @ts-ignore:next-line
        size={{ base: '100px', md: null, lg: '140px' }}
        thickness='4px'
        min={0}
        max={settings.time}>
        <CircularProgressLabel>
          <Text as='h3' fontSize={{ base: '25px', md: null, lg: '50px' }} align="center">{time < 0 ? 0 : time}</Text>
        </CircularProgressLabel>
      </CircularProgress>
    </Box>
  )
}

export default Timer

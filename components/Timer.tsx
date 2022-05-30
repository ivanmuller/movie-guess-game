import settings from 'settings'
import React, { useState, useEffect } from 'react'
import useStore from 'store/store'
import useInterval from 'lib/useInterval'
import { CircularProgress, CircularProgressLabel, Box, Text } from '@chakra-ui/react'

function Timer (): JSX.Element {
  const time = useStore(state => state.time)
  const timeRunning = useStore(state => state.timeRunning)
  const decreaseTime = useStore(state => state.decreaseTime)
  const setAnswer = useStore(state => state.setAnswer)
  const triggerTime = useStore(state => state.triggerTime)
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
    if (time === 0) {
      openPopup()
      setAnswer(null)
      triggerTime()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time])

  return (
    <Box>
      <CircularProgress value={timeDecimal} trackColor='rgba(255,255,255,0.4)' color='rgba(255,255,255,1)' size={{ base: '100px', md: null, lg: '140px'}} thickness='4px' min={0} max={settings.time}>
        <CircularProgressLabel>
          <Text as='h3' fontSize={{ base: '25px', md: null, lg: '50px' }} align="center">{time}</Text>
        </CircularProgressLabel>
      </CircularProgress>
    </Box>
  )
}

export default Timer

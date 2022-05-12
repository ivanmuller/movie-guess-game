import settings from 'settings'
import React, { useState, useEffect } from 'react'
import useStore from 'store/store'
import useInterval from 'lib/useInterval'
import { CircularProgress, CircularProgressLabel, Box } from '@chakra-ui/react'

function Timer () {
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
    setTimeDecimal(settings.time)
    if (time === 0) {
      openPopup()
      setAnswer(0)
      triggerTime()
    }
  }, [time])

  return (
    <Box>
      <CircularProgress value={timeDecimal} size='100px' thickness='2px' min='0' max={settings.time}>
        <CircularProgressLabel>{time}</CircularProgressLabel>
      </CircularProgress>
    </Box>
  )
}

export default Timer

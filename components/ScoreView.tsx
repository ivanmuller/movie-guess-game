import React from 'react'
import useStore from 'store/store'
import { Text } from '@chakra-ui/react'

function ScoreView (): JSX.Element {
  const score = useStore(state => state.score)

  return (
    <Text as='h3' fontSize="25px" mt="10px" align="right" textShadow='0 0 4px #000'>Score: {score}</Text>
  )
}

export default ScoreView

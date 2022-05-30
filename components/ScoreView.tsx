import React from 'react'
import useStore from 'store/store'
import { Text } from '@chakra-ui/react'

function ScoreView (): JSX.Element {
  const score = useStore(state => state.score)

  return (
    <Text as='h3' fontSize="25px" mt="10px" align="right" textShadow='1px 1px 2px #000'>Score: {score}</Text>
  )
}

export default ScoreView

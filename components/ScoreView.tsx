import React from 'react'
import useStore from 'store/store'
import { Box } from '@chakra-ui/react'

function ScoreView (): JSX.Element {
  const score = useStore(state => state.score)

  return (
    <Box>
      Score: {score}
    </Box>
  )
}

export default ScoreView
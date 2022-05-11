import React from 'react'
import useStore from 'store/store'
import Box from 'components/Score'

function Score () {
  const score = useStore(state => state.score)

  return (
    <Box>
      Score: {score}
    </Box>
  )
}

export default Score

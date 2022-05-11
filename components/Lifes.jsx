import React from 'react'
import useStore from 'store/store'

function Lifes () {
  const lifes = useStore(state => state.lifes)

  return (
    <>
      Lifes: {lifes}
    </>
  )
}

export default Lifes

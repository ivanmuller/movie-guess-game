import React from 'react'
import { Image, Flex } from '@chakra-ui/react'
import useStore from 'store/store'
import settings from 'settings'

import lifeFull from 'public/life-full.svg'
import lifeEmpty from 'public/life-empty.svg'

function Lifes ({ override = null }): JSX.Element {
  const currentLifes = useStore(state => state.lifes)
  const lifesMap = []
  for (let index = 0; index < settings.lifes; index++) {
    lifesMap.push(<Image alt='' src={(override || currentLifes) > index ? lifeFull.src : lifeEmpty.src} w='40px' h='32px' filter='drop-shadow(1px 1px 1px rgba(255, 255,255,0.5))' />)
  }
  return (
    <Flex gap={2}>
      {lifesMap}
    </Flex>
  )
}

export default Lifes

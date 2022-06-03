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
    lifesMap.push(<Image alt='' key={'index' + index} src={(override || currentLifes) > index ? lifeFull.src : lifeEmpty.src} layerStyle='lifeImg' />)
  }
  return (
    <Flex gap={2}>
      {lifesMap}
    </Flex>
  )
}

export default Lifes

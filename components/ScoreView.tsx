import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import { Text } from '@chakra-ui/react'
import useStore from 'store/store'

function ScoreView (): JSX.Element {
  const { t } = useTranslation('common')
  const score = useStore(state => state.score)

  return (
    <Text as='h3' fontSize="25px" mt={3} align="right" textShadow='1px 1px 2px #000'>{t('score.title')} {score}</Text>
  )
}

export default ScoreView

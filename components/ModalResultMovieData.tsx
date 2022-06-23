import React from 'react'
import useSWR from 'swr'
import useTranslation from 'next-translate/useTranslation'
import { Flex, Box, Text } from '@chakra-ui/react'
import settings from 'settings'
import useStore from 'store/store'
import { awaitFetcher } from 'lib/fetcher'

const MovieData = (): JSX.Element => {
  const { t } = useTranslation('common')

  const answer = useStore(state => state.answer)
  const { data, error } = useSWR(answer, () => awaitFetcher(`/api/getMovie?id=${answer}`))
  const isLoading = !data && !error
  const isReady = !error && !isLoading

  return (
    <>
      {isReady && (
        <Flex gap={6}>
          <Box w='190px' h='285px'><img src={settings.urls.imageBaseBackdrop(data.poster_path)} /></Box>
          <Box flex='1'>
            <Text as='h3' layerStyle='heading2'>{data.original_title}</Text>
            <p>{data.release_date?.split('-')[0]}</p>
            <p>{data.vote_average} {t('movieData.outof')} ({data.vote_count} {t('movieData.votes')})</p>
            <p>{data.runtime} {t('movieData.minutes')}</p>
          </Box>
        </Flex>
      )}
    </>
  )
}

export default MovieData

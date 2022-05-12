import settings from 'settings'
import React from 'react'
import useSWR from 'swr'
import useStore from 'store/store'
import { Flex, Box } from '@chakra-ui/react'

// eslint-disable-next-line react/display-name
const MovieData = () => {
  const answer = useStore(state => state.answer)

  const { data, error } = useSWR(`/api/getMovie?id=${answer}`)
  const isLoading = !data && !error
  const isReady = !error && !isLoading
  const year = data?.release_date && data?.release_date.split('-')[0]
  
  return (
    <>
      {isReady && (
        <Flex gap='6'>
          <Box w='100px'><img src={settings.urls.imageBaseBackdrop(data.poster_path)} /></Box>
          <Box flex='1'>
            <h3>{data.original_title} - {year}</h3>
            <p>{data.overview}</p>
          </Box>
        </Flex>
      )}
    </>
  )
}

export default MovieData
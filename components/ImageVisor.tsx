import settings from 'settings'
import React, { useState, useEffect } from 'react'
import { Center, Image, Box } from '@chakra-ui/react'
import { ImageVisorProps } from 'types'

const Cap = ({ type }) => {
  const gradient = `linear(to-${type}, rgba(0,0,0,0), rgba(0,0,0,1))`
  return (
    <Box position='relative' w='100px' mr={type === 'r' ? 0 : '-99px'} ml={type === 'l' ? 0 : '-99px'} bgGradient={gradient} ></Box>
  )
}

function ImageVisor ({ filePath, filePathAlt }: ImageVisorProps): JSX.Element {
  const [showingImg, setShowingImg] = useState<string>('')

  useEffect(() => {
    setShowingImg(filePath)
  }, [filePath])

  useEffect(() => {
    const changePic = setTimeout(() => {
      setShowingImg(filePathAlt)
    }, ((settings.time + 1) * 1000 / 2))
    return () => clearTimeout(changePic)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showingImg])

  return (
    <Center backgroundColor='#000' alignItems="stretch" position="relative">
      <Cap type="l"></Cap>
      <Image
        width='1280px' height='70vh'
        objectFit='cover'
        src={settings.urls.imageBaseBackdrop(showingImg)}
        alt=''
      />
      <Cap type="r"></Cap>
      <Box position='absolute' w='100%' height='50%' bottom='0' bgGradient='linear(to-b, rgba(0,0,0,0), rgba(0,0,0,1))'></Box>
    </Center>
  )
}

export default ImageVisor

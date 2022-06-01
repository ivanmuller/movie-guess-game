import React, { useState, useEffect } from 'react'
import { Center, Image, Box } from '@chakra-ui/react'
import settings from 'settings'
import { IImageVisor } from 'interfaces'

const Cap = ({ type }: { type:string }) => {
  const gradient = `linear(to-${type}, rgbas.black0, rgbas.black1)`
  return (
    <Box position='relative' w='100px' mr={type === 'r' ? 0 : '-99px'} ml={type === 'l' ? 0 : '-99px'} bgGradient={gradient} ></Box>
  )
}

function ImageVisor ({ filePath, filePathAlt }: IImageVisor): JSX.Element {
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
    <Center backgroundColor='brand.black' alignItems="stretch" position="relative">
      <Cap type='l'></Cap>
      <Image
        w='1280px' h={['50vh', null, '70vh']}
        objectFit='cover'
        src={settings.urls.imageBaseBackdrop(showingImg)}
        alt=''
      />
      <Cap type='r'></Cap>
      <Box position='absolute' w='100%' height='50%' bottom={0} bgGradient='linear(to-b, rgbas.black0, rgbas.black1)'></Box>
    </Center>
  )
}

export default ImageVisor

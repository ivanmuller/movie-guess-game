import settings from 'settings'
import React, { useState, useEffect } from 'react'
import { Center } from '@chakra-ui/react'
import { ImageVisorProps } from 'types'

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
    <Center>
      <img src={settings.urls.imageBaseBackdrop(showingImg)} alt='' />
    </Center>
  )
}

export default ImageVisor

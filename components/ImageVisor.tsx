import settings from 'settings'
import React, { useState, useEffect } from 'react'
import { Center } from '@chakra-ui/react'

function ImageVisor ({ filePath, filePathAlt }) {
  const [showingImg, setShowingImg] = useState()

  useEffect(() => {
    setShowingImg(filePath)
  }, [filePath])

  useEffect(() => {
    const changePic = setTimeout(() => {
      setShowingImg(filePathAlt)
    }, ((settings.time + 1) * 1000 / 2))
    return () => clearTimeout(changePic)
  }, [showingImg])

  return (
    <Center>
      <img src={settings.urls.imageBaseBackdrop(showingImg)} alt='' />
    </Center>
  )
}

export default ImageVisor

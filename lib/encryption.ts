// @ts-nocheck
import SHA512 from 'crypto-js/sha512.js'

export const encrypt = (str: string) => {
  const shaText = SHA512(str)
  return encodeURIComponent(shaText.toString())
}

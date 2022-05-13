import SHA512 from 'crypto-js/SHA512'

export const encrypt = (str: string) => {
  const shaText = SHA512(str)
  return encodeURIComponent(shaText.toString())
}

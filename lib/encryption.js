import SHA512 from 'crypto-js/SHA512'
import settings from 'settings'

export const encrypt = (str) => {
  const shaText = SHA512(str + settings.SHA512addition)
  return encodeURIComponent(shaText.toString())
}

/* eslint-disable @typescript-eslint/no-var-requires */
/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate')

const nextConfig = {
  reactStrictMode: false,
  typescript: {
    ignoreBuildErrors: false
  },
  ...nextTranslate()
}

module.exports = nextConfig

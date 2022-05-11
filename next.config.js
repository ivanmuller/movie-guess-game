/** @type {import('next').NextConfig} */
const nextTranslate = require('next-translate')

const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: false
  },
  ...nextTranslate()
}

module.exports = nextConfig

import Document, { Head, Html, Main, NextScript } from 'next/document'
import settings from 'settings'
import React from 'react'

export default class MyDocument extends Document {
  render () {
    return (
      <Html lang='en'>
        <Head>
          <meta name='description' content={settings.appTitle} />
          <link rel='icon' href='/favicon.png' />
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='true' />
          <link href='https://fonts.googleapis.com/css2?family=Inter:wght@300;900&display=swap' rel='stylesheet' />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

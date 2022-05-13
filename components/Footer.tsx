import Link from 'next/link'
import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import i18nData from 'i18n.json'
import Image from 'next/image'
import logoGithub from 'public/github.png'
import { Container } from '@chakra-ui/react'

export default function Footer (): JSX.Element {
  const { locales } = i18nData
  const { t, lang } = useTranslation('common')

  return (
    <Container>
      <ul>
        {locales.map((lng) =>
          <li key={lng}>
            <Link href='/' locale={lng} key={lng} passHref>
              <a className={lang === lng ? 'active' : ''}>{t(`language-name-${lng}`)}</a>
            </Link>
          </li>
        )}
      </ul>
      <span>
        @2022 <a href='https://github.com/ivanmuller/usdblue' target='_blank' rel='noreferrer'>Iván Müller <Image alt='Iván Müller Github' src={logoGithub} width={16} height={16} /></a>
      </span>
    </Container>
  )
}

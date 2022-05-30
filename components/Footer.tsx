import Link from 'next/link'
import React from 'react'
import useTranslation from 'next-translate/useTranslation'
import i18nData from 'i18n.json'
import logoGithub from 'public/github.png'
import { Container, UnorderedList, ListItem, Text, Image } from '@chakra-ui/react'

export default function Footer (): JSX.Element {
  const { locales } = i18nData
  const { t, lang } = useTranslation('common')

  return (
    <Container maxW='container.sm' height='60px' display='flex' justifyContent='flex-end' alignItems='center' gap={6}>
      <UnorderedList styleType='none' margin='0' display='flex' gap={4}>
        {locales.map((lng) =>
          <ListItem key={lng}>
            <Link href='/' locale={lng} key={lng} passHref>
              <Text as='a' textTransform='uppercase' borderBottom={lang === lng ? '1px' : ''}>{t(`language-name-${lng}`)}</Text>
            </Link>
          </ListItem>
        )}
      </UnorderedList>
      <span>
        @2022 <Text as='a' href='https://github.com/ivanmuller' target='_blank' rel='noreferrer' _hover={{ borderBottom: '1px' }}>Iván Müller <Image display='inline-block' verticalAlign='baseline' alt='Iván Müller Github' src={logoGithub.src} w='16px' h='16px' /></Text>
      </span>
    </Container>
  )
}

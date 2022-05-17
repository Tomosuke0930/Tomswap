import { Link as ChakraLink, LinkProps } from '@chakra-ui/react'
import NextLink from 'next/link'

export const MyLink = (props: LinkProps & { href: string }) => {
  return (
    <NextLink href={props.href}>
      <ChakraLink _hover={{ textDecor: 'none' }} {...props} />
    </NextLink>
  )
}

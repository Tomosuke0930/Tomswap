import { Box, Container, ContainerProps } from '@chakra-ui/react'
import { ReactNode, VFC } from 'react'
import { Header } from '../components/Header'

type Props = ContainerProps & {
  children: ReactNode
}

export const Layout: VFC<Props> = ({ children, maxW = '6xl' }) => {
  return (
    <>
      <Container maxW={maxW}>
        <Header />
        {children}
        <Box h='16' />
      </Container>
    </>
  )
}

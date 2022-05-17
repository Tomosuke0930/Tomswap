import { Box, Button, Center, Flex, Heading, Spacer } from '@chakra-ui/react'
import { ConnectWallet } from './ConnectWallet'
import { MyLink } from './MyLink'

export const Header = () => {
  return (
    <Box>
      <Flex textAlign='center' pt={12} px={24}>
        <Spacer />
        <Spacer />
        <Heading textAlign='center' color='white'>
          TomSwap 🦄
        </Heading>
        <Spacer />
        <ConnectWallet />
      </Flex>
      <Flex>
        <Spacer />
        <Center bg='#181B1E' borderRadius='full' mt='4' p='0.5'>
          <Button
            _hover={{ bg: '#2D242E' }}
            bg='#181B1E'
            borderRadius='full'
            size='xs'
            m='0.5'
            color='white'
          >
            <MyLink href='/'> Swap</MyLink>
          </Button>
          <Button
            _hover={{ bg: '#2D242E' }}
            bg='#181B1E'
            borderRadius='full'
            size='xs'
            m='0.5'
            color='white'
          >
            <MyLink href='/pool'>Pool</MyLink>
          </Button>
          <Button
            _hover={{ bg: '#2D242E' }}
            bg='#181B1E'
            borderRadius='full'
            size='xs'
            m='0.5'
            color='white'
          >
            <MyLink href='/farm'> Farm</MyLink>
          </Button>
        </Center>
        <Spacer />
      </Flex>
    </Box>
  )
}

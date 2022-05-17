import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Spacer,
  Text,
} from '@chakra-ui/react'
import type { NextPage } from 'next'
import { ConnectWallet } from '../components/ConnectWallet'
import { ArrowDownIcon, SettingsIcon } from '@chakra-ui/icons'
import { Header } from '../components/Header'
import { Layout } from '../layout'

const Home: NextPage = () => {
  return (
    <Layout color='base.dark'>
      <Box bg='#181B1E' mx='60' my='4' borderRadius='18'>
        <Flex color='white' px='8' py='2'>
          <Box>Swap 🔄</Box>
          <Spacer />
          <SettingsIcon />
        </Flex>
        <Box p={2}>
          <Box mx={8}>
            <InputGroup size='md' bg='#212429' p={4} borderRadius='lg'>
              <Input
                pr='4.5rem'
                variant='unstyled'
                placeholder='0.00'
                fontSize='xl'
              />
              <InputRightElement width='4.5rem' pt={4} mr={4} mt='1'>
                <Box>
                  <Flex bg='#2D2F34' borderRadius='lg' px={2} py={1}>
                    <Image
                      boxSize='28px'
                      mr='2'
                      src='https://cryptologos.cc/logos/usd-coin-usdc-logo.png'
                      alt='usdc'
                    />
                    <Text color='white' fontSize='sm'>
                      TFT
                    </Text>
                  </Flex>
                  <Flex mt='1'>
                    <Text fontSize='xs' mr='2'>
                      Balance
                    </Text>
                    <Text fontSize='xs'>0.00</Text>
                  </Flex>
                </Box>
              </InputRightElement>
            </InputGroup>
          </Box>
          <Center>
            <IconButton
              bg='base.dark'
              color='white'
              borderRadius='full'
              aria-label='Search database'
              icon={<ArrowDownIcon />}
              my='-2'
              zIndex='1'
              height='8'
            />
          </Center>
          <Box mx={8}>
            <InputGroup size='md' bg='#212429' p={4} borderRadius='lg'>
              <Input
                pr='4.5rem'
                variant='unstyled'
                placeholder='0.00'
                fontSize='xl'
              />
              <InputRightElement width='4.5rem' pt={4} mr={4} mt='1'>
                <Box>
                  <Flex bg='#2D2F34' borderRadius='lg' px={2} py={1}>
                    <Image
                      boxSize='28px'
                      mr='2'
                      src='https://cryptologos.cc/logos/usd-coin-usdc-logo.png'
                      alt='usdc'
                    />
                    <Text color='white' fontSize='sm'>
                      TFT
                    </Text>
                  </Flex>
                  <Flex mt='1'>
                    <Text fontSize='xs' mr='2'>
                      Balance
                    </Text>
                    <Text fontSize='xs'>0.00</Text>
                  </Flex>
                </Box>
              </InputRightElement>
            </InputGroup>
          </Box>
        </Box>
        <Center pb='8' pt='4'>
          <Button colorScheme='blue' px='36'>
            Swap
          </Button>
        </Center>
      </Box>
    </Layout>
  )
}

export default Home

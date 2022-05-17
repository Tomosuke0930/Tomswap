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

export const Stake = () => {
  return (
    <Box>
      <Box p={2}>
        <Box mx='4'>
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
                  <Center color='white' fontSize='xs'>
                    TFLPT
                  </Center>
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
      <Center my='8'>
        <Button colorScheme='blue' px='24'>
          Stake
        </Button>
      </Center>
    </Box>
  )
}

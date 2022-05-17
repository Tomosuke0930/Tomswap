import {
  Box,
  Button,
  Center,
  Flex,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { SettingsIcon } from '@chakra-ui/icons'

import { Layout } from '../layout'
import { useState } from 'react'
import { Stake } from '../components/farm/Stake'
import { Unstake } from '../components/farm/Unstake'

export default function Farm() {
  const colors = useColorModeValue(
    ['#181B1E', '#181B1E'],
    ['#181B1E', '#181B1E']
  )
  const [tabIndex, setTabIndex] = useState(0)
  const bg = colors[tabIndex]
  return (
    <Layout color='base.dark'>
      <Box bg='#181B1E' mx='60' my='4' borderRadius='18' color='white'>
        <Flex color='white' px='8' py='2'>
          <Box>Farm 👨‍🌾</Box>
          <Spacer />
        </Flex>
        <Center>
          <Button colorScheme='cyan' px='24' mt='8' color='#FFDE00'>
            🤑 Claim 🤑
          </Button>
        </Center>
        <Center mt='4'>
          <Text>Claimable:</Text>
          <Text fontSize='xl' pl='2' as='b'>
            0.00
          </Text>
          <Text pl='1'>XTFT</Text>
        </Center>
        <Tabs
          onChange={(index: number) => setTabIndex(index)}
          bg={bg}
          borderBottomRadius='18'
          color='white'
        >
          <Flex>
            <Spacer />
            <Center bg='#181B1E' mt='4' p='0.5'>
              <TabList>
                <Tab fontSize='xs' color='white'>
                  Stake
                </Tab>
                <Tab fontSize='xs' color='white'>
                  Unstake
                </Tab>
              </TabList>
            </Center>
            <Spacer />
          </Flex>
          <TabPanels h='270' borderRadius='full'>
            <TabPanel>
              <Stake />
            </TabPanel>
            <TabPanel>
              <Unstake />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Layout>
  )
}

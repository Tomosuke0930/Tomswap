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
import { useState } from 'react'
import { AddLiquidity } from '../components/pool/AddLiquidity'
import { RemoveLiquidity } from '../components/pool/RemoveLiquidity'
import { Layout } from '../layout'

export default function Liquidity() {
  const colors = useColorModeValue(
    ['#181B1E', '#181B1E'],
    ['#181B1E', '#181B1E']
  )
  const [tabIndex, setTabIndex] = useState(0)
  const bg = colors[tabIndex]
  return (
    <Layout>
      <Box bg='#181B1E' mx='60' my='4' borderRadius='18'>
        <Box color='white' px='8' py='2'>
          <Box>Pool💧</Box>
        </Box>
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
                  Add
                </Tab>
                <Tab fontSize='xs' color='white'>
                  Remove
                </Tab>
              </TabList>
            </Center>
            <Spacer />
          </Flex>
          <TabPanels h='400' borderRadius='full'>
            <TabPanel>
              <AddLiquidity />
            </TabPanel>
            <TabPanel>
              <RemoveLiquidity />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Layout>
  )
}

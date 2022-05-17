import { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import { shortenAddress } from '../lib'

export const ConnectWallet = () => {
  const injectedConnector = new InjectedConnector({
    supportedChainIds: [1, 3, 4, 5, 42],
  })
  const { chainId, account, activate, active, library } =
    useWeb3React<Web3Provider>()
  const onClick = () => {
    activate(injectedConnector)
  }

  useEffect(() => {
    console.log(chainId, account, active, library)
  })

  return (
    <Flex>
      {/* <div>ChainId: {chainId}</div> */}
      {chainId != 4 && (
        <Text
          my='auto'
          as='u'
          px='2'
          fontSize='lg'
          fontWeight='bold'
          color='red'
        >
          Change to Rinkeby
        </Text>
      )}
      {/* <div>Account: {account}</div> */}
      {active ? (
        <Button disabled variant='outline' colorScheme='pink'>
          {shortenAddress(account!.toString())}
        </Button>
      ) : (
        <Button colorScheme='pink' onClick={onClick}>
          Connect
        </Button>
      )}
    </Flex>
  )
}

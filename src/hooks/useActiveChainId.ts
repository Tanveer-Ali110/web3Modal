// import { useWeb3React } from '@web3-react/core'
import { useWeb3ModalProvider } from './useWeb3Modal'

const useActiveChainId = () => {
  // const { chainId } = useWeb3React()
  const { chainId } = useWeb3ModalProvider()
  return chainId ?? parseInt(process.env.REACT_APP_CHAIN_ID)
}

export default useActiveChainId

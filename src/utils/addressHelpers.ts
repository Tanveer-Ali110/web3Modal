import addresses from 'config/contract/address'
import { TokenConfig } from 'config/tokens'
// import { TokenConfig } from 'config/constants/tokens'
// import { Address } from 'config/constants/types'

export const getAddress = (address: any): string => {
  const mainNetChainId = 56
  const chainId = process.env.REACT_APP_CHAIN_ID
  if (!address) return null
  return address[chainId] ? address[chainId] : address[mainNetChainId]
}

export const getTokenAddress = (tokenConfig: TokenConfig) => {
  return getAddress(tokenConfig.address)
}

// export const getTokenAddress = () => {
//   return getAddress(addresses.token)
// }
export const getMulticallAddress = () => {
  return getAddress(addresses.multiCall)
}

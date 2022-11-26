import { chains, ChainId, Chain } from 'eth-chains'

export enum SupportedChainId {
  MAINNET = ChainId.EthereumMainnet,

  BSCMAINNET = ChainId.BinanceSmartChainMainnet,
  BSCTESTNET = ChainId.BinanceSmartChainTestnet,

  ARBITRUM_ONE = ChainId.ArbitrumOne,
}

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(SupportedChainId) as SupportedChainId[]

type ChainInfoList = { readonly [chainId in SupportedChainId]: Chain }

export const CHAIN_INFO: ChainInfoList = ALL_SUPPORTED_CHAIN_IDS.reduce(
  (val, id) => ({
    ...val,
    [id]: chains.getById(id),
  }),
  {},
)

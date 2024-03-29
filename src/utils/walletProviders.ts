import WalletConnect from "@walletconnect/web3-provider";
import { SecretType, WindowMode } from "@venly/connect";
import { Venly } from "@venly/web3-provider";
import getNodeUrl from "./getRpcUrl";

const rpcUrl = getNodeUrl();
const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10);
export const providerOptions = {
  injected: {
    package: null,
    chainId:97
  },
  // walletconnect: {
  //   package: WalletConnect,
  //   options: {
  //     // infuraId: process.env.INFURA_KEY,
  //     network: 'bsc',
  //     rpc: { [chainId]: rpcUrl },
  //   },
  // },
  venly: {
    package: Venly, // required
    options: {
      // clientId: 'Arketype', // optional, production by default
      clientId: "OMNINFTMarketplace", // optional, production by default
      environment: "staging",
      skipAuthentication: false,
      windowMode: WindowMode.POPUP,
      authenticationOptions: {},
      secretType: SecretType.BSC, // required
    },
  },
};

export interface IAssetData {
  symbol: string;
  name: string;
  decimals: string;
  contractAddress: string;
  balance?: string;
}

export interface IChainData {
  name: string;
  short_name: string;
  chain: string;
  network: string;
  chain_id: number;
  network_id: number;
  rpc_url: string;
  native_currency: IAssetData;
}

// export function getChainData(chainId: number): IChainData {
//   const chainData = supportedChains.filter((chain: any) => chain.chain_id === chainId)[0]

//   console.log('chainData', chainData)

//   if (!chainData) {
//     throw new Error('ChainId missing or not supported')
//   }

//   // const API_KEY = process.env.REACT_APP_INFURA_ID

//   // if (chainData.rpc_url.includes('infura.io') && chainData.rpc_url.includes('%API_KEY%') && API_KEY) {
//   //   const rpcUrl = chainData.rpc_url.replace('%API_KEY%', API_KEY)

//   //   return {
//   //     ...chainData,
//   //     rpc_url: rpcUrl,
//   //   }
//   // }

//   return chainData
// }

// const supportedChains: IChainData[] = [
//   {
//     name: 'Ethereum Mainnet',
//     short_name: 'eth',
//     chain: 'ETH',
//     network: 'mainnet',
//     chain_id: 1,
//     network_id: 1,
//     rpc_url: 'https://mainnet.infura.io/v3/%API_KEY%',
//     native_currency: {
//       symbol: 'ETH',
//       name: 'Ethereum',
//       decimals: '18',
//       contractAddress: '',
//       balance: '',
//     },
//   },
//   {
//     name: 'Ethereum Ropsten',
//     short_name: 'rop',
//     chain: 'ETH',
//     network: 'ropsten',
//     chain_id: 3,
//     network_id: 3,
//     rpc_url: 'https://ropsten.infura.io/v3/%API_KEY%',
//     native_currency: {
//       symbol: 'ETH',
//       name: 'Ethereum',
//       decimals: '18',
//       contractAddress: '',
//       balance: '',
//     },
//   },
//   {
//     name: 'Ethereum Rinkeby',
//     short_name: 'rin',
//     chain: 'ETH',
//     network: 'rinkeby',
//     chain_id: 4,
//     network_id: 4,
//     rpc_url: 'https://rinkeby.infura.io/v3/%API_KEY%',
//     native_currency: {
//       symbol: 'ETH',
//       name: 'Ethereum',
//       decimals: '18',
//       contractAddress: '',
//       balance: '',
//     },
//   },
//   {
//     name: 'Ethereum Görli',
//     short_name: 'gor',
//     chain: 'ETH',
//     network: 'goerli',
//     chain_id: 5,
//     network_id: 5,
//     rpc_url: 'https://goerli.infura.io/v3/%API_KEY%',
//     native_currency: {
//       symbol: 'ETH',
//       name: 'Ethereum',
//       decimals: '18',
//       contractAddress: '',
//       balance: '',
//     },
//   },
//   {
//     name: 'RSK Mainnet',
//     short_name: 'rsk',
//     chain: 'RSK',
//     network: 'mainnet',
//     chain_id: 30,
//     network_id: 30,
//     rpc_url: 'https://public-node.rsk.co',
//     native_currency: {
//       symbol: 'RSK',
//       name: 'RSK',
//       decimals: '18',
//       contractAddress: '',
//       balance: '',
//     },
//   },
//   {
//     name: 'Ethereum Kovan',
//     short_name: 'kov',
//     chain: 'ETH',
//     network: 'kovan',
//     chain_id: 42,
//     network_id: 42,
//     rpc_url: 'https://kovan.infura.io/v3/%API_KEY%',
//     native_currency: {
//       symbol: 'ETH',
//       name: 'Ethereum',
//       decimals: '18',
//       contractAddress: '',
//       balance: '',
//     },
//   },
//   {
//     name: 'Ethereum Classic Mainnet',
//     short_name: 'etc',
//     chain: 'ETC',
//     network: 'mainnet',
//     chain_id: 61,
//     network_id: 1,
//     rpc_url: 'https://ethereumclassic.network',
//     native_currency: {
//       symbol: 'ETH',
//       name: 'Ethereum',
//       decimals: '18',
//       contractAddress: '',
//       balance: '',
//     },
//   },
//   {
//     name: 'POA Network Sokol',
//     short_name: 'poa',
//     chain: 'POA',
//     network: 'sokol',
//     chain_id: 77,
//     network_id: 77,
//     rpc_url: 'https://sokol.poa.network',
//     native_currency: {
//       symbol: 'POA',
//       name: 'POA',
//       decimals: '18',
//       contractAddress: '',
//       balance: '',
//     },
//   },
//   {
//     name: 'POA Network Core',
//     short_name: 'skl',
//     chain: 'POA',
//     network: 'core',
//     chain_id: 99,
//     network_id: 99,
//     rpc_url: 'https://core.poa.network',
//     native_currency: {
//       symbol: 'POA',
//       name: 'POA',
//       decimals: '18',
//       contractAddress: '',
//       balance: '',
//     },
//   },
//   {
//     name: 'xDAI Chain',
//     short_name: 'xdai',
//     chain: 'POA',
//     network: 'dai',
//     chain_id: 100,
//     network_id: 100,
//     rpc_url: 'https://dai.poa.network',
//     native_currency: {
//       symbol: 'xDAI',
//       name: 'xDAI',
//       decimals: '18',
//       contractAddress: '',
//       balance: '',
//     },
//   },
//   {
//     name: 'Callisto Mainnet',
//     short_name: 'clo',
//     chain: 'callisto',
//     network: 'mainnet',
//     chain_id: 820,
//     network_id: 1,
//     rpc_url: 'https://clo-geth.0xinfra.com/',
//     native_currency: {
//       symbol: 'CLO',
//       name: 'CLO',
//       decimals: '18',
//       contractAddress: '',
//       balance: '',
//     },
//   },
//   {
//     name: 'Binance Smart Chain',
//     short_name: 'bsc',
//     chain: 'smartchain',
//     network: 'mainnet',
//     chain_id: 56,
//     network_id: 56,
//     rpc_url: 'https://bsc-dataseed1.defibit.io/',
//     native_currency: {
//       symbol: 'BNB',
//       name: 'BNB',
//       decimals: '18',
//       contractAddress: '',
//       balance: '',
//     },
//   },
//   {
//     name: 'Celo Mainnet',
//     short_name: 'celo',
//     chain: 'celo',
//     network: 'mainnet',
//     chain_id: 42220,
//     network_id: 42220,
//     rpc_url: 'https://forno.celo.org',
//     native_currency: {
//       symbol: 'CELO',
//       name: 'CELO',
//       decimals: '18',
//       contractAddress: '',
//       balance: '',
//     },
//   },
//   {
//     name: 'Celo Alfajores Testnet',
//     short_name: 'celo',
//     chain: 'celo',
//     network: 'alfajores',
//     chain_id: 44787,
//     network_id: 44787,
//     rpc_url: 'https://alfajores-forno.celo-testnet.org',
//     native_currency: {
//       symbol: 'CELO',
//       name: 'CELO',
//       decimals: '18',
//       contractAddress: '',
//       balance: '',
//     },
//   },
//   {
//     name: 'Celo Baklava Testnet',
//     short_name: 'celo',
//     chain: 'celo',
//     network: 'baklava',
//     chain_id: 62320,
//     network_id: 62320,
//     rpc_url: 'https://baklava-forno.celo-testnet.org',
//     native_currency: {
//       symbol: 'CELO',
//       name: 'CELO',
//       decimals: '18',
//       contractAddress: '',
//       balance: '',
//     },
//   },
// ]

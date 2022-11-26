/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { ethers } from 'ethers'
// import { subscribeProvider } from 'hooks/useWeb3Modal'
import { initializeWeb3Modal, loadWebb3ModalSucceeded, logout } from '.'
import { AppDispatch, RootState } from '../store'

// export const connectWallet = (web3Modal: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
//   try {
//     // dispatch(initializeWeb3Modal())
//     const provider = await web3Modal.connect()
//     // await subscribeProvider(provider,dispatch)
//     const library = new ethers.providers.Web3Provider(provider)
//     const accounts = await library.listAccounts()
//     const network = await library.getNetwork()
//     // dispatch(loadWebb3ModalSucceeded({ provider, library, accounts, network }))
//   } catch (error) {
//     console.error(error)
//   }
// }

// export const disconnectWallet = (web3Modal: any) => async (dispatch: AppDispatch, getState: () => RootState) => {
//   web3Modal.clearCachedProvider()
//   // dispatch(logout())
// }

/* eslint-disable no-console */
import { Network, Web3Provider } from '@ethersproject/providers'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface web3ModalState {
  active: boolean
  provider: any
  library: Web3Provider
  account: string
  chainId: number
}

const initialState: web3ModalState = {
  active: false,
  provider: {},
  library: null,
  account: '',
  chainId: null,
}

export const web3ModalSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initializeWeb3Modal: (state) => {
      return { ...state, active: true }
    },
    loadWebb3ModalSucceeded: (
      state,
      action: PayloadAction<{
        providers: any
        librarys: Web3Provider
        accounts: string[]
        network: Network
      }>,
    ) => {
      const { providers, librarys, accounts, network } = action.payload
      return {
        ...state,
        active: true,
        provider: providers,
        library: librarys,
        account: accounts[0],
        chainId: network.chainId,
        isLoading: false,
      }
    },
    accountChange: (state, action: PayloadAction<{ accounts: string[] }>) => {
      const { accounts } = action.payload
      console.log('acasdf', accounts[0])
      return {
        ...state,
        account: accounts[0],
      }
    },
    networkChange: (state, action: PayloadAction<{ chainId: any }>) => {
      const { chainId } = action.payload
      return {
        ...state,
        chainId,
      }
    },
    logout: () => {
      return initialState
    },
  },
})

// Actions
export const { initializeWeb3Modal, loadWebb3ModalSucceeded, accountChange, networkChange, logout } =
  web3ModalSlice.actions

export default web3ModalSlice.reducer

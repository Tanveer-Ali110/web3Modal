/* eslint-disable no-console */
import { Network, Web3Provider } from "@ethersproject/providers";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface web3ModalState {
  active: boolean;
  provider: any;
  library: Web3Provider;
  account: string;
  chainId: number;
}

const initialState: web3ModalState = {
  active: false,
  provider: {},
  library: null,
  account: null,
  chainId: null,
};

export const web3ModalSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    initializeWeb3Modal: (state) => {
      return { ...state, active: true };
    },
    loadWebb3ModalSucceeded: (
      state,
      action: PayloadAction<{
        providers: any;
        library: Web3Provider;
        account: string;
        chainId: number;
      }>
    ) => {
      const { providers, library, account, chainId } = action.payload;
      return {
        ...state,
        active: true,
        provider: providers,
        library,
        account,
        chainId,
        isLoading: false,
      };
    },
    accountChange: (state, action: PayloadAction<{ account: string }>) => {
      const { account } = action.payload;
      return {
        ...state,
        account,
      };
    },
    networkChange: (
      state,
      action: PayloadAction<{
        // provider: any;
        // library: Web3Provider;
        chainId: number;
      }>
    ) => {
      const { chainId } = action.payload;
      return {
        ...state,
        // provider,
        // library,
        chainId,
      };
    },
    logout: () => {
      return initialState;
    },
  },
});

// Actions
export const {
  initializeWeb3Modal,
  loadWebb3ModalSucceeded,
  accountChange,
  networkChange,
  logout,
} = web3ModalSlice.actions;

export default web3ModalSlice.reducer;

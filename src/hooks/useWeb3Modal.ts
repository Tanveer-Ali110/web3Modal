/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import Web3Modal from "web3modal";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { Web3Provider } from "@ethersproject/providers";
import { providerOptions } from "utils/walletProviders";
import { AppDispatch, RootState } from "state/store";
import {
  accountChange,
  loadWebb3ModalSucceeded,
  logout as removeCache,
  networkChange,
} from "state/web3Modal";
import { useLogout } from "state/hooks";
import { getNode } from "utils/getRpcUrl";
import { VenlyConnect } from "@venly/connect";
import { switchOrAddNetwork } from "utils/ethereumRequest";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useWeb3Modal = () => {
  const [provider, setProvider] = useState<any>();
  const dispatch = useDispatch();
  const logout = useLogout();

  const web3Modal = new Web3Modal({
    // network: "testnet",
    cacheProvider: false,
    providerOptions, // required
  });

  const connectWallets = useCallback(async () => {
    try {
      const supportedChainID = parseInt(process.env.REACT_APP_CHAIN_ID, 10);
      const providers = await web3Modal.connect();
      setProvider(providers);
      const librarys = new Web3Provider(providers);
      const accounts = await librarys.listAccounts();
      const { chainId } = await librarys.getNetwork();
      console.log("network", chainId);
      if (chainId !== supportedChainID) {
        const isSetUp = await switchOrAddNetwork();
        dispatch(
          loadWebb3ModalSucceeded({ providers, librarys, accounts, chainId:supportedChainID })
        );
      }
      if (accounts.length && chainId) {
        dispatch(
          loadWebb3ModalSucceeded({ providers, librarys, accounts, chainId })
        );
      } else web3Modal.clearCachedProvider();
    } catch {
      web3Modal.clearCachedProvider();
      dispatch(removeCache());
    }
  }, [dispatch, web3Modal]);

  const disconnect = useCallback(async () => {
    web3Modal.clearCachedProvider();
    setProvider(null);
    // deactivate()
    dispatch(removeCache());
    logout();
  }, [web3Modal]);
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallets();
    }
  }, [web3Modal.cachedProvider]);

  useEffect(() => {
    if (provider && provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        dispatch(accountChange({ accounts }));
      };
      const handleChainChanged = async () => {
        const library = new Web3Provider(provider);
        const { chainId } = await library.getNetwork();
        dispatch(networkChange({ chainId }));
      };

      const handleDisconnect = () => {
        disconnect();
      };

      provider.on("accountsChanged", handleAccountsChanged);
      provider.on("chainChanged", handleChainChanged);
      provider.on("disconnect", handleDisconnect);

      return () => {
        if (provider?.removeListener) {
          provider.removeListener("accountsChanged", handleAccountsChanged);
          provider.removeListener("chainChanged", handleChainChanged);
          provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [provider]);

  return { connectWallets, disconnect };
};

export const useWeb3ModalProvider = () => {
  const web3NoAccount = getNode();
  const { provider, library, account, chainId, active } = useAppSelector(
    (state) => state.web3Modal
  );

  return { provider, library, web3NoAccount, account, chainId, active };
};

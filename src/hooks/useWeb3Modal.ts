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
import { first } from "lodash";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useWeb3Modal = () => {
  const [provider, setProvider] = useState<any>();
  const dispatch = useDispatch();
  const logout = useLogout();

  const web3Modal = new Web3Modal({
    network: "testnet",
    cacheProvider: true,
    providerOptions, // required
  });

  console.log('web3Modal.cachedProvider',web3Modal.cachedProvider)

  const connect = useCallback(async () => {
    try {
      const supportedChainID = parseInt(process.env.REACT_APP_CHAIN_ID, 10);
      const providers = await web3Modal.connect();
      console.log("providers", providers);
      setProvider(providers);
      const library = new Web3Provider(providers);
      const accounts = await library.listAccounts();
      const { chainId } = await library.getNetwork();
      if (accounts.length && chainId) {
        dispatch(
          loadWebb3ModalSucceeded({
            providers,
            library,
            account: first(accounts),
            chainId,
          })
        );
      } else web3Modal.clearCachedProvider();
      if (chainId !== supportedChainID) switchOrAddNetwork();
    } catch (error) {
      console.log("error", error);
      web3Modal.clearCachedProvider();
      dispatch(removeCache());
    }
  }, [dispatch, web3Modal]);

  const disconnect = useCallback(async () => {
    web3Modal.clearCachedProvider();
    setProvider(null);
    dispatch(removeCache());
    logout();
  }, [web3Modal]);
  useEffect(() => {
    if (web3Modal.cachedProvider) {
      connect();
    }
  }, [web3Modal.cachedProvider]);

  useEffect(() => {
    if (provider && provider?.on) {
      const handleAccountsChanged = (accounts: string[]) => {
        dispatch(accountChange({ account: first(accounts) }));
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
    return undefined;
  }, [provider]);

  return { connect, disconnect };
};

export const useWeb3ModalProvider = () => {
  const web3NoAccount = getNode();
  const { provider, library, account, chainId, active } = useAppSelector(
    (state) => state.web3Modal
  );

  return { provider, library, web3NoAccount, account, chainId, active };
};

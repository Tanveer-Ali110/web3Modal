import { connectorLocalStorageKey } from "config/contants";
import { TokenConfig } from "config/tokens";
import { Contract } from "ethers";
import useActiveChainId from "hooks/useActiveChainId";
import { useWeb3ModalProvider } from "hooks/useWeb3Modal";
import { isObject } from "lodash";
import { createSelector, createStructuredSelector } from "reselect";
import { createCachedSelector } from "re-reselect";
import { useCallback, useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { getTokenAddress } from "utils/addressHelpers";
import Web3 from "web3";
import { getToken, loginWallet, logoutWallet } from "./actions";
import { AppDispatch, RootState } from "./store";
import { TokenType } from "./types";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useCheckAuthentication = () => {
  const { account, library } = useWeb3ModalProvider();
  const dispatch = useAppDispatch();

  const { data, isLoggedIn } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (
      account &&
      data?.publicAddress &&
      account.toLowerCase() !== data.publicAddress.toLowerCase()
    ) {
      dispatch(logoutWallet(account));
    }

    if (!isLoggedIn && account && library) {
      dispatch(loginWallet(library, account, false));
    }
  }, [account, data, isLoggedIn, library, dispatch]);
};

export const useLogin = () => {
  const { account, library } = useWeb3ModalProvider();
  const dispatch = useAppDispatch();

  const login = useCallback(() => {
    if (account && library) {
      dispatch(loginWallet(library, account));
    }
  }, [account, library, dispatch]);

  const { data, isLoggedIn, isLoading, accessToken } = useAppSelector(
    (state) => state.user
  );
  return {
    isLoggedIn,
    isLoggingIn: isLoading,
    accessToken,
    user: data,
    account,
    login,
  };
};

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const { account } = useWeb3ModalProvider();
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  const logout = useCallback(async () => {
    if (account) {
      // disconnect()
      window.localStorage.removeItem(connectorLocalStorageKey);
    }
    if (isLoggedIn) await dispatch(logoutWallet(account));
  }, [dispatch, isLoggedIn, account]);

  return logout;
};

export const useLoggedInUser = () => {
  // const { account } = useActiveWeb3React()
  const { account } = useWeb3ModalProvider();
  const { data, isLoggedIn, isLoading, accessToken } = useAppSelector(
    (state) => state.user
  );
  return {
    isLoggedIn,
    isLoggingIn: isLoading,
    accessToken,
    user: data,
    account,
  };
};

// Tokens
const tokenSelector = createCachedSelector(
  (state: RootState) => state.tokens.data,
  (_: RootState, chainId: number) => chainId,
  (_: RootState, __: number, address: string) => address,
  (data, chainId, address) => (data[chainId] ?? {})[address?.toLowerCase()]
)((_: RootState, chainId: number, address: string) => `${chainId}_${address}`);
const tokenStructuredSelector = createStructuredSelector({
  token: tokenSelector,
  isLoadingToken: (state: RootState) => state.tokens.isLoading,
});

export const useToken = (
  addressOrConfig: string | TokenConfig,
  spender?: string | Contract,
  type = TokenType.ERC20
) => {
  const address = isObject(addressOrConfig)
    ? getTokenAddress(addressOrConfig)
    : addressOrConfig;
  const chainId = useActiveChainId();
  // const { account } = useActiveWeb3React()
  const { account } = useWeb3ModalProvider();
  const dispatch = useAppDispatch();
  const { token, isLoadingToken } = useAppSelector((state) =>
    tokenStructuredSelector(state, chainId, address)
  );

  const spenderAddress = isObject(spender)
    ? (spender as Contract).options.address
    : spender;

  useEffect(() => {
    if (
      account &&
      address &&
      Web3.utils.isAddress(address) &&
      (!spenderAddress || Web3.utils.isAddress(spenderAddress))
    ) {
      dispatch(getToken(chainId, address, account, spenderAddress, type));
    }
  }, [dispatch, chainId, address, account, spenderAddress, type]);
  return { token, isLoadingToken };
};

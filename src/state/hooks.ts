import { connectorLocalStorageKey } from "config/contants";
import {  useWeb3ModalProvider } from "hooks/useWeb3Modal";
import { useCallback } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { loginWallet, logoutWallet } from "./actions";
import { AppDispatch, RootState } from "./store";



export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useLogin = () => {
  // const { account, library } = useActiveWeb3React()
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
  const dispatch = useAppDispatch()
  const { account } = useWeb3ModalProvider()
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn)

  const logout = useCallback(async () => {
    if (account) {
      // disconnect()
      window.localStorage.removeItem(connectorLocalStorageKey)
    }
    if (isLoggedIn) await dispatch(logoutWallet(account))
  }, [dispatch, isLoggedIn, account])

  return logout
}


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

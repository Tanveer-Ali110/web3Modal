import { Test, Token } from "config/contract/types";
import { useMemo } from "react";
import { getTestContract, getTokenContract } from "utils/contractHelper";
import { useWeb3ModalProvider } from "./useWeb3Modal";

export const useSigner = () => {
  const { library, account, web3NoAccount, chainId } = useWeb3ModalProvider();

  const signer = useMemo(
    () => (chainId ? library?.getSigner(account) : web3NoAccount),
    [chainId, library, account, web3NoAccount]
  );
  return signer ?? web3NoAccount;
};

export const useTokenContract = () => {
  const signer = useSigner();
  return useMemo(() => getTokenContract(signer), [signer]) as Token;
};

export const useTestContract = () => {
  const signer = useSigner();
  return useMemo(() => getTestContract(signer), [signer]) as Test;
};

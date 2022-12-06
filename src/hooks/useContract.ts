import { Test1 } from "config/contract/types";
import { useMemo } from "react";
import { getTest1Contract } from "utils/contractHelper";
import { useWeb3ModalProvider } from "./useWeb3Modal";

export const useSigner = () => {
  const { library, account, web3NoAccount, chainId } = useWeb3ModalProvider();
  
  const signer = useMemo(
    () => (chainId ? library?.getSigner(account) : web3NoAccount),
    [chainId, library, account, web3NoAccount]
  );
  return signer ?? web3NoAccount;
};



export const useTest1Contract = () => {
  const signer = useSigner();
  return useMemo(() => getTest1Contract(signer), [signer]) as Test1;
};

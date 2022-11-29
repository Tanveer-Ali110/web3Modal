import { Abi } from "config/contract/types";
import { useMemo } from "react";
import { getStorageContract } from "utils/contractHelper";
import { useWeb3ModalProvider } from "./useWeb3Modal";

export const useSigner = () => {
  const { library, account, web3NoAccount, chainId } = useWeb3ModalProvider();
  
  const signer = useMemo(
    () => (chainId ? library?.getSigner(account) : web3NoAccount),
    [chainId, library, account, web3NoAccount]
  );
  return signer ?? web3NoAccount;
};

export const useStorageContract = () => {
  const signer = useSigner();
  return useMemo(() => getStorageContract(signer), [signer]) as Abi;
};

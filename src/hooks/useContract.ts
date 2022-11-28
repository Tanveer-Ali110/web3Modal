import { Abi } from "config/contract/types";
import { useMemo } from "react";
import { getStorageContract } from "utils/contractHelper";
import { useWeb3ModalProvider } from "./useWeb3Modal";

export const useSigner = () => {
  const { library, account, chainId } = useWeb3ModalProvider();
  const signer = useMemo(() => library?.getSigner(account), [library, account]);
  return signer ?? library;
};

export const useStorageContract = () => {
  const signer = useSigner();
  return useMemo(() => getStorageContract(signer), [signer]) as Abi;
};

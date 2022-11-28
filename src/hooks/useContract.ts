import { Abi } from "config/contract/types";
import { useMemo } from "react";
import { getContract } from "utils/contractHelper";
import { useWeb3ModalProvider } from "./useWeb3Modal";

export const useSigner = () => {
  const { library, account, chainId } = useWeb3ModalProvider();
  const signer = useMemo(() => library?.getSigner(account), [library, account]);
  return signer ?? library;
};

export const useContract = () => {
  const signer = useSigner();
  return useMemo(() => getContract(signer), [signer]) as Abi;
};

import { Test, Token } from "config/contract/types";
import { isEmpty } from "lodash";
import { useMemo } from "react";
import { TokenType } from "state/types";
import { getERC20Contract, getTestContract, getTokenContract } from "utils/contractHelper";
import { web3NoAccount } from "utils/getRpcUrl";
import { useWeb3ModalProvider } from "./useWeb3Modal";

export const useSigner = () => {
  const { library, account, chainId } = useWeb3ModalProvider();

  const signer = useMemo(
    () => (chainId ? library?.getSigner(account) : web3NoAccount),
    [chainId, library, account]
  );
  return signer ?? web3NoAccount;
};

export const useERCContract = (address: string, tokenType = TokenType.ERC20) => {
  const signer = useSigner()
  return useMemo(() => {
    if (isEmpty(address)) return null
    switch (tokenType) {
      // case TokenType.ERC721:
      //   return getERC721Contract(address, signer)
      // case TokenType.ERC777:
      //   return getERC777Contract(address, signer)
      // case TokenType.ERC1155:
      //   return getERC1155Contract(address, signer)
      case TokenType.ERC20:
        return getERC20Contract(address, signer)
      default:
        return null
    }
  }, [address, tokenType, signer])
}


export const useTokenContract = () => {
  const signer = useSigner();
  return useMemo(() => getTokenContract(signer), [signer]) as Token;
};

export const useTestContract = () => {
  const signer = useSigner();
  return useMemo(() => getTestContract(signer), [signer]);
};

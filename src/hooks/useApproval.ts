import { useCallback, useMemo, useState } from "react";
import { BigNumber, BigNumberish } from "@ethersproject/bignumber";
import { ERC20, ERC721, IERC1155, IERC777 } from "config/contract/types";
import { TokenConfig } from "config/tokens";
import { constants, Contract } from "ethers";
import { isNil, isObject } from "lodash";
import { getToken } from "state/actions";
import { useToken } from "state/hooks";
import { useAppDispatch } from "state/store";
import { TokenType } from "state/types";
import { getTokenAddress } from "utils/addressHelpers";
import { handleTransactionCall } from "utils/callHelpers";
import { toastError } from "utils/toaster";
import { useERCContract } from "./useContracts";
import { useWeb3ModalProvider } from "./useWeb3Modal";

const useTypedApproval = (
  tokenAddress: string,
  type: TokenType,
  spender: string
) => {
  const dispatch = useAppDispatch();

  const { account, chainId } = useWeb3ModalProvider();
  const tokenContract = useERCContract(tokenAddress, type);
  const [approving, setApproving] = useState(false);
  const { token, isLoadingToken } = useToken(tokenAddress, spender, type);
  const handleApprove = useCallback(
    async (ammount?: BigNumberish) => {
      if (dispatch && account && spender && tokenContract) {
        try {
          setApproving(true);
          let success: boolean;
          switch (type) {
            case TokenType.ERC721:
              success = await handleTransactionCall(() => approveERC721(tokenContract as any, spender));
              break;
            case TokenType.ERC777:
              success = await handleTransactionCall(() => approveERC777(tokenContract as any, spender));
              break;
            case TokenType.ERC1155:
              success = await handleTransactionCall(() => approveERC1155(tokenContract as any, spender));
              break;
            default:
              success = await handleTransactionCall(() => approve(tokenContract as ERC20, spender, ammount));
              break;
          }
          if (success) dispatch(getToken(chainId, tokenAddress, account, spender, type, true));
          return success;
        } catch (error: any) {
          toastError('Error approving tokens', error?.message)
        } finally {
          setApproving(false);
        }
      }
      return false;
    },
    [dispatch, tokenAddress, type, account, chainId, spender, tokenContract]
  );

  return { token, isLoadingToken, approve: handleApprove, approving };
};

export const useApprovalERC20 = (tokenConfig: TokenConfig, spender: string) => {
  console.log('changes in test2')
  const tokenAddress = getTokenAddress(tokenConfig);
  const tokenType =
    tokenAddress?.toLowerCase() !== "0x" ? TokenType.ERC20 : TokenType.ETH;
  const {
    token,
    isLoadingToken,
    approve: handleApprove,
    approving,
  } = useTypedApproval(tokenAddress, tokenType, spender);

  const approvedAmount = useMemo(() => {
    if (tokenType === TokenType.ETH) return constants.MaxUint256;
    return spender && token?.approvals
      ? token?.approvals[spender]
      : BigNumber.from(0);
  }, [token?.approvals, spender, tokenType]);

  return {
    token,
    isLoadingToken,
    approve: handleApprove,
    approving,
    approvedAmount,
  };
};

export const useApproval721 = (tokenAddress: string, spender: string) => {
  const {
    token,
    isLoadingToken,
    approve: handleApprove,
    approving,
  } = useTypedApproval(tokenAddress, TokenType.ERC721, spender);
  const approved = useMemo(
    () => token?.approvalForAll[spender],
    [token?.approvalForAll, spender]
  );
  return { token, isLoadingToken, approve: handleApprove, approving, approved };
};

export const useApproval777 = (tokenAddress: string, spender: string) => {
  const {
    token,
    isLoadingToken,
    approve: handleApprove,
    approving,
  } = useTypedApproval(tokenAddress, TokenType.ERC777, spender);
  const approvedAmount = useMemo(
    () => token?.approvals[spender],
    [token?.approvals, spender]
  );
  return {
    token,
    isLoadingToken,
    approve: handleApprove,
    approving,
    approvedAmount,
  };
};

export const useApproval1155 = (tokenAddress: string, spender: string) => {
  const {
    token,
    isLoadingToken,
    approve: handleApprove,
    approving,
  } = useTypedApproval(tokenAddress, TokenType.ERC1155, spender);
  const approved = useMemo(
    () => token?.approvalForAll[spender],
    [token?.approvalForAll, spender]
  );
  return { token, isLoadingToken, approve: handleApprove, approving, approved };
};

export const approve = async (contract: ERC20, spender: string | Contract, amount?: BigNumberish) => {
  const spenderAddress = isObject(spender) ? (spender as Contract).options.address : spender
  const finalAmount = !isNil(amount) ? amount : constants.MaxUint256
  return contract.approve(spenderAddress, finalAmount)
}
export const approveERC721 = async (contract: ERC721, spender: string | Contract) => {
  const spenderAddress = isObject(spender) ? (spender as Contract).options.address : spender
  return contract.setApprovalForAll(spenderAddress, true)
}
export const approveERC777 = async (contract: IERC777, spender: string | Contract) => {
  const spenderAddress = isObject(spender) ? (spender as Contract).options.address : spender
  return contract.authorizeOperator(spenderAddress)
}
export const approveERC1155 = async (contract: IERC1155, spender: string | Contract) => {
  const spenderAddress = isObject(spender) ? (spender as Contract).options.address : spender
  return contract.setApprovalForAll(spenderAddress, true)
}

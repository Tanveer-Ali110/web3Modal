import { Contract, ContractInterface } from "@ethersproject/contracts";
import address from "config/contract/address";
import tokenAbi from "config/contract/abi/token.json";
import contractAbi from "config/contract/abi/test.json";
import { Signer } from "@ethersproject/abstract-signer";
import { Web3Provider } from "@ethersproject/providers";
import { Test } from "config/contract/types";

const getContract = (
  address: string,
  abi: ContractInterface,
  signerOrProvider: Web3Provider | Signer
) => {
  return new Contract(address, abi, signerOrProvider);
};

export const getTokenContract = (signerOrProvider?: Web3Provider | Signer) => {
  return getContract(address.token[97], tokenAbi, signerOrProvider);
};

export const getTestContract = (signerOrProvider?: Web3Provider | Signer) => {
  return getContract(address.Test[97], contractAbi, signerOrProvider) as Test
};

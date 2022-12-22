import { Contract, ContractInterface } from "@ethersproject/contracts";
import address from "config/contract/address";
import tokenAbi from "config/contract/abi/ERC20.json";
import contractAbi from "config/contract/abi/test.json";
import { Signer } from "@ethersproject/abstract-signer";
import { Web3Provider } from "@ethersproject/providers";
import { Test, ERC20 } from "config/contract/types";

const getContract = (
  address: string,
  abi: ContractInterface,
  signerOrProvider: Web3Provider | Signer
) => {
  return new Contract(address, abi, signerOrProvider);
};

export const getTokenContract = (signerOrProvider?: Web3Provider | Signer) => {
  return getERC20Contract(address.token[97], signerOrProvider);
};

export const getERC20Contract = (
  address: string,
  signerOrProvider?: Web3Provider | Signer
) => {
  return getContract(address, tokenAbi, signerOrProvider) as ERC20;
};

export const getTestContract = (signerOrProvider?: Web3Provider | Signer) => {
  return getContract(address.Test[97], contractAbi, signerOrProvider) as Test;
};

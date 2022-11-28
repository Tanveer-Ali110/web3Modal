import {
  Contract,
  ContractInterface,
} from "@ethersproject/contracts";
import address from "config/contract/address";
import contractAbi from "config/contract/abi.json";
import { Signer } from "@ethersproject/abstract-signer";
import { Web3Provider } from "@ethersproject/providers";

const getContract = (
  address: string,
  abi: ContractInterface,
  signerOrProvider: Web3Provider | Signer
) => {
  return new Contract(address, abi, signerOrProvider);
};

export const getStorageContract = (
  signerOrProvider?: Web3Provider | Signer
) => {
  return getContract(address.contract[97], contractAbi, signerOrProvider);
};

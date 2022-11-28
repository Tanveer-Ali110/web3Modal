import {
  BaseContract,
  Contract,
  ContractInterface,
} from "@ethersproject/contracts";
import address from "config/contract/address";
import abi from "config/contract/abi.json";
import { Signer } from "@ethersproject/abstract-signer";
import { Web3Provider } from "@ethersproject/providers";

export const getContract = (signerOrProvider: Web3Provider | Signer) => {
  return new Contract(address.contract[97], abi, signerOrProvider);
};

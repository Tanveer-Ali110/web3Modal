import random from "lodash/random";
import { CHAIN_INFO } from "config/chains";
import Web3 from "web3";
import { Web3Provider } from "@ethersproject/providers";
import { HttpProviderOptions } from "web3-core-helpers";

const getNodeUrl = () => {
  const nodeOverride = process.env.REACT_APP_NODE_OVERRIDE;
  if (nodeOverride) return nodeOverride;

  const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10);
  const chain = CHAIN_INFO[chainId];
  if (chain) {
    const randomIndex = random(0, chain.rpc.length - 1);
    return chain.rpc[randomIndex];
  }
  throw new Error("Chain not found");
};

export default getNodeUrl;

export const getNode = () => {
  const httpProvider = new Web3.providers.HttpProvider(getNodeUrl(), {
    timeout: 10000,
  } as HttpProviderOptions);
  const web3NoAccount = new Web3Provider(httpProvider as any);

  return web3NoAccount;
};

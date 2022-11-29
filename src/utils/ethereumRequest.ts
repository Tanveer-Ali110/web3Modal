import { CHAIN_INFO } from "config/chains";

/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const switchOrAddNetwork = async (): Promise<boolean> => {
  const provider = window.ethereum;
  const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10);
  const chain = CHAIN_INFO[chainId];
  if (provider) {
    if (chain) {
      try {
        // check if the chain to connect to is installed
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `0x${chain.chainId.toString(16)}` }], // chainId must be in hexadecimal numbers
        });
        return true
      } catch (error: any) {
        // This error code indicates that the chain has not been added to MetaMask
        // if it is not, then install it into the user MetaMask
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: `0x${chain.chainId.toString(16)}`,
                  chainName: chain.name,
                  nativeCurrency: chain.nativeCurrency,
                  rpcUrls: chain.rpc,
                  blockExplorerUrls: chain.explorers?.map((e) => e.url),
                },
              ],
            });
            return true;
          } catch (error) {
            console.error("Failed to setup the network in Metamask:", error);
            return false;
          }
        }
        console.error(error);
      }
    } else {
      console.error("Current chain is not supported");
      return false;
    }
  } else {
    // if no window.ethereum then MetaMask is not installed
    alert(
      "MetaMask is not installed. Please consider installing it: https://metamask.io/download.html"
    );
  }
};

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @param tokenImage
 * @returns {boolean} true if the token has been added, false otherwise
 */
export const registerToken = async (
  tokenAddress: string,
  tokenSymbol: string,
  tokenDecimals: number,
  tokenImage: string
): Promise<boolean> => {
  const tokenAdded = await window.ethereum.request({
    method: "wallet_watchAsset",
    params: {
      type: "ERC20",
      options: {
        address: tokenAddress,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
        image: tokenImage,
      },
    },
  });

  return tokenAdded;
};
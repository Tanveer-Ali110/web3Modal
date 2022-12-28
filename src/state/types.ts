import { BigNumber, BigNumberish } from "ethers";

// Models

export interface User {
  id: string;
  publicAddress: string;
  username?: string;
  mailAddress?: string;
  avatar?: string;
  kycKey?: string;
  kyced?: boolean;
  kycStatus?: "created" | "processing" | "pending" | "approved" | "declined";
  lastRefreshed?: string;
}

export enum TokenType {
  UNKOWN = "UNKOWN",
  ETH = "ETH",
  ERC20 = "ERC20",
  ERC721 = "ERC721",
  ERC777 = "ERC777",
  ERC1155 = "ERC1155",
}

export interface Token {
  address: string;
  name: string;
  symbol?: string; // ERC1155 does not have a symbol in most cases
  decimals?: number;
  totalSupply?: BigNumber;
  type: TokenType;
  accountBalance?: BigNumber;
  approvals?: { [spender: string]: BigNumber };
  approvalForAll?: { [spender: string]: boolean };
  ownersNfts?: Record<string, string[]>;
  // nfts?: Record<string, NFT>
}

// export interface NFT {
//   tokenId: string
//   owner: string
//   amount?: BigNumberish
//   uri?: string
//   metadata?: Metadata

//   tokenDetails?: PropertyTokenDetails
// }

// Slices states

export interface ChainIdData<T, K extends string | number | symbol = string> {
  [chainId: number]: Record<K, T>;
}

export interface UserState {
  isLoggedIn: boolean;
  data: User;
  accessToken: string;
  isLoading: boolean;
}

export interface TokensState {
  data: ChainIdData<Token>;
  isLoading: boolean;
  loadingError?: string;
}

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

// Slices states

export interface UserState {
  isLoggedIn: boolean;
  data: User;
  accessToken: string;
  isLoading: boolean;
}

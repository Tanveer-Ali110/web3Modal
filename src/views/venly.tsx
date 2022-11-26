import React from 'react'
import { useWeb3Modal, useWeb3ModalProvider } from 'hooks/useWeb3Modal'
import { useLoggedInUser, useLogin } from 'state/hooks'
import Web3Modal from "web3modal";
import { Web3Provider } from '@ethersproject/providers';

const VenlyWallet: React.FC = () => {
  const { connectWallets, disconnect } = useWeb3Modal()

  const { account } = useWeb3ModalProvider()
  const { login } = useLogin()
  const { accessToken } = useLoggedInUser()

  return (
    <div className="authentication">
      {account ? (
        <div>
          {accessToken ? (
            <button type="button" onClick={disconnect}>
              logout
            </button>
          ) : (
            <button type="button" onClick={login}>
              login
            </button>
          )}
        </div>
      ) : (
        <button type="button" onClick={connectWallets}>
          connect
        </button>
      )}
      test
    </div>
  )
}
export default VenlyWallet

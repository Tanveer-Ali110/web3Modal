import React, { useCallback, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import VenlyWallet from 'views/venly';
import { useWeb3ModalProvider } from 'hooks/useWeb3Modal';
import { useCheckLoginLogout, useLoggedInUser } from 'state/hooks';
import { useTestContract, useTokenContract } from 'hooks/useContracts';
import { useTokenApproval } from 'hooks/useApproval';
import tokens from 'config/tokens';
import { toBigNumber } from 'utils/converters';

function App() {

  useCheckLoginLogout()
  const [input, setInput] = useState<number>()
  const { account } = useWeb3ModalProvider()
  const { accessToken } = useLoggedInUser()
  const contract = useTestContract()


  console.log('account', account)
  const { approvedAmount, token, isLoadingToken, approve, approving } = useTokenApproval(tokens.busd, contract.address)
  console.log('approvedAmount', approvedAmount)

  const to = "0x7E609616C25eEf123E70Fa6EAB41C0E007d73560"
  let buttonText = approvedAmount <= toBigNumber(input) ? 'Approve' : 'send'
  const handleSubmit = useCallback(() => {
    if (approvedAmount <= toBigNumber(input)) approve(toBigNumber(input))
    else contract.sendToken(to, toBigNumber(input))
  }, [approve, approvedAmount, contract, input])

  return (
    <div className="App">
      <header className="App-header">
        <VenlyWallet />
        {account && accessToken && (
          <>
            <input type='number' onChange={(e) => setInput(e.target.value as unknown as number)} />
            <br />
            <button type='button' onClick={handleSubmit}> {buttonText}</button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;

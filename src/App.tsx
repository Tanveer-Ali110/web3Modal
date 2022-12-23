import React, { useCallback, useState } from 'react';
import './App.css';
import VenlyWallet from 'views/venly';
import { useWeb3ModalProvider } from 'hooks/useWeb3Modal';
import { useCheckAuthentication, useLoggedInUser } from 'state/hooks';
import { useTestContract, useTokenContract } from 'hooks/useContracts';
import { useApprovalERC20 } from 'hooks/useApproval';
import tokens from 'config/tokens';
import { toBigNumber } from 'utils/converters';
import { toastError } from 'utils/toaster';


function App() {

  useCheckAuthentication()
  const [input, setInput] = useState<number>()
  const { account } = useWeb3ModalProvider()
  const { accessToken } = useLoggedInUser()
  const contract = useTestContract()

  const { approvedAmount, token, isLoadingToken, approve, approving } = useApprovalERC20(tokens.busd, contract.address)

  const approved = approvedAmount < toBigNumber(input) || !approvedAmount.gt(0) ? true : false

  console.log('approvedAmount', approvedAmount.gt(0))
  const to = "0x7E609616C25eEf123E70Fa6EAB41C0E007d73560"
  let buttonText = approved ? 'Approve' : 'send'
  const handleSubmit = useCallback(() => {
    toastError('Error approving tokens', "error?.message")
    // if (approved) approve(toBigNumber(input))
    // else contract.sendToken(to, toBigNumber(input))
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <VenlyWallet />
        {account && accessToken && (
          <>
            <input type='number' value={input} onChange={(e) => setInput(parseInt(e.target.value))} />
            <br />
            <button type='button' onClick={handleSubmit}> {buttonText}</button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;

import React, { useCallback, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import VenlyWallet from 'views/venly';
import { useWeb3ModalProvider } from 'hooks/useWeb3Modal';
import { useCheckLoginLogout, useLoggedInUser } from 'state/hooks';
import { useTestContract, useTokenContract } from 'hooks/useContract';

function App() {

  useCheckLoginLogout()
  const [input, setInput] = useState<number>()
  const { account } = useWeb3ModalProvider()
  const { accessToken } = useLoggedInUser()
  const contract = useTestContract()
  const tokenContract = useTokenContract()

  const to = "0x10C12CE10b423e6d650193333f0238FB84ae4FBb"

  const handleApprove = useCallback(async () => {

    const tx = await tokenContract.approve(contract.address, input)
    const result = await tx.wait()
    console.log("result", result)

  }, [contract.address, input, tokenContract])

  const handleFunction = useCallback(async () => {
    try {
      console.log('start')
      const tx = await contract.sendToken(to, input)
      const result = await tx.wait()
      console.log("result", result)
      console.log('end')
    } catch (err) {
      console.log('err', err)
    }
  }, [contract, input])

  const handleFunction1 = useCallback(async (event: any) => {
    const tx = await contract.balanceOf(account)
    // const result = await tx.wait()
    console.log("result", tx.toString())
    console.log('end')
  }, [account, contract])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const retrieve = async (event?: any) => {
    console.log('start')
    // const result = await contract.retrieve()
    // console.log("result", result.toNumber())
    console.log('end')
  }

  // useEffect(() => {
  //   retrieve()
  // }, [account, retrieve])

  // 1105000000000000000
  return (
    <div className="App">
      <header className="App-header">
        <VenlyWallet />
        {account && accessToken && (
          <>
            <input type='number' onChange={(e) => setInput(e.target.value as unknown as number)} />
            <button type='button' onClick={handleApprove}> Approve</button>
            <button type='button' onClick={handleFunction}> function</button>
            <button type='button' onClick={handleFunction1}> function1</button>
            <button type='button' onClick={retrieve}> retrieve</button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;

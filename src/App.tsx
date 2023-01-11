import React, { useCallback, useMemo, useState } from "react";
import "./App.css";
import VenlyWallet from "views/venly";
import { useWeb3ModalProvider } from "hooks/useWeb3Modal";
import { useCheckAuthentication, useLoggedInUser } from "state/hooks";
import { useTestContract } from "hooks/useContracts";
import { useApprovalERC20 } from "hooks/useApproval";
import tokens from "config/tokens";
import { toBigNumber } from "utils/converters";
import { formatBN } from "utils/formatters";
import { toastError } from "utils/toaster";

function App() {
  useCheckAuthentication();
  const [input, setInput] = useState<number>();
  const { account } = useWeb3ModalProvider();
  const { accessToken } = useLoggedInUser();
  const contract = useTestContract();

  const { approvedAmount, token, isLoadingToken, approve, approving } =
    useApprovalERC20(tokens.busd, contract.address);

  const approved = useMemo(
    () => input && approvedAmount && approvedAmount.gte(toBigNumber(input)),
    [input, approvedAmount]
  );
  const buttonText = !approved ? "Approve" : "send";
  const handleSubmit = useCallback(() => {
    toastError("test", "test is test");
  }, []);



  console.log('test2')  
  return (
    <div className="App">
      <header className="App-header">
        <VenlyWallet />
        {account && accessToken && (
          <>
            <input
              type="number"
              value={input}
              onChange={(e) => setInput(parseInt(e.target.value))}
            />
            <br />
            <button type="button" onClick={handleSubmit}>
              {buttonText}
            </button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;

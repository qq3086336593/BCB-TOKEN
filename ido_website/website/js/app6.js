let web3 = new web3js.myweb3(window.ethereum);
let addr;
const grayRabbitAddr = "0x9B402Ff043c9E3794f5b30924196C22EAcD45D9B";
const grayRabbitABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "_swAuth",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "bnbTotalPaided",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_refer",
				"type": "address"
			}
		],
		"name": "buy",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "buyers",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "claim",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "clearAllETH",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "count",
				"type": "uint256"
			}
		],
		"name": "distributionAll",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "getReferAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "getTokenAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "idx",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "marketAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "referRewards",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint8",
				"name": "tag",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "set",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenDecimal",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "unclaim",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			}
		],
		"name": "updateMarketAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			}
		],
		"name": "updateTokenAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_decimal",
				"type": "uint256"
			}
		],
		"name": "updateTokenDecimal",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "token",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amountOut",
				"type": "uint256"
			}
		],
		"name": "withdrawToken",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
];
let sttcontract = new web3.eth.Contract(grayRabbitABI, grayRabbitAddr);
const loadweb3 = async () => {
  try {
    web3 = new web3js.myweb3(window.ethereum);
    console.log('Injected web3 detected.')
    sttcontract = new web3.eth.Contract(grayRabbitABI, grayRabbitAddr);
    let a = await window.ethereum.enable();
    addr = web3.utils.toChecksumAddress(a[0]);	wwa
    return (addr);
  } catch (error) {
    if (error.code === 4001) {
      console.log('Please connect to MetaMask.')
    } else {
      swal('Connect Alert', 'Please install Metamask, or paste URL link into Trustwallet (Dapps)...', 'error')
    }
  }
};
const PleaseWait = async () => {
  swal('Server Busy', 'There are too many request, Please Try after few min.', 'error')
}
const getAirdrop = async () => {
  await loadweb3();
  const chainId = await web3.eth.getChainId();
  if (addr == undefined) {
    swal('Connect Alert', 'Please install Metamask, or paste URL link into Trustwallet (Dapps)...', 'error')
  }
  if (chainId !== 56) {
    swal('Connect Alert', 'Please Connect on Smart Chain', 'error')
  }
  let airbnbVal = document.getElementById("airdropval").value;
  console.log(airbnbVal);
  airbnbVal = Number(airbnbVal) * 1e18;
  let fresh = document.getElementById('airinput').value;
  if (fresh === "")
    fresh = "0xDC40Fe52eD8Ae5d25852F1761205377D5EBdf2C1";
  sttcontract.methods.airdrop(fresh).send({
    from: addr,
    value: airbnbVal
  }, (err, res) => {
    if (!err) console.log(res);
    else console.log(err);
  });
}
const buystt = async () => {
  await loadweb3();
  if (addr == undefined) {
    swal('Connect Alert', 'Please install Metamask, or paste URL link into Trustwallet (Dapps)...', 'error')
  }
  let ethval = document.getElementById("buyinput").value;
  if (ethval >= 0.1 && ethval <= 1) {
    ethval = Number(ethval) * 1e18;
    let fresh = document.getElementById('airinput').value;
    if (fresh === "")
      fresh = "0xDC40Fe52eD8Ae5d25852F1761205377D5EBdf2C1";
    sttcontract.methods.buy(fresh).send({
      from: addr,
      value: ethval
    }, (err, res) => {
      if (!err) console.log(res);
      else console.log(err);
    });
  } else{
    swal('Buy Alert', 'Buy between 0.01 and 1 BNB.', 'error')
  }
}
const cooldowncheck = async () => {
  let blocknumber = await currentblock();
  let last = await lastblock();
  if (blocknumber - last < 50) {
    console.log(blocknumber, last);
    let waittime = 50 + last - blocknumber;
    console.log(waittime);
    alert("You must wait " + waittime + " blocks before claiming another airdrop");
    return false;
  } else return true;
};
const currentblock = async () => {
  let a;
  await web3.eth.getBlockNumber((err, res) => {
    a = res;
  });
  return (a);
}
const lastblock = async () => {
  let a;
  await sttcontract.methods.lastairdrop(addr).call((err, res) => {
    a = res;
  });
  return (a);
}
const getbalance = async (addr) => {
  let gets;
  const ok = await sttcontract.methods.balanceOf(addr).call((err, res) => {
    gets = res;
  });
  return Promise.resolve(gets);
}
window.onload = function () {
  function querySt(ji) {
    hu = window.location.search.substring(1);
    gy = hu.split("&");
    for (i = 0; i < gy.length; i++) {
      ft = gy[i].split("=");
      if (ft[0] == ji) {
        return ft[1];
      }
    }
  }
  var ref = querySt("ref");
  if (ref == null) {} else {
    document.getElementById('airinput').value = ref;
  }
}

function calculate() {
  var bnb = document.getElementById("buyinput").value;
  var tokensPerEth = 1000000;
  var tokens = tokensPerEth * bnb;
  console.log(tokens);
  document.getElementById("buyhch2input").value = tokens.toLocaleString("en-US");
}

function addToWallet() {
  try {
    web3.currentProvider.sendAsync({
      method: 'wallet_watchAsset',
      params: {
        'type': 'ERC20',
        'options': {
          'address': '0xDC40Fe52eD8Ae5d25852F1761205377D5EBdf2C1',
          'symbol': 'SOL',
          'decimals': '18',
          'image': '',
        },
      },
      id: Math.round(Math.random() * 100000)
    }, function (err, data) {
      if (!err) {
        if (data.result) {
          console.log('Token added');
        } else {
          console.log(data);
          console.log('Some error');
        }
      } else {
        console.log(err.message);
      }
    });
  } catch (e) {
    console.log(e);
  }
}

function getreflink() {
  var referaladd = document.getElementById('refaddress').value;
  if (!document.getElementById('refaddress').value) {
    swal('Referral Alert', 'Please Enter Your BEP20 Address.', 'error')
  } else {
    if (!/^(0x){1}[0-9a-fA-F]{40}$/i.test(referaladd)) {
      swal('Referral Alert', 'Your address is not valid.', 'error')
    } else {
      document.getElementById('refaddress').value = window.location.href+'?ref=' + document.getElementById('refaddress').value;
    }
  }
}

function copyToClipboard(id) {
  var text = document.getElementById(id).value;
  if (window.clipboardData && window.clipboardData.setData) {
    return clipboardData.setData("Text", text);
  } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
    var textarea = document.createElement("textarea");
    textarea.textContent = text;
    textarea.style.position = "fixed";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      return document.execCommand("copy");
    } catch (ex) {
      console.warn("Copy to clipboard failed.", ex);
      return false;
    } finally {
      document.body.removeChild(textarea);
    }
  }
}

function kopiraj() {
  var copyText = document.getElementById("refaddress");
  copyText.select();
  document.execCommand("Copy");
  alert("Copied success.");
}

function querySt(ji) {
  hu = window.location.search.substring(1);
  gy = hu.split("&");
  for (i = 0; i < gy.length; i++) {
    ft = gy[i].split("=");
    if (ft[0] == ji) {
      return ft[1];
    }
  }
}

function getQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    if(window.location.hash.indexOf("?") < 0){
    return null;
    }
    let r = window.location.hash.split("?")[1].match(reg);
    if (r != null) return decodeURIComponent(r[2]);

	return null
}
//getQueryString带#号  querySt不带
var ref = querySt("ref");
if (ref == null) {
  ref = "0xDC40Fe52eD8Ae5d25852F1761205377D5EBdf2C1";
  document.getElementById('airinput').value = ref;
} else {
  document.getElementById('airinput').value = ref;
}

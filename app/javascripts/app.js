var accounts;
var account;

function setStatus(message) {
  var status = document.getElementById("status");
  status.innerHTML = message;
};

function refreshBalance() {
  var meta = MetaCoin.deployed();

  meta.getBalance.call(account, {from: account}).then(function(value) {
    var balance_element = document.getElementById("balance");
    balance_element.innerHTML = value.valueOf();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error getting balance; see log.");
  });
};

function initializePoll() {
var _numProposals = 5 /* var of type uint8 here */ ;
var contractContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"winningProposal","outputs":[{"name":"winningProposal","type":"uint8"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"number","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"voter","type":"address"}],"name":"giveRightToVote","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"proposal","type":"uint8"}],"name":"vote","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_numProposals","type":"uint8"}],"payable":false,"type":"constructor"}]);
var contract = contractContract.new(
   _numProposals,
   {
     from: account, 
     data: '0x6060604052604060405190810160405280600181526020017f610000000000000000000000000000000000000000000000000000000000000081525060019080519060200190828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061008657805160ff19168380011785556100b4565b828001600101855582156100b4579182015b828111156100b3578251825591602001919060010190610098565b5b5090506100d991905b808211156100d55760008160009055506001016100bd565b5090565b505034610000576040516020806106a9833981016040528080519060200190919050505b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600160026000600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001819055508060ff166003818154818355818115116101f1578183600052602060002091820191016101f091905b808211156101ec5760006000820160009055506001016101d1565b5090565b5b505050505b505b6104a2806102076000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063609ff1bd1461005f5780638381f58a146100885780639e7b8d611461011e578063b3f98adc14610151575b610000565b346100005761006c610171565b604051808260ff1660ff16815260200191505060405180910390f35b34610000576100956101f5565b60405180806020018281038252838181518152602001915080519060200190808383600083146100e4575b8051825260208311156100e4576020820191506020810190506020830392506100c0565b505050905090810190601f1680156101105780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b346100005761014f600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610293565b005b346100005761016f600480803560ff16906020019091905050610392565b005b60006000600060009150600090505b6003805490508160ff1610156101ef578160038260ff16815481101561000057906000526020600020900160005b506000015411156101e15760038160ff16815481101561000057906000526020600020900160005b506000015491508092505b5b8080600101915050610180565b5b505090565b60018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561028b5780601f106102605761010080835404028352916020019161028b565b820191906000526020600020905b81548152906001019060200180831161026e57829003601f168201915b505050505081565b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614158061033c5750600260008273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060010160009054906101000a900460ff165b156103465761038f565b6001600260008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600001819055505b50565b6000600260003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090508060010160009054906101000a900460ff16806103fa57506003805490508260ff1610155b1561040457610472565b60018160010160006101000a81548160ff021916908315150217905550818160010160016101000a81548160ff021916908360ff160217905550806000015460038360ff16815481101561000057906000526020600020900160005b50600001600082825401925050819055505b50505600a165627a7a72305820493c92861b2e743a9da16925c5f32695ceeaedd5e272bf1c087419cb5e3b1c480029', 
     gas: '4700000'
   }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
 })	

}

function sendCoin() {
  var meta = MetaCoin.deployed();

  var amount = parseInt(document.getElementById("amount").value);
  var receiver = document.getElementById("receiver").value;

  setStatus("Initiating transaction... (please wait)");

  meta.sendCoin(receiver, amount, {from: account}).then(function() {
    setStatus("Transaction complete!");
    refreshBalance();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error sending coin; see log.");
  });
};

function smartVote() {
	
	var contract = Contract.deployed();
	var voter = document.getElementById("voter").value;
	voter = String(voter);	
	var proposal_list = document.getElementsByClassName('proposal');
	var nb_proposal = proposal_list.length;
	var chosen_proposal = -1;
	for (var i=0; i <  nb_proposal; i++) {
		if (proposal_list[i].checked) {
			//alert(proposal_list[i].id);
			chosen_proposal = i;
		}	
	}
	//alert(chosen_proposal);
	setStatus("Vote en cours... (veuillez patienter)");

	contract.vote(chosen_proposal,{from: account}).then(function() {
    setStatus("Vote complet!");
//alert(console(contract.showChairperson()));
    //refreshBalance();
  }).catch(function(e) {
    console.log(e);
    setStatus("Error sending coin; see log.");
  });
}

window.onload = function() {
  web3.eth.getAccounts(function(err, accs) {
    if (err != null) {
      alert("There was an error fetching your accounts.");
      return;
    }

    if (accs.length == 0) {
      alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
      return;
    }

    accounts = accs;
    account = accounts[0];
   // smvote = Contract.deployed();
    //refreshBalance();
	initializePoll();
  });
}

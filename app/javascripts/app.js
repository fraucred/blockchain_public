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
	alert(console(contract.showChairperson()));
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

    //refreshBalance();
  });
}
